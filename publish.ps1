$ErrorActionPreference = "Stop"

# PowerShell 7+ 默认会把外部命令非 0 退出码当成终止错误，
# 这会破坏 git diff --quiet、gh release view 等“用退出码判断结果”的逻辑。
if ($PSVersionTable.PSVersion.Major -ge 7) {
    $PSNativeCommandUseErrorActionPreference = $false
}

function Assert-Command {
    param([string]$Name)

    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "缺少依赖命令: $Name"
    }
}

function Initialize-Java {
    if (Get-Command java -ErrorAction SilentlyContinue) {
        return
    }

    $jbrHome = "C:\Program Files\Android\Android Studio\jbr"
    $jbrJava = Join-Path $jbrHome "bin\java.exe"

    if (Test-Path $jbrJava) {
        $env:JAVA_HOME = $jbrHome
        $env:Path = "$(Join-Path $jbrHome 'bin');$env:Path"
        Write-Host "未在 PATH 中找到 java，已使用 Android Studio JBR: $jbrHome" -ForegroundColor Yellow
        return
    }

    throw "缺少依赖命令: java"
}

function Invoke-Step {
    param(
        [string]$Name,
        [scriptblock]$Command
    )

    Write-Host ""
    Write-Host "==== $Name ====" -ForegroundColor Cyan

    $global:LASTEXITCODE = 0
    & $Command

    if ($LASTEXITCODE -ne 0) {
        throw "$Name 失败"
    }
}

function Write-Utf8NoBom {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,
        [Parameter(Mandatory = $true)]
        [string]$Content,
        [switch]$Append
    )

    $encoding = New-Object System.Text.UTF8Encoding $false
    $directory = Split-Path -Parent $Path
    if ($directory -and -not (Test-Path $directory)) {
        New-Item -ItemType Directory -Force -Path $directory | Out-Null
    }

    if ($Append -and (Test-Path $Path)) {
        [System.IO.File]::AppendAllText($Path, $Content, $encoding)
    }
    else {
        [System.IO.File]::WriteAllText($Path, $Content, $encoding)
    }
}

function Invoke-Git {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$GitArgs,
        [string]$ErrorMessage
    )

    $global:LASTEXITCODE = 0
    & git @GitArgs
    if ($LASTEXITCODE -ne 0) {
        if ($ErrorMessage) {
            throw $ErrorMessage
        }
        throw "Git 命令失败: git $($GitArgs -join ' ')"
    }
}

function Invoke-Gh {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$GhArgs,
        [string]$ErrorMessage
    )

    $global:LASTEXITCODE = 0
    & gh @GhArgs
    if ($LASTEXITCODE -ne 0) {
        if ($ErrorMessage) {
            throw $ErrorMessage
        }
        throw "GitHub CLI 命令失败: gh $($GhArgs -join ' ')"
    }
}

Assert-Command git
Assert-Command npm
Assert-Command npx
Initialize-Java
Assert-Command java
Assert-Command gh

if (-not $env:ANDROID_HOME -and -not $env:ANDROID_SDK_ROOT) {
    $defaultSdk = Join-Path $env:LOCALAPPDATA "Android\Sdk"
    if (Test-Path $defaultSdk) {
        $env:ANDROID_HOME = $defaultSdk
        $env:ANDROID_SDK_ROOT = $defaultSdk
    }
}

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

$GradleFile = Join-Path $ProjectRoot "android\app\build.gradle"

if (-not (Test-Path $GradleFile)) {
    throw "找不到 build.gradle"
}

$GradleContent = Get-Content $GradleFile -Raw

$VersionMatch = [regex]::Match($GradleContent, 'versionName\s+"([^"]+)"')
if (-not $VersionMatch.Success) {
    throw "找不到 versionName"
}

$VersionCodeMatch = [regex]::Match($GradleContent, 'versionCode\s+(\d+)')
if (-not $VersionCodeMatch.Success) {
    throw "找不到 versionCode"
}

$Version = $VersionMatch.Groups[1].Value
$VersionCode = $VersionCodeMatch.Groups[1].Value
$Tag = "v$Version"

$ReleaseRoot = Join-Path $ProjectRoot "release"
$LatestDir = Join-Path $ReleaseRoot "latest"
$VersionDir = Join-Path $ReleaseRoot $Tag

New-Item -ItemType Directory -Force -Path $ReleaseRoot | Out-Null
New-Item -ItemType Directory -Force -Path $LatestDir | Out-Null
New-Item -ItemType Directory -Force -Path $VersionDir | Out-Null

Invoke-Step "Web Build" { npm run build }
Invoke-Step "Capacitor Sync" { npx cap sync android }

$GradleW = Join-Path $ProjectRoot "android\gradlew.bat"
if (-not (Test-Path $GradleW)) {
    throw "找不到 gradlew.bat"
}

Push-Location (Join-Path $ProjectRoot "android")
try {
    Write-Host ""
    Write-Host "==== Android Release Build ====" -ForegroundColor Cyan

    $global:LASTEXITCODE = 0
    & .\gradlew.bat assembleRelease

    if ($LASTEXITCODE -ne 0) {
        throw "Gradle 构建失败"
    }
}
finally {
    Pop-Location
}

$ApkOutputDir = Join-Path $ProjectRoot "android\app\build\outputs\apk\release"
if (-not (Test-Path $ApkOutputDir)) {
    throw "找不到 APK 输出目录"
}

$ApkCandidates = @(
    Get-ChildItem $ApkOutputDir -Filter *.apk |
        Sort-Object LastWriteTime -Descending
)

if ($ApkCandidates.Count -eq 0) {
    throw "找不到 APK"
}

$LatestApk = $ApkCandidates[0]

$ArchiveApkName = "personal-manager-$Tag-build$VersionCode.apk"
$ArchiveApkPath = Join-Path $VersionDir $ArchiveApkName

Copy-Item $LatestApk.FullName $ArchiveApkPath -Force
Copy-Item $LatestApk.FullName (Join-Path $LatestDir "personal-manager.apk") -Force

$PreviousTag = $null

try {
    $PreviousTag = git tag --sort=-v:refname |
        Where-Object { $_ -and $_ -ne $Tag } |
        Select-Object -First 1
}
catch {
    $PreviousTag = $null
}

if ($PreviousTag) {
    $GitLogs = @(git log "$PreviousTag..HEAD" --pretty=format:"- %s")
}
else {
    $GitLogs = @(git log -20 --pretty=format:"- %s")
}

$GitLogs = @($GitLogs | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })

if ($GitLogs.Count -eq 0) {
    $GitLogs = @("- 首次发布")
}

$GitLogsText = $GitLogs -join [Environment]::NewLine
$PublishTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

$ReleaseNotePath = Join-Path $VersionDir "更新说明.md"

$ReleaseNote = @"
# 更新说明

发布时间：$PublishTime

Version：$Version

VersionCode：$VersionCode

APK：$ArchiveApkName

## Git 提交记录

$GitLogsText
"@

Write-Utf8NoBom -Path $ReleaseNotePath -Content $ReleaseNote

$ChangeLogPath = Join-Path $ReleaseRoot "CHANGELOG.md"

if (-not (Test-Path $ChangeLogPath)) {
    Write-Utf8NoBom -Path $ChangeLogPath -Content "# CHANGELOG$([Environment]::NewLine)"
}

$ChangeLogContent = Get-Content $ChangeLogPath -Raw
if ($null -eq $ChangeLogContent) {
    $ChangeLogContent = ""
}

$EscapedTag = [regex]::Escape($Tag)

if ($ChangeLogContent -notmatch "(?m)^##\s+$EscapedTag\s*$") {
    $ChangeLogEntry = @"

## $Tag

时间：$PublishTime

$GitLogsText

"@
    Write-Utf8NoBom -Path $ChangeLogPath -Content $ChangeLogEntry -Append
}

Invoke-Git -GitArgs @("add", ".") -ErrorMessage "Git Add 失败"

$StagedFiles = @(git diff --cached --name-only | Where-Object { $_ })
$HasChanges = $StagedFiles.Count -gt 0

if ($HasChanges) {
    Invoke-Git -GitArgs @("commit", "-m", "release: $Tag") -ErrorMessage "Git Commit 失败"
    Invoke-Git -GitArgs @("push") -ErrorMessage "Git Push 失败"
}
else {
    Write-Host "无变更，跳过 Commit"
}

$TagExists = @(git tag -l $Tag | Where-Object { $_ })

if ($TagExists.Count -eq 0) {
    Invoke-Git -GitArgs @("tag", $Tag) -ErrorMessage "创建 Tag 失败"
    Invoke-Git -GitArgs @("push", "origin", $Tag) -ErrorMessage "推送 Tag 失败"
}
else {
    Write-Host "Tag 已存在，跳过创建"
}

$global:LASTEXITCODE = 0
gh release view $Tag *> $null
$ReleaseExists = ($LASTEXITCODE -eq 0)

if ($ReleaseExists) {
    Invoke-Gh -GhArgs @("release", "upload", $Tag, $ArchiveApkPath, "--clobber") -ErrorMessage "上传 Release 资产失败"
    Invoke-Gh -GhArgs @("release", "edit", $Tag, "--notes-file", $ReleaseNotePath) -ErrorMessage "更新 GitHub Release 失败"
}
else {
    Invoke-Gh -GhArgs @(
        "release", "create", $Tag,
        $ArchiveApkPath,
        "--title", $Tag,
        "--notes-file", $ReleaseNotePath
    ) -ErrorMessage "创建 GitHub Release 失败"
}

Write-Host ""
Write-Host "发布完成: $Tag" -ForegroundColor Green
