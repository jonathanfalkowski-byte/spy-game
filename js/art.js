window.ART_DEFAULT = "img/art-stack-rain.png";

// Spot = the bit after the last " · ". A new room gets a new still even inside the same building.
window.ART_SPOTS = {
  kitchen: "img/art-kitchen.png",
  showers: "img/art-shower.png",
  shower: "img/art-shower.png",
  mats: "img/art-house.png",
  gallery: "img/art-gallery.png",
  bunk: "img/art-bunk.png",
  roof: "img/art-roof.png",
  "loading dock": "img/art-dock.png",
  "three rooms": "img/art-knives-hall.png",
  "lock alley": "img/art-knives-hall.png",
  corridor: "img/art-knives-hall.png",
  stair: "img/art-stair.png",
  yard: "img/art-war.png",
  "rehearsal room": "img/art-rehearsal.png",
  "industrial cut": "img/art-industrial-cut.png",
  "far stop": "img/art-plate-nine.png",
  "wet arcade": "img/art-street-fire.png",
  "news kiosk": "img/art-plate-nine.png",
  "tram island": "img/art-plate-nine.png",
  "rain deck": "img/art-voss-rain.png",
  "rain deck three": "img/art-voss-rain.png",
  "service undercroft": "img/art-voss-rain.png",
};

window.ART_RULES = [
  { re: /phone · intake|access gate|from a tram window/i, file: "img/art-title.png" },
  { re: /glass that has no plants/i, file: "img/art-glass.png" },

  { re: /\blift\b/i, file: "img/art-lift.png" },

  { re: /crowe'?s (office|inner office)|special projects|inner room/i, file: "img/art-crowe.png" },

  { re: /revelations · 41|revelations · wardrobe|revelations · booth|revelations bolt|revelations car|holding room/i, file: "img/art-revelations.png" },

  { re: /dead-drop stair|wet-iron stair/i, file: "img/art-stair.png" },

  { re: /industrial cut/i, file: "img/art-industrial-cut.png" },
  { re: /rehearsal room/i, file: "img/art-rehearsal.png" },
  { re: /house of knives · kitchen/i, file: "img/art-kitchen.png" },
  { re: /house of knives · showers/i, file: "img/art-shower.png" },
  { re: /house of knives · mats/i, file: "img/art-house.png" },
  { re: /house of knives · gallery/i, file: "img/art-gallery.png" },
  { re: /house of knives · bunk/i, file: "img/art-bunk.png" },
  { re: /house of knives · roof/i, file: "img/art-roof.png" },
  { re: /house of knives · loading dock/i, file: "img/art-dock.png" },
  { re: /house of knives · (three rooms|lock alley|corridor|stair)/i, file: "img/art-knives-hall.png" },
  { re: /house of knives · yard/i, file: "img/art-war.png" },
  { re: /house of knives/i, file: "img/art-house.png" },

  { re: /amber hotel|ives suite|helix suite|demonstration suite|zero'?s suite|green room|the suite ·|presidential/i, file: "img/art-suite.png" },
  { re: /nineteen antechamber|nineteen, antechamber/i, file: "img/art-suite.png" },

  { re: /ballroom|dance floor|gala/i, file: "img/art-ballroom.png" },
  { re: /annex wardrobe|wardrobe floor|annex · sixteen/i, file: "img/art-gala.png" },

  { re: /annex 2|wet approach|pell office|pell desk/i, file: "img/art-annex.png" },

  { re: /wing c|helix clinic|continuity ·|procedure bay|vale consult|wellness lobby|recovery alcove|clinic spine/i, file: "img/art-clinic.png" },

  { re: /conversion wing|subject zero|security cage|outside the cage|observation gallery|outside zero/i, file: "img/art-zero.png" },

  { re: /helix campus|fountain|plaza|lawn|wellness atrium|plate six · colonnade|park the size/i, file: "img/art-fountain.png" },

  { re: /kiosk · |transit kiosk · facilities|rented bath|washroom|bathroom/i, file: "img/art-mirror.png" },

  { re: /plate nine · arcade/i, file: "img/art-street-fire.png" },
  { re: /rain deck|street mouth|street edge|plate seven|undercroft|weather lip|wet asphalt|covered walk|grey car|service 4|service lanes/i, file: "img/art-voss-rain.png" },
  { re: /plate nine|far stop/i, file: "img/art-plate-nine.png" },

  { re: /\btram\b|yellow band|toward legend|toward helix|toward conversion|transit ·/i, file: "img/art-tram.png" },

  { re: /night clinic|pediatric|hospital|clinic · waiting|clinic · night|clinic · break|clinic · staff|plate four · clinic hour/i, file: "img/art-hospital.png" },

  { re: /street war|war of firms|alley throat|muzzle|clinic annex|clinic ramp|laundry court|extract car/i, file: "img/art-street-fire.png" },

  { re: /orchard|harvest|kill switch|sublevel c|export console|bosc row/i, file: "img/art-server.png" },

  { re: /rented slot|rented dark|your slot|mia'?s slot/i, file: "img/art-slot.png" },

  { re: /corridor|service stair|staff stair|printer corridor|records annex|skybridge|mezzanine/i, file: "img/art-corridor.png" },

  { re: /\bhelix\b|northbank|vendor cafe|liaison bay/i, file: "img/art-helix.png" },

  { re: /stack|yard four|wet arcade|plate edge|plate four|plate six|plate eight|civic|night market|pharmacy|overlook|river stairs|night walk/i, file: "img/art-stack-rain.png" },
];

window.spotOf = function (loc) {
  if (!loc) return "";
  let spot = String(loc).split("·").pop().trim().toLowerCase();
  spot = spot.replace(/,.*/, "").trim();
  return spot;
};

window.artFor = function (node, id) {
  if (node && node.art) return node.art;
  const loc = (node && node.location) || "";
  const spot = window.spotOf(loc);
  if (spot && window.ART_SPOTS[spot]) return window.ART_SPOTS[spot];
  for (let i = 0; i < window.ART_RULES.length; i++) {
    if (window.ART_RULES[i].re.test(loc)) return window.ART_RULES[i].file;
  }
  if (id && /^c00/.test(id)) return "img/art-title.png";
  if (id && /^c01/.test(id)) return "img/art-stack-rain.png";
  if (id && /^c0[23]/.test(id)) return "img/art-house.png";
  if (id && /^c0[4-7]/.test(id)) return "img/art-helix.png";
  if (id && /^c08/.test(id)) return "img/art-clinic.png";
  if (id && /^c09/.test(id)) return "img/art-slot.png";
  if (id && /^c10/.test(id)) return "img/art-voss-rain.png";
  if (id && /^c11/.test(id)) return "img/art-hospital.png";
  if (id && /^c12/.test(id)) return "img/art-ballroom.png";
  if (id && /^c1[34]/.test(id)) return "img/art-suite.png";
  if (id && /^c15/.test(id)) return "img/art-clinic.png";
  if (id && /^c16/.test(id)) return "img/art-annex.png";
  if (id && /^c17/.test(id)) return "img/art-zero.png";
  if (id && /^c18/.test(id)) return "img/art-street-fire.png";
  if (id && /^c19/.test(id)) return "img/art-suite.png";
  if (id && /^c20/.test(id)) return "img/art-server.png";
  if (id && /^c21/.test(id)) return "img/art-slot.png";
  if (id && /^c22/.test(id)) return "img/art-glass.png";
  return window.ART_DEFAULT;
};
