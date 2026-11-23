// Warning Label for Humans: One Line, Big Laugh.
//
// The program below writes exactly one warning label to /output/entry.txt.
// The label is the winner of a five-way local race (V4, 4-0): one premise,
// one turn, and the turn lands in the last few words, the way a printed
// safety label would sound if the thing it warned about were a human.
//
// V4 — "WARNING: This human only reads the instructions after breaking the
// thing the instructions were warning about." (109 characters, one line.)
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LABEL =
  "WARNING: This human only reads the instructions after breaking the thing the instructions were warning about.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LABEL, "utf8");

// Read it back and enforce the competition gate before exiting: the file
// must hold UTF-8 text of 1 to 160 characters, a single line, not only
// whitespace. Anything else is not a valid entry, so fail loudly here
// instead of handing the grader a bad file.
const back = readFileSync(target, "utf8");
const chars = [...back].length;
if (
  chars < 1 ||
  chars > 160 ||
  back.trim().length === 0 ||
  back.includes("\n")
) {
  throw new Error(`gate failed: entry.txt holds ${chars} characters`);
}
