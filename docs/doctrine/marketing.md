# Marketing Doctrine

**Version:** 1.0
**Last updated:** 2026-04-24
**Active?** yes | no — set per project. If `no`, this doctrine is not binding and the marketing scaffold is dormant.

<!--
This doctrine is OPTIONAL per project. Set the "Active?" flag above to `yes`
if this project has a marketing function, or `no` if it does not (e.g., an
internal tool or a project where a separate team handles marketing).

When `no`:
- The marketing scaffold (/marketing/ directory, UTM tooling, channel configs)
  remains in the repo but inactive.
- Nodes do not require marketing-deliverable checkboxes.
- Build-log posts publish to repo only, not to external channels.

When `yes`, everything below is binding.
-->

## Principles

1. **Marketing is a first-class surface, not a late-stage afterthought.** When this doctrine is active, marketing deliverables have nodes, envelopes, and review gates like any other work.

2. **Distribution is a discipline, not a hope.** Writing a post does not ship the post. Cross-posting, UTM tagging, and scheduling are part of node completion, not optional follow-through.

3. **Credibility compounds from consistency.** A weekly build-log entry over 12 months beats three viral posts. Honest entries during rework periods build more trust than curated entries during shipping bursts.

4. **Tracking without tuning is noise.** Every tracked channel must have an owner-defined threshold below which the channel is cut, and a cadence for reviewing that threshold. Vanity metrics (follower counts, impressions without action) are not tracked; conversion metrics are.

5. **SEO is a side effect of good writing plus intentional structure.** No keyword stuffing, no thin content, no content farms. Post titles, headings, internal linking, and structured data are intentional; topic selection follows what the project actually learned.

## Channel roster

**[PROJECT]** Replace this section with the channels this project uses. Default roster below; edit freely.

| Channel | Purpose | Post cadence | Owner | Active? |
|---|---|---|---|---|
| Product blog | Long-form build-log, case studies, documentation-adjacent posts | Per closed node + ad hoc | Owner | yes |
| X (Twitter) | Short-form excerpts, real-time build moments, launch announcements | Per closed node + daily ad hoc | Owner | yes |
| LinkedIn | Professional-register versions of build-log posts, case studies | Per closed node | Owner | yes |
| Newsletter (email) | Digest of recent posts, behind-the-scenes commentary, early access | Weekly or bi-weekly | Owner | yes |
| Reddit / IndieHackers / HackerNews / Product Hunt | Launch artifacts only (one-time per milestone) | Per launch milestone | Owner | yes |

Do not add a channel to this roster without committing to its cadence. A channel without cadence is a channel that will not be used; removing it is better than letting it rot.

## Conversion tracking

Every outbound link from a marketing surface back to the product carries UTM parameters. Standard UTM schema:

```
?utm_source=<channel>&utm_medium=<medium>&utm_campaign=<campaign>&utm_content=<node-or-post-id>
```

- `utm_source` — where the click originated (`x`, `linkedin`, `newsletter`, `reddit`, `hackernews`, `producthunt`, `blog`)
- `utm_medium` — the category (`social`, `email`, `community`, `referral`, `organic`)
- `utm_campaign` — the theme of the post (`build-log`, `launch-v1`, `pricing-change`, `case-study`)
- `utm_content` — the specific artifact (`n-019` for a node-tied post, or `post-slug` for standalone content)

The UTM helper in `scripts/utm.ts` (or equivalent) generates compliant links. Manual UTM construction is forbidden — typos break attribution.

Analytics tool (from `docs/doctrine/infra.md`) ingests UTM-tagged visits and emits attribution events to the conversion dashboard. Dashboard review cadence: weekly during build phase, daily during launch window, weekly post-launch.

## SEO discipline

When this doctrine is active, the product blog follows these rules:

1. **Titles are promises.** A post titled "How we cut chat API costs 40%" delivers the number and the mechanism. Bait-and-switch titles destroy credibility with both readers and search engines.

2. **Structured data on every post.** JSON-LD `BlogPosting` schema rendered in the head. Author, date, headline, description, URL. Pulled from the post's frontmatter — no manual construction.

3. **Internal linking.** Every new post links to at least one prior post where context is relevant. A build-log post referencing earlier work should link to the earlier work. This strengthens topical clusters for search and helps readers navigate.

4. **Meta description populated.** Every post has a 150–160 character meta description in frontmatter. If empty, the build fails.

5. **Canonical URLs.** Cross-posted content uses canonical tags pointing to the product blog. The blog is the source; X and LinkedIn are distribution.

6. **Keyword selection follows topic, not vice versa.** Write the post that the project's work actually justifies. Check keyword volume after drafting, not before. Rename if a better-ranking synonym fits; rewrite the substance only if the substance is wrong.

7. **No thin content.** Minimum 400 words for a standalone post. Build-log summaries shorter than that get bundled into weekly digests rather than published individually.

## Post lifecycle (when marketing doctrine active)

Every closed node with externally-shipping work has a marketing lifecycle parallel to its development lifecycle:

**During the node:**
- Draft long-form post in `build-log/drafts/<node-id>.md` per constitution §5.2
- Capture screenshots, diagrams, demo clips in `marketing/assets/<node-id>/`

**At node close:**
- Finalize long-form post, move to `build-log/posts/<node-id>-<short-name>.md`
- Append one-line summary to `BUILDLOG.md` (with UTM-tagged link)
- Generate channel variants (see Channel Variants section)
- Schedule or publish per channel

**At launch milestones:**
- Draft community launch artifacts (Reddit, HN, PH) per `marketing/posts/launch-<milestone>.md`
- Cross-post to primary channels with launch-specific UTM campaign
- Track conversion for 30-day window; record in `docs/retros/<milestone>-marketing.md`

## Channel variants

For each long-form post, generate short-form variants per active channel:

- **X:** 1–3 tweet thread. Lead with the specific detail that would make a reader stop scrolling. Link to long-form with UTM tag. No hashtags in build-log tweets; they signal spam.

- **LinkedIn:** One-paragraph professional-register version. First line is the hook. Link to long-form with UTM tag. One relevant hashtag maximum.

- **Newsletter:** Context-setting paragraph plus link to long-form, bundled into the weekly digest. Not individually emailed.

- **Reddit / HN / PH:** Only for launches. Each has its own conventions; don't copy-paste. Post titles match the community's register.

Variants are drafted in the same file as the long-form post, in a `## Channel variants` section at the bottom. Publishing tool reads from this section.

## Anti-patterns (explicitly forbidden)

- **Growth-hack tactics over craft.** No engagement bait, no follow-for-follow, no artificial thread-cliffhangers, no "I'm humbled to announce" preambles.
- **Posting without tracking.** Every outbound link from a marketing surface is UTM-tagged. If tagging is inconvenient, fix the tooling; do not skip tagging.
- **Channel-specific personas.** Same voice across channels. LinkedIn-professional-David and X-sardonic-David are different registers, not different people.
- **Delayed cross-posting for "optimization".** Cross-post same day. Timing optimization is a distraction from consistency.
- **Competitor-targeting content.** Critique of a category is fair; critique of a named competitor is rarely a net positive and creates reciprocal-critique risk.
- **Hype for pre-launch features.** Do not generate excitement for features that have not shipped. The product blog and social channels do not pre-announce.
- **Paid amplification of thin content.** Paid ads on posts that would not earn organic attention waste budget.

## Kill-switch conditions

A channel is cut if, after a 90-day fair window, it produces:

- Zero measurable conversion (no attributed signups, no attributed revenue)
- Consistent engagement-free posts (no replies, reposts, or click-throughs)
- Disproportionate maintenance cost relative to yield

Cuts are recorded in `docs/DECISIONS.md` with rationale. A cut channel can be revived after explicit reconsideration, not by drift.

## Change log

| Date | Change |
|---|---|
| 2026-04-24 | Initial marketing doctrine — v1.2 template addition, optional per project |
