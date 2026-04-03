# Feishu Org Intelligence CLI

> 一个基于飞书 CLI 的组织智能原型，用“世界模型 + DRI 机制 + CLI 编排”降低跨团队项目推进中的信息路由和协同成本。

本项目面向 **飞书 CLI 大赛**，聚焦一个高价值、强协作的真实场景：**跨团队 AI 产品功能上线**。

---

## 项目背景

今天很多团队已经开始给个人配 AI 助手，但组织推进这件事，仍然高度依赖：

- 人肉同步
- 状态会 / 对齐会
- 层层汇报
- manager 手工路由信息
- 风险靠经验感知，而不是被系统识别

问题不在于“团队没有工具”，而在于：

> 当协作开始跨产品、设计、研发、数据、运营时，信息会快速分散，责任会逐渐模糊，推进成本会显著上升。

Feishu Org Intelligence CLI 想做的，不是再加一个个人助手，而是补上一层 **组织智能层**：

- 用结构化数据描述目标、项目、任务、风险、责任和信号
- 自动识别跨团队推进过程中的阻塞与异常
- 为关键问题推荐 DRI（Directly Responsible Individual）
- 自动生成周报、管理简报和健康度视图
- 后续输出到 Feishu Docs / Bitable / Chat

一句话概括：

> 把跨团队推进，从“靠人催”升级成“靠模型协调”。

---

## 项目价值

本项目希望验证的，不只是一个 CLI 能不能跑起来，而是一种新的组织协作方式：

- **更早发现风险**：把超期、阻塞、责任缺失、长期未更新等问题前置暴露
- **更快找到责任人**：通过 DRI 推荐机制减少“这事到底谁来推进”的模糊地带
- **更低的管理同步成本**：把零散进展自动整理成周报和管理视图
- **更强的协作可见性**：让“目标—风险—责任—动作”形成闭环
- **更有产品化空间**：不仅适合比赛演示，也具备继续接入飞书对象、走向实际场景的基础

---

## 灵感来源

本项目的核心灵感，来自 Block 的这篇文章：

- [From Hierarchy to Intelligence](https://block.xyz/inside/from-hierarchy-to-intelligence)

这篇文章启发我们的，不是某一个具体功能，而是一种更底层的组织协作视角：

> 当组织规模扩大、协作链路变长，很多原本依赖层级结构完成的信息汇总、风险识别、责任分配与推进协调，是否可以逐步由“智能层”来辅助完成？

Feishu Org Intelligence CLI 可以看作是基于这一思路做出的一个飞书 CLI 原型化尝试。  
我们希望把文章里的抽象认知，进一步落到真实工作流中，验证它是否能在“目标—项目—任务—风险—责任”这条推进链路上创造实际价值。

同时，也向这篇文章致敬：

> 它帮助我们把“组织智能”从一个概念，转成了一个可以被结构化、被编排、被演示的产品方向。

---

## 核心理念

这个项目借鉴了 **From Hierarchy to Intelligence** 的思路，但不是在空谈组织理论，而是在飞书工作流里做一个可运行、可演示的原型。

### 1. 组织世界模型（World Model）
用结构化数据描述组织推进中的核心对象：

- Goals
- Projects
- Tasks
- Risks
- DRIs
- Signals

### 2. 组织智能层（Intelligence Layer）
在世界模型之上，提供可解释的判断与建议：

- `risk scan`
- `dri suggest`
- `brief weekly`
- `org health`

### 3. 飞书落地层（Feishu Layer）
把结果真正输出到协作环境中：

- Bitable
- Docs
- Chat
- Tasks（后续）

所以本项目的核心，不是一个“任务管理工具”，而是一套：

> **组织世界模型 + 智能规则层 + 飞书协作对象输出链路**

---

## Demo 场景

当前 MVP 采用的演示场景是：**AI 产品功能上线**。

目标：上线 **AI 风格海报功能**，并验证首月核心转化。

涉及团队：

- 产品
- 设计
- 研发
- 数据
- 运营

这个场景天然存在典型跨团队问题：

- 关键任务阻塞
- 项目健康度下降
- 增长验证缺少统一 DRI
- 灰度方案无人强推进
- 管理者需要快速看到“风险—责任—动作”闭环

这也是本项目最想解决的问题：

> 不是记录任务，而是帮助团队更顺畅地推进任务。

---

## 当前能力

当前版本已经实现一个基于 **Node.js / TypeScript** 的 CLI 原型，可以直接基于 demo 数据运行。

### 已实现命令

#### 1. 风险扫描
```bash
npm run dev -- risk scan
```
识别：
- 超期任务
- 阻塞任务
- 缺少 DRI 的关键事项
- 长时间未更新任务
- 项目健康度异常
- 已存在风险项

#### 2. DRI 推荐
```bash
npm run dev -- dri suggest
```
输出：
- 建议谁做 DRI
- 推荐理由
- 建议协作方

#### 3. 周报生成
```bash
npm run dev -- brief weekly
```
输出：
- 本周进展
- 关键风险
- DRI 建议
- 下周重点

#### 4. 组织健康度
```bash
npm run dev -- org health
```
输出：
- 目标状态
- 阻塞任务数
- DRI 覆盖率
- 活跃风险数
- 待决策事项数量

---

## 使用流程

一个典型的使用流程如下：

1. 团队把目标、项目、任务、风险、责任等信息结构化存储
2. CLI 基于世界模型运行风险扫描和健康度判断
3. 系统识别阻塞点，并对关键事项给出 DRI 建议
4. 自动生成周报或管理简报
5. 后续输出到 Feishu Docs / Bitable / Chat，进入真实协作链路

这意味着它不只是“分析数据”，而是在为跨团队协作提供一套更清晰的推进视角。

---

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 运行示例命令
```bash
npm run dev -- risk scan
npm run dev -- dri suggest
npm run dev -- brief weekly
npm run dev -- org health
```

### 3. 构建项目
```bash
npm run build
```

---

## 项目结构

```text
feishu-cli-challenge/
├─ README.md
├─ docs/
│  ├─ data-model/
│  │  └─ bitable-schema.md
│  ├─ product/
│  │  ├─ demo-script.md
│  │  └─ mvp-plan.md
│  └─ superpowers/specs/
│     └─ 2026-04-02-feishu-org-intelligence-cli-design.md
├─ examples/
│  └─ demo-data/
│     └─ sample-org-project.json
├─ src/
│  ├─ core/
│  ├─ intelligence/
│  └─ index.ts
├─ package.json
└─ tsconfig.json
```

---

## 关键文档

- **设计 Spec**：`docs/superpowers/specs/2026-04-02-feishu-org-intelligence-cli-design.md`
- **MVP 实施计划**：`docs/product/mvp-plan.md`
- **世界模型 Schema**：`docs/data-model/bitable-schema.md`
- **Demo Script**：`docs/product/demo-script.md`
- **Demo Data**：`examples/demo-data/sample-org-project.json`

---

## 当前阶段

当前项目已经完成：

- 概念定义
- 设计 Spec
- MVP 计划
- 世界模型 Schema
- Demo 场景数据
- CLI 最小骨架
- 风险扫描 / DRI 推荐 / 周报生成 / 组织健康度原型

下一步重点：

1. 优化 CLI 输出体验
2. 接入 Feishu Bitable
3. 接入 Feishu Docs
4. 完善比赛演示材料

---

## 为什么这个项目值得比赛里讲

因为它不是“又一个飞书自动化脚本”。

它试图证明：

> 飞书 CLI 不仅能编排文档、表格和消息，
> 还可以成为组织智能层的控制台。

如果要让评委记住这个项目，我希望是这 3 点：

1. **不是个人助手，而是组织智能层**
2. **不是任务工具，而是世界模型 + DRI 机制**
3. **不是概念空转，而是已经有 CLI 原型和 Demo 数据闭环**

---

## 项目状态

当前为 **MVP 原型阶段**，优先验证：

- 组织世界模型是否成立
- 风险识别和 DRI 推荐是否具备解释力
- CLI 到飞书对象的输出链路是否能打通

如果这条路径成立，后面可以继续扩展到：

- 更多团队协作场景
- 更丰富的 Feishu 对象联动
- 更强的智能规则与信号融合

---

## 一句话总结

Feishu Org Intelligence CLI 想验证的是：

> 飞书 CLI 不只是效率工具的调用入口，也可以成为组织协作智能化的原型控制台。