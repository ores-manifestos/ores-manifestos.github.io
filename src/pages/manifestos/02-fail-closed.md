---
layout: ../../layouts/Manifesto.astro
number: 2
slug: fail-closed
title: "Fail Closed"
tagline: "Absence of evidence is never evidence of absence. A gate that cannot check something reports that it could not check it."
---

The failure mode we care most about is not a red build. It is a green build that checked less
than it claimed to.

That happens quietly. A validator meets a keyword it does not implement and skips it. A toolchain
is missing and the matrix cell is recorded as "not applicable". A lane errors and the other lane's
answer is used as a fallback. Every one of these turns *we did not look* into *we looked and it
was fine* — and it does so silently, which is what makes it dangerous.

## The rules

**A check that cannot run is `failed` or `partial`, never `passed`.** Missing toolchains and
unavailable evidence are reported as missing. They are never inferred as success.

**A keyword we cannot evaluate faithfully is refused, not ignored.** Silently skipping a keyword
makes two genuinely different schemas look identical — the exact conclusion the gate exists to
prevent. Refusal is a finding with its own rule id, and it is never counted as agreement.

**No lane wins by fallback.** When two independent lanes disagree, neither result is adopted
because the other one errored. That is not a resolution; it is a coin flip with extra steps.

**Disabled evidence is recorded as disabled.** A receipt says which gates ran. "No divergences
found" must never be confusable with "no divergences looked for".

**Waivers are exact, owned, approved, tested, and expiring.** A permanent blanket exception is
not a waiver, it is a deleted gate.

## Why this is worth the friction

Fail-closed gates are annoying in exactly the cases where they are working. The alternative is a
system whose green signal means nothing in particular, which is worse than having no signal at
all — because a meaningless green is trusted, and an absent signal is not.
