# Feishu Output Plan

## Why Feishu output matters

If this project stops at CLI output, it risks being perceived as a smart command-line demo.
To match the product vision, analysis results must flow back into real work surfaces.

## MVP output priority

### Priority 1: Feishu Docs
Reason:
- best for management briefs and weekly summaries
- easiest to demonstrate in a competition
- strongest narrative fit for "organizational intelligence generates management output"

Suggested outputs:
- weekly brief
- risk cockpit summary
- org health snapshot

### Priority 2: Feishu Base
Reason:
- best for world model persistence
- supports long-term product direction
- stronger for operational workflows after the demo

Suggested outputs:
- risks table
- projects table
- tasks table
- DRI decision table

### Priority 3: Feishu Chat
Reason:
- good for alerts and lightweight interaction
- best added after Docs/Base MVP is stable

Suggested outputs:
- critical risk alert
- weekly summary broadcast
- DRI assignment reminder

## Recommended competition path

For the competition version, implement this sequence:

1. Keep the intelligence engine in TypeScript
2. Keep CLI as debug console
3. Package the capability as a Skill
4. Add Feishu Docs as the first real output surface
5. Show Base as the next-step world-model persistence layer

This gives the project both a clear prototype center and a believable product path.
