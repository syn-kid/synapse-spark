---
name: SynapseSpark
description: 神经元突触式关联探索工具 — 暗室中的思维星图
colors:
  void-black:
    value: "#0D1117"
    role: primary-bg
  deep-slate:
    value: "#161B22"
    role: secondary-bg
  twilight-blue:
    value: "#1C2333"
    role: tertiary-bg
  elevated-night:
    value: "#1A1E2E"
    role: elevated-bg
  starlight:
    value: "#E6EDF3"
    role: primary-fg
  muted-stardust:
    value: "#8B949E"
    role: secondary-fg
  faint-nebula:
    value: "#484F58"
    role: tertiary-fg
  synaptic-violet:
    value: "#7C3AED"
    role: accent-primary
  synaptic-violet-hover:
    value: "#8B5CF6"
    role: accent-primary-hover
  synaptic-violet-soft:
    value: "rgba(124,58,237,0.15)"
    role: accent-primary-bg
  axonal-pink:
    value: "#DB2777"
    role: accent-secondary
  axonal-pink-soft:
    value: "rgba(219,39,119,0.12)"
    role: accent-secondary-bg
  dendritic-blue:
    value: "#3B82F6"
    role: accent-tertiary
  dendritic-blue-soft:
    value: "rgba(59,130,246,0.10)"
    role: accent-tertiary-bg
  synaptic-green:
    value: "#6A9955"
    role: semantic-positive
  membrane-border:
    value: "#30363D"
    role: border
  membrane-border-strong:
    value: "#484F58"
    role: border-strong
typography:
  display:
    fontFamily: "Inter, Segoe UI, PingFang SC, system-ui, sans-serif"
    fontWeight: 700
  body:
    fontFamily: "Inter, Segoe UI, PingFang SC, system-ui, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "Cascadia Code, JetBrains Mono, Fira Code, Consolas, monospace"
    fontWeight: 400
  decorative:
    fontFamily: "Georgia, Times New Roman, STSong, serif"
    fontWeight: 400
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "18px"
  lg: "32px"
  xl: "48px"
  "2xl": "72px"
components:
  button-primary:
    backgroundColor: "{colors.synaptic-violet}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "11px 26px"
  button-primary-hover:
    backgroundColor: "#7E3FF0"
  button-secondary:
    backgroundColor: "{colors.twilight-blue}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.full}"
    padding: "11px 26px"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "#FBFBFD"
    rounded: "{rounded.full}"
    padding: "11px 26px"
  card-bento:
    backgroundColor: "{colors.deep-slate}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  tag-pill:
    backgroundColor: "{colors.synaptic-violet-soft}"
    textColor: "{colors.synaptic-violet}"
    rounded: "{rounded.full}"
    padding: "5px 14px"
---

# 设计系统：SynapseSpark

## 1. 概述

**创意北极星：「暗室中的思维星图」**

在完全黑暗的房间里，神经元节点是唯一的光源。每一个词语都像一颗星，连接它们的突触路径是微弱但精确的光丝。用户在这个空间中不是「操作工具」，而是像天文学家一样导航自己的思维星座——平移、缩放、回溯、重新分支。界面退后，让关联网络成为唯一的视觉焦点。

这是一个为严肃创意工作而生的工具型界面。气质上追求锐利而非柔软，智性而非感性，沉浸而非喧哗。设计系统明确拒绝暗黑极客风（终端绿、粗野主义、赛博霓虹）和 SaaS 模板感（渐变毛玻璃、套路化卡片网格、英雄指标）。它应该让人联想到一本设计精良的独立杂志，而非又一个 AI 工具。

**关键特征：**
- 深黑基底上的三色节点系统：紫色（主要操作）、粉色（收藏/书签）、蓝色（足迹/历史）
- 统一的 Inter 字体体系，仅 logo 保留装饰衬线体作为品牌签名
- 扁平无阴影的默认状态，通过背景色亮度层级（四层）而非投影来传达深度
- 动效仅服务于状态反馈，无编排式页面入场序列
- 所有圆角均为全圆角（pill）或大圆角，拒绝尖角带来的工具感

## 2. 色彩

全调色板策略。三种强调色各司其职，权重均等，构成节点状态的完整语义词汇。

### 主色（Primary）
- **突触紫** (`#7C3AED`)：主要操作色。用于激活节点、主按钮、选中状态、焦点环。饱和度适中，在黑底上发光但不刺眼。悬停态提亮至 (`#8B5CF6`)。
- **突触紫柔光** (`rgba(124,58,237,0.15)`)：紫色标签、图标盒、淡化背景区域。

### 辅色（Secondary）
- **轴突粉** (`#DB2777`)：书签和收藏状态。用于已收藏节点标记、收藏侧栏强调、灵感提示。
- **轴突粉柔光** (`rgba(219,39,119,0.12)`)：粉色标签、图标盒。

### 三重色（Tertiary）
- **树突蓝** (`#3B82F6`)：足迹和历史状态。用于已访问节点、历史路径、信息提示。
- **树突蓝柔光** (`rgba(59,130,246,0.10)`)：蓝色标签、图标盒。

### 中性色
- **虚空黑** (`#0D1117`)：主画布背景。最深的一层，不是纯黑。
- **深板岩** (`#161B22`)：卡片、面板、侧栏表面。
- **暮光蓝** (`#1C2333`)：按钮默认态、悬停提升态。
- **抬升夜** (`#1A1E2E`)：Toast、对话框等最高层。
- **星光** (`#E6EDF3`)：主文字，不高于 93% 亮度。
- **星尘** (`#8B949E`)：次要文字、正文。
- **暗星云** (`#484F58`)：说明文字、禁用态。
- **膜质边界** (`#30363D`)：默认分割线、卡片边框。
- **膜质边界强** (`#484F58`)：悬停态边框。

### 语义色
- **突触绿** (`#6A9955`)：正向操作确认、成功状态。

### 命名规则
**三色均权规则。** 紫、粉、蓝三种强调色以均等权重分布于界面。紫色承载操作（「点这里」），粉色承载收藏（「记住这个」），蓝色承载足迹（「你到过这里」）。不可将某一色降级为装饰。每种颜色都有对应的柔光变体（bg + text 配套使用）。

**虚空非纯黑规则。** 最深的背景色 `#0D1117` 包含微量蓝移，不与 `#000000` 等同。所有「黑色」元素均应微调向品牌色温。

## 3. 字体

**正文字体：** Inter, Segoe UI, PingFang SC, system-ui, sans-serif
**等宽字体：** Cascadia Code, JetBrains Mono, Fira Code, Consolas, monospace
**装饰字体：** Georgia, Times New Roman, STSong, serif（仅限 logo 词标）

**性格：** Inter 是中性的工作马——清晰、高可读性、不自恋。作为产品工具的统一字体选择，它消除了字体切换带来的视觉噪音。装饰衬线体仅出现于 logo 中的「SynapseSpark」词标，作为品牌签名，绝不出现在 UI 标签或数据中。

### 层级
- **Hero 标题** (800, `clamp(3.2rem, 7vw, 5.8rem)`, line-height 1.05)：仅着陆页 hero 区域。字间距 -0.03em。
- **段落标题** (700, `clamp(2rem, 4vw, 3.2rem)`, line-height 1.1)：主要段落分隔。
- **卡片标题** (700, 17-22px, line-height 1.2)：卡片和功能块标题。
- **正文** (400, `clamp(0.95rem, 1.4vw, 1.1rem)`, line-height 1.65)：段落文字，最大行宽 65ch。
- **标签** (700, 12-14px, letter-spacing 0.01-0.06em, uppercase)：眉题、按钮、标签、导航。眉题使用 12px + 0.06em 间距，全大写。

### 命名规则
**单一字体规则。** 全界面统一使用 Inter。产品工具的字体多样性是噪音，一致性才是美德。仅 logo 词标例外，使用装饰衬线体。

**不要流体标题规则。** 产品工具界面不使用 clamp 流体字号。标题使用固定 rem。着陆页例外——那里品牌表达优先于工具一致性。

## 4. 抬升

此系统不使用投影来传达深度。深度通过背景色亮度层级实现：虚空黑（画布）→ 深板岩（面板）→ 暮光蓝（控件）→ 抬升夜（浮层）。这是一个平坦但层次分明的系统——类似暗室中不同距离的物体接收不同程度的环境光。

**玻璃效果仅用于导航。** 导航栏使用 `backdrop-filter: saturate(180%) blur(20px)` 配半透明背景 `rgba(13,17,23,0.88)`，在画布滚动时提供微弱的景深提示。任何其他表面不应使用 glassmorphism。

### 命名规则
**平坦默认规则。** 所有表面在静止状态下是平坦的。任何视觉抬升（边框变亮、背景变浅）仅在交互状态（悬停、焦点）下触发。如果某物看起来像 2014 年的投影卡片，说明它的阴影太重且模糊太小。

## 5. 组件

### 按钮
- **形状：** 全圆角 pill（`9999px`），无例外。
- **主按钮：** 突触紫背景 + 白色文字。底部 2px 同色系阴影制造微弱凸起感。悬停：提亮至 `#7E3FF0`，上移 1.5px + 缩放 1.025。按下：缩放至 0.955，持续 100ms。带涟漪波纹反馈。
- **次级按钮：** 暮光蓝背景 + 星光文字。悬停：背景提至膜质边界强。
- **Ghost 暗色按钮：** 半透明白色背景 `rgba(255,255,255,0.06)` + 白色边框 `rgba(255,255,255,0.12)`。用于暗色段落内的反色 CTA。
- **浅色按钮：** 白色背景 + 虚空黑文字。仅用于深色 CTA 段落。悬停带淡紫偏移 `#F0ECFF`。
- **触控：** 所有按钮最小 44px 高度，触控设备 padding 加至 `12px 28px`。

### 标签/药丸
- **形状：** 全圆角 pill（`9999px`）。
- **三色变体：** 紫色（`synaptic-violet-soft` 背景 + `synaptic-violet` 文字）、粉色、蓝色。每种对应一个强调色。
- **尺寸：** 内边距 5px 14px，字体 12px/700，字间距 0.01em。

### 卡片（Bento 网格）
- **形状：** 大圆角 24px。
- **背景：** 深板岩 `#161B22`，边框膜质边界 `#30363D`。
- **交互变体：** 悬停时边框提亮至膜质边界强，上移 2px，增加微弱阴影 `0 4px 24px rgba(0,0,0,0.3)`。
- **内边距：** 32px。
- **禁止嵌套卡片。** 卡片内部不使用卡片。

### 输入框
- **形状：** 全圆角 pill，与按钮一致。
- **背景：** 虚空黑或深板岩，取决于所在表面。
- **边框：** 膜质边界，焦点时切换为突触紫。
- **占位符：** 使用 `fg-tertiary`，不透明度 0.6。

### 导航
- **桌面：** 固定顶部，56px 高，玻璃效果（`backdrop-filter blur`），半透明黑背景。
- **移动：** 保持相同结构，padding 缩减至 14px。
- **Logo：** SVG 神经元图标 + 装饰衬线体词标。
- **菜单：** 交错式滑出面板，双层紫色预层面 + 主面板，编号项目，开关文本翻转动画。

### Toast
- **形状：** 全圆角 pill。
- **位置：** 底部居中。
- **动画：** 弹簧入场 `cubic-bezier(0.16,1,0.3,1)`，380ms。
- **持续：** 2.2 秒后自动消失。

### 图标盒
- **形状：** 圆角 10px，44x44px 正方形。
- **三色变体：** 每种强调色对应一个柔光背景 + 纯色图标。

### 步进数字
- **字体：** Inter 700，64px，行高 1。
- **颜色：** 突触紫。
- **用途：** 教程步骤、引导流程。

## 6. 应该与不应该

### 应该：
- **应该** 使用四层背景色传达深度——永远不用投影。
- **应该** 三种强调色均权使用：紫色操作、粉色收藏、蓝色足迹。
- **应该** 使用全圆角（pill 或 ≥10px）——锐利边角在本系统中是错误。
- **应该** 统一使用 Inter 字体，仅 logo 用衬线体。
- **应该** 按钮动效使用 `transform` 和 `box-shadow` 过渡，不动布局属性。
- **应该** 所有过渡使用 `cubic-bezier(0.16, 1, 0.3, 1)` 缓出曲线。
- **应该** 使用 `< 50ms` 作为每次交互的响应目标。

### 不应该：
- **不应该** 使用 `border-left` 或 `border-right` 超过 1px 作为强调色条。
- **不应该** 使用 `background-clip: text` 渐变文字。
- **不应该** 将毛玻璃效果用于导航以外的任何表面。
- **不应该** 使用「大数字 + 小标签 + 支撑数据 + 渐变强调」的英雄指标模板。
- **不应该** 使用相同大小的「图标 + 标题 + 正文」卡片网格。
- **不应该** 使用投影来传达抬升——用背景色层级代替。
- **不应该** 使用 `#000000` 纯黑或 `#FFFFFF` 纯白——每个中性色都向品牌色微调。
- **不应该** 使用暗黑极客风：终端绿、等宽主导布局、粗野主义、赛博霓虹。
- **不应该** 使用 SaaS 模板感：奶油紫渐变、套路化卡片网格。
- **不应该** 使用游戏化元素：徽章、积分、成就、进度条。
- **不应该** 使用编排式页面入场动画——产品工具直接进入任务。
- **不应该** 在 UI 标签、按钮或数据中使用装饰衬线体。
