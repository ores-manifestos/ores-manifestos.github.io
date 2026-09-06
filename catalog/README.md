# Policy catalog

`policy-catalog.json` is the manifestos as data: every normative rule stated in the
workspace constitution (`github.com/oresoftware/my-ai`), each with a stable
identifier, the manifesto it instantiates, and whether a tool could check it.

It exists so a review comment, a CI gate, or an agent can cite a rule by id —
`no-rebase`, `preserve-uncommitted-work` — instead of restating it slightly
differently each time and slowly turning one rule into several.

## Shape

| Field | Meaning |
| --- | --- |
| `policies[].id` | Stable kebab-case identifier. Treat as an API: rename only with a redirect. |
| `policies[].level` | `MUST`, `MUST_NOT`, `SHOULD`, `SHOULD_NOT`, `MAY` |
| `policies[].statement` | The rule in the constitution's own voice, not a paraphrase |
| `policies[].rationale` | Why, where the source gives one |
| `policies[].source_lines` | Where it lives in the source, for auditing the extraction |
| `policies[].enforceable` | Whether a script could mechanically verify it |
| `policies[].verification` | What such a check would actually test. Required when `enforceable` |
| `policies[].manifestos` | Published manifesto slugs this rule instantiates; may be empty |
| `themes[]` | Cross-cutting principles, each mapped to a manifesto where one exists |
| `sources[].sha256` | Hash of the source file the catalog was generated from |

## Honesty about coverage

Of 307 rules, 130 are marked machine-checkable and 184 map to one of the ten
published manifestos. The remaining 123 are real, enforced rules that no
manifesto currently argues for — that is a gap in the manifestos, not evidence
the rules are unimportant. The largest uncovered clusters are *never lose work*,
*invisible state is the enemy*, and *fix the root cause, not the symptom*.

`enforceable: false` is the honest default for process rules. Marking something
enforceable without saying what a checker would test is rejected by the
validator.

## Validate

```sh
npm run check:catalog
```

The gate gets at the failure that actually matters: not a typo, but a
regeneration that silently drops or renames rules. It checks identifier
uniqueness and shape, that declared counts match the arrays, that every
cross-reference resolves, that each enforceable rule states its verification,
and that provenance is a real hash.

## Regenerating

The catalog is derived from the constitution. When that document changes, the
`sources[].sha256` here stops matching and the catalog is stale. Re-extract,
re-run the gate, and bump `catalogVersion`.
