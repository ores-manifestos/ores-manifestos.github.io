#!/usr/bin/env node
// Gate for catalog/policy-catalog.json.
//
// The catalog is generated from the workspace constitution, so the risk is not a
// typo — it is a regeneration that quietly drops or renames rules. These checks
// are the ones that would catch that.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(root, "catalog/policy-catalog.json"), "utf8"));
const fail = [];
const check = (ok, msg) => { if (!ok) fail.push(msg); };

// 1. Identifiers are unique and stable-looking. A duplicate id means two rules
//    would collide when something cites one of them.
const ids = catalog.policies.map((p) => p.id);
check(new Set(ids).size === ids.length, "duplicate policy id");
check(ids.every((id) => /^[a-z][a-z0-9-]*$/.test(id)), "policy id is not a kebab-case slug");

// 2. Declared counts match reality, so a partial regeneration cannot claim to be whole.
check(catalog.counts.policies === catalog.policies.length, "counts.policies disagrees with policies.length");
check(catalog.counts.themes === catalog.themes.length, "counts.themes disagrees with themes.length");
check(catalog.counts.manifestos === catalog.manifestos.length, "counts.manifestos disagrees");
check(
  catalog.counts.enforceable === catalog.policies.filter((p) => p.enforceable).length,
  "counts.enforceable disagrees",
);

// 3. Every cross-reference resolves. A theme pointing at a manifesto that is not
//    published, or a policy pointing at a theme that does not exist, is a broken link.
const manifestoSlugs = new Set(catalog.manifestos.map((m) => m.slug));
const themeIds = new Set(catalog.themes.map((t) => t.id));
const sectionIds = new Set(catalog.sections.map((s) => s.id));
for (const t of catalog.themes) {
  check(t.manifesto === null || manifestoSlugs.has(t.manifesto), `theme ${t.id} names an unpublished manifesto`);
  for (const p of t.policies) check(new Set(ids).has(p), `theme ${t.id} cites unknown policy ${p}`);
}
for (const p of catalog.policies) {
  check(p.section === null || sectionIds.has(p.section), `policy ${p.id} names unknown section ${p.section}`);
  for (const t of p.themes) check(themeIds.has(t), `policy ${p.id} names unknown theme ${t}`);
  for (const m of p.manifestos) check(manifestoSlugs.has(m), `policy ${p.id} names unknown manifesto ${m}`);
}

// 4. An enforceable rule has to say what would be checked, or "enforceable" is
//    an opinion rather than a commitment.
for (const p of catalog.policies.filter((p) => p.enforceable)) {
  check(typeof p.verification === "string" && p.verification.length > 0, `policy ${p.id} is enforceable with no verification`);
}

// 5. Provenance is a hash, not a promise.
for (const s of catalog.sources) check(/^[0-9a-f]{64}$/.test(s.sha256), `source ${s.path} has no sha256`);

if (fail.length) {
  console.error(`catalog invalid — ${fail.length} problem(s):`);
  for (const f of fail.slice(0, 25)) console.error(`  - ${f}`);
  process.exit(1);
}
const mapped = catalog.policies.filter((p) => p.manifestos.length).length;
console.log(
  `catalog ok: ${catalog.policies.length} policies, ${catalog.counts.enforceable} enforceable, ` +
  `${catalog.themes.length} themes, ${mapped} mapped to ${catalog.manifestos.length} manifestos`,
);
