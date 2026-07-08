# LunaCycle 官网 & 隐私政策（GitHub Pages 就绪）

本目录是一个不需要任何构建步骤的纯静态站点，可以直接上传到 GitHub 并用 GitHub Pages 托管。

## 目录结构

```
website/
├── index.html        官网首页（中/英双语，右上角按钮切换）
├── privacy.html       隐私政策（中/英双语）
├── assets/
│   ├── style.css       共享样式
│   └── script.js       语言切换逻辑
├── .nojekyll           禁用 GitHub Pages 的 Jekyll 处理
└── README.md           本说明文件
```

## 上传到 GitHub 的两种方式

### 方式一：单独建一个新仓库（推荐，最简单）

1. 在 GitHub 上新建一个仓库，例如 `lunacycle-site`。
2. 把本目录（`website/`）里的**内容**（不是这个文件夹本身）上传到仓库根目录：
   ```bash
   cd website
   git init
   git add .
   git commit -m "docs: add LunaCycle website and privacy policy"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/lunacycle-site.git
   git push -u origin main
   ```
3. 打开仓库的 **Settings → Pages**，Source 选择 `Deploy from a branch`，Branch 选择 `main` / `/(root)`，保存。
4. 几分钟后即可通过 `https://<你的用户名>.github.io/lunacycle-site/` 访问，隐私政策地址为该链接加 `/privacy.html`。

### 方式二：放进现有的 glow_cycle 仓库

1. 把本 `website/` 目录整体提交到你的 `glow_cycle` 仓库。
2. 打开仓库 **Settings → Pages**，Source 选择 `Deploy from a branch`，Branch 选择你的主分支，目录选择 `/website`（GitHub 支持选子目录）。
3. 访问地址会是 `https://<你的用户名>.github.io/glow_cycle/`。

## 上传前必须替换的占位内容

这些内容目前是占位符，直接上线前请替换成真实信息（已在文件中用注释或 `<span class="placeholder">` 标出）：

| 位置 | 占位内容 | 说明 |
|---|---|---|
| `index.html`、`privacy.html` 页脚 | `support@example.com` | 换成你的真实联系/客服邮箱 |
| `index.html` 首屏按钮 | `href="#"`（App Store / Google Play 按钮） | 换成应用上架后的真实商店链接 |
| `privacy.html` 顶部 | `生效日期：2026-07-08` | 换成你实际发布本政策的日期 |
| 全局 | `© 2026 LunaCycle` | 如公司主体不同，可替换为你的公司/开发者名称 |

## 隐私政策内容依据

`privacy.html` 中列出的数据收集项，是根据当前 `glow_cycle` 代码里实际用到的服务整理的：

- **账户**：`google_sign_in`、`sign_in_with_apple` + `firebase_auth`
- **云备份**：`cloud_firestore`（`lib/services/cloud_backup_service.dart`、`lib/services/user_remote_service.dart`）
- **分析**：`firebase_analytics`
- **广告**：`google_mobile_ads` + `app_tracking_transparency`（iOS ATT 授权）
- **内购**：`in_app_purchase`（VIP 会员）
- **本地存储**：`sqflite`（周期与日志数据默认只存本机）

如果之后新增或移除了数据收集相关的 SDK/功能（例如换用其他统计或广告平台），记得同步更新 `privacy.html` 里对应的段落，保持政策与实际行为一致——这是 App Store / Google Play 审核和当地法规（GDPR、CCPA 等）都会关注的点。

## 本地预览

不需要任何依赖，直接双击打开 `index.html`，或者用一个简单的本地服务器：

```bash
cd website
python3 -m http.server 8080
# 然后浏览器打开 http://localhost:8080
```
