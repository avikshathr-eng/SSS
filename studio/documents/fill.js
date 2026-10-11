// Fills a Structure and Sky Studios document template and renders it to PDF.
//
//   node fill.js <template.html> <job.json> <outDir>
//
// Values come from studio.json (fixed business details) merged with job.json (per project).
// Keys are the placeholder text WITHOUT brackets, e.g. "Project name" fills "[Project name]".
// A string replaces every occurrence. An array fills the occurrences in order of appearance
// (used for the repeated "$0,000.00" amount). Empty strings are ignored, so the placeholder
// stays visible. Replaced text loses its brass highlight. Leftover placeholders are listed.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const [tpl, jobFile, outDir] = process.argv.slice(2);
if (!tpl || !jobFile || !outDir) {
  console.error("usage: node fill.js <template.html> <job.json> <outDir>");
  process.exit(1);
}
const here = __dirname;
const read = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const values = { ...read(path.join(here, "studio.json")), ...read(jobFile) };

let html = fs.readFileSync(path.join(here, tpl), "utf8");
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const htmlEsc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

for (const [key, val] of Object.entries(values)) {
  if (key.startsWith("_")) continue;
  const token = esc("[" + key + "]");
  // matches the token plus the opening tag of the highlight wrapper just before it
  const wrapped = new RegExp(`(<[a-z]+[^>]*class="[^"]*?)\\bph\\b([^"]*"[^>]*>)(\\s*)${token}`, "g");
  const queue = Array.isArray(val) ? [...val] : null;
  const next = () => {
    if (queue) return queue.length ? queue.shift() : "";
    return val;
  };
  const apply = (_m, a, b, ws) => {
    const v = next();
    return v === "" || v == null ? _m : `${a}${b}${ws}${htmlEsc(v)}`;
  };
  html = html.replace(wrapped, apply);
  // any remaining bare occurrences (no highlight wrapper)
  html = html.replace(new RegExp(token, "g"), (m) => {
    const v = next();
    return v === "" || v == null ? m : htmlEsc(v);
  });
}

// tidy: class="" or class=" r " left behind after removing "ph"
html = html.replace(/ class="\s*"/g, "").replace(/class="\s+([^"]*?)\s*"/g, 'class="$1"');
// outputs live two folders below documents/, assets stay in documents/assets
html = html.replace(/(href|src)="assets\//g, '$1="../../assets/');

fs.mkdirSync(outDir, { recursive: true });
const base = path.basename(tpl, ".html");
const outHtml = path.join(outDir, base + ".html");
const outPdf = path.join(outDir, base + ".pdf");
fs.writeFileSync(outHtml, html);

const chrome = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((p) => fs.existsSync(p));
if (!chrome) throw new Error("Chrome or Edge not found");
try {
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${path.resolve(outPdf)}`,
    "file:///" + path.resolve(outHtml).replace(/\\/g, "/"),
  ], { stdio: "ignore" });
} catch (e) { /* Chrome can exit non-zero on harmless registry warnings; check the file below */ }
if (!fs.existsSync(outPdf)) throw new Error("PDF was not created");

const left = [...new Set([...html.matchAll(/\[[^\[\]<>\n]{1,90}\]/g)].map((m) => m[0]))];
console.log("Wrote", outPdf);
console.log(left.length ? "Placeholders still open:\n  " + left.join("\n  ") : "No placeholders left.");
