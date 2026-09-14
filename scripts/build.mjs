import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "src");
const output = resolve(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
await mkdir(resolve(output, ".openai"), { recursive: true });
await cp(resolve(root, ".openai", "hosting.json"), resolve(output, ".openai", "hosting.json"));

console.log(`Built static portfolio in ${output}`);
