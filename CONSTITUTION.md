# PROJECT CONSTITUTION

**Version:** 1.1
**Date:** April 24, 2026
**Owner:** [TEMPLATE: project owner name]
**Operating mode:** Solo bootstrapper + Claude (primary) + ChatGPT (adversarial reviewer)

---

## 0. How to read this document

This is the operating manual for a software project. It is the template from which individual projects (Narrate and two others) are cloned. Sections marked `[TEMPLATE]` are project-agnostic and lift directly; sections marked `[NARRATE]` or `[PROJECT]` are project-specific and need replacement when reused. Sections without tags are shared scaffolding that all projects use identically.

This document is not a spec. It does not describe what the product does, except where product shape affects process. Product specification lives in `docs/doctrine/` — see §13.

This document is also not a to-do list. It is the operating framework under which to-do lists are produced. When in doubt about whether something belongs here, ask: *does this constrain how work gets done, or is it the work itself?* If it constrains how work gets done, it belongs here. If it is the work, it belongs in a node.

Read sections 1–3 once at project start. Reread sections 4–7 whenever a new node begins. Reference sections 8–14 on demand.

---

## 1. Purpose

### 1.1 Why this document exists

Software projects decay predictably without operating discipline. Scope creeps. Context gets lost between sessions. Dependencies get tangled. Cost structures become invisible until a bill arrives. Code quality slides because no second reviewer is built in. Marketing happens after launch instead of during build, at which point the story is stale. All of these failures are preventable with process.

The purpose of this constitution is to make those failures structurally harder to produce than to avoid.

### 1.2 What the project is (compressed)

**[PROJECT]** Replace with a two-sentence product description and tech stack.

**[NARRATE example]** Narrate is a web application that converts PowerPoint decks into interactive AI-powered HTML experiences. Tech stack: Next.js, Tailwind, shadcn/ui, Postgres (Supabase), Cloudflare R2, python-pptx, Claude, OpenAI TTS, ElevenLabs.

### 1.3 Who this is for

**[TEMPLATE]** Solo founder. The operating model assumes one human making all decisions. No team meetings. No stand-ups. No Jira board. Documentation and process exist to support a single decision-maker working with AI collaborators, not to coordinate a team.

The specific style calibration: the owner thinks in nodes — discrete units of functionality with explicit relationships. Directives from the owner are conclusions from prior processing, not provisional opinions. Claude operationalizes first, deliberates only on structural error. No clarifying questions when the directive is clear. No protective register. ChatGPT operates as adversarial reviewer at node boundaries. This constitution is written in that register.

---

## 2. Node architecture

### 2.1 What a node is

**[TEMPLATE — to be finalized at project kickoff; placeholder definition below]**

A **node** is a discrete unit of project work with:

- A defined **scope** — what's in, what's out
- A defined **input** — what it receives from upstream nodes or external sources
- A defined **output** — what it produces for downstream nodes or external consumers
- A defined **definition of done** — the concrete condition that marks the node complete
- A defined **dependency graph position** — what comes before it, what comes after it, what runs in parallel
- A defined **owner** — always the project owner, but named explicitly so the node is never orphan
- A defined **cost and time envelope** — expected runtime cost and wall-clock time
- A **handoff document** produced at close that carries state forward

A node is NOT a feature. A node is NOT a user story. A node is NOT a ticket. It is the architectural unit of how the owner thinks. Features, user stories, and tickets may exist inside a node, but the node is the organizing primitive.

> **⚠ OPEN ITEM:** At project kickoff, the first session refines this definition. The owner describes one node from a past project in their own format. Claude compares that format to the placeholder above and produces the final node template. Do not treat the placeholder as authoritative until that session completes.

### 2.2 Node sizing

**[TEMPLATE]** A node should be small enough to complete in one focused working session (2–6 hours of real work) but large enough to produce meaningful output. Signs a node is too large: multiple handoffs required mid-node, scope repeatedly expands, definition of done keeps receding. Signs a node is too small: completing it produces nothing reviewable, handoff doc is longer than the work product, ChatGPT adversarial review has nothing to attack.

When in doubt, split large nodes before starting rather than during. Retroactive splitting loses the dependency graph.

### 2.3 Node types

**[TEMPLATE]** Projects use these node categories. Categories are not enforced — they exist to help pattern-match. A single node can fit multiple categories.

- **Foundation nodes** — repository setup, CI/CD, infrastructure, shared libraries. Heavy up front, light thereafter.
- **Data model nodes** — schema design, migration planning, type definitions. Must precede nodes that depend on them.
- **Feature nodes** — user-facing functionality. The bulk of the project.
- **Integration nodes** — third-party service integration (Supabase, R2, Claude API, OpenAI TTS, ElevenLabs, Stripe).
- **Polish nodes** — UX refinement, performance tuning, accessibility. Deferred until feature nodes complete.
- **Infrastructure nodes** — deployment, monitoring, alerting, backup, disaster recovery.
- **Marketing nodes** — landing page, build-log posts, launch artifacts. Interleaved throughout, not end-stage.
- **Meta nodes** — constitution revisions, process changes, tool selection, retrofits from template updates.

### 2.4 The node map

**[PROJECT]** The node map is produced in the first work session after this constitution is ratified. It is maintained as `docs/NODE_MAP.md` in the repository and updated whenever a node is added, split, closed, or has its dependencies change. The map is not part of this constitution — it is a living artifact.

### 2.5 Node state

**[TEMPLATE]** Every node at any time is in one of these states:

- `PLANNED` — defined but not started
- `ACTIVE` — currently being worked
- `BLOCKED` — waiting on external dependency or decision
- `REVIEW` — complete pending adversarial review
- `CLOSED` — reviewed, merged, and archived
- `CANCELED` — explicitly abandoned (recorded, not deleted)

Only one node is `ACTIVE` at a time. Context-switching between active nodes is a code smell — if it happens repeatedly, the node is too large or the dependency graph is wrong.

---

## 3. Operating principles

**[TEMPLATE]** These principles govern how work gets done. They are not aspirational. They are enforceable.

### 3.1 Lean over comprehensive

Default to the smallest thing that works. Build to spec, not to imagined future spec. Add complexity only when concretely required. When in doubt, delete code rather than add it.

### 3.2 Cost-aware by default

Every feature that calls an external paid API has a cost envelope specified before implementation. Every user action that triggers inference is priced. Cost accounting lives alongside feature code. See §7.

### 3.3 Adversarial review at node boundaries

Every closed node gets run past ChatGPT (or equivalent non-Claude adversarial reviewer) before merge to main. Review has three modes: attack (try to break it), validate (confirm the stated definition of done is met), QC (catch the things the builder missed). Multi-round review is the norm — a single clean round is a signal the review wasn't adversarial enough. See §6.

### 3.4 Build in public

The build-log is not optional and not retrospective. It is built alongside the work. Each closed node produces a public artifact — a short post, a screenshot, a note. Marketing is interleaved with engineering, not appended to it. See §8.

### 3.5 Handoff hygiene

Every session closes with a handoff document. Every node closes with a handoff document. No session ends without the next session's opening being writable from state. Context loss is the default failure mode; handoff discipline is the only defense. See §5.

Handoffs are self-contained. Every code artifact referenced in a handoff is embedded verbatim, never linked by file path. A handoff must rebuild the system cold, on a new laptop, with nothing but itself. Ephemeral file references (`/home/claude/xyz.py`, `/tmp/foo`) are worthless the moment the session ends and are forbidden.

### 3.6 No protective register

Claude operates as partner, not as assistant. No hedging. No "let me know if you'd like me to proceed." Operationalize first, deliberate only on structural error. The owner corrects; Claude executes. This applies to all Claude surfaces used in the project — the primary chat, Claude Code, any API-driven tooling.

### 3.7 Drift detection

Scope drift is a chat-governance failure, not a process failure. When work in one node starts producing artifacts that belong in another node, Claude fires a three-option drift notice: redirect to existing work / open new work / accept scope expansion. The owner decides. See §11.

### 3.8 Accuracy over impact

The strength of the product comes from doing a small thing well. Avoid feature theater. Avoid demo-driven development. If a feature looks impressive but doesn't compound into long-term leverage, cut it.

### 3.9 Opinionated defaults

When a decision has no clear right answer and the research cost exceeds the decision cost, pick an opinionated default and move. Record the decision. Revisit only on evidence of concrete failure. Indecision is worse than a wrong call that can be reversed.

### 3.10 Math-first defaults

*[from Discovery feedback]*

This is a mathematical system. Scoring, ranking, and ordering logic default to the best mathematical approach: explicit objective, explicit constraints, no heuristic fudge factors that cannot be defended in a single sentence.

Before writing any ranking or scoring function, state in one sentence: what are we optimizing, under what constraints, and what is the tie-breaking rule. Fudge factors with no defensible justification get cut. Implicit weights in sort keys are fudge factors. Magic numbers in thresholds are fudge factors. Sample-size-dependent thresholds need sample-size-aware scaling or explicit minimum-sample guards — over-strict thresholds at low sample sizes cause silent early termination of optimization loops.

This principle compounds: it improves the defensibility of every ranking surface the product ships, it makes adversarial review faster (explicit objectives are easier to attack than implicit ones), and it prevents the slow slide into product logic nobody can explain.

### 3.11 Doctrine is the source of truth

*[from Discovery feedback]*

When code disagrees with doctrine, the code is wrong. Doctrine documents live in `docs/doctrine/` and are versioned like any other artifact. See §13.

---

## 4. Build sequence

**[TEMPLATE]** The project unfolds in phases. Each phase has a definition of done. Phase 2 cannot begin until phase 1 closes.

### 4.1 Phase 0 — Constitution ratification

- This document is read, marked up, and ratified.
- Node definition is finalized in a kickoff session (§2.1 open item).
- Initial doctrine stubs are drafted (`docs/doctrine/` — product, pricing, UX, infra).
- Initial node map is drafted at a high level (not every node, just the major ones).
- **Definition of done:** This document committed to repo at `docs/CONSTITUTION.md`; node definition finalized; doctrine stubs committed; first three nodes identified.

### 4.2 Phase 1 — Template alignment

- Template version cloned-from is recorded in `.template/VERSION`.
- Repository initialized with the template scaffold (standing files, `.github/` templates, `docs/`, `build-log/`).
- CI runs green on an empty commit.
- **Definition of done:** Repo live, CI passing, `.template/VERSION` committed, standing files present.

### 4.3 Phase 2 — Product bootstrap

**[PROJECT]** Tech stack initialized. First URL responds with 200. Landing page placeholder deployed.

### 4.4 Phase 3 — Node development loop

- Nodes executed one at a time per the node map.
- Each node follows the node lifecycle (§5).
- Build-log populated after each node close.
- **Definition of done:** Does not close until product ships or project is canceled.

### 4.5 Phase 4 — Launch

- Public launch artifact.
- Billing live.
- Monitoring live.
- Customer-facing support channel live.
- **Definition of done:** First paying customer.

### 4.6 Phase 5 — Operate

Post-launch operation and iteration. Expansion plays are considered only after core product demonstrates retention. Steady state has no definition of done.

---

## 5. Node lifecycle

**[TEMPLATE]** Every node follows this lifecycle exactly. No skipping steps.

### 5.1 Step 1 — Open

Open the node by creating a GitHub issue using the node template (§9.3). Issue contains: scope, input, output, definition of done, dependency references, cost envelope, time envelope, owner. Issue is tagged with the node category (§2.3).

Create a branch named `node/<node-id>-<short-name>` from `main`. Node ID is sequential (`n-001`, `n-002`, …) and immutable. Short name is kebab-case and descriptive.

Update `docs/NODE_MAP.md` to reflect the new node's PLANNED → ACTIVE transition.

### 5.2 Step 2 — Work

Execute the work. Commit frequently with meaningful messages (§9.4). Commits on a node branch belong only to that node — if work drifts into another node's scope, fire a drift notice (§11) rather than continuing.

Cost-tracking: if the node integrates a paid API, record the cost model in `docs/COST_MODEL.md` before writing the integration code, not after. Per §7, every paid-API call site carries a comment with unit cost for the first 90 days of the project.

Build-log draft: maintain a running draft of the build-log post in the node branch at `build-log/drafts/<node-id>.md`. Build-log writing during the node is 10x easier than build-log writing after the node.

Parked items: anything surfaced during the node but not in scope goes into `PARKED.md` at repo root, with a date. Parked items are not bugs — they are noticed-but-deferred observations for subconscious processing.

### 5.3 Step 3 — Close

Node work is done when the definition of done is met. Before merging:

1. **Self-review.** Read every diff. Not just skim — read. Look for TODOs left in code, console.log statements, commented-out blocks, hardcoded test values, secrets checked in.
2. **Tests.** If the node has tests, they pass. If the node should have tests and doesn't, write them now.
3. **Lint.** CI green.
4. **Cost verification.** If the node integrates a paid API, verify the recorded cost model matches actual observed cost in a test run.
5. **Adversarial review.** Produce an evidence pack (§6.2) and submit to ChatGPT with the standard three-mode prompt. Multi-round is the norm; expect FAIL → FAIL → CONDITIONAL → PASS and plan for it. Incorporate findings or record documented overrides (§6.4).
6. **Handoff document.** Produce `docs/handoffs/<node-id>-<short-name>.md` (§5.6). Embed all referenced code verbatim; no file-path references.
7. **Build-log finalization.** Move draft from `build-log/drafts/` to `build-log/posts/` and schedule or publish. Append one line to `BUILDLOG.md` at repo root (§8.2).

Merge to `main`. Close the GitHub issue. Update `docs/NODE_MAP.md` to reflect ACTIVE → CLOSED. Update `CHANGELOG.md`.

### 5.4 Step 4 — Retrospect (optional, triggered by failure or surprise)

If the node produced surprises — took 3x longer than estimated, blew the cost envelope by a factor, surfaced a structural issue not anticipated — do a one-page retrospective in `docs/retros/<node-id>.md`. What happened, what was expected, what the delta teaches about how to size or scope future nodes.

Retrospectives are not mandatory. They are triggered by signal. Overdoing retros is its own failure mode.

### 5.5 Step 5 — Heavy gate (milestone nodes only)

*[from Discovery feedback]*

Some nodes are milestones: first working end-to-end pipeline, first live external integration, first paying customer, production cutover, major architectural change. These nodes use a heavier review protocol (§6.6) in addition to the standard Step 3 close. The lightweight merge gate is for ordinary nodes; the heavy gate is for the ones that would be expensive to discover a problem with after the fact.

### 5.6 Handoff document template

Every node close produces a handoff doc with these sections. All code referenced in the handoff is embedded verbatim in the handoff doc itself, not linked.

```markdown
# Handoff: <node-id> — <short-name>

**Status:** CLOSED
**Started:** <date>
**Closed:** <date>
**Commit at close:** <git sha>
**Actual cost:** $<x.xx> / envelope was $<y.yy>
**Actual time:** <hours> / envelope was <hours>

## What shipped
<one-paragraph description of what the node produced>

## What changed in the repo
<bullet list of files added, modified, or removed, at directory level>

## Dependencies met
<which upstream nodes' outputs this node consumed, and how>

## Dependencies produced
<what downstream nodes now have available to consume>

## Code artifacts (verbatim)
<every file or function referenced elsewhere in this handoff,
 embedded as fenced code blocks with filename>

## Surprises
<unexpected discoveries, design choices that emerged, gotchas>

## Carried forward
<anything deferred to a future node — with node IDs if known>

## Adversarial review summary
<ChatGPT review: what it caught, what it missed, what was overridden>
<round count if >1 — document the FAIL sequence>

## Cross-project impact
<does this session's work affect any other project in the ecosystem?
 If yes, what was noted where. If no, state "none.">
```

---

## 6. Adversarial review protocol

**[TEMPLATE]** ChatGPT (or whichever non-Claude model is currently strongest for code review) runs adversarial review at every node close. Purpose: catch things the builder missed because the builder was too close to the work.

### 6.1 Why a non-Claude reviewer

Claude built the code. Claude reviewing Claude's code produces the same blind spots twice. An independent model produces genuinely independent review. Same model family is the same brain. Different model family is a different brain. Use different brains.

### 6.2 Evidence pack

*[from Discovery feedback]*

The adversarial review input is an **evidence pack**, not a loose PR link. It is a single compiled text artifact containing:

- The node's GitHub issue (scope, input, output, definition of done, cost envelope, time envelope).
- The full diff from node start to node close.
- Any architecture notes or design docs produced during the node, embedded verbatim.
- Relevant doctrine excerpts (from `docs/doctrine/`) the node interacts with.
- Specific claims the reviewer should verify (listed explicitly: "this function is idempotent," "this cache invalidates on content change," "this constraint is enforced").

Regenerate the evidence pack per round with the files that changed since the previous round.

Do not send secrets, API keys, or production data. Review-sanitize before export.

### 6.3 Standard review prompt

```
You are an adversarial code reviewer. Your job is to break things. You are not
trying to be helpful. Assume nothing works until proven otherwise. Find problems.

I am providing an evidence pack containing:
1. A GitHub issue describing a unit of work.
2. The complete diff of code and documentation produced to close that issue.
3. Architecture notes or design decisions recorded during the work.
4. Relevant doctrine excerpts.
5. Specific claims to verify.

Your job has three modes. Do all three. Label output by mode.

MODE 1 — ATTACK. Assume the code is wrong. Find bugs, security issues, race
conditions, edge cases not handled, inputs not validated, errors not caught,
performance traps, cost explosions, data integrity risks. Be specific:
file, line, what breaks, under what condition.

MODE 2 — VALIDATE. Read the stated definition of done and the specific claims
to verify. For each criterion and each claim, state whether the diff actually
meets it, partially meets it, or does not meet it. Cite evidence from the diff.
Do not take the author's word that something is done — verify from code.

MODE 3 — QC. Everything else. Test coverage gaps. Code smell. Inconsistent
patterns with the rest of the codebase. Documentation missing or stale.
Naming issues. Anything a fresh reader would find confusing.

Classify every finding as CRITICAL, MAJOR, or MINOR.
- CRITICAL: blocks merge. Data loss risk, security hole, definition-of-done
  failure, doctrine violation.
- MAJOR: must be fixed before the next checkpoint. Non-blocking for this
  merge but would compound.
- MINOR: tracked for later, not blocking.

End with a summary verdict: MERGE / MERGE WITH FIXES / DO NOT MERGE.
If MERGE WITH FIXES, list fixes in priority order (all CRITICALs first).
If DO NOT MERGE, state the structural reason.

Do not be polite. Do not hedge. Do not be encouraging.
```

### 6.4 Multi-round expectation

*[from Discovery feedback]*

**Multi-round review is the norm, not the exception.** A single clean round on the first submission is a signal that the review wasn't adversarial enough. For complex nodes, expect 3–5 rounds: FAIL → FAIL → CONDITIONAL → CONDITIONAL → PASS is a normal sequence, not an embarrassment.

Each round regenerates the evidence pack with only the files that changed since the last round. Findings from earlier rounds carry forward until closed: a finding is CLOSED when either (a) a fix is applied and verified, (b) the finding is documented as OVERRIDE with reasoning in the handoff doc, or (c) the finding is moved to a follow-up node (DEFER).

Round count is recorded in the handoff doc. A one-round clean review on a substantial node requires justification — either the node was trivial, or the review needs to be harder next time.

### 6.5 How to incorporate review findings

Three dispositions for each finding:

- **FIX** — finding is valid, apply the fix before merge.
- **DEFER** — finding is valid but the fix belongs in a different node; record as a follow-up issue and reference in the handoff.
- **OVERRIDE** — finding is not valid (reviewer misunderstood context, finding is out of scope); record the override with reasoning in the handoff doc.

Every OVERRIDE gets documented. Unexamined overrides accumulate into tech debt; documented overrides accumulate into decision history.

### 6.6 Heavy gate — Checkpoint Validation Protocol

*[from Discovery feedback]*

At milestone nodes (§5.5), the standard adversarial review is insufficient. Run the three-phase protocol:

**Phase 1 — Clean-room rebuild.** Start a fresh Claude session with no prior context. Provide only the handoff document and the repo at the merged state. Ask the session to rebuild the relevant surface from scratch and pass acceptance tests. Ambiguity in the handoff is a finding. Missing content is a finding. Successful rebuild is the pass condition.

**Phase 2 — Adversarial review.** Same as §6.2–6.4 but with a larger evidence pack covering the full milestone surface, not just the final node's diff.

**Phase 3 — Sign-off checklist.** A checklist committed to `docs/checkpoint_signoffs/<YYYY-MM-DD>-<milestone>.md` with named checks and evidence references. Minimum checks:

- [ ] Infrastructure — CI green, deploy successful, monitoring attached
- [ ] Correctness — acceptance tests pass, manual smoke tests recorded
- [ ] Governance — doctrine adherence verified, no undocumented divergence
- [ ] Cost — observed costs match modeled costs within tolerance
- [ ] Adversarial — no open CRITICAL or MAJOR findings
- [ ] Clean-room rebuild passed

Milestone PR merges only when all three phases pass.

### 6.7 When to skip adversarial review

Never for feature nodes. Never for integration nodes. Never for infrastructure nodes. Acceptable to skip for trivial polish nodes (changing a label, fixing a typo) and for meta nodes (updating this constitution). When in doubt, don't skip.

---

## 7. Cost awareness

**[TEMPLATE]** External API costs kill bootstrap projects quietly. Build cost awareness into the architecture from day one.

### 7.1 Cost model document

The file `docs/COST_MODEL.md` tracks per-action costs for every external paid API the project uses. It is updated whenever a new integration is added, whenever pricing changes, and whenever actual observed costs diverge from modeled costs.

Format is defined in the template package at `docs/COST_MODEL.md`.

### 7.2 Cost envelope per node

Every node that integrates a paid API declares a per-action cost envelope in its GitHub issue. If the envelope is blown by the time the node closes, that is a retrospective trigger (§5.4).

### 7.3 Call-site cost comments

*[from Discovery feedback]*

For the first 90 days of the project, every paid-API call site carries a comment with the unit cost:

```typescript
// ~$0.003 per call (Claude Sonnet, ~200 input + 50 output tokens @ current pricing)
const response = await claude.messages.create({...});
```

```python
# ~$0.015 per generation (OpenAI TTS-1, 500 chars @ $0.015/1k chars)
audio = openai.audio.speech.create(...)
```

The discipline forces cost awareness into the developer's direct view during implementation. After 90 days, the comments can be stripped if the team has internalized the costs. Before then, they stay.

### 7.4 Runtime observability

Production code that hits paid APIs emits cost events — minimum, token counts or request counts. Cost events aggregate to a dashboard visible to the owner at all times. Cost surprise in production is avoidable with correct observability at integration time.

### 7.5 Pricing-to-cost ratio

**[PROJECT]** Subscription prices and variable cost ceilings are project-specific. The rule is that variable cost per customer per month must stay well below subscription price. Target: variable cost ≤ 30% of subscription price at typical usage. Above 40%, the tier is structurally broken and needs redesign (usage caps, cheaper model, or price increase).

---

## 8. Build-in-public workflow

**[TEMPLATE]** Marketing interleaved with engineering. Build-log is a first-class artifact, not an afterthought.

### 8.1 What gets logged

Every closed node produces a build-log post. Posts are short (200–600 words), specific, and shareable. They are written during the node, not after.

Good topics: a problem that was hard and how it got solved; a design decision and the reasoning; a tool that worked or didn't; a cost trap and how it was mitigated; a small win shipped.

Bad topics: vague progress updates ("made good progress today"), motivational content, tutorials not grounded in what was just shipped.

### 8.2 Where it publishes

*[from Discovery feedback — `BUILDLOG.md` standing file added]*

Two surfaces:

1. **Long-form posts.** `build-log/posts/<node-id>-<short-name>.md`. Rendered to a public blog page at build time.
2. **One-line append-only log.** `BUILDLOG.md` at repo root. One line per closed node: date, node ID, node name, two-sentence summary, link to long-form post. Append-only. Credibility compounds from consistency, including the dull entries. If a week had rework and no new shipping, write that.

Cross-posting to X and LinkedIn is manual. Automation comes later.

### 8.3 What to never log

- Unreleased pricing changes
- Customer data of any kind
- Security issues before they're fixed
- Vendor negotiations in progress
- Competitive analysis that names names unfavorably

### 8.4 Voice

First person. Direct. Assumes the reader is technical. Short paragraphs. One strong specific detail beats five generic observations. Dark humor acceptable where appropriate. Confidence without bragging.

---

## 9. GitHub workflow

**[TEMPLATE]**

### 9.1 Repository structure

```
<project>/
├── .github/
│   ├── workflows/         # CI pipelines
│   ├── ISSUE_TEMPLATE/    # Node, bug, follow-up
│   └── pull_request_template.md
├── .template/
│   └── VERSION            # template version this project was cloned from
├── app/ or src/           # product code [PROJECT]
├── lib/                   # shared libraries [PROJECT]
├── docs/
│   ├── CONSTITUTION.md    # this document
│   ├── NODE_MAP.md        # current state of all nodes
│   ├── COST_MODEL.md      # API cost accounting
│   ├── DECISIONS.md       # ADRs
│   ├── CANDIDATE_LESSONS.md  # lessons pending promotion to template
│   ├── doctrine/          # product/pricing/UX/infra doctrine
│   ├── handoffs/          # one file per closed node
│   ├── retros/            # one file per node that triggered retro
│   ├── checkpoint_signoffs/  # heavy-gate milestone records
│   └── reference/         # background material, not current spec
├── build-log/
│   ├── drafts/            # work-in-progress posts
│   └── posts/             # published posts
├── scripts/               # dev and deploy utilities
├── README.md
├── HANDOFF.md             # current session handoff (overwritten each session)
├── PARKED.md              # parked items, append-only, dated
├── BUILDLOG.md            # public append-only build log
├── CHANGELOG.md
├── LICENSE
├── .env.example
└── .gitignore
```

Every top-level directory has a `README.md` explaining what lives there and what doesn't.

*[from Discovery feedback — standing files `HANDOFF.md`, `PARKED.md`, `BUILDLOG.md` added at repo root; `docs/doctrine/`, `docs/checkpoint_signoffs/`, `docs/CANDIDATE_LESSONS.md`, `.template/VERSION` added]*

### 9.2 Branching model

Trunk-based with node branches.

- `main` is always deployable. CI runs on every push. Never commit directly to main.
- `node/<node-id>-<short-name>` branches per §5.1. One active at a time.
- `fix/<short-name>`, `refactor/<target>`, `docs/<target>` for non-node work.
- `hotfix/<date>-<short-name>` for emergency production fixes. Fast-path node with abbreviated lifecycle but same rigor.
- No long-lived feature branches. No develop branch. No release branches.

### 9.3 Issue templates

**Node template** (`.github/ISSUE_TEMPLATE/node.md`) — format is in the template package. Key fields: scope, out of scope, input, output, definition of done, dependencies, envelopes, architecture notes, test strategy, cost model updates.

**Follow-up template** for DEFER items from adversarial review. **Bug template** for production bugs.

### 9.4 Commit discipline

- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `perf:`.
- Present-tense imperative subject: `add TTS cache invalidation`, not `added` or `adding`.
- Subject line ≤ 72 characters.
- Blank line. Body if needed, wrapped at 72 columns.
- Reference node ID in body: `Node: n-007`.
- Never `WIP`, `fix`, `update`, `.` or other useless messages.

Amend and rebase freely on node branches. Do not rewrite history on `main`.

### 9.5 Pull requests

Solo project — PRs exist for self-review discipline, not someone else's approval. PR template in the template package. Every node close opens a PR from the node branch to `main`. Squash-merge so each node produces exactly one commit on main.

### 9.6 CI configuration

Baseline pipeline on every push:

1. Install dependencies
2. Type check
3. Lint
4. Unit tests
5. Build
6. (On `main`) deploy to production

Keep CI under 5 minutes and under 60 lines of workflow config. If it creeps past that, optimize or split.

### 9.7 Tagging and releases

Semantic versioning from launch. Before launch, no formal versioning required. Post-launch, strict. Tag every deploy that reaches users. Release notes generated from closed-node handoff summaries for the tagged window.

### 9.8 Secrets and secrets management

All secrets in environment variables. Local `.env.local` gitignored. Production secrets in the platform (Vercel, Cloudflare, Supabase) environment. A `.env.example` tracked in repo documents every required variable with a human-readable comment per variable.

If a secret is ever committed by accident, rotate it before fixing the git history. The commit history is public; rotation is non-negotiable.

---

## 10. Environment and tooling

**[PROJECT]**

### 10.1 Local development environment

- Runtime version pinning: `.nvmrc`, `.python-version`, `.tool-versions` committed.
- Task runner: `just` (not `make`). Standard recipes: `just dev`, `just test`, `just lint`, `just typecheck`, `just build`, `just deploy`. A clean clone runs `just dev` in under five minutes or the recipes are broken.
- Env loader: `direnv` with committed `.envrc.example`.
- Editor: VS Code or Cursor. `.vscode/settings.json` and `.vscode/extensions.json` committed with team defaults, not personal settings.
- Pre-commit hooks: lint, format, type-check on staged files. Husky for JS/TS; `pre-commit` framework for Python.

### 10.2 Claude in the loop

- **Primary chat (Claude.ai):** strategy, architecture, planning, constitution revisions, non-code artifacts.
- **Claude Code (CLI):** code generation, refactoring, test writing, running inside the repo with full file-tree awareness.
- **Cursor with Claude:** inline edits, pair programming on complex functions.

Use the right surface for the right work. Do not write architecture-level prompts in Claude Code; do not write code in Claude.ai chat except for small snippets.

### 10.3 ChatGPT in the loop

Used for adversarial review at node boundaries (§6) and for specific second-opinion tasks. Not for primary code generation.

### 10.4 Third-party services

**[PROJECT]** Enumerate in `docs/COST_MODEL.md`. Every service has a kill-switch plan: if the service fails, what's the fallback, how does the app degrade.

### 10.5 Dependency discipline

- Pin versions. No `^` or `~` in `package.json`. Use lockfile.
- Renovate or Dependabot configured for weekly PRs.
- New dependencies require a line in `docs/DECISIONS.md` explaining why the dependency was added and what was considered instead.
- Audit dependencies quarterly. Remove unused.

---

## 11. Chat governance, session discipline, and drift detection

**[TEMPLATE]**

### 11.1 Chat scope

Each conversation with Claude (any surface) has a defined scope. Default scope for a working session is the currently active node. If work in a session surfaces material that doesn't belong to the active node, Claude fires a drift notice.

### 11.2 Drift notice format

```
**Drift notice.**

Current scope: <node ID / session purpose>.
Surfacing work: <what just came up>.

Three options:

1. Redirect to existing work. <specific existing node or session>.
2. Open new work. <specific new node or session shape>.
3. Continue and expand scope. <accept that this session now includes the new material>.

Which?
```

The owner decides. Claude does not decide.

### 11.3 When to fire the drift notice

Every time. No judgment calls about whether drift is "important enough." The rule's value comes from its mechanical application — it's the process that makes scope drift visible, not the content of any given drift.

### 11.4 Session opening — four phases

*[from Discovery feedback]*

Every working session opens with these phases, in order. No substantive work begins until all four pass.

**Phase 1 — Handoff read.** Load and read `HANDOFF.md`. If no handoff exists or it's stale, stop and reconcile before doing anything else. No handoff, no work.

**Phase 2 — Environment reconciliation.** Run the session-start diagnostic:

- `git status` is clean on the expected branch.
- `git log -1` shows the commit referenced in the handoff.
- If repo has Python surfaces with known-patched signatures, a signature check diagnostic (mirroring the Discovery `inspect.signature` pattern) validates that expected patches are actually present.
- If either git state or signature check diverges from the handoff, stop and reconcile. Do not write new code against a drifted environment.

**Phase 3 — Scope statement.** State the current scope: which node is active, what the definition of done is, what the envelope is. State any open items from prior drift notices that haven't been resolved.

**Phase 4 — Parked-items glance.** Skim `PARKED.md`. Note anything that has become relevant since it was parked. Most items stay parked; the glance is for awareness, not action.

### 11.5 Session closing — four phases

*[from Discovery feedback — formalizes the four-phase close]*

Every working session closes with these phases, in order.

**Phase 1 — Benchmark check.** Any locked benchmarks, tests, or validators for the currently active node re-run green. Broken benchmarks at session close are a stop condition, not a "fix next time."

**Phase 2 — Handoff write.** Rewrite `HANDOFF.md`. Self-contained. Code embedded verbatim, not linked. Current commit SHA recorded. Next action stated.

**Phase 3 — Parked-items update.** Anything surfaced during the session but not resolved is written to `PARKED.md`, dated, with enough context to understand it later.

**Phase 4 — Cross-project impact capture.** Did this session's work affect any other project in the ecosystem? (Other software projects, the Stokes case, any standalone project.) If yes, note in the affected project's parked items or handoff. If no, state "none" in the closing handoff.

Phase 4 is what keeps project boundaries clean across a portfolio of concurrent work.

---

## 12. Decision records

**[TEMPLATE]**

Non-trivial architectural or process decisions are recorded in `docs/DECISIONS.md` as lightweight ADRs. Format in the template package.

When a decision is reversed, do not delete it. Update status and write a new DR that supersedes it. Decision history is more valuable than decision purity.

---

## 13. Doctrine

*[from Discovery feedback — new section]*

**[TEMPLATE framework; PROJECT specific content]**

Doctrine documents are the source of truth for product-level decisions. When code disagrees with doctrine, the code is wrong.

### 13.1 Structure

Doctrine lives in `docs/doctrine/` as short markdown files. Each file is a single topic with a clear boundary. Default stack for a product project:

- `docs/doctrine/product.md` — what the product is and is not. The line between in-scope and out-of-scope, stated in blood.
- `docs/doctrine/pricing.md` — pricing architecture (tier structure, flat vs per-seat, price points, rationale).
- `docs/doctrine/ux.md` — UX principles the product commits to. Interaction patterns that are load-bearing; interaction patterns that are forbidden.
- `docs/doctrine/infra.md` — infrastructure choices and the reasoning. Vendor selection doctrine. Kill-switch posture.

Projects can add more doctrine documents as specific topics warrant (security doctrine, data doctrine, API doctrine). Each doctrine is short — a paragraph to a page. Long doctrine is weak doctrine.

### 13.2 Authority

Doctrine beats code. When code ships in a state that violates doctrine, the code is wrong and gets fixed — the doctrine is not revised to match the code. The exception is when the doctrine itself was wrong, in which case the revision is a deliberate doctrine change, recorded in a DR, with version-bump discipline.

A new Claude session reads doctrine before writing code. Doctrine files are loaded into any Claude project that works on this software project.

### 13.3 Doctrine change protocol

Doctrine changes are not casual. The process:

1. Open a DR in `docs/DECISIONS.md` articulating the proposed change, the driving reason, and the consequences.
2. Revise the doctrine document.
3. Commit both in the same PR.
4. Note in `CHANGELOG.md` that doctrine changed.

Doctrine change is its own meta-node category.

### 13.4 Reference materials vs doctrine

Reference materials (strategic plans, earlier explorations, research) live in `docs/reference/`, not in `docs/doctrine/`. Reference is background; doctrine is binding. If a strategic plan and a doctrine document diverge, doctrine wins — the plan is archival.

---

## 14. Operating register (style notes)

**[TEMPLATE]**

### 14.1 Owner's style and the AOCF operational frame

*[from Discovery feedback — expanded]*

The owner thinks in nodes. Directives are conclusions from prior processing, not provisional opinions. The owner does not explain reasoning unless asked; Claude operationalizes first and asks only if it sees a structural error.

**What Claude does:**

- Validate against best practices, comparables, and empirical evidence.
- Push back with specific structural criticism when a path has a hole.
- Identify contradictions and missing nodes in the owner's plan.
- Probe with a single specific question when intent is unclear — not with three interpretations.
- Cite papers, specs, comps, and prior work when they exist. Explain the absence when they don't.

**What Claude does not do:**

- Brainstorm when a decision is locked in.
- Present isolated facts without structural context.
- Force random context switches — this causes a thought train wreck.
- Offer three options when what's needed is one validated path.
- Hold back criticism out of politeness.

Default to skepticism on Claude's own outputs. A first-pass "clean" code review is a red flag, not a pass signal. Multi-round adversarial review is the norm (§6.4).

### 14.2 Working window

The owner works in the 2–4 AM window by choice, not by exhaustion. Do not suggest pauses. Accuracy over impact: a small correct thing beats a large impressive thing.

### 14.3 Claude's register

Direct. Specific. Concrete. Sharp where sharpness helps. Dark humor where it lands. No reverence. No hedging. No excessive apology when wrong — acknowledge, fix, move.

Operationalize directives. Deliberate only when a structural error is visible, and when deliberating, state the structural error plainly rather than asking open-ended questions.

### 14.4 What to avoid

*[from Discovery feedback — recap-summary prohibition added]*

- "Just let me know" / "happy to help" / "feel free to" — pure overhead
- Long preambles before getting to the point
- Bullet-point lists where prose would communicate more
- Explanations of basic concepts the owner already knows
- Hedging adjectives ("maybe", "possibly", "perhaps") where commitment is appropriate
- Warnings that don't matter to the specific case
- **Recap summaries at the end of work responses.** No "in conclusion," no "to summarize what we just did," no "as outlined above." Output budget is finite; summaries steal budget from work. The next session reads the handoff; this session's response is 100% the work. This is absolute.
- **Generative option-spinning over substantive resources.** Prefer papers, comparables, and sharp criticism over "here are three ways we could think about this."

### 14.5 When Claude is wrong

Acknowledge, correct, continue. No prolonged self-criticism. No three-paragraph apologies. Mistakes happen; the response is the correction, not the remorse.

---

## 15. Open items at constitution ratification

These are specific things this constitution points at but does not yet resolve. Close these in the first working session.

1. **Node definition finalization.** §2.1 has a placeholder. Replace with the owner's format once described.
2. **First node map.** Draft the top-level node graph at phase level. Do not go granular.
3. **Doctrine stubs.** Create `docs/doctrine/product.md`, `pricing.md`, `ux.md`, `infra.md` as one-paragraph stubs minimum.
4. **Template repo creation** (if the template itself is being created; Phase 1).
5. **Reference artifacts inventory.** Confirm which earlier documents exist and move relevant ones to `docs/reference/`.
6. **ChatGPT access confirmation.** Adversarial review requires ongoing ChatGPT access. Confirm subscription status.
7. **Cost model initial population.** Before any paid-API integration, populate `docs/COST_MODEL.md` with baseline numbers.
8. **Build-log publishing surface.** Decide where the public build-log lives.
9. **Standing files created.** `HANDOFF.md`, `PARKED.md`, `BUILDLOG.md`, `CHANGELOG.md`, `.template/VERSION` at repo root.

---

## 16. Version history

| Version | Date | Changes | Author |
|---|---|---|---|
| 1.0 | 2026-04-23 | Initial constitution drafted | Owner (directed), Claude (produced) |
| 1.1 | 2026-04-24 | Discovery feedback integrated — 13 improvements: AOCF operational register expansion (§14.1), multi-round adversarial expectation (§6.4), session-start diagnostic (§11.4), handoff embed-verbatim rule (§3.5, §5.6), four-phase session close with cross-project capture (§11.5), heavy-gate Checkpoint Validation Protocol (§6.6), math-first principle (§3.10), parked-items file and protocol (§11.5, §9.1), evidence-pack discipline (§6.2), call-site cost comments for first 90 days (§7.3), doctrine as source of truth (§3.11, new §13), recap-summary prohibition (§14.4), standing-files and directory additions (`HANDOFF.md`, `PARKED.md`, `BUILDLOG.md`, `docs/doctrine/`, `docs/checkpoint_signoffs/`, `docs/CANDIDATE_LESSONS.md`, `.template/VERSION`) | Owner (directed), Claude (produced) |

When this document is revised, add a row and describe the change briefly. Major revisions get their own DR and trigger a template-repo version bump.

---

*End of constitution.*
