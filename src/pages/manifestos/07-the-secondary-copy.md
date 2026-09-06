---
layout: ../../layouts/Manifesto.astro
number: 7
slug: the-secondary-copy
title: "The Secondary Copy"
tagline: "A vendored checkout is never the source of truth, however convenient it is to edit."
---

We build app-of-apps superprojects out of git submodules: an org's deployables under `apps/`, every
deployed service under the cluster repo's `remote/deployments/`. The pattern works, and it has one
failure mode that accounts for nearly all of its pain.

**Editing files directly inside the vendored checkout.**

It is easy, the files are right there, and it produces a change that bypasses the real repository's
history, CI and reviewers, and a pin that nobody else can fetch. The upstream repository is the
source of truth. The copy inside the superproject is evidence of a version choice, nothing more.

## The order that always works

1. Develop in the upstream repository, or its standalone clone.
2. Commit, merge, and **push there first**.
3. Only then bump the pin in the superproject.

Publishing a moved pin while the submodule commit exists only on your machine breaks every other
clone with `upload-pack: not our ref`. If a pre-push guard refuses your push because a gitlink is
unreachable, the guard is right. Go push the submodule; do not reach for the skip flag.

## Read the status before concluding anything

After a clone, submodules are **empty** until initialized — so builds fail and greps silently find
nothing. This is the most common way the repository is misread.

| Flag | Meaning |
|---|---|
| (space) | in sync with the recorded pin |
| `-` | not initialized — **the directory is empty** |
| `+` | checked-out commit differs from the recorded pin |
| `U` | merge conflict on the gitlink |

Pointer drift (`+`) is not a dirty working tree. When a superproject pulls a commit recording a new
submodule commit, plain `git status` shows the path as modified — as if a file were edited. It was
not; the gitlink points somewhere else. Treating drift as "dirty" and skipping the repository
leaves the submodule permanently stale.

And never add `--force` to a submodule update. Without it, git refuses to overwrite uncommitted
work inside the submodule. With it, that work is gone.

## One owner per app

If an app is pinned through its org's monorepo, do not also pin it directly in the cluster repo.
Two pins drift, and then it is ambiguous which commit actually ships.
