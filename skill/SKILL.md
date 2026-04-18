---
name: org-intelligence
version: 0.1.0
summary: 组织智能 Skill：围绕跨团队项目推进，识别风险、推荐 DRI、生成周报与健康度摘要，并将结果输出到飞书协作对象。
---

# Org Intelligence Skill

## 这个 Skill 是干什么的

该 Skill 不是个人问答助手，而是一个面向办公与管理协同的“组织智能层”原型。它基于结构化世界模型（Goals / Projects / Tasks / Risks / DRIs / Signals），识别跨团队推进中的异常，帮助团队在飞书场景中完成：

- 风险扫描
- DRI 推荐
- 周报生成
- 组织健康度诊断
- （下一步）输出到 Feishu Docs / Base / Chat

## 适用场景

当用户希望：

- 识别跨团队项目中的阻塞、超期、责任缺失
- 为关键议题推荐直接负责人（DRI）
- 自动生成周报、管理简报
- 快速判断目标 / 项目的整体健康度
- 将分析结果落到飞书文档或多维表格中

## 典型触发方式

- 帮我扫描这个项目当前的推进风险
- 给我推荐这个问题应该由谁来负责推进
- 基于这批项目数据生成一份管理周报
- 看下这个目标当前组织健康度怎么样
- 把扫描结果输出到飞书文档

## 当前实现能力

当前仓库已实现的分析能力：

1. 风险扫描（risk scan）
2. DRI 推荐（dri suggest）
3. 周报生成（brief weekly）
4. 组织健康度（org health）

## 输入要求

输入数据应至少覆盖：

- Goal
- Projects
- Tasks
- Risks
- DRI topics
- Signals（可选但建议）

当前 MVP 使用 demo JSON 数据驱动，后续将接入 Feishu Base / Docs。

## 输出形式

- 文本版风险驾驶舱
- 文本版 DRI 推荐
- 文本版管理周报
- 文本版组织健康度摘要
- （下一步）Feishu Docs / Base / Chat 输出

## 执行说明

当前 Skill 复用仓库中的 TypeScript intelligence 内核，不重写业务逻辑；Skill 负责定义能力入口、适用场景、输入输出约定与飞书落地方式。

## 下一步演进

- 接入 Feishu Docs 输出简报
- 接入 Feishu Base 作为世界模型数据源
- 增加 signals 汇聚与自动刷新能力
- 增加事件触发与定时播报
