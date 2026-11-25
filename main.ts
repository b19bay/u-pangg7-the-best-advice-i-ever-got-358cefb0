import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My mother told me to marry the man who does the dishes without being asked, and twenty years on the sink is still empty by nine.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and verify the written bytes are exactly the line.
const { readFileSync } = await import("node:fs");
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  console.error("read-back mismatch: entry.txt differs from the line");
  process.exit(1);
}
if (written.length !== 128) {
  console.error(`expected exactly 128 characters, got ${written.length}`);
  process.exit(1);
}
console.log(`wrote entry.txt (${LINE.length} chars)`);
