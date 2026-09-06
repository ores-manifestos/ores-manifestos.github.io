---
layout: ../../layouts/Manifesto.astro
number: 3
slug: evidence-over-assertion
title: "Evidence Over Assertion"
tagline: "A claim without a reproducible receipt is not a claim. It is a mood."
---

"The schemas match." "Tests pass." "It's fine on my machine." These are assertions. They carry no
information about what was actually examined, at which commit, with which toolchain, or whether
the same examination would reach the same conclusion tomorrow.

Every gate we run emits a **receipt**: a machine-readable record of what was compared and what was
concluded.

## What a receipt contains

- **Input digests** — the exact bytes examined, hashed, on both sides.
- **The comparison settings actually used** — not the defaults, the resolved values.
- **Coverage** — which dimensions were compared, and which declarations were out of scope and why.
- **Stable finding fingerprints** — content-derived, so the same finding has the same identity
  across runs and can be tracked, aged, and owned.
- **Toolchain evidence** — compiler and emitter versions, because a result is only valid for the
  toolchain that produced it.
- **No wall-clock timestamp.** Identical inputs and toolchain produce a byte-identical receipt.

That last one matters more than it looks. If a receipt embeds the current time, two runs always
differ, and you lose the ability to say *nothing changed* by simply comparing them.

## A witness beats a description

When a gate reports a difference, the useful output is not a description of the difference — it
is the concrete input that exhibits it. "These schemas differ in their additional-property policy"
starts an argument. "Here is a JSON value one authority accepts and the other rejects" ends one.

Prefer the gate design that can produce a witness. It converts a formatting opinion into a fact
about behaviour, and it tells a reviewer which conversation to have.

## Corollary: separate *different* from *incompatible*

Two artifacts can be byte-different and behaviourally identical. A gate that only compares bytes
reports both cases the same way and trains people to ignore it. Run the behavioural check too, and
label the result — a difference with no witness is a spelling difference to reconcile; a
difference with a witness is a contract change.
