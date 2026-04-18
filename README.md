# Feishu Org Intelligence

> 一个面向办公与管理协同的 **组织智能原型**：以世界模型为基础，用 Intelligence Layer 识别风险、推荐 DRI、生成管理周报，并通过 Skill 形态与 Feishu 输出链路回到真实协作场景。

[English](./README.en.md) | [简体中文](./README.zh-CN.md)

---

## 这是什么

这不是一个普通的任务工具，也不是一个只会聊天的助手。

它试图回答一个更底层的问题：

> 当组织规模增大、协作链路变长，原本依赖层级、会议和 manager 人肉协调完成的信息汇总、风险识别、责任路由与推进建议，是否可以逐步由一层“组织智能”来辅助完成？

本项目基于 Block 的文章 **From Hierarchy to Intelligence** 的启发，尝试把这件事落成一个可运行、可演示、可继续产品化的飞书方向原型。

---

## 项目定位

当前仓库不是单纯 CLI 项目，而是一个三层结构：

1. **World Model**：用结构化数据描述 Goals / Projects / Tasks / Risks / DRIs / Signals
2. **Intelligence Layer**：对组织推进状态进行解释、诊断和建议
3. **Delivery Layer**：以 Skill 形态对外暴露能力，并把结果回流到 Feishu Docs / Base / Chat

所以它真正想验证的是：

> 飞书不只是工作流容器，也可以承载一层面向组织推进的智能系统。

---

## 当前已经完成什么

### 1. 可运行的组织智能内核
仓库中已经实现了基于 TypeScript 的分析能力：

- `risk scan`：识别超期、阻塞、缺少 DRI、长期未更新、健康度异常、已有风险项
- `dri suggest`：基于项目 DRI、任务执行人、目标 owner 推荐责任归属
- `brief weekly`：生成组织周报 / 管理简报
- `org health`：计算当前目标与项目整体健康度

### 2. Skill 交付骨架
当前分支新增了：

- `skill/SKILL.md`
- `skill/references/submission-positioning.md`
- `skill/references/feishu-output-plan.md`
- `skill/references/competition-checklist.md`
- `skill/scripts/run-skill.mjs`
- `src/skill-runner.ts`

这意味着当前项目已经从“纯 CLI 原型”升级为：

> **组织智能内核 + Skill 交付层**

### 3. 最小 Feishu 输出路径
当前已经补了两类最小输出：

- `npm run export:doc`：生成 Docs 风格的 Markdown 输出
- `npm run export:feishu-doc`：生成可进一步写入真实 Feishu Docs 的 payload JSON

它们用于证明：

> 项目不是停在命令行里，而是在朝真正的办公协作闭环推进。

---

## 为什么第一阶段先做 CLI

因为本项目第一阶段最重要的不是入口壳子，而是先证明组织智能内核成立。

如果一开始就直接压在 Bot、卡片、事件订阅、权限、部署这些事情上，很容易把时间耗在基础设施，而不是耗在真正的产品命题上。

所以当前路线是：

1. **先证明 world model 成立**
2. **先证明 intelligence layer 有解释力**
3. **再用 Skill 和 Feishu 输出层完成交付包装**
4. **最后再走向应用化与自动化**

这不是绕路，而是刻意控制节奏。

---

## 快速开始

### 安装依赖
```bash
npm install
```

### 运行 CLI 调试入口
```bash
npm run dev -- risk scan
npm run dev -- dri suggest
npm run dev -- brief weekly
npm run dev -- org health
```

### 运行 Skill 入口
```bash
npm run skill:risk
npm run skill:dri
npm run skill:brief
npm run skill:health
```

### 生成输出示例
```bash
# 生成 Docs 风格输出
npm run export:doc

# 生成可用于 Feishu Docs 写入的 payload
npm run export:feishu-doc

# 生成“真实写入意图”文档请求
npm run write:feishu-doc
```

---

## Demo 路径（适合比赛演示）

1. 展示 `examples/demo-data/sample-org-project.json` 里的组织世界模型
2. 跑一次 `risk scan`，展示系统如何识别跨团队推进问题
3. 跑一次 `dri suggest`，展示它如何推荐直接负责人
4. 跑一次 `brief weekly`，展示管理摘要如何自动生成
5. 展示 `outputs/feishu-doc-demo.md` 或 `outputs/feishu-doc-payload.json`，说明结果如何进入 Feishu Docs
6. 最后用一句话收束：

> 这不是一个 CLI 工具，而是一个以 Skill 交付、以 Feishu 为工作面、以组织推进为目标对象的组织智能原型。

---

## 项目结构

```text
feishu-cli-challenge/
├─ README.md
├─ README.zh-CN.md
├─ README.en.md
├─ docs/
├─ examples/
├─ outputs/
├─ skill/
│  ├─ SKILL.md
│  ├─ references/
│  └─ scripts/
├─ src/
│  ├─ core/
│  ├─ intelligence/
│  ├─ index.ts
│  └─ skill-runner.ts
├─ package.json
└─ tsconfig.json
```

---

## 当前 Feishu 写入闭环状态

当前分支已经把 Feishu 输出闭环拆成三步：

1. **Docs 风格内容生成**：输出适合飞书文档承载的 markdown 结果
2. **Feishu Docs payload 生成**：输出后续可直接写入文档系统的结构化数据
3. **Feishu Docs write request 生成**：输出“该如何把内容写入真实飞书文档”的最终请求骨架

对应脚本：

- `npm run export:doc`
- `npm run export:feishu-doc`
- `npm run write:feishu-doc`

这使得当前仓库已经完成了从：

> 分析逻辑 → Skill 能力 → 飞书文档写入意图

的演示级闭环。

## 下一步最值得做的事情

1. 接真实 Feishu Docs 写入
2. 接 Feishu Base 作为 world model 数据源
3. 增加 Chat / 卡片播报
4. 增加 signals 自动汇聚
5. 让系统从“被动调用”升级成“主动协同”

---

## 一句话总结

> Feishu Org Intelligence 想证明的，不是一个 CLI 能不能跑，而是：**飞书是否能承载一层真正帮助组织推进的智能系统。**
