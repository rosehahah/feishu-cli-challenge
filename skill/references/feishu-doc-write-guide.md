# Feishu Doc Write Guide

## Goal

Turn the output of the organizational intelligence engine into a real Feishu document.

## Current branch status

This branch already supports three output levels:

1. `npm run export:doc`
   - generates a Docs-style markdown file
2. `npm run export:feishu-doc`
   - generates a JSON payload for future Feishu Docs writes
3. `npm run write:feishu-doc`
   - generates a write request artifact that mirrors the final document write intent

## Why this matters

The project should not stop at command-line analysis.
Its strongest product story is:

> world model → intelligence layer → skill packaging → Feishu work surface

That final Feishu write step is what proves this is an office / management prototype rather than a pure local script.

## Recommended real integration path

### Option A: OpenClaw Feishu Doc tool
Use a document create/write capability to:
- create a new doc
- write the markdown brief into the doc
- optionally return the doc URL for demo purposes

### Option B: Native Feishu Docs API
Use the generated markdown or payload and send it through a Docs API client.

## Competition framing

For the competition version, you do not need to fully productionize all write flows.
But you should make the write intent explicit and believable.
That is why this branch includes a dedicated write-request artifact.
