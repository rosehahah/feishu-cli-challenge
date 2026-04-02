# Feishu Org Intelligence CLI - Bitable Schema

## 1. 设计目标
本 Schema 用于承载 Feishu Org Intelligence CLI 的“组织世界模型”，面向跨团队项目推进场景。

设计原则：
- 足够结构化，支持风险扫描、DRI 推荐、周报生成
- 足够轻量，适合比赛 MVP 快速实现
- 优先保证“可解释”和“可演示”，不过度复杂化

本版采用 6 张核心表：
1. Goals
2. Projects
3. Tasks
4. Risks
5. DRIs
6. Signals

---

## 2. 表关系总览

### Goals
描述组织目标，是顶层对象。

### Projects
服务于 Goal，描述跨团队推进项目。

### Tasks
属于 Project，描述具体执行项与依赖关系。

### Risks
关联 Goal / Project / Task，用于记录问题、阻塞与风险。

### DRIs
关联具体问题或推进主题，用于定义“谁对这件事直接负责”。

### Signals
承载来自文档、任务、沟通、会议等对象的状态信号，是智能层的输入。

---

## 3. Goals 表

### 3.1 用途
表示一个周期性组织目标，例如：
- 提升 AI 创作工具月活
- 完成某项关键跨团队项目交付

### 3.2 建议字段
| 字段名 | 类型 | 说明 |
|---|---|---|
| Goal ID | Text | 目标唯一标识，如 G-001 |
| Goal Name | Text | 目标名称 |
| Period | SingleSelect | 周期，如 2026Q2 |
| Priority | SingleSelect | P0 / P1 / P2 |
| Owner | User | 目标 owner |
| Status | SingleSelect | Not Started / On Track / At Risk / Done |
| Progress | Number | 0-100 |
| Summary | Text | 目标说明 |
| Linked Projects | Link | 关联 Projects |
| Key Risks | Link | 关联 Risks |

---

## 4. Projects 表

### 4.1 用途
表示一个跨团队推进项目，通常挂在某个 Goal 下。

### 4.2 建议字段
| 字段名 | 类型 | 说明 |
|---|---|---|
| Project ID | Text | 项目唯一标识，如 P-001 |
| Project Name | Text | 项目名称 |
| Related Goal | Link | 关联 Goal |
| DRI | User / Link | 当前项目直接负责人 |
| Team | Text | 主要涉及团队 |
| Stage | SingleSelect | Planning / In Progress / Review / Launch / Done |
| Health | SingleSelect | Healthy / Warning / Critical |
| Due Date | DateTime | 项目截止时间 |
| Progress | Number | 0-100 |
| Last Update | DateTime | 最后更新时间 |
| Project Brief | URL / Text | 项目文档链接 |
| Linked Tasks | Link | 关联 Tasks |
| Active Risks | Link | 关联 Risks |

---

## 5. Tasks 表

### 5.1 用途
表示项目下的具体执行任务，是风险识别的主要基础对象。

### 5.2 建议字段
| 字段名 | 类型 | 说明 |
|---|---|---|
| Task ID | Text | 任务唯一标识，如 T-001 |
| Task Name | Text | 任务名称 |
| Project | Link | 所属项目 |
| Goal | Lookup / Link | 对应目标 |
| Assignee | User | 执行负责人 |
| DRI | User / Link | 该任务或问题的直接负责人 |
| Priority | SingleSelect | P0 / P1 / P2 |
| Status | SingleSelect | Todo / Doing / Blocked / Review / Done |
| Dependency | Link | 前置依赖任务 |
| Due Date | DateTime | 截止时间 |
| Last Update | DateTime | 最近更新时间 |
| Blocked Flag | Checkbox | 是否阻塞 |
| Blocked Reason | Text | 阻塞原因 |
| Update Summary | Text | 最近更新摘要 |

---

## 6. Risks 表

### 6.1 用途
聚合系统识别或人工录入的风险项。

### 6.2 建议字段
| 字段名 | 类型 | 说明 |
|---|---|---|
| Risk ID | Text | 风险唯一标识，如 R-001 |
| Risk Title | Text | 风险标题 |
| Related Goal | Link | 关联 Goal |
| Related Project | Link | 关联 Project |
| Related Task | Link | 关联 Task |
| Severity | SingleSelect | Low / Medium / High / Critical |
| Status | SingleSelect | Open / Mitigating / Resolved |
| Owner | User | 风险 owner |
| Suggested DRI | User / Link | 建议 DRI |
| Age Days | Number | 风险存在天数 |
| Suggested Action | Text | 建议动作 |
| Source | SingleSelect | Rule / Manual / Signal |
| Notes | Text | 补充说明 |

---

## 7. DRIs 表

### 7.1 用途
显式建模某个跨团队问题的直接负责人，支撑“谁来推进这件事”的回答。

### 7.2 建议字段
| 字段名 | 类型 | 说明 |
|---|---|---|
| DRI Topic ID | Text | DRI 主题唯一标识 |
| Topic / Problem | Text | 负责主题或问题 |
| DRI | User | 直接负责人 |
| Scope | Text | 负责范围 |
| Related Goal | Link | 关联 Goal |
| Related Project | Link | 关联 Project |
| Related Risk | Link | 关联 Risk |
| Start Date | DateTime | 接手时间 |
| Deadline | DateTime | 目标完成时间 |
| Current Status | SingleSelect | Active / Pending / Closed |
| Next Action | Text | 下一步动作 |

---

## 8. Signals 表

### 8.1 用途
记录组织运行中的动态信号，是智能层推理的原材料。

### 8.2 常见信号来源
- 文档更新
- 任务状态变化
- 群消息讨论
- 会议结论
- 人工补充更新

### 8.3 建议字段
| 字段名 | 类型 | 说明 |
|---|---|---|
| Signal ID | Text | 信号唯一标识 |
| Source Type | SingleSelect | Doc / Task / Chat / Meeting / Manual |
| Source Link | URL / Text | 来源链接 |
| Related Goal | Link | 关联 Goal |
| Related Project | Link | 关联 Project |
| Related Task | Link | 关联 Task |
| Signal Type | SingleSelect | Progress / Risk / Decision / Blocker / Update |
| Summary | Text | 信号摘要 |
| Confidence | Number | 置信度 0-100 |
| Timestamp | DateTime | 信号时间 |

---

## 9. 第一版最关键的字段

如果实现压力较大，第一版务必保证以下字段存在：

### Goals
- Goal ID
- Goal Name
- Priority
- Owner
- Status
- Progress

### Projects
- Project ID
- Project Name
- Related Goal
- DRI
- Health
- Due Date
- Last Update

### Tasks
- Task ID
- Task Name
- Project
- Assignee
- Status
- Due Date
- Last Update
- Blocked Flag

### Risks
- Risk ID
- Risk Title
- Related Project
- Severity
- Status
- Suggested Action

### DRIs
- Topic / Problem
- DRI
- Related Project
- Current Status

### Signals
- Source Type
- Related Project
- Signal Type
- Summary
- Timestamp

---

## 10. 规则引擎如何使用这些表

### 10.1 Risk Scan
主要读取：
- Tasks
- Projects
- Risks
- Signals

识别规则示例：
- Task 已过 Due Date 且 Status != Done
- Task 连续多天无更新
- Project Health = Warning / Critical
- Task Blocked Flag = true
- 高优 Goal 下没有足够推进任务

### 10.2 DRI Suggest
主要读取：
- Goals.Owner
- Projects.DRI
- Tasks.Assignee
- Risks.Owner
- DRIs

推荐逻辑示例：
1. 优先已有项目 DRI
2. 否则看 Goal owner
3. 否则看最相关 Task assignee
4. 输出推荐理由和候选排序

### 10.3 Weekly Brief
主要读取：
- Goals
- Projects
- Tasks
- Risks
- Signals

生成内容：
- 本周进展
- 关键阻塞
- 风险清单
- 待决策事项
- 下周重点

---

## 11. MVP 落地建议

第一版实现时，建议：
- 先用本地 JSON 样例模拟这 6 张表的数据
- CLI 逻辑先跑通
- 再映射到飞书 Bitable
- Docs 作为展示层输出周报和管理简报

这样可以避免一开始被外部系统接入细节拖住节奏。

---

## 12. 结论

这个 Schema 的目标不是穷尽组织一切信息，而是用尽可能小的结构，支撑一个重要命题：

> 组织推进不必完全依赖层级管理，
> 也可以依赖结构化世界模型 + DRI 机制 + 智能协调来完成。
