const fs = require("fs");
const vm = require("vm");
global.window = { STORY: {} };
for (const f of fs.readdirSync("js/chapters").filter((n) => /^c\d+\.js$/.test(n)).sort()) {
  vm.runInThisContext(fs.readFileSync("js/chapters/" + f, "utf8"), { filename: f });
}
const S = window.STORY;
for (let i = 2; i <= 22; i++) {
  const id = "c" + String(i).padStart(2, "0");
  const st = S[id + "_start"];
  const en = S[id + "_end"] || S[id + "_start"];
  const t = (n) => {
    if (!n) return "(missing)";
    const p = n.pages ? n.pages[0] : n.text;
    return String(p || "").replace(/\s+/g, " ").slice(0, 180);
  };
  console.log("\n== " + id + " START [" + (st && st.location) + "]");
  console.log(t(st));
  if (S[id + "_end"]) {
    console.log("-- END [" + S[id + "_end"].location + "]");
    const pages = S[id + "_end"].pages;
    const last = pages ? pages[pages.length - 1] : S[id + "_end"].text;
    console.log(String(last || "").replace(/\s+/g, " ").slice(0, 180));
  }
}
