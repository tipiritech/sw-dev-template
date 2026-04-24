# Doctrine

Doctrine documents are the **source of truth** for product-level decisions. When code disagrees with doctrine, the code is wrong (constitution §3.11, §13).

Each file here is a single topic with a clear boundary. Short — a paragraph to a page. Long doctrine is weak doctrine.

## Default stack

- `product.md` — what the product is and is not
- `pricing.md` — pricing architecture
- `ux.md` — UX principles the product commits to
- `infra.md` — infrastructure choices and vendor selection

Projects can add more doctrine documents as specific topics warrant (security, data, API). Each new doctrine document is introduced via a Decision Record in `docs/DECISIONS.md`.

## Authority

Doctrine beats code. When code violates doctrine, the code is fixed — the doctrine is not revised to match the code. The exception is when the doctrine itself was wrong, in which case revision is a deliberate doctrine change, recorded in a DR, with version-bump discipline.

A new Claude session reads doctrine before writing code.

## Change protocol

1. Open a DR in `docs/DECISIONS.md` articulating the proposed change, driving reason, and consequences.
2. Revise the doctrine document.
3. Commit both in the same PR.
4. Note in `CHANGELOG.md` that doctrine changed.

Doctrine change is its own meta-node category (§2.3).

## Reference materials vs. doctrine

Reference materials (strategic plans, earlier explorations, research) live in `docs/reference/`, not here. Reference is background; doctrine is binding. If a strategic plan and a doctrine document diverge, doctrine wins.
