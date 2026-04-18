# Competition Submission Summary

## One-sentence summary

Feishu Org Intelligence is an organizational intelligence prototype that uses a world model, DRI mechanism, and Skill-based delivery layer to help teams identify execution risks, assign ownership, and generate management outputs inside Feishu workflows.

## What problem it solves

As collaboration expands across product, design, engineering, data, and operations, execution becomes harder because:

- information gets fragmented
- ownership becomes blurry
- risks are discovered too late
- managers spend too much time manually routing updates and pushing progress

This project explores whether an intelligence layer can assist those workflows.

## Core idea

The project is built as three layers:

1. World Model
2. Intelligence Layer
3. Feishu Delivery Layer

## What makes it different

This is not just a task tool or a chat assistant.
It focuses on organizational coordination itself:

- risk scan
- DRI suggestion
- weekly brief generation
- org health diagnosis

## Current demo path

- load structured demo data
- run risk scan
- run DRI suggestion
- generate weekly brief
- export outputs in Docs / Feishu Docs formats

## Why CLI first

CLI was chosen as phase 1 to validate the intelligence core first.
Skill packaging and Feishu delivery are now added as the next layer.

## Product direction

The long-term direction is a Feishu-native organizational operating layer where:

- Base stores the world model
- Docs stores management output
- Chat/cards provide interaction and broadcast
- the intelligence layer continuously interprets execution state and routes action
