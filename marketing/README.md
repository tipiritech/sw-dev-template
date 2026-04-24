# Marketing

This directory holds marketing deliverables produced alongside development work. See `docs/doctrine/marketing.md` for the binding rules.

## Structure

```
marketing/
├── README.md                  <- this file
├── CHANNELS.md                <- active channel roster with UTM definitions
├── assets/                    <- screenshots, diagrams, demo clips per node
│   └── <node-id>/
├── posts/                     <- launch artifacts and standalone posts
│   ├── launch-v1.md
│   └── ...
├── scheduled.json             <- publishing queue (posts with future publish dates)
└── analytics/
    ├── conversions.md         <- weekly conversion dashboard snapshots
    └── channel-reviews/       <- quarterly channel kill-switch reviews
```

## How this interacts with build-log

The build-log is developer-facing. The marketing directory is distribution-facing.

- **Long-form post** — lives in `build-log/posts/<node-id>-<short-name>.md`. Source of truth for content.
- **Channel variants** — drafted in the long-form post's `## Channel variants` section. Publishing tool reads from there and writes scheduled items to `marketing/scheduled.json`.
- **Assets** — screenshots, diagrams, video clips live in `marketing/assets/<node-id>/` so they can be reused across channels without duplication.
- **Launch artifacts** — standalone pieces not tied to a single node (Reddit submissions, HN Show posts, Product Hunt launch copy) live in `marketing/posts/`.

## UTM helper

Every outbound link from a marketing surface uses `scripts/utm.ts` (or equivalent) to generate UTM-tagged URLs. Manual UTM construction is forbidden. See `docs/doctrine/marketing.md` §Conversion tracking.

## Weekly review cadence

Every Friday:
1. Publish scheduled posts for the week.
2. Pull conversion data from analytics (PostHog / Plausible).
3. Update `marketing/analytics/conversions.md` with the week's numbers.
4. Update `BUILDLOG.md` "Cross-posting notes" table.

Every quarter:
1. Run the kill-switch review per doctrine.
2. Commit `marketing/analytics/channel-reviews/<YYYY-Q#>.md`.
3. Open ADR if any channel is cut or added.

## Dormant mode

If `docs/doctrine/marketing.md` Active? flag is set to `no`, this directory is preserved but inactive. Posts may still be drafted here for internal reference; no publishing tooling runs.
