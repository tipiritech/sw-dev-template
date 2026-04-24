# Changelog

All notable changes to the template (and to this project cloned from it) are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- <future items here>

---

## [1.2.0] — 2026-04-24

Minor-version bump. Optional marketing scaffold added as opt-in per project. Mac bootstrap script delivered alongside (not part of template; standalone tool).

### Added
- `docs/doctrine/marketing.md` — optional marketing doctrine with Active? flag (yes/no per project). When active: channel roster, UTM conversion tracking, SEO discipline, post lifecycle, anti-patterns, kill-switch conditions.
- `marketing/` directory scaffold — README, CHANNELS.md, assets/, posts/, analytics layout. Dormant when marketing doctrine is inactive.
- `scripts/utm.ts` — UTM link generator enforcing the standard schema. Manual UTM construction is forbidden per marketing doctrine.
- `build-log/posts/_TEMPLATE.md` — long-form build-log post template with frontmatter (including JSON-LD schema inputs) and channel-variants section.
- BUILDLOG.md extended — Cross-posting notes table with per-post channel tracking and 30-day conversion attribution; weekly digest index.

### Changed
- `BUILDLOG.md` format — now includes Cross-posting notes and Weekly digest index sections, populated by weekly review cadence when marketing doctrine is active.

### Lessons promoted
- LL-014: Marketing optionality via doctrine flag prevents scaffold sprawl in projects that don't need it
- LL-015: UTM tooling must be automated — manual construction produces typo-attribution loss
- LL-016: SEO discipline is a side effect of structured writing; frontmatter enforcement beats post-hoc optimization

### Retrofit guidance

**Mandatory** (only for projects that want marketing tracking):
- Add `docs/doctrine/marketing.md` with Active? set appropriately
- Add `marketing/` directory with README and CHANNELS.md
- Add `scripts/utm.ts` and wire up as `pnpm utm` command
- Replace `BUILDLOG.md` with v1.2 format (preserving existing entries)
- Add `build-log/posts/_TEMPLATE.md`

**Recommended** for marketing-active projects:
- Review the channel roster and customize per project
- Set up analytics dashboard with UTM ingestion
- Establish weekly review cadence

**Optional** for marketing-inactive projects:
- Can still adopt BUILDLOG v1.2 format for future activation
- Marketing scaffold can be added later when the project starts needing distribution

### Accompanying tool (not part of template)
- Mac bootstrap script `new-project.sh` — single-command project initialization from template. Handles template copy, project-name customization, marketing flag, git init, GitHub repo creation via `gh`, direnv setup, editor opening. Installed separately at `~/bin/new-project`.

---

## [1.1.0] — 2026-04-24

Minor-version bump. Non-breaking additions and refinements integrated from the Discovery project's methodology feedback. Downstream projects should retrofit — see Retrofit guidance below.

### Added
- §3.10 Math-first principle — explicit objectives, no heuristic fudge factors that can't be defended in one sentence
- §3.11 Doctrine as source of truth
- §6.2 Evidence pack discipline — structured compilation of issue, diff, architecture notes, doctrine excerpts, and explicit claims to verify
- §6.4 Multi-round adversarial review as the norm — FAIL → FAIL → CONDITIONAL → PASS expected sequence; round count recorded in handoff
- §6.6 Heavy gate Checkpoint Validation Protocol for milestone nodes — three-phase (clean-room rebuild / adversarial / sign-off checklist)
- §7.3 Call-site cost comments for first 90 days
- §11.4 Session-start four-phase opening (handoff read, environment reconciliation with diagnostics, scope statement, parked-items glance)
- §11.5 Session-close four-phase closing (benchmark check, handoff write, parked-items update, cross-project impact capture)
- §13 Doctrine section — `docs/doctrine/` with product, pricing, UX, infra sub-documents
- Standing files at repo root: `HANDOFF.md`, `PARKED.md`, `BUILDLOG.md`
- New directories: `docs/doctrine/`, `docs/checkpoint_signoffs/`, `docs/CANDIDATE_LESSONS.md`, `.template/VERSION`
- AOCF operational register expansion in §14.1 — explicit Do/Don't list for Claude

### Changed
- §3.5 Handoff hygiene now explicitly forbids ephemeral file-path references; requires code embedded verbatim
- §5.6 Handoff document template now includes commit SHA at close, verbatim code artifacts section, cross-project impact section, round-count documentation
- §14.4 now explicitly prohibits recap summaries ("in conclusion," "to summarize") — output budget is finite, summaries steal budget from work
- `.github/pull_request_template.md` restructured around the four-section format: what this node does, inputs/outputs, manual test cases, adversarial review (full transcript)
- `.github/ISSUE_TEMPLATE/node.md` now includes "specific claims to verify" section feeding the evidence pack, and "doctrine references" section

### Lessons promoted from Discovery
- LL-001: Multi-round adversarial review is the norm, not the exception
- LL-002: Ephemeral file paths in handoffs are worthless; embed verbatim
- LL-003: Session-start environment diagnostic prevents compounding drift
- LL-004: Call-site cost comments during first 90 days force internalization of API economics
- LL-005: Evidence packs scale adversarial review across rounds
- LL-006: Cross-project impact capture at session close keeps portfolio boundaries clean
- LL-007: Math-first defaults prevent fudge-factor accumulation in scoring logic
- LL-008: Doctrine documents as source of truth — code conforms to doctrine, not vice versa
- LL-009: Reactive-framework state is a function of inputs per render, not persistent
- LL-010: Navigation-UI experiments need proven value-in-use before becoming permanent
- LL-011: Sample-size-aware thresholds prevent silent early termination
- LL-012: Recap summaries at response end steal output budget from work
- LL-013: Parked items as append-only standing file enables subconscious processing

### Retrofit guidance

**Mandatory for all downstream projects:**
- Add `HANDOFF.md`, `PARKED.md`, `BUILDLOG.md` at repo root
- Add `.template/VERSION` file containing `1.1.0`
- Update PR template to the new four-section format
- Update node issue template with claims-to-verify and doctrine-references sections
- Run retrofit as a meta-node (`n-xxx-retrofit-template-v1.1`)

**Recommended:**
- Add `docs/doctrine/` with the four doctrine stubs
- Add `docs/CANDIDATE_LESSONS.md`
- Add `docs/checkpoint_signoffs/` directory

**Optional:**
- Adopt call-site cost comments for existing integrations (vs. new-integration only)
- Reorganize existing ADRs to reference doctrine where applicable

---

## [1.0.0] — 2026-04-23

Initial template release. See constitution §16 for drafted content overview.

### Added
- Project constitution v1.0
- Node architecture and lifecycle
- Adversarial review protocol
- Cost awareness framework
- Build-in-public workflow
- GitHub workflow (trunk-based with node branches, squash-merge, self-PRs for solo-dev discipline)
- Chat governance with strict-mode drift detection
- Decision records framework
- Initial node map, cost model, decisions scaffolding
- Node issue template and pull request template
