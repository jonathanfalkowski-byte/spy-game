window.ART_DEFAULT = "img/art-stack-rain.png";

window.ART_RULES = [
  { re: /access gate|personnel|clearance|who you are|aftermath|glass that has no plants/i, file: "img/art-title.png" },
  { re: /inner room|clear glass|couch/i, file: "img/art-crowe.png" },
  { re: /crowe|director|41st|41\b|revelations ·|handler voss|training wing|house|ready room|kane/i, file: "img/art-revelations.png" },
  { re: /wing c|vale|clinic|chrysalis|continuity|drip|recovery/i, file: "img/art-clinic.png" },
  { re: /mirror|bathroom|shower|fog/i, file: "img/art-mirror.png" },
  { re: /rain deck|undercroft|voss in the rain|plate nine · rain/i, file: "img/art-voss-rain.png" },
  { re: /hospital|mia|plate four|pediatric|night clinic/i, file: "img/art-hospital.png" },
  { re: /gala|ballroom|annex wardrobe|dance/i, file: "img/art-gala.png" },
  { re: /suite|hotel|ives|amber|presidential/i, file: "img/art-suite.png" },
  { re: /pell|annex 2|maren/i, file: "img/art-annex.png" },
  { re: /zero|conversion wing/i, file: "img/art-zero.png" },
  { re: /war|street|muzzle|car/i, file: "img/art-war.png" },
  { re: /server|kill switch|orchard|harvest/i, file: "img/art-server.png" },
  { re: /rented|slot|last night|dumplings/i, file: "img/art-slot.png" },
  { re: /helix|lobby|soft building|liaison/i, file: "img/art-helix.png" },
  { re: /tram|stack|rain|yard four|print/i, file: "img/art-stack-rain.png" },
];

window.artFor = function (node, id) {
  if (node && node.art) return node.art;
  const blob = [id || "", (node && node.chapter) || "", (node && node.location) || "", (node && node.speaker) || ""].join(" ");
  for (let i = 0; i < window.ART_RULES.length; i++) {
    if (window.ART_RULES[i].re.test(blob)) return window.ART_RULES[i].file;
  }
  if (id && /^c0[0-2]/.test(id)) return "img/art-stack-rain.png";
  if (id && /^c0[3-7]/.test(id)) return "img/art-helix.png";
  if (id && /^c08/.test(id)) return "img/art-clinic.png";
  if (id && /^c09/.test(id)) return "img/art-mirror.png";
  if (id && /^c10/.test(id)) return "img/art-voss-rain.png";
  if (id && /^c11/.test(id)) return "img/art-hospital.png";
  if (id && /^c12/.test(id)) return "img/art-gala.png";
  if (id && /^c1[34]/.test(id)) return "img/art-suite.png";
  if (id && /^c15/.test(id)) return "img/art-clinic.png";
  if (id && /^c16/.test(id)) return "img/art-annex.png";
  if (id && /^c17/.test(id)) return "img/art-zero.png";
  if (id && /^c18/.test(id)) return "img/art-war.png";
  if (id && /^c19/.test(id)) return "img/art-helix.png";
  if (id && /^c20/.test(id)) return "img/art-server.png";
  if (id && /^c21/.test(id)) return "img/art-slot.png";
  if (id && /^c22/.test(id)) return "img/art-title.png";
  return window.ART_DEFAULT;
};
