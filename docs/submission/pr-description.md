# PR Description Draft

## What changed

This PR upgrades the repository from a pure CLI prototype into a more competition-ready structure:

- adds a Skill packaging layer under `skill/`
- unifies the four core capabilities behind a reusable `skill-runner`
- updates README positioning from “CLI project” to “organizational intelligence prototype”
- adds Docs-style output generation
- adds Feishu Docs payload generation
- adds Feishu Docs write-intent generation
- adds submission references for competition framing

## Why this matters

The original repository already had a strong intelligence core, but its delivery form looked too much like a local CLI tool.
This PR makes the project easier to understand as:

> a world model + intelligence layer + Feishu delivery path, packaged as a Skill

That framing is more aligned with both the product vision and the competition expectation.

## Key files

- `skill/SKILL.md`
- `src/skill-runner.ts`
- `skill/scripts/run-skill.mjs`
- `skill/scripts/export-doc.mjs`
- `skill/scripts/export-feishu-doc.mjs`
- `skill/scripts/write-feishu-doc.mjs`
- `skill/references/*`
- `outputs/*`
- `README.md`

## Validation

Validated by running:

```bash
npm run build
npm run skill:risk
npm run skill:brief
npm run export:doc
npm run export:feishu-doc
npm run write:feishu-doc
```
