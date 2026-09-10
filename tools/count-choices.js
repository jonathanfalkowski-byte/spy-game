const fs = require("fs");
const path = require("path");
const vm = require("vm");

global.window = { STORY: {} };
window = global.window;
const files = ["js/story.js"].concat(
  fs.readdirSync("js/chapters").filter((f) => /^c\d+\.js$/.test(f)).sort().map((f) => path.join("js/chapters", f)),
  ["js/heat.js"]
);
for (const f of files) {
  vm.runInThisContext(fs.readFileSync(f, "utf8"), { filename: f });
}
const STORY = window.STORY;

const nodes = Object.entries(STORY);
let choiceNodes = 0;
let options = 0;
let gated = 0;
let byChapter = {};
const targets = {};
const samples = [];

for (const [id, node] of nodes) {
  const ch = (node && node.chapter) || id.slice(0, 3);
  if (!byChapter[ch]) byChapter[ch] = { nodes: 0, choiceNodes: 0, options: 0 };
  byChapter[ch].nodes++;
  const choices = (node && node.choices) || [];
  if (!choices.length) continue;
  choiceNodes++;
  byChapter[ch].choiceNodes++;
  byChapter[ch].options += choices.length;
  options += choices.length;
  for (const c of choices) {
    if (c.require) gated++;
    targets[c.to] = (targets[c.to] || 0) + 1;
  }
  if (samples.length < 8) {
    samples.push({ id, n: choices.length, texts: choices.map((c) => c.text) });
  }
}

const continueNodes = nodes.filter(([, n]) => n.next && !(n.choices && n.choices.length)).length;
const endings = ["c22_identity", "c22_double", "c22_owned", "c22_converted", "c22_dead"].filter((id) => STORY[id]);

console.log(JSON.stringify({
  storyNodes: nodes.length,
  continueBeats: continueNodes,
  choicePoints: choiceNodes,
  totalOptions: options,
  gatedOptions: gated,
  avgOptionsPerChoice: +(options / choiceNodes).toFixed(2),
  namedEndings: endings.length,
  byChapter,
}, null, 2));
