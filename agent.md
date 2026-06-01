# AGENT 指南 · 消费维权服务站

面向 AI 协作者（Claude Code 等）的项目说明。开始任何改动前请先读本文与 [`design.md`](design.md)。

---

## 1. 项目简介

「消费维权服务站」是为唯品会消费者提供的政务风格**单页静态站点**，由广州市市场监督管理局监制，提供咨询、调解与投诉/反馈入口，并内置维权站管理系统登录。

- 形态：纯静态 HTML/CSS/JS，**无构建工具、无包管理、无框架**。
- 视觉：政务蓝白 + 金色强调，1:1 对齐 Figma（见 §6）。
- 部署：作为静态资源由 `weiquan.vip.com` 站点托管；页面含 ASP.NET 残留标记（见 §7）。

## 2. 技术栈

| 类别 | 选型 |
|---|---|
| 结构 | 原生 HTML5（`index.html`） |
| 样式 | 原生 CSS + CSS 变量 Token（`css/gov.css` 为主） |
| 脚本 | 原生 JS（`js/app.js`）+ jQuery 1.6.1（`js/tijiao.js` 表单逻辑） |
| 灯箱 | fancybox 1.3.4（`js/jq.fancybox-*` / `css/jq.fancybox-*`，旧版遗留） |

## 3. 目录结构

```
.
├── index.html          # 主页（当前设计稿落地页）
├── original.html       # 旧版页面（历史保留，勿与 index.html 混改）
├── design.md           # 设计系统规范（Token / 组件 / 断点）
├── agent.md            # 本文件
├── css/
│   ├── gov.css         # ★ 主设计系统样式（Hero / 卡片 / 流程 / 弹窗 / 表单 / 响应式）
│   ├── weiquan.css     # 旧版样式
│   ├── mobile.css      # 旧版移动样式
│   └── jq.fancybox-1.3.4.css
├── js/
│   ├── app.js          # ★ 弹窗与交互（data-open/data-close、卡片→文章弹窗、Esc/遮罩关闭）
│   ├── tijiao.js       # 表单提交（反馈 Appeal / 登录 PwdCheck，校验手机号、验证码）
│   ├── mobile.js
│   ├── jquery-1.6.1.min.js
│   └── jq.fancybox-1.3.4.js
└── images/             # 徽标、吉祥物、旧版切图等
```

## 4. 关键文件职责

- **`index.html`** — 唯一主页。结构区块：`gov-hero`（顶栏署名 + 标题 + 联系卡 + 主按钮 + 吉祥物）→ `doc-section`（3 张制度卡片，每卡含隐藏 `.doc-card__full` 作为弹窗正文）→ `flow-section`（4 步流程）→ `gov-footer` → 三个弹窗（article / feedback / login）。
- **`css/gov.css`** — 设计系统单一可信源。所有颜色/字号/圆角/阴影走 `:root` 变量；含 768/576/480 响应式与入场/hover/弹窗动效。**改样式优先改这里、优先复用 Token。**
- **`js/app.js`** — 纯原生、与 jQuery 互不干扰。`[data-open="id"]` 打开对应弹窗；每张 `.doc-card` 可点击，读取自身 `.doc-card__title` + `.doc-card__full` 注入 `articleModal`；支持遮罩点击 / `[data-close]` / Esc 关闭。
- **`js/tijiao.js`** — jQuery 表单逻辑：`Appeal(0)` 提交意见反馈，`PwdCheck()` 登录；含手机号/验证码校验，接口指向 `weiquan.vip.com`。

## 5. 开发约定

- **命名**：`gov-` 前缀 + BEM 风格（`block__element--modifier`），如 `.gov-hero__title`、`.doc-card__icon`、`.gov-btn--primary`。
- **Token 优先**：新增样式必须复用 `gov.css` 的 CSS 变量，避免硬编码色值/圆角/阴影；新 Token 加在 `:root` 并在 `design.md` 同步登记。
- **响应式**：沿用既有断点 768 / 576 / 480，不要新增断点；改布局时三档都要自测。
- **注释**：保持中文注释风格，关键决策注明对齐的 Figma 节点。
- **不引入依赖**：保持零构建。不要加 npm/打包器/CSS 框架；图标用 inline SVG（`currentColor` 受 CSS 控制）。
- **改动范围**：只改 `index.html` + `css/gov.css`（及必要的 `js/app.js`）；`original.html` / `weiquan.css` / `mobile.css` 为历史文件，非明确要求勿动。
- **保护内容与逻辑**：弹窗内法规全文（`.doc-card__full`）、`<script>` 登录 cookie 逻辑、`tijiao.js` 接口与 `runat="server"` 标记非必要勿删改。

## 6. 设计来源（Figma）

- 文件 key：`VLbl3zNWrjJoaRTaBhFPcq`（客服 V9.41–V9.80）
- PC（最新精简版）：`维权站PC-web` · node **`21184-1544`**
- 旧稿 PC：`21032-60` ｜ 手机：`21092-2348`
- 还原细节与 Token 取值见 [`design.md`](design.md)。改 UI 前先比对设计稿，按 1:1 还原。

## 7. 注意事项 / 坑位

- **ASP.NET 残留**：`<head runat="server">`、`<form ... runat="server">`、`<%= IsPostBack %>` 等是后端模板标记；纯静态预览下无害，**勿删**（线上由服务端处理）。
- **外部接口**：验证码图与提交地址指向 `https://weiquan.vip.com`，本地预览时验证码图/提交会跨域失败属正常，不影响布局走查。
- **弹窗约定**：新增可弹出入口用 `data-open="<modalId>"`；新增关闭按钮加 `data-close`。卡片弹窗内容来自该卡的 `.doc-card__full`，新增卡片需同时补全文。
- **流程序号**：处理流程序号为 1/2/3/**5**（设计稿如此，「结案反馈」保留 5），非笔误。

## 8. 本地预览与验证

- 启动静态服务器（任选其一）：
  ```bash
  python3 -m http.server 4732      # 然后访问 http://localhost:4732
  # 或
  npx serve .
  ```
  仓库已配置 `.claude/launch.json`（名为 `weiquan`，端口 4732），可直接用 Claude Code 预览工具 `preview_start` 启动。
- 验证清单：
  1. 桌面 1280 宽对照 Figma `21184-1544` 逐区核对（顶栏单行署名、单主按钮、3 卡带图标、4 步序号 1/2/3/5）。
  2. 768 / 576 / 480 三档响应式（卡片 3→2→1 列、流程竖排、吉祥物水印、按钮整宽）。
  3. 点击卡片 / 投诉反馈 / 登录，确认三个弹窗正常开合；控制台无报错。
