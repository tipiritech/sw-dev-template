<!--
Pull request template. Solo project — the PR exists for self-review discipline,
not for someone else's approval. Every checkbox is a gate.

Do not merge with unchecked boxes. If a box doesn't apply, write "N/A" with reason.

Squash-merge is the default so each node produces one commit on main.

This template is v1.1 — integrated with Discovery feedback.
Key upgrade from v1.0: the four-section format from Discovery's lightweight
PR gate is the structural spine. Sections 1–4 must be populated before merge.
-->

## 1. What this node does

<!-- One paragraph. Focus on what, not how — the diff shows how. -->



## 2. Inputs and outputs

**Inputs accepted:**

<!-- What this node consumes. Be explicit about types, shapes, contracts. -->

- 

**Outputs produced:**

<!-- What this node produces for downstream. -->

- 

## 3. Manual test cases

<!-- What you ran manually. Be specific. "I tested it" is not a test case.
Each test case: what input, what was expected, what was observed. -->

| # | Case | Expected | Observed |
|---|---|---|---|
| 1 |   |   |   |
| 2 |   |   |   |

## 4. Adversarial review

<!-- Paste the ChatGPT review output here. Full text, verbatim, all rounds.
Multi-round is the norm — expect FAIL sequences. A single clean round is
suspicious.

Prompt:
"You are an adversarial code reviewer. Your job is to break things. You are
not trying to be helpful. Assume nothing works until proven otherwise.
What breaks? What edge cases are unhandled? What assumptions are unstated?"

Constitution §6.3 has the full three-mode prompt; §6.4 has the multi-round
expectation; §6.5 has the disposition rules (FIX / DEFER / OVERRIDE). -->

**Reviewer:** <ChatGPT / Gemini / other non-Claude model>
**Rounds:** <e.g., 3 — FAIL, CONDITIONAL, PASS>
**Final verdict:** <MERGE | MERGE WITH FIXES (applied) | overrides documented>

**Findings classified:**

- CRITICAL (blocks merge): <count, resolution>
- MAJOR (must fix before next checkpoint): <count, resolution>
- MINOR (tracked): <count, resolution>

<!-- Full review transcript — paste below. -->

<details>
<summary>Review transcript (all rounds)</summary>

```
<paste full review output here, all rounds>
```

</details>

---

## Node issue

Closes #<issue-number>

## Self-review checklist

<!-- The discipline is the entire point. -->

- [ ] I read every diff in this PR, not just skimmed
- [ ] No `TODO`, `FIXME`, `XXX`, `HACK` comments in merged code (or deferred to a tracked issue)
- [ ] No `console.log`, `print`, `pdb`, `debugger`, `dump`, or equivalent debugging statements
- [ ] No hardcoded secrets, API keys, access tokens, webhook URLs, production URLs
- [ ] No commented-out code (if not needed, delete; git preserves history)
- [ ] Tests added or updated where warranted
- [ ] All tests pass locally
- [ ] Lint green locally
- [ ] CI passing on this branch
- [ ] New dependencies recorded in `docs/DECISIONS.md` with rationale
- [ ] Cost model updated in `docs/COST_MODEL.md` if a paid API integration is added
- [ ] Paid API call sites carry unit-cost comments (first 90 days discipline, §7.3)
- [ ] No ephemeral file-path references in handoff — code embedded verbatim (§3.5)
- [ ] Handoff document written at `docs/handoffs/n-XXX-<short-name>.md`
- [ ] Build-log long-form post finalized in `build-log/posts/`
- [ ] `BUILDLOG.md` at repo root appended with one-line entry
- [ ] `docs/NODE_MAP.md` updated to reflect state change
- [ ] `CHANGELOG.md` updated
- [ ] Doctrine adherence verified — no undocumented divergence from `docs/doctrine/`

## Database / migration changes

<!-- If this PR touches the schema, describe the migration plan.
If not, write "N/A". -->

- [ ] Migration is reversible, or reversal plan is documented
- [ ] Migration tested against production-like data
- [ ] Rollout plan: <inline with deploy | zero-downtime stepwise | maintenance window>

## Deployment notes

<!-- Environment variables to add, secrets to rotate, manual steps,
dependencies on external service config. -->



## Breaking changes

- [ ] No breaking changes
- [ ] Breaking changes documented below

<!-- Details if breaking -->

## Screenshots / demos

<!-- For UI nodes. For non-UI, remove or write "N/A". -->



## Follow-up items

<!-- DEFER findings from adversarial review, technical debt knowingly
incurred, small cleanups spotted that didn't block merge. Each gets its
own GitHub issue — link them here. -->

- <item 1 — issue #>

## Cross-project impact (§11.5 Phase 4)

<!-- Did this session's work affect any other project in the ecosystem?
If yes, what was noted where. If no, state "none". -->



## Milestone gate (only for milestone nodes)

<!-- If this is a milestone node per §5.5, the heavy gate applies.
Otherwise remove this section. -->

- [ ] Phase 1 — Clean-room Claude rebuild passed
- [ ] Phase 2 — Adversarial review on full milestone surface (not just final node diff)
- [ ] Phase 3 — Sign-off checklist committed to `docs/checkpoint_signoffs/`

---

## Final gate

- [ ] All sections 1–4 populated
- [ ] All boxes above checked or explicitly N/A
- [ ] I am the author and the reviewer; I have read the diff as both
- [ ] No open CRITICAL or MAJOR adversarial findings

<!-- Merge only after this is true. -->
