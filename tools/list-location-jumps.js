const fs = require("fs");
const path = require("path");
const vm = require("vm");
global.window = { STORY: {} };
for (const f of ["js/story.js"].concat(
  fs.readdirSync("js/chapters").filter((n) => /^c\d+\.js$/.test(n)).sort().map((n) => "js/chapters/" + n),
  ["js/heat.js", "js/art.js"]
)) {
  vm.runInThisContext(fs.readFileSync(f, "utf8"), { filename: f });
}
const S = window.STORY;
const order = Object.keys(S);
const jumps = [];
for (const id of order) {
  const n = S[id];
  if (!n) continue;
  const dests = [];
  if (n.next) dests.push(n.next);
  (n.choices || []).forEach((c) => dests.push(c.to));
  for (const d of dests) {
    const m = S[d];
    if (!m) continue;
    const a = n.location || "";
    const b = m.location || "";
    if (a && b && a !== b) {
      jumps.push(id + " [" + a + "] -> " + d + " [" + b + "]");
    }
  }
}
console.log(jumps.join("\n"));
