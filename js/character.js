(function () {
  const LOOKS = {
    field: {
      label: "Field cut",
      hair: "Dark brown, practical ponytail. No dye yet.",
      shoes: "Low leather ankle boots. Almost a flat.",
      femaleKit:
        "Archive coat, high collar, trousers you can run in. Conservative. Nothing that photographs as product.",
      maleKit: "Archive coat, Rivers jacket when the legend is on, boots that do not announce themselves.",
    },
    legend: {
      label: "Legend cut",
      hair: "Dark brown, neat low bun. Still her own color.",
      shoes: "Beige court pumps. Modest two-inch heel, closed toe.",
      femaleKit:
        "Grey tailored liaison suit, knee-length pencil skirt, blouse closed at the throat. Correct. Still a person in the zipper.",
      maleKit: "Liaison jacket, pressed trousers, the same boots. Helix has not rewritten the silhouette yet.",
    },
    honey: {
      label: "Honey cut",
      hair: "Dark brown with caramel highlights, loose waves to the shoulders. The first dye they call 'softening.'",
      shoes: "Nude pointed-toe stilettos, about three and a half inches. Elegant, not trashy. The walk changes.",
      femaleKit: "Merlot silk, modest slit to the knee, Ellis's pins in the lining. Honey legend, still a dress a senator could introduce.",
      maleKit: "Honey jacket: Rivers still, throat a choice, coat hanging like an invitation.",
    },
    slut: {
      label: "Depravity cut",
      hair: "Dirty blonde, longer, loosely curled. The brown is gone. Helix calls it continuity.",
      shoes: "Black strappy stilettos, thin four-and-a-half-inch heel, ankle strap. The click is the file.",
      femaleKit:
        "Short black cocktail hem, throat open, scent that reads from two meters. Lingerie Helix issued as 'continuity.'",
      maleKit: "Shirt unbuttoned too far, trousers that sit like a dare. The dye has not arrived; the cut has.",
    },
    owned: {
      label: "Staff cut",
      hair: "Dark cherry-red, sleek long blowout. Crowe's color. Not a suggestion.",
      shoes: "Black patent stilettos, red soles, five-inch stiletto. They click like a filing.",
      femaleKit: "Black silk cut to the hip, thin gold collar that is also a leash, flower at the pulse.",
      maleKit: "Black Crowe picked, collar hidden under the shirt, flower he reapplied after the wash.",
    },
    talent: {
      label: "Porn-star cut",
      hair: "Platinum blonde, high pigtails. Cheap ties. Not a salon. The last of the old color is gone.",
      shoes: "Clear PVC platform stilettos: chunky transparent platform, high thin heel, ankle strap. Stripper height. You hear them before you see her.",
      femaleKit:
        "Porn-star kit: even bigger fake tits, a collarless white crop that cannot cover them, slutty black micro-mini. Cheap club wear. Not classy. The file still bills it as talent.",
      maleKit: "Talent lock: open shirt, oiled throat, trousers that don't hide the stack. The implants wait for the next pass.",
    },
  };

  const SLEEP_NODES = {
    c03_night: true,
    c04_midweek: true,
    c06_start: true,
    c09_start: true,
    c12_start: true,
    c14_start: true,
    c15_start: true,
    c22_start: true,
  };

  function f(state) {
    return state.flags || {};
  }

  function fem(state) {
    return state.gender === "female" || f(state).transitioned;
  }

  function lookClass(state) {
    if (f(state).bimbo) return "talent";
    if (f(state).owned && state.corruption >= 50) return "owned";
    if (f(state).depraved || state.corruption >= 48) return "slut";
    if (f(state).honey || state.corruption >= 28) return "honey";
    if (state.gender === "female" || f(state).transitioned) return "legend";
    return "field";
  }

  function wornLookOf(state) {
    return (state.wornLook && LOOKS[state.wornLook] ? state.wornLook : "field");
  }

  function settleWardrobe(state) {
    state.wornLook = lookClass(state);
    return state.wornLook;
  }

  function isSleepNode(node, id) {
    if (node && node.sleep) return true;
    return !!SLEEP_NODES[id];
  }

  function lookMeta(key) {
    return LOOKS[key] || LOOKS.field;
  }

  function wardrobe(state) {
    const meta = lookMeta(wornLookOf(state));
    let line = fem(state) ? meta.femaleKit : meta.maleKit;
    if (f(state).written) line += " Ink shows at the collar or the hip, depending who dressed you.";
    if (f(state).pet) line += " A collar reads as jewelry until someone tugs.";
    return line;
  }

  function pendingLine(state) {
    const now = wornLookOf(state);
    const next = lookClass(state);
    if (now === next) return "";
    const meta = lookMeta(next);
    return (
      "Laid out for morning: " +
      meta.label.toLowerCase() +
      " — " +
      meta.hair.split(".")[0] +
      "; " +
      meta.shoes.split(".")[0] +
      ". It does not go on until you sleep."
    );
  }

  function mods(state) {
    const flags = f(state);
    const out = [];
    if (state.startGender === "male" && state.gender === "female") {
      out.push("Sex marker: female. Intake was male. Conversion is seated.");
    } else if (state.startGender === "female") {
      out.push("Intake female. The file still prefers that sex.");
    } else {
      out.push("Legal sex unchanged: male. Weather may not match the marker.");
    }
    if (flags.transitioned) out.push("Full bridge: pelvic map, breasts, voice drop, persistence on.");
    else if (flags.half) out.push("Half-work: surface, gait, scent. Old shape still in the dark.");
    else if (flags.forced_mod) out.push("Forced limited stack. Scanner reads in-process. You did not sign the large knife.");
    if (flags.depraved) out.push("Appetite / depravity stack: scent lock, easy climax, unused charge as tremor.");
    if (flags.bimbo) out.push("Talent / porn-star lock: want-to-be-seen, porn lighting in the pupils, export heading. Breast fill is seated: obviously fake, too big for the shirts they issue.");
    if (state.body >= 40 && !flags.transitioned && !flags.half) {
      out.push("Body load high. Silhouette has been argued with even if the knife was small.");
    }
    if (flags.prep) out.push("PREP still in the chemistry. Agreeable is a side effect.");
    if (!out.length) out.push("No CHRYSALIS work seated. The flinch is still yours.");
    return out;
  }

  function marks(state) {
    const flags = f(state);
    const out = [];
    if (flags.slept_crowe) out.push("Crowe: tape, stamp, or last-night watermark.");
    if (flags.owned) out.push("Flower / staffing weather. Public hand on the back.");
    if (flags.written) out.push("Ink on skin: property, product, or a joke that photographs.");
    if (flags.pet) out.push("Collar or lead. Pet grammar in a room that bills.");
    if (flags.bound) out.push("Restraint marks: wrists, throat, a desk that remembers.");
    if (flags.exhibited) out.push("Exhibition: someone watched, or a lens did.");
    if (flags.creampied) out.push("Used unfinished. Helix condom was a joke you didn't take.");
    if (flags.ganged) out.push("More than one mouth. The file calls it corroboration.");
    if (flags.masochist) out.push("Pain asked for: bite, slap, a bruise you keep as proof.");
    if (flags.ives) out.push("Ives: bruise under the watch, or the necklace Crowe wouldn't let you remove.");
    if (flags.honey) out.push("Honey track: Ellis's pins, or the cousin of that perfume.");
    return out;
  }

  function portraitSrc(state) {
    const look = wornLookOf(state);
    if (state.portraitMode === "naked") {
      if (state.gender !== "female") return "img/cast/m-field-nude.png";
      return "img/cast/f-" + look + "-nude.png";
    }
    if (state.gender !== "female") return "img/cast/m-field.png";
    return "img/cast/f-" + look + ".png";
  }

  window.characterSheet = function (state) {
    const look = wornLookOf(state);
    const meta = lookMeta(look);
    return {
      look: look,
      targetLook: lookClass(state),
      label: meta.label,
      hair: meta.hair,
      shoes: fem(state) || look !== "field" ? meta.shoes : "Low field boots. No heel yet.",
      wardrobe: wardrobe(state),
      pending: pendingLine(state),
      mods: mods(state),
      marks: marks(state),
      portrait: portraitSrc(state),
      nude: state.portraitMode === "naked",
    };
  };

  window.settleWardrobe = settleWardrobe;
  window.isSleepNode = isSleepNode;
  window.lookClass = lookClass;
})();
