---
layout: ../../layouts/Manifesto.astro
number: 1
slug: peer-authorities
title: "Peer Authorities"
tagline: "Two human-authored sources of truth. Neither generates the other."
---

The convenient architecture is a pipeline: pick one contract language, generate everything else
from it, and treat the generated artifacts as fact. It is convenient because it removes the
possibility of disagreement — and it removes it by removing the second opinion.

We keep the second opinion.

TypeSpec and JSON Schema/OpenAPI are **independent, human-authored, top-level authorities**. Each
one generates its own downstream world:

```text
TypeSpec              -> contract/persistence IR -> SQL -> proto3/gRPC -> wire clients
JSON Schema/OpenAPI   -> contract/persistence IR -> SQL -> types/validators -> HTTP clients
```

Cross-translation between them — TypeSpec to JSON Schema, JSON Schema to TypeSpec, and both round
trips — is **comparison evidence only**. It may never overwrite, outrank, or silently replace
either authored source.

## Why two

A single source of truth cannot be wrong about itself. It can only be wrong about the world, and
you find that out in production. Two independently authored descriptions of the same contract can
disagree, and disagreement is the signal — the cheapest correctness evidence available, produced
by the ordinary act of writing the contract down twice by two different means.

This is the same reason we generate SQL from both lanes and read the catalog back, and the same
reason we cross-check an ORM by generating it from the SQL and the SQL from the ORM. Independent
derivations that agree are evidence. A single derivation that agrees with itself is a tautology.

## What "authority" means operationally

- Both sources stay **editable by humans**, with independent provenance and history.
- Neither is regenerated from the other as part of any build, ever.
- A generated artifact is never described as authoritative, and never merged back over a source.
- A tool that collapses the architecture into one source is not adopted, however good it is.

## What happens on disagreement

Nothing is picked. Nothing falls back. An unexplained mismatch enters
`STOPPED_FOR_EVALUATION` and blocks publication, migration, package release, automatic merge,
consumer promotion, and deployment until a human explains it.

See [Fail Closed](/manifestos/fail-closed) for why the stop is unconditional, and
[Evidence Over Assertion](/manifestos/evidence-over-assertion) for what the stop has to produce.
