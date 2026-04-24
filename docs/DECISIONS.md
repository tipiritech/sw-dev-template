# Architecture Decision Records

**Project:** Narrate
**Last updated:** 2026-04-23

Lightweight ADRs per constitution §12. Non-trivial architectural or process decisions are recorded here. When a decision is reversed, the original is not deleted — a new ADR supersedes it.

---

## DR-001: Adopt node-based project architecture

**Date:** 2026-04-23
**Status:** accepted
**Related nodes:** all

### Context

The project needs an organizing primitive for work units. Standard options are tickets (Jira-style), user stories (agile-style), features, or tasks. Each has drawbacks: tickets proliferate without structural relationships; user stories force the project into a product-management framing that may not match a solo bootstrapper's mental model; features have no explicit lifecycle; tasks are too fine-grained to carry architecture.

David already thinks in nodes — discrete units with explicit scope, inputs, outputs, definitions of done, and dependency graph positions — from a different project (Stokes v. OHSU legal case). The same primitive carries over usefully to software development.

### Options considered

1. Tickets / user stories (standard agile)
2. Features (standard product development)
3. Nodes (David's existing mental model)
4. Hybrid — nodes at the architectural level, tickets inside nodes for sub-tasks

### Decision

Adopt nodes as the primary organizing primitive. Sub-tasks inside a node can use whatever lightweight tracking fits the work; no formal structure required below the node level.

### Rationale

Matches David's existing thinking. Explicit dependency graph prevents work from being done out of order. Explicit handoff documents prevent context loss between sessions. Explicit cost/time envelopes prevent unbounded scope creep. One active node at a time prevents context-switching tax.

### Consequences

- Node definition is foundational and must be finalized at kickoff (n-001)
- GitHub issues become the canonical node record
- Branch names follow node-based convention (`node/<id>-<short-name>`)
- Handoff documents become mandatory artifacts
- The project's `NODE_MAP.md` becomes a live document requiring maintenance discipline

---

## DR-002: Trunk-based branching with node branches

**Date:** 2026-04-23
**Status:** accepted
**Related nodes:** n-003

### Context

Solo project, one active node at a time. The branching model needs to support clean node boundaries (one node = one branch = one merge commit on main) while staying lightweight (no long-lived develop branches, no release branches, no GitFlow overhead).

### Options considered

1. Commit directly to main (fastest, no branch overhead)
2. GitFlow (develop + feature + release + hotfix)
3. Trunk-based with short-lived branches per node

### Decision

Trunk-based with node branches. `main` is always deployable. One branch per active node: `node/<id>-<short-name>`. Squash-merge to main on node close.

### Rationale

Direct-to-main commits make node boundaries invisible in history and defeat the node architecture's goal of making work traceable. GitFlow is team-coordination overhead that has no value in a solo project. Trunk-based with node branches keeps overhead low while preserving node traceability — each squash-merge commit on main is one node.

### Consequences

- `main` must be deployable at all times; CI runs on every push
- Node branches are short-lived (2–6 hours typical; days maximum)
- No formal PR review (solo project), but self-PRs are used for discipline (§9.5)
- Squash-merge is the default merge strategy
- History on `main` is clean: one commit per closed node

---

## DR-003: ChatGPT as adversarial reviewer at node boundaries

**Date:** 2026-04-23
**Status:** accepted
**Related nodes:** all

### Context

Solo projects lack the built-in quality gate that team review provides. Claude builds the code; Claude reviewing its own code produces the same blind spots twice. An independent reviewer with a different model family catches things Claude misses.

### Options considered

1. Skip structured review — rely on self-review only
2. Use another Claude session as reviewer
3. Use ChatGPT (or equivalent non-Claude model) as adversarial reviewer
4. Formal external code review (paid or community)

### Decision

ChatGPT (or equivalent non-Claude model) runs a three-mode review (attack / validate / QC) at every node close. Standard prompt codified in constitution §6.3.

### Rationale

Option 1 produces unacceptable quality risk on a solo project. Option 2 is the same brain reviewing itself — the value of independent review comes from model-family independence. Option 4 is too heavyweight and expensive for node-level review on a bootstrap project. Option 3 is cheap, fast, and produces genuinely independent signal.

### Consequences

- Ongoing ChatGPT subscription required (see n-001 open items)
- Every node close takes additional ~15–30 minutes for review cycle
- Some findings will need override discipline (§6.4); overrides documented
- Review workflow becomes load-bearing — if ChatGPT access is lost, fallback needed (Gemini or another non-Claude model)

---

## DR-004: Build-log interleaved with engineering, not retrospective

**Date:** 2026-04-23
**Status:** accepted
**Related nodes:** all feature / integration / infrastructure nodes

### Context

Bootstrap projects need marketing visibility before there is anything to sell. Writing about what was built only after launch produces stale, generic content. Writing during the build produces specific, authentic content that compounds into distribution.

### Options considered

1. Full build-in-public from day zero
2. Silent build, full marketing push at launch
3. Selective build-log — post about notable nodes only, not all
4. Ghost-written or AI-generated content based on commit history

### Decision

Option 1 with structure. Every closed node produces a build-log post, drafted during the node and finalized at close. Posts are short (200–600 words), specific, and shareable.

### Rationale

Option 2 wastes the pre-launch window when most bootstrap momentum is built. Option 3 creates optionality that in practice becomes "didn't feel like writing one this time" and the build-log dies. Option 4 produces generic content that doesn't differentiate. Option 1 with structure forces the discipline without making it a separate process.

### Consequences

- Build-log drafts live in the repo (`build-log/drafts/`)
- Node close includes build-log finalization as a gating checklist item
- Build-log publishing surface (blog subpath on landing site) must exist before first node closes
- Some nodes may have thin posts — that's acceptable; the discipline matters more than every post being a banger

---

## DR-005: Flat-tier pricing, solo-bootstrapper market

**Date:** 2026-04-23
**Status:** accepted (inherited from strategic plan)
**Related nodes:** n-023 (billing)

### Context

The SaaS default pricing pattern is per-seat, tiered by company size, with compliance/enterprise tiers at the top. Narrate's target market is small businesses (restaurants, trades, agents, coaches, solo professionals) that do not buy this way. Per-seat pricing creates friction for businesses with variable headcount. Compliance tiering fragments a product that benefits from being simple.

### Options considered

1. Standard per-seat SaaS pricing
2. Flat tier for solo, per-seat or flat for team, enterprise on request
3. Flat solo tier, flat team tier, no enterprise offering
4. Usage-based pricing (per upload, per chat query)

### Decision

Option 3. $15–25/mo flat for solo, ~$49/mo flat for teams with voice cloning. No enterprise tier. No per-seat. No compliance tier.

### Rationale

Target market does not buy per-seat. Flat pricing reduces sales friction and matches how small businesses buy (monthly subscription, predictable cost). Compliance tiering pulls the product toward enterprise, away from the bootstrap market — validated as the wrong direction during earlier exploration. Usage-based pricing creates anxiety at the small-business scale and deters usage of the thing the customer is paying for.

### Consequences

- Variable cost discipline is non-negotiable — flat pricing means cost overruns are absorbed, not passed on
- Cost caps must be enforced in the product (usage quotas, fair-use limits) without making the experience feel limited
- Expansion into HR compliance vertical, if pursued later, will likely require a separate product or tier — not added to the core pricing
- Billing implementation at n-023 can be simpler than typical SaaS (no seat counting, no per-seat proration)

---

## DR-006: Claude via Anthropic API for product; Claude primary for development

**Date:** 2026-04-23
**Status:** accepted
**Related nodes:** n-015, n-019

### Context

The product integrates an LLM for narration drafting and grounded chat. Multiple providers are available (Anthropic, OpenAI, Google, Cohere, Mistral, open-source via self-hosting or Together/Fireworks/Replicate). The development process also relies heavily on LLM collaboration. These are two separate decisions.

### Options considered for product LLM

1. Anthropic (Claude)
2. OpenAI (GPT-4 / GPT-4o family)
3. Multi-provider abstraction layer from day one
4. Open-source self-hosted

### Decision

Anthropic Claude as the primary product LLM. Multi-provider abstraction deferred — the abstraction has real cost (complexity, latency, lowest-common-denominator features) and solving it before needing it is premature.

For development, Claude remains primary across surfaces (Claude.ai for strategy, Claude Code for code generation, Cursor with Claude for inline work). ChatGPT serves adversarial review only (DR-003).

### Rationale

Claude's quality for grounded-retrieval chat and nuanced narration drafting matches the product's needs. Anthropic's pricing is competitive, with prompt caching helping hold costs down for deck-grounded chat. Multi-provider abstraction is a real but deferred concern: build it when a second provider is actually needed, not preemptively.

Development tooling decision is operational, not architectural, but recorded here because it materially shapes how the project gets built.

### Consequences

- All product LLM integration code targets Anthropic's API directly without an abstraction layer initially
- If provider fallback becomes necessary (rate limits, outage, pricing change), this decision will be reversed via a new DR
- Development velocity assumes Claude availability across surfaces; if Anthropic service degrades, work slows

---

## DR-007: Defer HR compliance vertical as expansion, not V1

**Date:** 2026-04-23
**Status:** accepted (inherited from strategic exploration)
**Related nodes:** deferred — no V1 nodes

### Context

Earlier exploration produced a strong case for an HR compliance training vertical (harassment prevention with e-signature, state-aware content, audit trails). California, New York, and Illinois legally require interactive training, and Narrate's chat architecture satisfies that requirement better than incumbent tools. The opportunity is real.

However, building compliance-grade features for V1 pulls the product into enterprise SaaS territory (SSO, RBAC, audit logs, signature ceremonies, per-employee pricing, state content libraries), losing the small-business simplicity that defines the target market.

### Options considered

1. Build HR compliance as V1 — biggest-opportunity framing
2. Build core product for small businesses as V1; add HR compliance as expansion once core shows retention
3. Build both in parallel with shared core
4. Build HR compliance as a separate product with shared technology

### Decision

Option 2. Core product ships first. HR compliance vertical is expansion play, revisited post-launch after the core product demonstrates retention.

### Rationale

Option 1 loses the distinctive small-business positioning and the bootstrap-compatible simplicity. Option 3 doubles build scope with one builder. Option 4 is an acceptable future structure but premature — build the core, learn, then decide if HR becomes a second product or a vertical inside the core.

### Consequences

- HR-specific features (e-signature, state-aware content, audit trails, admin dashboards, SCORM export) stay off the V1 roadmap
- Drift-notice protocol fires if these surface in sessions (constitution §11)
- Earlier HR research artifacts (`Narrate_Harassment_Module_Deep_Dive.docx`) are kept as reference but not treated as current spec
- Post-launch, this decision is revisited with actual customer data; may be superseded

---

---

## DR-008: Adopt multi-round adversarial review as the norm

**Date:** 2026-04-24
**Status:** accepted
**Related nodes:** all nodes with adversarial review

### Context

v1.0 of the constitution treated adversarial review as a single-pass gate at node close. Discovery project experience (from which this feedback is imported) demonstrated that non-trivial nodes regularly require 3–5 rounds of adversarial review before clean pass, and that first-pass clean reviews are a signal the review wasn't sufficiently adversarial rather than a signal of clean code.

### Options considered

1. Single-pass review (v1.0 default) — fast, low friction, but catches too little
2. Mandatory minimum round count — adds friction without signal
3. Multi-round as norm, round count recorded in handoff, first-pass clean is a red flag

### Decision

Option 3. Multi-round adversarial review is the expected pattern. Handoff documents record round count. A one-round clean review on a substantial node requires justification.

### Rationale

The Discovery experience (FAIL → FAIL → CONDITIONAL → CONDITIONAL → PASS as a normal sequence) is the most structurally informative lesson in the feedback. It reframes the review as a process rather than an event, which is the correct frame for catching the compounding errors that emerge from complex builds.

### Consequences

- Expect 15–60 additional minutes per node close for multi-round review cycles
- Evidence pack discipline (DR-009) becomes necessary because rounds need a common interface
- The heavy gate (DR-010) adds formalization for milestone nodes where multi-round alone is insufficient

---

## DR-009: Evidence pack as the unit of adversarial review submission

**Date:** 2026-04-24
**Status:** accepted
**Related nodes:** all nodes with adversarial review

### Context

v1.0 described the review input as "the diff plus notes." Discovery's experience showed that reviewers perform qualitatively better when given a single compiled artifact containing issue text, full diff, architecture notes, relevant doctrine excerpts, and explicit claims to verify. Loose collections of inputs produce shallow reviews; evidence packs produce structured attacks.

### Options considered

1. Loose PR link plus notes (v1.0)
2. Formal evidence pack with required sections
3. Evidence pack plus interactive Q&A with the reviewer

### Decision

Option 2. Evidence pack is a single compiled text artifact with: (a) GitHub issue, (b) full diff, (c) architecture notes, (d) relevant doctrine excerpts, (e) explicit claims to verify. Regenerated per round with the files that changed.

### Rationale

Explicit claims to verify drive Mode 2 (VALIDATE) of the standard review. Doctrine excerpts ensure doctrine adherence is in-scope. Single compiled artifact means round-over-round consistency, which supports the multi-round pattern (DR-008).

### Consequences

- Node issue template (`.github/ISSUE_TEMPLATE/node.md`) adds "specific claims to verify" and "doctrine references" sections
- ~10 minutes per round for pack compilation
- Pack can be compiled automatically in a future tooling node if volume grows

---

## DR-010: Heavy gate (Checkpoint Validation Protocol) for milestone nodes

**Date:** 2026-04-24
**Status:** accepted
**Related nodes:** nodes marked milestone in NODE_MAP (currently n-009, n-015, n-019, n-020, n-023, n-026, n-027)

### Context

Node-level adversarial review is sufficient for ordinary nodes. For nodes where discovering a problem after merge would be expensive (first working end-to-end pipeline, first external integration live, first paying customer, billing cutover), a heavier review protocol is warranted.

### Options considered

1. Same gate for all nodes (v1.0 default)
2. Extra review round for milestones
3. Three-phase protocol: clean-room rebuild + full-surface adversarial + sign-off checklist

### Decision

Option 3. Milestone nodes trigger the three-phase Checkpoint Validation Protocol per §6.6. Sign-off checklist committed to `docs/checkpoint_signoffs/YYYY-MM-DD-<milestone>.md`.

### Rationale

Clean-room rebuild specifically catches handoff-quality problems that standard review cannot — a fresh Claude session with no prior context exposes every implicit assumption. Full-surface adversarial (rather than node-diff adversarial) catches integration-level issues. Sign-off checklist forces explicit named verification rather than implicit merge confidence.

### Consequences

- 2–4 hours additional review time per milestone node
- Milestone designation must be done at node-open time (visible in NODE_MAP), not retroactively
- Checkpoint sign-off files accumulate as an audit trail

---

## DR-011: Doctrine documents as source of truth

**Date:** 2026-04-24
**Status:** accepted
**Related nodes:** all product-shaping nodes

### Context

v1.0 treated doctrine loosely — product rules were embedded in the constitution itself (§13 "Reference materials") and in the strategic plan. This blurred the line between reference material (background, not binding) and doctrine (binding, code conforms to it). The Discovery experience showed that separating these two categories and making doctrine explicit source-of-truth produced cleaner outcomes.

### Options considered

1. Keep everything in constitution (v1.0)
2. Move product rules into dedicated doctrine documents in `docs/doctrine/` with explicit authority
3. Same as option 2 plus formal doctrine-change protocol

### Decision

Option 3. Doctrine lives in `docs/doctrine/` (product, pricing, UX, infra as defaults). Doctrine beats code. Doctrine changes require a DR and CHANGELOG entry per §13.3.

### Rationale

When code disagrees with doctrine, the code is wrong. This only works if doctrine is explicit, separately versioned, and protected by change protocol. Embedded-in-constitution doctrine tends to drift because constitution changes are themselves friction-rich.

### Consequences

- New `docs/doctrine/` directory with four initial stubs
- Doctrine change is its own meta-node category (§2.3)
- Every Claude session loads doctrine before writing code (via project instructions)

---

## DR-012: Math-first defaults for ranking and scoring

**Date:** 2026-04-24
**Status:** accepted
**Related nodes:** any node with ranking, scoring, or ordering logic (anticipated: n-015 Q&A ranking, n-016 TTS voice matching, any future recommendation surface)

### Context

Product logic that ranks or scores things has two failure modes: (a) implicit weights in sort keys that nobody can explain, (b) threshold-tuning based on small sample sizes that produce silent early termination in optimization loops.

### Options considered

1. Ad-hoc scoring (v1.0 default — no guidance)
2. Require documentation of scoring logic
3. Explicit objective, explicit constraints, no undefended fudge factors; sample-size-aware thresholds where relevant

### Decision

Option 3. Before writing any ranking/scoring function, state in one sentence: what are we optimizing, under what constraints, and what is the tie-breaking rule. Thresholds that are functions of noise (statistics, sampling) need sample-size-aware scaling or explicit minimum-sample guards.

### Rationale

Explicit objectives are easier to attack in adversarial review than implicit ones. Undefended fudge factors accumulate into product logic nobody can explain. Sample-size-aware thresholds prevent the specific failure mode where a threshold that works at n=10,000 silently halts an optimization at n=100.

### Consequences

- Ranking/scoring nodes require an "objective, constraints, tie-breaker" statement in their architecture notes
- Adversarial review has explicit targets for Mode 2 (VALIDATE) on scoring logic
- Applies to any future machine-learning-adjacent logic the product adds


---

## DR-013: Marketing as optional per-project doctrine with full scaffold when enabled

**Date:** 2026-04-24
**Status:** accepted
**Related nodes:** all projects using template v1.2+

### Context

Not all projects in this ecosystem have a marketing function. Narrate and (per stated scope) another project need marketing. A third does not. A template that forces marketing scaffolding onto projects that do not need it produces noise and drift; a template that omits marketing scaffolding entirely forces projects that need it to reinvent the wheel.

### Options considered

1. No marketing scaffold — each project builds from scratch
2. Mandatory marketing scaffold for all projects
3. Optional marketing scaffold controlled by a per-project doctrine flag, with full scaffolding when enabled

### Decision

Option 3. `docs/doctrine/marketing.md` carries an `Active?` flag (yes/no) set per project. When `yes`: marketing doctrine is binding, UTM tracking is enforced, channel variants are drafted with each build-log post, weekly review cadence applies. When `no`: marketing directory remains as dormant scaffold, publishing tooling does not run, node close does not require marketing deliverables.

### Rationale

Best-practice marketing discipline (UTM tagging, SEO frontmatter, cross-posting) is too valuable to reinvent per project and too intrusive to force on projects that do not need it. A single opt-in flag at doctrine level is the minimum-overhead way to support both modes. The scaffold is present but dormant when off, which means activating it later is a one-line doctrine change plus a meta-node rather than a retrofit.

### Consequences

- Projects that need marketing: full SEO / conversion-tracking / cross-posting machinery available from day one
- Projects that don't: one file (`docs/doctrine/marketing.md`) with Active? = no and a dormant `marketing/` directory; zero process overhead
- Activation is reversible: a project that decides later it needs marketing can flip the flag without starting over
- The bootstrap script (`new-project.sh`) accepts `--no-marketing` to set the flag at project creation time


## Template for future ADRs

```markdown
## DR-<nnn>: <decision title>

**Date:** <yyyy-mm-dd>
**Status:** accepted | superseded-by-DR-<nnn> | reversed
**Related nodes:** <node IDs if relevant>

### Context
<what question is being decided and why it matters>

### Options considered
1. <option>
2. <option>

### Decision
<what was chosen>

### Rationale
<why>

### Consequences
<what this means downstream, what it forecloses, what it opens>
```

---

## Change log

| Date | Change |
|---|---|
| 2026-04-23 | DR-001 through DR-007 recorded from constitution v1.0 and strategic exploration |
| 2026-04-24 | DR-008 through DR-012 added from v1.1 Discovery feedback integration |
| 2026-04-24 | DR-013 added for v1.2 marketing optionality |
