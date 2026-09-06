---
layout: ../../layouts/Manifesto.astro
number: 9
slug: test-orgs-are-real-users
title: "Test Orgs Are Real Users"
tagline: "The only honest integration test is one that has no special access."
---

Every organization has a sibling: `opto-sync` and `opto-sync-test`, `fiducia-cloud` and
`fiducia-cloud-test`, and so on across the workspace. The sibling is not a staging environment. It
is an **outsider** — a consumer that reaches the product the way an external user does, through
published packages and public endpoints, with no privileged path in.

## Why an outsider is necessary

Tests that live inside the repository share its assumptions. They import from relative paths that
consumers do not have, rely on fixtures the package does not ship, and pass because the code and
the test agree with each other rather than because the product works. A test suite that lives in a
different organization cannot do any of that. It has to install the package, read the public
documentation, and use the real interface — which is exactly the surface that breaks.

This catches the specific class of failure that in-repo tests structurally cannot: an export
missing from the package manifest, a file left out of the published `files` list, a peer
dependency that was only ever present because it sat in the monorepo's node_modules, an endpoint
that works only with an internal header.

## The secondary benefit

CI minutes are budgeted. The sibling org carries the expensive end-to-end and matrix work so the
primary org's pipelines stay fast enough that people do not start skipping them. A gate everyone
routes around is a gate that does not exist.

## Do not "fix" the names

Test orgs were created as they were created, typos included. The sibling of
`declarative-migrations` is `declative-migrations-test`, and that is its real name. Correcting it
in a clone URL, a workflow, or a pull request points the work at an organization that does not
exist, which fails in the least informative way available.
