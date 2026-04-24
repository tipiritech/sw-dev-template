# Node Map

**Project:** Narrate
**Template version:** 1.1.0
**Last updated:** 2026-04-24
**Total nodes:** 27 planned, 0 active, 0 blocked, 0 closed

This file is the living record of every node in the project. It is updated whenever a node is opened, changes state, or is closed. The constitution (§2.4) treats this file as the single source of truth for node state.

## How to read this file

Nodes are grouped by phase (§4 of the constitution). Within each phase, nodes are ordered by dependency — a node appears after all nodes that must close before it can start. Parallel-safe nodes appear adjacent without ordering implication.

Each node entry shows:

- **Node ID** — immutable sequential identifier (`n-001`, `n-002`, …)
- **State** — `PLANNED` / `ACTIVE` / `BLOCKED` / `REVIEW` / `CLOSED` / `CANCELED`
- **Category** — foundation / data-model / feature / integration / polish / infrastructure / marketing / meta
- **Short name** — kebab-case descriptor used in branch names
- **Summary** — one sentence
- **Milestone?** — Y if this node triggers the heavy gate (§5.5, §6.6)
- **Depends on** — upstream node IDs that must close first
- **Blocks** — downstream node IDs waiting on this one

Only one node is `ACTIVE` at a time (§2.5).

---

## Phase 0 — Constitution ratification

| Node ID | State | Category | Short name | Summary | Milestone | Depends on | Blocks |
|---|---|---|---|---|---|---|---|
| n-001 | PLANNED | meta | node-definition-kickoff | Owner describes a node from a past project; finalize node template in constitution §2.1 | N | — | all |
| n-002 | PLANNED | meta | doctrine-stub-ratification | Ratify product/pricing/UX/infra doctrine stubs with real content | N | n-001 | n-003 |
| n-003 | PLANNED | meta | initial-node-map-sketch | Draft top-level nodes for phases 2–3 at high level | N | n-002 | n-004 |

---

## Phase 1 — Template alignment

| Node ID | State | Category | Short name | Summary | Milestone | Depends on | Blocks |
|---|---|---|---|---|---|---|---|
| n-004 | PLANNED | foundation | repo-init-from-template | Create Narrate repo using template v1.1.0; record version in `.template/VERSION` | N | n-003 | n-005 |
| n-005 | PLANNED | foundation | ci-scaffold | CI pipeline under 5 minutes; lint, typecheck, test, build; green on empty commit | N | n-004 | n-006 |

---

## Phase 2 — Product bootstrap

| Node ID | State | Category | Short name | Summary | Milestone | Depends on | Blocks |
|---|---|---|---|---|---|---|---|
| n-006 | PLANNED | foundation | nextjs-tailwind-shadcn-init | Initialize Next.js + Tailwind + shadcn/ui; first page renders locally | N | n-005 | n-007 |
| n-007 | PLANNED | integration | supabase-init | Connect Supabase (auth + Postgres); first migration applied | N | n-006 | n-008 |
| n-008 | PLANNED | integration | r2-init | Connect Cloudflare R2; test upload and retrieval from local dev | N | n-006 | n-009 |
| n-009 | PLANNED | infrastructure | vercel-deploy | Deploy to Vercel; CI passing; first URL responds with 200 | **Y** | n-006, n-007, n-008 | Phase 3 |

---

## Phase 3 — Node development loop

The entries below are phase-level placeholders. They will be split into smaller nodes once the product architecture comes into focus during n-001 and n-003. Milestone flags mark the nodes that trigger the heavy gate.

| Node ID | State | Category | Short name | Summary | Milestone | Depends on | Blocks |
|---|---|---|---|---|---|---|---|
| n-010 | PLANNED | data-model | core-schema | Define core Postgres schema: users, projects, decks, slides, narrations, sessions | N | n-007 | multiple |
| n-011 | PLANNED | feature | pptx-upload | File upload flow; Cloudflare R2 storage; basic project creation | N | n-008, n-010 | n-012 |
| n-012 | PLANNED | integration | pptx-parse | python-pptx parser service; extract slides, text, images, theme XML | N | n-011 | n-013, n-014 |
| n-013 | PLANNED | feature | brand-detection | Extract brand colors, logo, fonts from theme XML; store as project theme | N | n-012 | n-015 |
| n-014 | PLANNED | feature | slide-gallery | Tabbed slide navigation UI rendered from parsed deck | N | n-012 | n-015 |
| n-015 | PLANNED | integration | claude-narration-draft | Claude collaborates with author to draft per-slide narration and Q&A | **Y** | n-013, n-014 | n-016, n-017 |
| n-016 | PLANNED | integration | openai-tts | AI voice mode via OpenAI TTS; caching strategy in place | N | n-015 | n-018 |
| n-017 | PLANNED | feature | author-voice-record | Author records own narration; stored per slide | N | n-015 | n-018 |
| n-018 | PLANNED | feature | narration-playback | Three narration modes wired up: author voice / AI voice / subtitles with translation | N | n-016, n-017 | n-019 |
| n-019 | PLANNED | feature | grounded-chat-panel | Chat panel where viewers ask questions grounded in deck + author notes | **Y** | n-015 | n-020 |
| n-020 | PLANNED | feature | share-link | Generate shareable HTML experience; hosted link primary, standalone file optional | **Y** | n-018, n-019 | Phase 4 |
| n-021 | PLANNED | marketing | landing-page-v1 | Public landing page with positioning, pricing, build-log surface | N | parallel to n-010+ | n-022 |
| n-022 | PLANNED | marketing | build-log-surface | Build-log rendering from `build-log/posts/` markdown to landing site blog path | N | n-021 | — |

---

## Phase 4 — Launch

| Node ID | State | Category | Short name | Summary | Milestone | Depends on | Blocks |
|---|---|---|---|---|---|---|---|
| n-023 | PLANNED | integration | stripe-billing | Flat-tier subscription: solo $15–25/mo; team tier stub | **Y** | n-020 | n-024 |
| n-024 | PLANNED | infrastructure | monitoring-alerting | Sentry, cost-event dashboard, uptime alerts | N | n-020 | n-025 |
| n-025 | PLANNED | infrastructure | support-channel | Support email + minimal help-center surface | N | n-024 | n-026 |
| n-026 | PLANNED | marketing | launch-artifact | Launch post, X/LinkedIn thread, submissions to small-business communities | **Y** | n-023, n-024, n-025 | — |
| n-027 | PLANNED | infrastructure | first-paying-customer | Milestone — first paying customer completes full journey | **Y** | n-023+ | Phase 5 |

---

## Phase 5 — Operate

Steady-state post-launch. No nodes planned in advance; they are opened as operation surfaces need.

---

## Expansion plays (deferred)

These are explicitly deferred per constitution §13 and `docs/doctrine/product.md`. Do not open nodes against them without an ADR in `docs/DECISIONS.md` ratifying the expansion.

- HR compliance vertical (harassment training, e-signature, state-aware content, audit trails)
- Voice-cloning teams tier expansion (beyond the stub in n-023)
- Enterprise features (SSO, RBAC, SCORM, HIPAA, per-seat pricing)

---

## Node state summary

```
PLANNED:   27
ACTIVE:     0
BLOCKED:    0
REVIEW:     0
CLOSED:     0
CANCELED:   0
```

## Milestone nodes

Nodes that trigger the heavy gate (§5.5, §6.6): n-009, n-015, n-019, n-020, n-023, n-026, n-027. Each requires Checkpoint Validation Protocol sign-off in `docs/checkpoint_signoffs/`.

## Change log

| Date | Change | Node |
|---|---|---|
| 2026-04-24 | Rebuilt for v1.1 — added doctrine ratification node, template alignment phase, milestone flags, n-027 first-paying-customer milestone | — |
| 2026-04-23 | Initial node map drafted from constitution v1.0 | — |
