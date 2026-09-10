const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "js", "chapters");
let total = 0;
for (const name of fs.readdirSync(dir).filter((f) => f.endsWith(".js"))) {
  const src = fs.readFileSync(path.join(dir, name), "utf8");
  const strings = [];
  const pageRe = /pages:\s*\[([\s\S]*?)\]/g;
  let m;
  while ((m = pageRe.exec(src))) {
    const inner = m[1].match(/"((?:\\.|[^"\\])*)"/g) || [];
    inner.forEach((s) => strings.push(JSON.parse(s)));
  }
  const textRe = /text:\s*"((?:\\.|[^"\\])*)"/g;
  while ((m = textRe.exec(src))) strings.push(JSON.parse('"' + m[1] + '"'));
  const words = strings.join(" ").split(/\s+/).filter(Boolean).length;
  total += words;
  console.log(name.padEnd(12), words);
}
console.log("TOTAL", total);
