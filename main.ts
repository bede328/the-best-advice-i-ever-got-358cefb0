// Writes the winning one-sentence entry for make.fun's
// "The Best Advice I Ever Got" bounty to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "My dad said, \"Son, never borrow money to look rich \u2014 the loan outlives the applause,\" and twenty years later I still hear him every time I reach for my wallet.";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification: the file on disk must be byte-identical.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
if (back.endsWith("\n")) throw new Error("entry must not end with a newline");
console.log(`wrote /output/entry.txt (${chars} characters, ${Buffer.byteLength(back, "utf8")} bytes)`);
