# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server (localhost:5173)
npm run build      # tsc type-check + Vite production build → dist/
npm run preview    # serve dist/ locally
```

No test runner is configured. Type-check only via `tsc --noEmit`.

## Architecture

See [@./README.md]for full project structure, key behaviors, and tech stack details. @Claude please update README.md file according to the project structure and key behaviors, and tech stack details.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
