# Feishu Org Intelligence CLI

一个基于飞书 CLI 的组织智能操作系统原型。

它试图回答一个问题：

> 当团队推进越来越依赖跨团队协作时，除了传统层级管理，能不能用“世界模型 + DRI 机制 + CLI 编排”来降低信息路由和推进成本？

本项目面向 **飞书 CLI 大赛**，聚焦一个高价值场景：**跨团队 AI 产品功能上线**。

---

## 1. 项目在做什么

今天很多团队已经开始给每个人配 AI 助手，但组织推进仍然大量依赖：
- 人肉同步
- 状态会
- 对齐会
- 层层汇报
- manager 手工路由信息

Feishu Org Intelligence CLI 想做的不是再加一个个人助手，而是增加一层 **组织智能层**：

- 用结构化数据描述目标、项目、任务、风险、责任和信号
- 自动识别跨团队推进中的阻塞与风险
- 为关键问题推荐 DRI（Directly Responsible Individual）
- 自动生成项目周报 / 管理简报
- 后续输出到 Feishu Docs / Bitable / Chat

一句话说：

> 把跨团队推进，从“靠人催”升级成“靠模型协调”。

---

## 2. 核心理念

这个项目借鉴了 “From Hierarchy to Intelligence” 的思路，但不是在空谈组织理论，而是在飞书工作流里做一个可演示的原型：

- **Hierarchy**：传统层级负责信息汇总、决策传导、协调执行
- **Intelligence**：用结构化世界模型和智能规则层做同样的事情

所以本项目的核心不是“任务管理”，而是：

### 组织世界模型（World Model）
- Goals
- Projects
- Tasks
- Risks
- DRIs
- Signals

### 组织智能层（Intelligence Layer）
- `risk scan`
- `dri suggest`
- `brief weekly`
- `org health`

### 飞书落地层（Feishu Layer）
- Bitable
- Docs
- Chat
- Tasks（后续）

---

## 3. Demo 场景

当前 MVP 采用的演示场景是：

### AI 产品功能上线
目标：上线 **AI 风格海报功能**，并验证首月核心转化。

涉及团队：
- 产品
- 设计
- 研发
- 数据
- 运营

这个场景里天然存在典型跨团队问题：
- 关键任务阻塞
- 项目健康度下降
- 增长验证缺少统一 DRI
- 灰度方案无人强推进
- 管理者需要快速看到“风险—责任—动作”闭环

这也是本项目最想解决的问题。

---

## 4. 当前能力

当前版本已经实现一个 Node.js / TypeScript CLI 原型，可以直接基于 demo 数据运行。

### 已实现命令

#### 风险扫描
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

#### DRI 推荐
```bash
npm run dev -- dri suggest
```
输出：
- 建议谁做 DRI
- 推荐理由
- 建议协作方

#### 周报生成
```bash
npm run dev -- brief weekly
```
输出：
- 本周进展
- 关键风险
- DRI 建议
- 下周重点

#### 组织健康度
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

## 5. 如何运行

### 安装依赖
```bash
npm install
```

### 运行示例命令
```bash
npm run dev -- risk scan
npm run dev -- dri suggest
npm run dev -- brief weekly
npm run dev -- org health
```

### 构建
```bash
npm run build
```

---

## 6. 项目结构

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

## 7. 关键文档

### 设计稿
- `docs/superpowers/specs/2026-04-02-feishu-org-intelligence-cli-design.md`

### MVP 实施计划
- `docs/product/mvp-plan.md`

### 世界模型 Schema
- `docs/data-model/bitable-schema.md`

### Demo Script
- `docs/product/demo-script.md`

### Demo Data
- `examples/demo-data/sample-org-project.json`

---

## 8. 当前阶段

当前项目已经完成：
- 概念定义
- 设计 spec
- MVP 计划
- 世界模型 schema
- demo 场景数据
- CLI 最小骨架
- 风险扫描 / DRI 推荐 / 周报生成 / 组织健康度原型

下一步重点：
1. 优化 CLI 输出体验
2. 接入 Feishu Bitable
3. 接入 Feishu Docs
4. 完善比赛演示材料

---

## 9. 为什么这个项目值得比赛里讲

因为它不是“又一个飞书自动化脚本”。

它试图证明：

> 飞书 CLI 不仅能编排文档、表格和消息，
> 还可以成为组织智能层的控制台。

评委最应该记住的 3 点：
1. **不是个人助手，而是组织智能层**
2. **不是任务工具，而是世界模型 + DRI 机制**
3. **不是概念空转，而是已经有 CLI 原型和 demo 数据闭环**

---

## 10. 项目状态

当前为 MVP 原型阶段，优先验证：
- 组织世界模型是否成立
- 风险识别和 DRI 推荐是否有解释力
- CLI 到飞书对象的输出链路是否能打通

如果这条路径成立，后面可以继续扩展到：
- 更多团队协作场景
- 更丰富的 Feishu 对象联动
- 更强的智能规则与信号融合
