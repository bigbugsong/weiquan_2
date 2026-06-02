# 消费维权服务站 · 设计系统（Design System）

> 政务蓝白风格的单页静态站点设计规范。所有取值与 `css/gov.css` 的 `:root` Token 一一对应；新增/调整样式时请优先复用本文 Token，不要硬编码。

- **设计来源（Figma）**：文件 `VLbl3zNWrjJoaRTaBhFPcq`（客服 V9.41–V9.80）
  - PC（最新精简版）：`维权站PC-web` · node `21184-1544`
  - 旧稿 PC：`21032-60` · 手机：`21092-2348`
- **落地文件**：`index.html`（结构）+ `css/gov.css`（设计系统样式）
- **字体基准**：PingFang SC（苹方）

---

## 1. 设计原则

| 原则 | 说明 |
|---|---|
| 政务可信 | 蓝白主色 + 金色强调，徽标署名「广州市市场监督管理局　监制」，严肃克制 |
| 单页直达 | Hero → 制度与职责（3 卡）→ 处理流程（4 步）→ 页脚；关键动作「投诉/反馈」「登录」常驻 |
| Token 驱动 | 颜色 / 字号 / 圆角 / 阴影 / 间距全部走 CSS 变量，保证全站一致 |
| 响应式优先 | 桌面三栏 → 平板两栏 → 手机单栏；吉祥物在窄屏降级为水印 |
| 适度动效 | 入场 `rise`、卡片/按钮 hover 位移；`prefers-reduced-motion` 下自动收敛 |

---

## 2. Design Tokens

### 2.1 颜色

**品牌蓝**
| Token | 值 | 用途 |
|---|---|---|
| `--c-navy` | `#0a2461` | 主标题 / 卡片标题 / 主按钮文字 |
| `--c-navy-deep` | `#07173f` | 深蓝备用 |
| `--c-royal` | `#123da8` | flow-note 文字 |
| `--c-link` | `#1e47b0` | 「查看详情」文字 / 描边基色 |
| `--c-bright` | `#2f6bf0` | 流程序号圆圈、**卡片图标** |
| `--c-accent` | `#4385d8` | 段标题 accent 横条 |
| `--c-sky` | `#6f9bf5` | 流程箭头 |

**墨色文字**
| Token | 值 | 用途 |
|---|---|---|
| `--c-ink` | `#12223f` | 正文主色 |
| `--c-ink-soft` | `#4a5874` | 描述 / 次要正文 |
| `--c-ink-faint` | `#8190ad` | placeholder |
| `--c-footer` | `#5f5f5f` | 页脚文字（= Figma `Text/Neutral/Secondary`） |

**表面 / 描边**
| Token | 值 | 用途 |
|---|---|---|
| 页面底色 | `#edf3ff` | `body` 背景（hero 蓝底 / footer 白底除外） |
| `--c-paper` | `#f2f6ff` | 浅表面（tag / 备用） |
| `--c-paper-2` | `#e8f0ff` | flow-note 底 / 浅蓝表面 |
| `--c-card` | `#ffffff` | 制度卡片底 |
| `--c-card-2` | `#fcfdff` | 流程卡片底 |
| `--c-line` | `#e1eaf8` | 常规描边 |
| `--c-line-strong` | `#cdddf6` | 强描边 / 分隔 |

**Hero（蓝底之上）与强调色**
| Token | 值 | 用途 |
|---|---|---|
| `--grad-hero` | `linear-gradient(180deg,#1e47b0,#509ce7)` | Hero 背景渐变 |
| `--c-eyebrow` | `#ffe9b8` | eyebrow 文字（暖金） |
| `--c-note` | `#e9f0ff` | hero 说明文字 |
| `--glass-bg` | `rgba(255,255,255,.05)` | 玻璃卡背景（eyebrow / 联系卡） |
| `--glass-border` | `rgba(255,255,255,.22)` | 玻璃卡描边 / 分隔线 |
| `--grad-gold` | `linear-gradient(106.7deg,#f4c355,#ffe6a8)` | 主按钮金色渐变 |
| `--c-gold` | `#f4c355` | 金色基色（主按钮渐变 `--grad-gold` 基色） |

> Figma 变量参考：`Text/Neutral/Primary #1b1b1b`、`Text/Neutral/Secondary #5f5f5f`、`Border/Neutral/Secondary #5f5f5f`、`Icon/Alpha/Black/50% #1b1b1b80`。站点对应位置已用上表蓝白 Token 表达。

### 2.2 字体与排版

- 字体栈 `--font-sans`：`"PingFang SC", -apple-system, BlinkMacSystemFont, "Noto Sans SC", "Source Han Sans SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif`
- 正文基准：`15px / line-height 1.7`（`≤480` 降为 14px）

| 语义 | 字号 | 字重 | 其它 |
|---|---|---|---|
| Hero 大标题 | `clamp(36px,5.6vw,60px)` | 600 | letter-spacing .12em |
| 顶栏署名 | 20px | 500 | letter-spacing .06em |
| eyebrow 胶囊 | 13px | 500 | letter-spacing .18em |
| Hero 说明 | 15px | 400 | line-height 1.85 |
| 联系卡 label / value | 12px / 18px | 400 / 500 | 电话 700，tabular-nums |
| 段标题 sec-head | `clamp(24px,4vw,32px)` | 700 | `#1b1b1b`，letter-spacing .08em |
| 段副标题 desc | 14px | 400 | `--c-ink-soft` |
| 卡片标题 | 21px | 600 | `#282828`（letter-spacing .42px） |
| 卡片描述 lead | 14px | 400 | line-height 1.8，`#5f5f5f` |
| 「查看详情」 | 13px | 400 | `--c-bright`（默认无外框） |
| 流程序号 | 19px | 800 | 白字 / tabular-nums |
| 流程标题 / 描述 | 16px / 13px | 600 / 400 | — |
| 主按钮 | 20px | 500 | — |
| 弹窗标题 | 22px | 700 | `--c-navy` |
| 表单 label / 输入 | 13px / 15px | 600 / 400 | — |
| 页脚 | 14px | 400 | letter-spacing .16em |

字号梯度（Figma 对齐）：`13 · 14 · 15 · 16 · 18 · 20 · 22 · 32 · clamp 标题`；字重 `400 / 500 / 600 / 700 / 800`。

### 2.3 圆角 · 阴影 · 布局

| Token | 值 | 用途 |
|---|---|---|
| `--r-card` | `16px` | 卡片 / 弹窗 |
| `--r-contact` | `8px` | 联系卡 |
| `--r-field` | `10px` | 输入框 / 验证码 / flow-note |
| `--r-pill` | `999px` | eyebrow / 按钮 / 「查看详情」 |
| `--shadow-sm` | `0 2px 10px rgba(18,45,110,.06)` | 小阴影（预留） |
| `--shadow` | `0 14px 38px rgba(16,49,130,.12)` | 通用悬浮（预留） |
| 制度卡 hover | `0 6px 50px rgba(27,27,27,.1)` | 投影-3级（制度卡默认无阴影，仅 hover） |
| `--shadow-lg` | `0 26px 60px rgba(10,36,97,.22)` | 弹窗 |
| `--wrap` | `1064px` | 内容最大宽度（`.gov-wrap`，左右 padding 24px / ≤480 12px） |
| `--ease` | `cubic-bezier(.22,1,.36,1)` | 全站统一缓动 |

---

## 3. 组件规范

### 3.1 Hero `.gov-hero`
- 背景 `--grad-hero` + 右上径向柔光；**无网格/斜纹底纹**（按 21184-1544 取消）。
- **顶栏 `.gov-hero__top`**：徽标 `icon_marketingjianguan.png`（36×36）+ 单行署名「广州市市场监督管理局　监制」（`.gov-hero__authority strong` 20/500）。
- **eyebrow `.gov-hero__eyebrow`**：玻璃胶囊，金色文字。
- **标题 `.gov-hero__title`** + **说明 `.gov-hero__note`**。
- **联系卡 `.gov-contact`**：玻璃卡，`width:480px; max-width:100%`；桌面**左对齐分组**（`gap:40px`，对齐 21184-1569），两组 label/value 之间竖线分隔 `.gov-contact__div`；`≤768` 转 `space-between` 整宽。
- **主按钮区 `.gov-hero__actions`**：仅一个主按钮，`max-width:240px`（对齐 21184-1577），按钮 `width:100%`；`≤768` 解除上限、整宽。
- **吉祥物 `.gov-hero__art`**：`jianguanrenyuan.png`，桌面贴底并排（宽 `clamp(170px,24vw,254px)`）；`≤768` 转为右下 10% 水印。

### 3.2 段标题 `.sec-head`
居中：标题 `.sec-head__title`（`#1b1b1b`，`::after` 渲染 54×4 accent 横条，色 `--c-bright`）+ 副标题 `.sec-head__desc`。

### 3.3 制度卡片 `.doc-card`（3 列网格 `.doc-grid`）
- 结构：图标 chip `.doc-card__icon` → 标题 `.doc-card__title` → 描述 `.doc-card__lead` → 「查看详情」`.doc-card__more`（居中含 → 箭头；**默认无外框无底，仅 hover 加 5% 蓝底** `rgba(47,107,240,.05)`，对齐 21188-2159）→ 隐藏全文 `.doc-card__full`（弹窗数据源）。
- **图标 chip**：40×40 **圆形**（`border-radius:50%`），底 `rgba(47,107,240,.1)`（品牌蓝 10%），内含 24×24 inline SVG，色 `--c-bright`（对齐 21188-2329）。
  - 工作职责与规程 → 描边「用户」图标
  - 不合格商品下架退市制度 → 描边「盾牌 × 」
  - 商品质量安全承诺书 → 描边「盾牌 ✓」
  - 三枚均为 Figma 21184-1544 导出的 stroke 矢量（stroke-width 2，色 `--c-bright` / #2F6BF0）
- 状态（对齐 21188-2369）：**默认无描边、无阴影**；hover 上浮 6px + 投影 `0 6px 50px rgba(27,27,27,.1)`（投影-3级）。
- 交互：整卡可点（`role="button"`、`tabindex=0`）。
- padding `20px 24px`；卡底 `--c-card`，圆角 `--r-card`。

### 3.4 处理流程 `.flow-steps`（4 列网格）
- 步骤 `.flow-step`：序号圆圈 `.flow-step__idx`（46px 实心 `--c-bright`，白字，**无阴影**）+ 标题 `h4`（16/600 `--c-navy`）+ 描述 `p`（13/`--c-ink-soft`）；卡底 `--c-card-2`，**无描边、无阴影**（扁平，按需求）。
- 序号为连续 **1 / 2 / 3 / 4**（原设计稿跳号 1/2/3/5，按需求改为连续编号）。
- 步间箭头：`.flow-step:not(:last-child)::after` 旋转边框生成「›」（色 `rgba(27,27,27,.5)`），居卡间 42px 间隙。
- `.flow-note`：整宽，底 `--c-paper-2`、描边 `--c-line-strong`、圆角 `--r-field`(10px)、文字 `--c-ink-soft`/14px 居中。
- **flow-note**：浅蓝信息条（底 `--c-paper`、字 `--c-royal`），文案「此服务站经广州市市场监督管理局批准设立」。

### 3.5 页脚 `.gov-footer`
白底单行居中：`唯品会维权站管理系统｜登录 →`；登录为 `[data-open="loginModal"]`。
- **登录按钮 `.gov-footer__login`**：内边距 `2px 8px`，「登录」14px/`--c-footer` + 14×14 `→` 内联 SVG（`.gov-footer__arrow`，gap 4）；**默认与 hover 均无底纹**，hover 仅文字转 `--c-link`（无底纹、无下划线）。

### 3.6 按钮 `.gov-btn`
胶囊，高 54，字 20/500。`--primary`：金渐变 + 金色阴影，文字 `--c-navy`；`--ghost`：透明白描边（当前页未使用，保留备用）。

### 3.7 弹窗 `.gov-modal`
- 遮罩 `rgba(7,21,56,.58)` + 模糊；面板 `--shadow-lg`（**无金色顶条**）。
- 标题区 `.gov-modal__title`（22/700）+ 滚动正文 `.gov-modal__body`；正文首个标题若与弹窗标题重复，由 `app.js` 自动去除（避免标题出现两次）。
- 关闭按钮 `.gov-modal__close`：**默认无底、无描边圈**（纯 ×，flex 居中）；hover 加 4% 黑底 + **绕中心旋转 90°（位置不变）**；仅键盘 `:focus-visible` 显描边圈。
- 三个实例：`articleModal`（卡片全文，内容由 JS 注入）/ `feedbackModal`（意见反馈表单）/ `loginModal`（登录，`--narrow`）。
- 交互（`js/app.js`）：`[data-open]` 开、`[data-close]` / 点遮罩 / Esc 关。

### 3.8 表单 `.gov-form`
`label`（13/600）+ `.gov-field`（min-height 48，圆角 `--r-field`，focus 蓝描边 + 4px 光晕）；验证码 `.gov-captcha` 为「输入框 + 132px 图」两列；提交按钮整宽。
- **提交校验（提报 `Appeal()` / 登录 `PwdCheck()` 共用）**：为空 / 格式错的字段加 `.gov-field.is-error`（红色外框 `#e23d3d` + 红色光晕）并在下方插入红色提示 `.gov-field__msg`；校验不通过即聚焦首个错误字段并阻止提交；用户一旦在该字段输入即清除其红框与提示。手机号校验 11 位数字。辅助函数 `govSetError`/`govClearErrors` 在 `tijiao.js`（jQuery 1.6.1 用 `.delegate` 委托 input）。

---

## 4. 响应式断点

| 断点 | 主要变化 |
|---|---|
| **≤768** | Hero 纵向堆叠；联系卡整宽；主按钮整宽；吉祥物→右下 10% 水印；`.doc-grid` 2 列；流程改横向行 [圆圈｜标题｜描述]、去箭头 |
| **≤576** | `.doc-grid` 单列 |
| **≤480** | `.gov-wrap` padding 12；正文 14px；徽标 32、署名 16；标题/间距收紧；弹窗转底部抽屉（`16px 16px 0 0`，max-height 92vh） |

---

## 5. 动效

- **入场 `rise`**（`@media (prefers-reduced-motion: no-preference)`）：Hero 文案子项与 `.doc-card` 依次淡入上移（stagger delay）。吉祥物不参与入场（由 opacity 过渡负责桌面↔手机切换）。
- **Hover**：`.doc-card` 上浮 + 投影浮现（默认无阴影）；`.gov-btn` 上浮 2px + 阴影增强；卡片箭头右移。
- **弹窗**：`modalFade`（遮罩）+ `modalRise`（面板上浮淡入）。

---

## 6. 资源清单

| 资源 | 文件 | 说明 |
|---|---|---|
| 徽标 | `images/icon_marketingjianguan.png` | 顶栏，36×36 |
| 吉祥物 | `images/jianguanrenyuan.png` | Hero 右侧执法人员，桌面 ≤254 / 手机水印 |
| 卡片图标 | inline SVG（`index.html` 内） | user / shield-x / shield-check，24×24，`currentColor` |
| 箭头 / 分隔 | 流程「›」与「查看详情」用 CSS（旋转边框 `::after`）；页脚登录「→」用内联 SVG | 流程 / 卡片 / 页脚 |
| 背景纹理 | CSS 渐变 | Hero 斜纹 + 柔光，无图片依赖 |
