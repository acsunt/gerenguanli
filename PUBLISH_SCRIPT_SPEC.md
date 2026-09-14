# publish.ps1 功能说明与重建规范

## 文档目的

本文件用于记录当前 publish.ps1 的实际行为、设计意图、执行流程、依赖项和注意事项。

当未来需要重新生成 publish.ps1 时，应以本文件为准，而不是参考历史对话。

---

# 脚本目标

一键完成个人管理系统（personal-manager）的发布流程：

1. 构建 Web 前端
2. 同步 Capacitor Android 工程
3. 构建 Android Release APK
4. 自动发现最新 APK
5. 生成版本归档目录
6. 生成更新说明
7. 维护 CHANGELOG
8. Git 提交发布内容
9. 创建 Git Tag
10. 创建或更新 GitHub Release
11. 上传 APK 产物

---

# 前置依赖

脚本启动时必须检查以下命令是否存在：

- git
- npm
- npx
- java
- gh（GitHub CLI）

缺少任何一个都应立即终止。

示例逻辑：

```powershell
Get-Command git
Get-Command npm
Get-Command npx
Get-Command java
Get-Command gh
```

---

# 版本读取规则

从：

android/app/build.gradle

读取：

```gradle
versionName "x.x.x"
versionCode 123
```

提取：

```text
Version
VersionCode
```

生成：

```text
Tag = v{Version}
```

例如：

```text
Version      = 1.5.2
VersionCode  = 38
Tag          = v1.5.2
```

---



# 发布目录结构

发布目录：

```text
release/
```

必须维护：

```text
release/latest/
release/v1.5.2/
release/v1.5.3/
...
```

其中：

latest 保存当前最新版

版本目录保存历史归档

---



# Web 构建

执行：

```powershell
npm run build
```

失败立即终止。

---



# Capacitor 同步

执行：

```powershell
npx cap sync android
```

失败立即终止。

---



# Android Release 签名

Release APK 必须使用正式签名，否则手机无法安装。

签名配置文件：

```text
android/keystore.properties
```

签名证书：

```text
android/personal-manager-release.jks
```

`keystore.properties` 和 `.jks` 不得提交到 Git。

`android/app/build.gradle` 必须在存在 `keystore.properties` 时为 `release` 启用 `signingConfig`。

如果构建产物是：

```text
app-release-unsigned.apk
```

发布必须失败。

---



# Android Release 构建

进入：

```text
android/
```

执行：

```powershell
gradlew.bat assembleRelease
```

必须使用：

```powershell
try {
}
finally {
    Pop-Location
}
```

保证目录恢复。

---



# APK 自动发现

APK 不允许写死文件名。

必须从：

```text
android/app/build/outputs/apk/release/
```

扫描：

```powershell
*.apk
```

必须排除：

```text
*-unsigned.apk
```

按：

```powershell
LastWriteTime
```

倒序排序。

选择最新已签名 APK：

```powershell
$ApkCandidates[0]
```

如果未发现已签名 APK：

```powershell
throw
```

立即终止。

---



# APK 归档规则

生成：

```text
personal-manager-v1.5.2-build38.apk
```

复制到：

```text
release/v1.5.2/
```

同时复制为：

```text
release/latest/personal-manager.apk
```

---



# 更新说明生成

文件：

```text
更新说明.md
```

位置：

```text
release/vX.Y.Z/
```

内容包含：

- 发布时间
- VersionCode
- APK 文件名
- Git 提交记录

---



# Git 日志生成规则

优先获取：

```text
上一版本 Tag -> HEAD
```

示例：

```powershell
git log "$PreviousTag..HEAD"
```

如果没有历史 Tag：

```powershell
git log -20
```

格式：

```text
- 修复A
- 修复B
- 新增C
```

如果日志为空：

```text
- 首次发布
```

---



# CHANGELOG 维护

文件：

```text
release/CHANGELOG.md
```

每个版本只允许出现一次。

写入前必须检查：

```text
## v1.5.2
```

是否已经存在。

存在：

```text
不追加
```

不存在：

```text
追加
```

避免重复记录。

---



# CHANGELOG 去重实现要求

Tag 用于正则匹配时必须转义。

正确方式：

```powershell
[regex]::Escape($Tag)
```

禁止：

```powershell
直接拼接未经转义的 Tag
```

---



# Git 提交规则

执行：

```powershell
git add .
```

然后：

```powershell
git diff --cached --quiet
```

判断是否有变更。

有变更：

```powershell
git commit -m "release: vX.Y.Z"
git push
```

无变更：

```text
跳过 commit
```

不得报错。

---



# Git Tag 规则

分别检查本地和远端 Tag：

```powershell
git tag -l $Tag
git ls-remote --tags origin refs/tags/$Tag
```

本地不存在：

```powershell
git tag $Tag
```

远端不存在：

```powershell
git push origin $Tag
```

已存在则跳过对应步骤，不得把“远端已有 Tag”当成失败。

---



# GitHub Release 规则

检查 Release 是否存在时，不能让 Windows PowerShell 把 `gh release view` 的 stderr（release not found）当成终止错误。应临时把 `$ErrorActionPreference` 设为 `Continue`，再用 `$LASTEXITCODE` 判断：

```powershell
$ReleaseExists = $false
$previousErrorAction = $ErrorActionPreference
$ErrorActionPreference = "Continue"
try {
    $global:LASTEXITCODE = 0
    & gh release view $Tag *> $null
    $ReleaseExists = ($LASTEXITCODE -eq 0)
}
finally {
    $ErrorActionPreference = $previousErrorAction
}
```

存在：

```powershell
gh release upload --clobber
gh release edit
```

不存在：

```powershell
gh release create
```

---



# Release 上传内容

至少上传：

```text
版本 APK
```

发布说明来源：

```text
更新说明.md
```

---



# 关键异常处理要求

以下场景必须终止：

- 找不到 versionName
- 找不到 versionCode
- 找不到 APK
- npm build 失败
- cap sync 失败
- gradle 构建失败
- GitHub Release 操作失败

---



# 必须保留的功能

未来重写 publish.ps1 时，下列功能必须全部存在：

✅ 依赖检查

✅ versionName/versionCode 自动读取

✅ 自动生成 Tag

✅ Web Build

✅ Capacitor Sync

✅ Android Release Build

✅ APK 自动发现

✅ latest 目录更新

✅ 历史版本归档

✅ 更新说明生成

✅ Git Log 自动生成

✅ CHANGELOG 去重

✅ 空变更 Commit 处理

✅ Tag 存在检查

✅ GitHub Release 创建

✅ GitHub Release 更新

✅ APK 上传

✅ try/finally 目录恢复