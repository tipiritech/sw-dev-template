# PARKED

<!--
Append-only, dated list of items surfaced but not in scope for the current work.
The purpose is subconscious processing: items parked here are noticed-and-held,
freeing the active session from holding them in working memory.

Rules (constitution §5.2, §11.5):
- Append-only. Never delete. When an item is addressed, strike through rather
  than remove — parked-item history is useful.
- Date every entry (YYYY-MM-DD).
- Minimum context: enough to understand the item three months later without
  the original session's context.
- Not a bug tracker. Bugs go to GitHub issues with `type:bug`. Parked items
  are observations, architectural questions, deferred cleanups, and things
  that surfaced outside the current node's scope.

Format:

## YYYY-MM-DD

- ITEM: <short description>
  CONTEXT: <what prompted this observation — node, session, related decision>
  RELEVANCE: <why this might matter later>

- ~~ITEM: <resolved item, struck through>~~
  RESOLUTION: <what happened, date, PR or commit link>

-->

## Entries

<!-- Example entries (delete on first real use):

## 2026-04-24

- ITEM: Consider replacing manual JSON schema validation with Zod at service boundary
  CONTEXT: Surfaced during n-011 pptx-upload. Hand-rolled validation works but
  is verbose; a later node could consolidate.
  RELEVANCE: Medium. Affects readability of integration nodes; no correctness
  issue today. Revisit at phase 3 closeout.

- ITEM: R2 lifecycle policy for canceled-subscription asset cleanup
  CONTEXT: n-008 r2-init. Retention policy planned but not implemented.
  RELEVANCE: High. Unbounded storage growth post-launch. Must be in place
  before first paying customer per doctrine/infra.

-->

## Template

Start here on first real entry. Delete the template-entries section above
when you add your first real item.

---

## How to use PARKED.md

**During a session:** if something surfaces that is not in scope for the
current node, fire a drift notice (§11.2). If the surfaced item is not
worth a new node or chat but is worth remembering, add it here before
returning to the node.

**At session close:** Phase 3 of the four-phase close (§11.5) reviews this
file's recent additions and may promote items to nodes, decisions, or
retrospectives.

**At phase transitions:** review the full file and either promote, resolve,
or strike-through-with-resolution. Items older than six months without
activity are candidates for strike-through with RESOLUTION: "no longer relevant".
