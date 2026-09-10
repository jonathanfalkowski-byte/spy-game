const fs = require("fs");
const path = require("path");

function collect(src, ids, refs) {
  const keyRe = /^\s{4}([A-Za-z0-9_]+):\s*\{/gm;
  let m;
  while ((m = keyRe.exec(src))) ids.add(m[1]);
  const refRe = /\b(?:to|next):\s*"([^"]+)"/g;
  while ((m = refRe.exec(src))) refs.push(m[1]);
}

const ids = new Set();
const refs = [];
collect(fs.readFileSync("js/story.js", "utf8"), ids, refs);
collect(fs.readFileSync("js/heat.js", "utf8"), ids, refs);
const dir = "js/chapters";
for (const f of fs.readdirSync(dir).filter((n) => /^c\d+\.js$/.test(n))) {
  collect(fs.readFileSync(path.join(dir, f), "utf8"), ids, refs);
}

const missing = [...new Set(refs)].filter((id) => id !== "ENDING" && !ids.has(id));
console.log("nodes", ids.size);
console.log("unique refs", new Set(refs).size);
console.log("missing", missing.length ? missing.join(", ") : "none");
