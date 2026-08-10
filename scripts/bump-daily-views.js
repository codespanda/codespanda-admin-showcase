// Run daily via .github/workflows/bump-views.yml (cron).
// Nudges each portfolio shot's `views` number up by a small random amount
// so the /portfolio grid's counts keep growing day over day, instead of
// sitting static forever. Shots with no `views` field (e.g. brand-new
// additions meant to grow purely from real visits) are left untouched.
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = resolve(__dirname, "../src/lib/portfolio-data.ts");
const src = readFileSync(path, "utf-8");
const eol = src.includes("\r\n") ? "\r\n" : "\n";

const MIN_BUMP = 1;
const MAX_BUMP = 7;

function randomBump() {
  return MIN_BUMP + Math.floor(Math.random() * (MAX_BUMP - MIN_BUMP + 1));
}

// Walk shot-by-shot so the "no views field" case is exact, rather than
// blindly regex-replacing every `views: N,` in the file.
const shotRe = /id: "([^"]+)",[\s\S]*?(?=(?:\r?\n {2}\{)|(?:\r?\n\];))/g;
let bumped = 0;

const out = src.replace(shotRe, (block) => {
  const viewsRe = /(views: )(\d+)(,)/;
  const m = block.match(viewsRe);
  if (!m) return block; // no views field on this shot — leave it alone
  const next = Number(m[2]) + randomBump();
  bumped++;
  return block.replace(viewsRe, `$1${next}$3`);
});

if (bumped === 0) {
  console.log("No shots bumped — check the regex against the current file shape.");
  process.exit(1);
}

writeFileSync(path, out, "utf-8");
console.log(`✓ bumped views on ${bumped} shots`);
