---
name: Node
about: A discrete unit of project work. The primary organizing primitive of this project.
title: "[n-XXX] <short descriptive title>"
labels: node
assignees: ''
---

<!--
Node template v1.1 — integrated with Discovery feedback.

Read docs/CONSTITUTION.md §2 and §5 before opening a node if you haven't recently.

Rules:
- One active node at a time. Do not open a new node while another is ACTIVE.
- Node ID is sequential and immutable. Check the latest number in docs/NODE_MAP.md.
- Fill every section. Unfilled sections become invisible scope creep.
- If you can't fill Definition of Done precisely, the node isn't ready to open.
-->

**Node ID:** n-XXX
**Category:** <foundation | data-model | feature | integration | polish | infrastructure | marketing | meta>
**State:** PLANNED
**Is this a milestone node?** <yes | no> — if yes, heavy gate applies (§5.5, §6.6)

---

## Scope

<!-- What's in. If a reader can't tell from this section whether a given
piece of work belongs in this node, the scope is too vague. -->



## Out of scope

<!-- What's explicitly not in. Especially tempting-but-defer items. If you
don't list the temptation, it will find you. -->



## Input

<!-- What this node consumes. Upstream node IDs or external sources. -->



## Output

<!-- What this node produces. Be specific about deliverable format. -->



## Definition of done

<!-- Concrete, verifiable conditions. Avoid vague language. -->

- [ ] <criterion 1 — specific and verifiable>
- [ ] <criterion 2>
- [ ] <criterion 3>
- [ ] Self-review complete (see PR checklist)
- [ ] Adversarial review complete — evidence pack submitted, all rounds documented (§6.2–6.4)
- [ ] Handoff document written at `docs/handoffs/n-XXX-<short-name>.md` with code embedded verbatim
- [ ] Build-log post finalized and `BUILDLOG.md` appended
- [ ] CI green on merge to `main`
- [ ] `docs/NODE_MAP.md` updated (ACTIVE → CLOSED)
- [ ] Doctrine adherence verified — no undocumented divergence from `docs/doctrine/`

## Specific claims to verify (for evidence pack)

<!-- Explicit claims the adversarial reviewer should verify. These drive
Mode 2 (VALIDATE) in the review prompt. Examples:
  - "This function is idempotent."
  - "This cache invalidates on content change."
  - "This constraint enforces X."
  - "This API call is retried with exponential backoff on transient errors."

If the claim list is empty, the review will be less adversarial. -->

- 
- 
- 

## Dependencies

**Requires (upstream — must be CLOSED before this node starts):**

- <node IDs, or "none">

**Blocks (downstream — these nodes wait on this one):**

- <node IDs, or "none known yet">

**Parallel-safe with:**

- <node IDs that can run concurrently, or "none / not applicable">

## Envelopes

**Time envelope:** <hours — typical node 2–6h>
**Cost envelope:** $<estimate>

<!-- If no paid API integration, state "N/A". If there is, cost envelope
is mandatory — it triggers a retrospective if blown (§5.4). -->

## Architecture notes

<!-- Optional. Design decisions worth recording. Major decisions escalate
to an ADR in docs/DECISIONS.md. -->



## Test strategy

<!-- What tests will be written? Unit, integration, e2e? What's not being
tested and why? -->



## Cost model updates

<!-- If this node adds a new paid API integration, `docs/COST_MODEL.md`
must be updated BEFORE implementation code is written. List updates. -->

- [ ] <cost model entry to add / update>

## Doctrine references

<!-- Which doctrine documents does this node touch? Reviewers will verify
adherence. Pull excerpts into the evidence pack. -->

- <e.g., `docs/doctrine/product.md` §2 — in-scope boundary>
- <e.g., `docs/doctrine/infra.md` §1 — storage choice>

## Notes

<!-- Anything else. Open questions, references, links, context. -->



---

## Lifecycle checklist (update as the node progresses)

- [ ] Branch created: `node/n-XXX-<short-name>`
- [ ] `docs/NODE_MAP.md` updated (PLANNED → ACTIVE)
- [ ] Session-start diagnostic passed (§11.4)
- [ ] Work in progress
- [ ] Self-review pass complete
- [ ] Tests pass, lint green
- [ ] Cost model verified (if applicable)
- [ ] Paid API call sites carry unit-cost comments (§7.3)
- [ ] Evidence pack compiled
- [ ] Adversarial review complete — all rounds documented
- [ ] Handoff document written with code embedded verbatim
- [ ] Build-log post finalized; `BUILDLOG.md` appended
- [ ] PR opened with four-section template populated
- [ ] Merged to `main`
- [ ] Issue closed
- [ ] `docs/NODE_MAP.md` updated (ACTIVE → CLOSED)
- [ ] `CHANGELOG.md` updated
- [ ] Session-close four-phase run (§11.5)
