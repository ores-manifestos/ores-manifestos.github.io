---
layout: ../../layouts/Manifesto.astro
number: 5
slug: work-does-not-sit-locally
title: "Work Does Not Sit Locally"
tagline: "A draft pull request that exists is worth more than finished code on one laptop."
---

The most expensive artifact in software is work that was completed and never published. It cannot
be reviewed, cannot be built on, cannot be found by search, and is one disk failure from never
having happened. It also *looks* like progress to the person who wrote it, which is why it
accumulates.

## The default

After finishing a slice of real work, without being asked and without asking:

1. **Commit it.** Explicit paths, never `git add -A` — most checkouts carry somebody else's
   work-in-progress, and `-A` is how that gets committed along with a stray `.env`.
2. **Sync both directions.** A clean working tree is not "synced". You are synced when local and
   remote hold the same commits: fetch, merge upstream, then push.
3. **Open a pull request.** If the work is incomplete or tests are owed, open it as a **draft**.
4. **Repeat as you go**, rather than batching a week of work into one publication event.

Asking "would you like me to commit and open a PR?" is itself the failure. A reviewer can close,
convert, or reject a draft in ten seconds. They cannot review work that never left the machine.

## Stashes are invisible work

`git stash` produces work that exists in no remote, appears in no `git status`, and shows in no
ahead/behind count. A repository holding thousands of lines of stashed work reports a clean tree
to every human and every tool that scans for unlanded work. Use a `wip/<what-it-is>` branch
instead. If you find someone else's stash, make it reachable — `git branch rescue/<id> refs/stash`
— and never pop it.

## "I can't push" is not an exception

A protected branch rejecting a direct push means *open a pull request*. It does not mean
force-push, it does not mean rewrite history onto the base branch, and it certainly does not mean
the work stays local. If every git publication path is genuinely unavailable, back the artifact up
somewhere durable and land it properly as soon as access returns — a backup object is not a
completed delivery.
