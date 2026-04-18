# Feishu Org Intelligence

> This repository is evolving from a pure CLI prototype into an **organizational intelligence engine + Skill delivery layer**. The CLI remains as a debug and demo console, while the Skill layer becomes the competition-facing packaging and capability surface.

English | [简体中文](./README.zh-CN.md)

> A Feishu CLI-based organizational intelligence prototype that uses a world model, DRI mechanism, and CLI orchestration to reduce coordination overhead in cross-functional project delivery.

This project was created for the **Feishu CLI Challenge** and focuses on a high-value real-world scenario: **shipping an AI product feature across multiple teams**.

---

## Background

Many teams are already giving individuals AI assistants, but organization-level execution still depends heavily on:

- manual syncs
- status meetings and alignment meetings
- multi-layer reporting
- managers manually routing information
- risk being sensed by experience instead of surfaced by systems

The real problem is not the lack of tools. The problem is that:

> once collaboration spans product, design, engineering, data, and operations, information becomes fragmented, ownership becomes blurry, and execution cost rises quickly.

Feishu Org Intelligence CLI is not trying to add another personal assistant. It is trying to add an **organizational intelligence layer** that can:

- represent goals, projects, tasks, risks, responsibilities, and signals as structured data
- identify blockers and anomalies in cross-team execution
- recommend DRIs (Directly Responsible Individuals) for key issues
- generate weekly briefs, management summaries, and health views
- eventually output results into Feishu Docs, Bitable, and Chat

In one sentence:

> upgrade cross-team execution from “people chasing progress” to “models coordinating progress”.

---

## Project Value

This project is not just about whether a CLI can run. It is about testing a new coordination model:

- **Earlier risk discovery**: expose overdue items, blockers, missing ownership, and stale tasks earlier
- **Faster ownership assignment**: reduce ambiguity around who should drive a critical issue
- **Lower management sync cost**: turn fragmented updates into structured briefs and summaries
- **Better execution visibility**: connect goals, risks, ownership, and actions in one loop
- **Stronger productization potential**: useful for a competition demo today, but also extensible into real Feishu workflows later

---

## Inspiration

The core inspiration for this project comes from Block’s article:

- [From Hierarchy to Intelligence](https://block.xyz/inside/from-hierarchy-to-intelligence)

What inspired us was not a single feature, but a deeper view of organizational coordination:

> As organizations grow and collaboration chains become longer, can some of the work traditionally handled by hierarchy—information synthesis, risk detection, ownership assignment, and execution coordination—be increasingly assisted by an intelligence layer?

Feishu Org Intelligence CLI is our attempt to turn that idea into a Feishu CLI prototype.  
We want to translate the article’s abstract perspective into a real workflow and test whether it can create practical value along the chain of goals, projects, tasks, risks, and ownership.

This project is also a tribute to that article:

> it helped us turn “organizational intelligence” from a concept into something that can be structured, orchestrated, and demonstrated.

---

## Core Idea

This project borrows from the idea of **From Hierarchy to Intelligence**, but instead of staying at the theory level, it turns that idea into a working prototype inside Feishu workflows.

### 1. Organizational World Model
Use structured data to represent the core entities of execution:

- Goals
- Projects
- Tasks
- Risks
- DRIs
- Signals

### 2. Intelligence Layer
Add interpretable analysis and suggestions on top of that world model:

- `risk scan`
- `dri suggest`
- `brief weekly`
- `org health`

### 3. Feishu Delivery Layer
Push outputs into actual collaboration surfaces:

- Bitable
- Docs
- Chat
- Tasks (planned)

So the core of this project is not a generic task tool. It is:

> **an organizational world model + an intelligence layer + a Feishu collaboration output pipeline**

---

## Demo Scenario

The current MVP demonstrates a real scenario: **launching an AI product feature**.

Goal: ship an **AI poster style feature** and validate its first-month conversion performance.

Teams involved:

- Product
- Design
- Engineering
- Data
- Operations

This scenario naturally includes common cross-functional problems:

- critical task blockers
- declining project health
- no clear DRI for growth validation
- rollout plans lacking strong ownership
- managers needing a fast “risk → owner → action” view

That is exactly the problem this project is trying to solve:

> not just recording work, but helping teams move work forward more effectively.

---

## Current Capabilities

The current version already includes a **Node.js / TypeScript** organizational intelligence engine, plus a newly added **Skill packaging layer** for competition submission and future Feishu integration.

### Implemented Commands

#### 1. Risk Scan
```bash
npm run dev -- risk scan
```
Detects:
- overdue tasks
- blocked tasks
- critical items without DRIs
- stale tasks with no recent updates
- project health anomalies
- existing risk items

#### 2. DRI Suggestion
```bash
npm run dev -- dri suggest
```
Outputs:
- recommended DRI
- rationale
- suggested collaborators

#### 3. Weekly Brief
```bash
npm run dev -- brief weekly
```
Outputs:
- weekly progress
- key risks
- DRI suggestions
- next-week priorities

#### 4. Org Health
```bash
npm run dev -- org health
```
Outputs:
- goal status
- number of blocked tasks
- DRI coverage
- active risks
- pending decisions

---

## Workflow

A typical usage flow looks like this:

1. Teams structure their goals, projects, tasks, risks, and ownership data
2. The CLI runs risk scans and health evaluations on top of the world model
3. The system identifies blockers and recommends DRIs for critical issues
4. It generates weekly briefs or management summaries
5. Outputs are later sent into Feishu Docs, Bitable, or Chat for real collaboration use

This means the project is not just “an analysis tool”. It is an attempt to provide a clearer execution lens for cross-functional collaboration.

---

## Skill Delivery Structure

The repository now uses a dual-layer structure:

1. **Intelligence Core**: the existing TypeScript analysis engine
2. **Skill Packaging Layer**: the new `skill/` directory that defines competition-facing capability packaging, references, and adapter scripts

Newly added in this branch:

- `skill/SKILL.md`: defines the project as an organizational intelligence Skill
- `skill/references/submission-positioning.md`: clarifies the submission framing
- `skill/references/feishu-output-plan.md`: clarifies how outputs should land back into Feishu work surfaces
- `skill/scripts/run-skill.mjs`: minimal Skill execution entry built on top of the current intelligence engine
- `skill/scripts/export-doc.mjs`: minimal Feishu Docs-oriented export simulation
- `src/skill-runner.ts`: unified capability adapter for risk scan, DRI suggestion, weekly brief, and org health

This means the project should no longer be understood as only a CLI demo. It is now an **organizational intelligence prototype with a Skill delivery skeleton and a Feishu output path**.

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run example commands
```bash
# Existing CLI debug entry
npm run dev -- risk scan
npm run dev -- dri suggest
npm run dev -- brief weekly
npm run dev -- org health

# New Skill-oriented entry
npm run skill:risk
npm run skill:dri
npm run skill:brief
npm run skill:health

# Export a Docs-style output file
npm run export:doc
```

### 3. Build the project
```bash
npm run build
```

---

## Project Structure

```text
feishu-cli-challenge/
├─ README.md
├─ README.zh-CN.md
├─ README.en.md
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

## Key Documents

- **Design Spec**: `docs/superpowers/specs/2026-04-02-feishu-org-intelligence-cli-design.md`
- **MVP Plan**: `docs/product/mvp-plan.md`
- **World Model Schema**: `docs/data-model/bitable-schema.md`
- **Demo Script**: `docs/product/demo-script.md`
- **Demo Data**: `examples/demo-data/sample-org-project.json`

---

## Current Stage

The project already includes:

- concept definition
- design spec
- MVP plan
- world model schema
- demo scenario data
- minimal CLI skeleton
- prototypes for risk scan, DRI suggestion, weekly brief, and org health

Next priorities:

1. improve CLI output experience
2. integrate Feishu Bitable
3. integrate Feishu Docs
4. refine competition demo materials

---

## Why This Project Is Worth Showing

Because it is not “just another Feishu automation script”.

It is trying to prove this:

> Feishu CLI can be more than a way to manipulate docs, tables, and messages — it can become a control surface for organizational intelligence.

If there are three things we want reviewers to remember, they are:

1. **This is not a personal assistant, but an organizational intelligence layer**
2. **This is not a generic task tool, but a world model + DRI mechanism**
3. **This is not pure concept talk — there is already a CLI prototype and demo-data loop**

---

## Project Status

This project is currently in the **MVP prototype** stage, primarily validating:

- whether the organizational world model is sound
- whether risk detection and DRI suggestions are interpretable
- whether the output chain from CLI to Feishu objects can be connected

If this path works, it can later expand into:

- more collaboration scenarios
- richer Feishu object integrations
- stronger signal fusion and intelligence rules

---

## One-Line Summary

Feishu Org Intelligence CLI is an attempt to validate this idea:

> Feishu CLI can be not only an interface for productivity actions, but also a prototype control plane for organizational collaboration intelligence.
