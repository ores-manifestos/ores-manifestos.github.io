---
layout: ../../layouts/Manifesto.astro
number: 6
slug: merge-do-not-pick-sides
title: "Merge, Don't Pick Sides"
tagline: "A conflict is two people being right about different things. Resolving it means understanding both."
---

Git presents a conflict as two blocks of text and an implicit invitation to delete one of them.
Taking that invitation is the single most common way working code is silently destroyed: the side
you drop was written deliberately, by someone solving a problem you may not have loaded into your
head yet.

## Resolve conceptually, not positionally

Before resolving anything, get the context that makes both sides legible: the history behind each
branch — at least fifteen commits, more if the file is old — and, where they exist, the analogous
repositories that solved the same problem elsewhere. Then merge the **intent** of both changes,
not the text of one.

A useful discipline: for each conflicted file, diff **both** sides against their real common
ancestor. Very often one side did not change the file at all relative to that ancestor, and the
resolution is provable rather than a judgement call. What is left after that subtraction is the
small set of genuine conflicts that deserve real thought.

Then write down *why* — in the merge commit, per file. The resolution is a decision about which
code ships; it deserves the same explanation any other such decision gets.

## Specific prohibitions

- **Avoid rebase.** It rewrites published history and turns one conflict into one conflict per commit.
- **Avoid stash.** See [Work Does Not Sit Locally](/manifestos/work-does-not-sit-locally).
- **Never reset or force-push** without explicit human authorization. No destructive operation
  without permission or explicit pre-authorization.

## Submodule pins are a conflict too

A gitlink conflict renders as two SHAs, which makes picking one feel mechanical. It is not. The
pin is a claim about which code we deploy. Resolve the underlying conflict **in the source
repository**, merge it there, then pin the merged commit in the superproject — and confirm the new
pin is reachable on the submodule's own remote before publishing it. Picking a SHA is the same
error as picking a side, with worse blast radius.
