# Template Package v1.2

**Version:** 1.2.0
**Date:** 2026-04-24
**Changes from v1.1:** Optional marketing scaffold added (opt-in per project via doctrine flag). See `CHANGELOG.md` for the full change list and retrofit guidance.
**Accompanying tool:** Mac bootstrap script `new-project.sh` (separate archive — not part of the template itself).

## What's in this package

```
template_package_v1.2/
├── README.md                          <- this file
├── CHANGELOG.md                       <- version history
├── HANDOFF.md                         <- standing file: current session handoff
├── PARKED.md                          <- standing file: parked items, append-only
├── BUILDLOG.md                        <- standing file: public build log + cross-posting tracker
├── docs/
│   ├── CONSTITUTION.md                <- constitution (v1.1 unchanged in v1.2)
│   ├── CANDIDATE_LESSONS.md           <- lessons pending promotion to template
│   ├── doctrine/
│   │   ├── README.md                  <- how doctrine works
│   │   ├── product.md                 <- what the product is and is not
│   │   ├── pricing.md                 <- pricing architecture
│   │   ├── ux.md                      <- UX principles
│   │   ├── infra.md                   <- infrastructure choices
│   │   └── marketing.md               <- NEW in v1.2: opt-in marketing doctrine (Active? flag)
│   ├── handoffs/                      <- one file per closed node
│   ├── retros/                        <- triggered retrospectives
│   ├── checkpoint_signoffs/           <- heavy-gate milestone records
│   └── reference/                     <- background material
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── node.md                    <- node issue template
│   └── pull_request_template.md       <- four-section self-review PR template
├── .template/
│   └── VERSION                        <- 1.2.0
├── build-log/
│   ├── drafts/
│   └── posts/
│       └── _TEMPLATE.md               <- NEW in v1.2: long-form post template with frontmatter
├── marketing/                         <- NEW in v1.2: marketing scaffold (dormant when doctrine inactive)
│   ├── README.md
│   ├── CHANNELS.md                    <- active channel roster per project
│   ├── assets/                        <- screenshots, diagrams, clips per node
│   └── posts/                         <- launch artifacts
└── scripts/
    └── utm.ts                         <- NEW in v1.2: UTM link generator
```

## What's different from v1.0

v1.1 integrates 13 improvements from the Discovery project feedback. See `CHANGELOG.md` for the full list. The major structural changes:

1. **Three new standing files at repo root.** `HANDOFF.md` (overwritten each session), `PARKED.md` (append-only observations), `BUILDLOG.md` (public append-only build log).
2. **Four-phase session open and close.** Explicit diagnostics at session start; benchmark check and cross-project impact capture at session close.
3. **Evidence pack discipline for adversarial review.** Structured compilation submitted per round, not loose PR links.
4. **Heavy gate for milestone nodes.** Three-phase Checkpoint Validation Protocol (clean-room rebuild, adversarial, sign-off checklist).
5. **Doctrine as source of truth.** `docs/doctrine/` directory with product, pricing, UX, infra stubs.
6. **Four-section PR format.** What this node does / inputs & outputs / manual test cases / adversarial review transcript.
7. **Call-site cost comments.** For the first 90 days, every paid-API call site carries a unit-cost comment.

## What's new in v1.2

v1.2 adds optional marketing scaffolding and one accompanying tool. Marketing is off-by-default-per-project-but-on-by-default-at-bootstrap — when you create a project with the `new-project` script, marketing is on unless you pass `--no-marketing`.

1. **Optional marketing doctrine.** `docs/doctrine/marketing.md` with an `Active?` flag. When `yes`, the doctrine is binding and its scaffolding is live. When `no`, scaffolding is present but dormant. Activation is reversible.

2. **Marketing directory.** `marketing/` with channel roster, asset library, launch-post templates. Dormant-friendly — preserved even when the doctrine is inactive, ready to activate later.

3. **UTM helper.** `scripts/utm.ts` generates compliant UTM-tagged URLs from a whitelist of channels. Prevents typo-attribution loss.

4. **Long-form post template.** `build-log/posts/_TEMPLATE.md` with frontmatter (including JSON-LD schema inputs for SEO), structured body, and channel-variants section drafted alongside the long-form post.

5. **Build-log cross-posting tracker.** `BUILDLOG.md` extended with per-post channel tracking, 30-day conversion attribution, and weekly digest index.

6. **Mac bootstrap script.** `new-project.sh` — ships as a separate archive. One command to spin up a new project: copies template, customizes, sets marketing flag, initializes git, creates private GitHub repo, bootstraps direnv, opens editor. ~15 seconds vs. 10-minute manual workflow.

## How to drop it in

### New repo

```bash
cd /path/to/new/empty/repo
cp -r /path/to/template_package_v1.1/* .
cp -r /path/to/template_package_v1.1/.github .
cp -r /path/to/template_package_v1.1/.template .
git add .
git commit -m "chore: initialize from template v1.1.0

Template version recorded in .template/VERSION.
Node: n-000 (pre-node — constitution ratification)"
```

### Existing project retrofitting from v1.0 to v1.1

Run the retrofit as a meta-node:

```bash
git checkout -b node/n-xxx-retrofit-template-v1.1
```

Work through `CHANGELOG.md`'s "Retrofit guidance" section:

1. **Mandatory changes first.** Add standing files (`HANDOFF.md`, `PARKED.md`, `BUILDLOG.md`), update `.template/VERSION` to `1.1.0`, replace PR template with the four-section version, update node issue template.
2. **Recommended changes next.** Add `docs/doctrine/` with the four stubs (customized for your project), add `docs/CANDIDATE_LESSONS.md`, create `docs/checkpoint_signoffs/` directory.
3. **Optional changes last, if at all.** Adopt call-site cost comments for existing integrations; reorganize existing ADRs to reference doctrine.

Close the retrofit as a normal node per §5.3, with the PR using the new four-section template to test the template works end-to-end.

## What's NOT in this package

- Code directories (`app/`, `lib/`, `prisma/`, `python/`) — generated during implementation nodes
- `scripts/dev-setup.sh` — generated at n-005 or n-006
- `.github/workflows/` — CI pipelines generated at template repo initialization
- Runtime-specific configs (`.nvmrc`, `.python-version`, `package.json`, `requirements.txt`) — project-specific
- `.gitignore`, `.env.example`, `LICENSE` — project-specific defaults to be added

## Template generalization notes

When lifting this package to a different project (not Narrate), the changes required:

- **`docs/CONSTITUTION.md`** — replace `[NARRATE]` and `[PROJECT]` tagged sections with project-specific content. `[TEMPLATE]` sections lift as-is.
- **`docs/doctrine/product.md`** — replace with project-specific product doctrine
- **`docs/doctrine/pricing.md`** — replace with project-specific pricing doctrine
- **`docs/doctrine/ux.md`** — replace Narrate-specific patterns with project-specific ones; keep the framework-level rules at the bottom
- **`docs/doctrine/infra.md`** — replace vendor selection with project-specific choices; keep the principles section
- **`CHANGELOG.md`** — start fresh for the new project, but reference template v1.1.0 as the starting point

## File cross-references to constitution

| File | Governing constitution section |
|---|---|
| `HANDOFF.md` | §5.6 (handoff document), §11.4 (session opening), §11.5 (session closing) |
| `PARKED.md` | §5.2 (parked items during node), §11.5 (parked-items update at close) |
| `BUILDLOG.md` | §8.2 (publishing surface) |
| `docs/CONSTITUTION.md` | itself |
| `docs/doctrine/*` | §3.11, §13 |
| `docs/CANDIDATE_LESSONS.md` | S/W Dev Env operating doctrine §6 |
| `docs/checkpoint_signoffs/*` | §5.5 (milestone nodes), §6.6 (heavy gate) |
| `.github/ISSUE_TEMPLATE/node.md` | §5.1 (node open), §9.3 (issue templates) |
| `.github/pull_request_template.md` | §5.3 (node close), §9.5 (pull requests) |
| `.template/VERSION` | retrofit protocol |

## Version history

| Version | Date | Changes |
|---|---|---|
| 1.1.0 | 2026-04-24 | 13 improvements integrated from Discovery feedback (see CHANGELOG) |
| 1.0.0 | 2026-04-23 | Initial package alongside constitution v1.0 |
