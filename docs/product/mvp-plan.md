# Feishu Org Intelligence CLI MVP 实施计划

## 1. 目标
在比赛周期内完成一个可演示、可解释、可运行的 MVP，证明：

> 飞书 CLI 不只是自动化脚本工具，也可以承载“组织智能层”，将跨团队项目推进中的信息路由、风险识别、责任归属和简报输出串成闭环。

---

## 2. MVP 范围

### 2.1 本期必须完成
1. 世界模型最小闭环
2. 风险扫描能力
3. DRI 推荐能力
4. 周报/简报生成能力
5. 至少 2 个飞书对象集成（优先 Bitable + Docs）
6. 一套稳定的 demo 数据和演示脚本

### 2.2 本期不做
- 实时事件监听
- 真正复杂的 Agent 自动协作
- 高复杂度权限系统
- 全量组织知识图谱
- 大规模生产级部署能力

---

## 3. 实施阶段

## Phase 1：数据模型与样例场景
### 目标
确定系统最小世界模型，锁定 demo 场景。

### 任务
- 定义核心对象：Goals / Projects / Tasks / Risks
- 设计字段及对象关系
- 设计跨团队项目推进的 demo 样例
- 准备一份样例数据（JSON / Markdown / 表格结构）

### 输出物
- `docs/data-model/bitable-schema.md`
- `examples/demo-data/` 样例数据
- 世界模型字段说明

### 验收标准
- 可以完整描述一个跨团队项目推进案例
- 能支持 risk scan / dri suggest / weekly brief 三个命令输入

---

## Phase 2：CLI 骨架与命令定义
### 目标
建立项目可运行骨架，让命令可以跑通。

### 任务
- 建立项目目录结构
- 设计 CLI 命令入口
- 实现基础命令框架：
  - `foi init`
  - `foi risk scan`
  - `foi dri suggest`
  - `foi brief weekly`
  - `foi org health`
- 定义命令输入输出格式

### 输出物
- `src/commands/`
- `src/core/`
- README 中基础用法说明

### 验收标准
- 命令可在本地运行
- 至少能读取样例数据并输出结果

---

## Phase 3：智能规则层
### 目标
让系统具备“组织智能”的最小判断能力。

### 任务
- 实现风险扫描规则：
  - 超期任务
  - 无 owner
  - 依赖阻塞
  - 长时间未更新
  - 高优目标进度不足
- 实现 DRI 推荐规则：
  - 结合 Goal owner / Project owner / Assignee
  - 输出推荐理由
- 实现组织健康度指标：
  - 风险数
  - 阻塞数
  - DRI 覆盖率
  - 高优目标覆盖率
- 实现周报摘要结构化输出

### 输出物
- `src/intelligence/`
- 示例命令输出

### 验收标准
- 对 demo 数据能稳定输出可解释结果
- 不依赖大模型也能完成 MVP 核心逻辑

---

## Phase 4：飞书集成层
### 目标
把 CLI 输出真正落到飞书对象中，形成比赛可展示闭环。

### 优先级
1. Bitable
2. Docs
3. Chat
4. Tasks（可选）

### 任务
- 设计 Bitable 表结构映射
- 将 demo 数据写入/同步到 Bitable
- 将 weekly brief 输出到飞书文档
- 可选：把风险摘要发到群聊

### 输出物
- `src/adapters/feishu/`
- `docs/product/demo-script.md`
- 一套演示用飞书对象

### 验收标准
- 可以在飞书中展示结构化状态和文档简报
- CLI 输出与飞书对象一致

---

## Phase 5：比赛包装与演示优化
### 目标
让项目不只是能跑，还能打动评委。

### 任务
- 完善 README
- 编写问题-方案-演示脚本
- 准备核心卖点与亮点表达
- 整理 demo 流程
- 准备截图/录屏

### 输出物
- `README.md`
- `docs/product/vision.md`
- `docs/product/demo-script.md`
- `docs/product/judging-highlights.md`

### 验收标准
- 5 分钟内可以讲清楚问题、方案、演示、价值
- 评委一眼能看出不是普通脚本工具

---

## 4. 推荐目录结构

```text
feishu-cli-challenge/
├─ README.md
├─ docs/
│  ├─ product/
│  │  ├─ vision.md
│  │  ├─ mvp-plan.md
│  │  ├─ demo-script.md
│  │  └─ judging-highlights.md
│  ├─ data-model/
│  │  └─ bitable-schema.md
│  └─ superpowers/specs/
├─ examples/
│  └─ demo-data/
├─ src/
│  ├─ commands/
│  ├─ core/
│  ├─ intelligence/
│  └─ adapters/
└─ demo/
```

---

## 5. 第一优先级任务清单

### P0（立刻做）
1. 建项目目录骨架
2. 写 `vision.md`
3. 写 `bitable-schema.md`
4. 设计 demo 样例数据
5. 写 `demo-script.md`

### P1（核心功能）
6. 搭 CLI 骨架
7. 实现 `risk scan`
8. 实现 `dri suggest`
9. 实现 `brief weekly`
10. 实现 `org health`

### P2（飞书落地）
11. 接 Bitable
12. 接 Docs
13. 补 README
14. 准备比赛陈述材料

---

## 6. MVP 成功标准
只要达到以下条件，就算 MVP 成功：

1. 能构造一个跨团队推进项目样例
2. 能从结构化数据中识别风险
3. 能推荐关键问题 DRI
4. 能自动生成项目周报/决策简报
5. 能把至少一部分结果同步到飞书 Docs / Bitable
6. 整体演示可以在 5 分钟内讲清楚

---

## 7. 演示原则
- 不追求功能多，追求闭环完整
- 不追求大而全，追求“组织智能层”这一概念成立
- 所有功能都服务于一个故事：

> 传统组织靠层级管理推进；
> 我们用飞书 CLI + 世界模型 + DRI 机制，把跨团队推进升级成可被模型协调的过程。
