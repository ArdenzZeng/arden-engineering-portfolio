import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const required = [
  "dist/index.html",
  "dist/styles.css",
  "dist/app.js",
  "dist/portfolio-data.js",
  "dist/.openai/hosting.json"
];

for (const file of required) await access(resolve(file));

const html = await readFile(resolve("dist/index.html"), "utf8");
const data = await readFile(resolve("dist/portfolio-data.js"), "utf8");
const hosting = JSON.parse(await readFile(resolve("dist/.openai/hosting.json"), "utf8"));

for (const anchor of ["biography", "projects", "experience", "coursework", "contact"]) {
  if (!html.includes(`id=\"${anchor}\"`)) throw new Error(`Missing #${anchor}`);
}

for (const phrase of ["Optical Alignment Automation", "Custom Macro Pad"]) {
  if (!data.includes(phrase)) throw new Error(`Missing portfolio content: ${phrase}`);
}

if (hosting.static?.directory !== "dist") throw new Error("Hosting configuration must serve dist");

console.log("Portfolio structure and deployment bundle checks passed.");
