---
layout: ../../layouts/Manifesto.astro
number: 8
slug: one-to-one-all-the-way-down
title: "One-to-One All the Way Down"
tagline: "One product boundary, projected identically into every system that has an opinion about boundaries."
---

Every platform we use has its own notion of a container: an organization, a workspace, a project,
a domain, a channel. Left alone, those notions align *approximately* — which means that answering
"where does this thing live" requires a lookup table in somebody's head, and that table is wrong
in at least one place at all times.

So we make the mapping exact and total:

```text
github org : neondb org : supabase org : cloudflare domain : gcp project : linear project : slack channel
```

One product boundary, seven identical projections. No cross-links, no shared containers, no
"temporarily using the other org's project".

## What this buys

- **Access control composes.** Revoking a boundary is one operation per plane, not an audit.
- **Provenance is free.** An artifact's origin is recoverable from any one of its coordinates.
- **Automation stops guessing.** Fleet tooling derives the other six names from any one of them,
  which is why a 160-organization workspace can be operated at all.
- **Nothing has to be remembered.** The Linear identifier goes in the branch name and the pull
  request title, so the 1:1 attaches itself. A mismatch silently files work against the wrong issue.

## Naming is part of the mapping

Repositories within an org follow the same predictable shapes — `*-interfaces`, `*-lib-core`,
`*-orm-core`, `*-clients`, `*-infra`, `*-monorepo`, `*-e2e`, `*-cli`, and the server family — so
that the analogous repository in a sibling org can be found by name rather than by search. That
predictability is what makes cross-org conflict resolution possible: when you need to know how a
problem was solved elsewhere, you can find the elsewhere.

## Deviations are recorded, not absorbed

Cost sometimes forces an exception — sharing one provider org across boundaries, separated by
namespaces, until per-boundary projects are affordable. That is fine, on two conditions: the
exception is **written down with its expiry path**, and code reaches the shared resource only
through runtime configuration, so unwinding it later is a config change and never a code change.

An undocumented exception is not an exception. It is the new architecture, and nobody voted for it.
