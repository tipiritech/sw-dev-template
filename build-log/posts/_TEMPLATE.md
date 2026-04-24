---
# This is the frontmatter template for a build-log long-form post.
# The blog renderer reads this and produces the <head> tags.

title: "[Post title — specific, promises something concrete]"
slug: "n-XXX-short-name"
date: "YYYY-MM-DD"
node: "n-XXX"
description: "[150–160 character meta description. Required — build fails if missing.]"
tags: ["tag1", "tag2"]
canonical: "https://<product-domain>/blog/n-XXX-short-name"

# For structured data (JSON-LD BlogPosting schema):
author:
  name: "[Author name]"
  url: "https://<product-domain>"

# Marketing controls (only enforced when marketing doctrine Active? = yes)
published: false      # flip to true when ready to go live
cross_post:
  blog: true
  x: true
  linkedin: true
  newsletter: true    # included in next weekly digest
---

<!--
This is a build-log post template. Replace all bracketed placeholders.
Post must be at least 400 words (SEO discipline — no thin content).

Structure guidance:
1. Lead with the concrete result or problem. No preamble.
2. Middle: the specific mechanism, decision, or surprise. The part a
   reader can actually learn from.
3. Close: what changes as a result. Optional: link to next post or
   related post.

Internal linking: link to at least one prior post where context is relevant.
-->

# [Post title, matching frontmatter]

[Opening paragraph. Specific detail. No preamble.]

## [Section heading — what the reader will learn]

[Substantive content.]

## [Section heading — the mechanism or decision]

[Substantive content. Code samples if relevant.]

## What this changes

[One-paragraph conclusion. No "in conclusion" phrasing. What the reader
should take away, stated directly.]

---

## Channel variants

<!--
These are read by the publishing tool. Edit them; the tool does not
invent them from the long-form.
-->

### X thread

**Tweet 1:**
[Hook — the specific detail that would make a reader stop scrolling.
Under 280 chars. No hashtags.]

**Tweet 2 (if thread):**
[Mechanism or surprise. Under 280 chars.]

**Tweet 3 (closing, with link):**
[One line + UTM-tagged link to blog post.
Example link: https://<product-domain>/blog/n-XXX-short-name?utm_source=x&utm_medium=social&utm_campaign=build-log&utm_content=n-XXX]

### LinkedIn post

[One paragraph, professional register. Hook first line. No emoji. One
hashtag maximum. Link to blog at end.]

[UTM-tagged link:
https://<product-domain>/blog/n-XXX-short-name?utm_source=linkedin&utm_medium=social&utm_campaign=build-log&utm_content=n-XXX]

### Newsletter digest entry

[Two sentences for the weekly digest. Context-setting. Link to full post.]

[UTM-tagged link:
https://<product-domain>/blog/n-XXX-short-name?utm_source=newsletter&utm_medium=email&utm_campaign=build-log&utm_content=n-XXX]

---

<!--
Internal-linking discipline (SEO doctrine):
Link to at least one prior post. Example:

"Earlier this week I [wrote about X](./n-XXX-prior-post.md), which is
where the context for this work comes from."

Remove this comment block before publishing.
-->
