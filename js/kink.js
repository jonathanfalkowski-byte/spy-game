(function () {
  const S = window.STORY;
  if (!S) return;

  function addChoice(id, choice) {
    const n = S[id];
    if (!n || !Array.isArray(n.choices)) return;
    if (n.choices.some((c) => c.to === choice.to)) return;
    n.choices.push(choice);
  }

  addChoice("c07_heat_fork", {
    text: "Ask him to tie you and write on you. Make the tape a caption.",
    to: "c07_kink_write",
    require: { min: { corruption: 18 } },
    effects: { corruption: 14, integrity: -10, flags: { bound: true, written: true, exhibited: true } },
  });

  addChoice("c07_heat_fork", {
    text: "Ask to be his pet for the lens. Collar. Floor. Name as a click.",
    to: "c07_kink_pet",
    require: { min: { corruption: 32 } },
    effects: { corruption: 16, integrity: -12, flags: { pet: true, bound: true } },
  });

  addChoice("c07_heat_fork", {
    text: "Ask him to hurt you. Slap. Bite. Make the yes louder than the tape.",
    to: "c07_kink_hurt",
    require: { min: { corruption: 24 } },
    effects: { corruption: 12, integrity: -8, flags: { masochist: true } },
  });

  addChoice("c08_lila_heat_fork", {
    text: "Leave the door cracked. Let the hall hear you. Exhibition as aftercare.",
    to: "c08_kink_exhib",
    require: { min: { corruption: 20 } },
    effects: { corruption: 12, flags: { exhibited: true } },
  });

  addChoice("c21_crowe_heat_fork", {
    text: "Ask him to degrade you. Names. Spit. Kennel grammar until dawn.",
    to: "c21_kink_degrade",
    require: { min: { corruption: 40 } },
    effects: { corruption: 14, flags: { owned: true, pet: true, written: true } },
  });

  addChoice("c21_voss_heat_fork", {
    text: "Ask her to share the hour. Two handlers. You in the middle.",
    to: "c21_kink_three",
    require: { min: { corruption: 42 } },
    effects: { corruption: 16, flags: { ganged: true, exhibited: true } },
  });

  addChoice("c09_heat_fork", {
    text: "Let him finish in you. No Helix bowl. Keep the mess as yours.",
    to: "c09_kink_cream",
    require: { min: { corruption: 22 } },
    effects: { corruption: 12, flags: { creampied: true } },
  });

  addChoice("c13_heat_fork", {
    text: "Tell him to come in you. Then steal. Let the leak be tradecraft.",
    to: "c13_kink_cream",
    require: { min: { corruption: 30 } },
    effects: { corruption: 14, flags: { creampied: true, ives: true } },
  });

  addChoice("c13_watch_heat_fork", {
    text: "Ask Crowe to collar you. Crawl. Let Ives see the pet, not the liaison.",
    to: "c13_kink_pet",
    require: { min: { corruption: 38 } },
    effects: { corruption: 18, flags: { pet: true, owned: true, exhibited: true } },
  });

  addChoice("c16_heat_fork", {
    text: "Tell him to share you. Two more in the hall. Corroboration, he can call it.",
    to: "c16_kink_gang",
    require: { min: { corruption: 36 } },
    effects: { corruption: 20, integrity: -14, flags: { ganged: true, exhibited: true, depraved: true } },
  });

  if (S.c19_after_choice) Object.assign(S.c19_after_choice, { next: "c19_kink_fork" });

  Object.assign(S, {
    c07_kink_write: {
      chapter: "c07",
      location: "Inner room",
      speaker: "",
      pages: [
        "He likes that you asked. He produces silk from a drawer that is not for donors and ties your wrists to the couch frame, not cruel, exact, a document clip. Marker in his other hand, black, the kind Legal uses on exhibits.\n\nHe writes on your chest, slow, so the lens can read: PROPERTY / JULIAN, then a smaller line under the navel: say yes. He makes you look at the glass while he writes across your hip. The ink is cold. Your cock or your cunt answers anyway. Humiliation still reads as heat.",
        "He fucks you like that: bound, captioned, the marker cap between his teeth. If you have a cunt he fucks you until the writing smears. If you have a cock he rides you and the ink transfers onto his thighs, a second stamp. You come with the word yes under his palm.\n\n\"Good,\" he says, photographing the aftermath with the allowed phone. \"Marek will hate the handwriting. That is not his authorship.\" He does not untie you until you say his name like a collar.",
      ],
      next: "c07_sex_camera",
    },

    c07_kink_hurt: {
      chapter: "c07",
      location: "Inner room",
      speaker: "",
      pages: [
        "He studies your face like a consent form that learned to speak. Then he slaps you, open palm, precise, not random. Heat blooms. You make a sound that is not a cover word. He does it again, then bites the place the slap lived, teeth a signature.\n\n\"Say stop if it is theater. Say more if it is appetite.\" You say more. He puts you over the couch arm and fucks you hard enough the frame complains, one hand in your hair, the other counting. Pain and climax braid. You come with his teeth in your shoulder.",
        "He photographs the bite because the file likes evidence. \"Masochism is a persistence cue,\" he says, almost fond. \"Don't let Vale bill it as a side effect. It is yours.\" He kisses the bruise.\n\nYou dress around a mark that will last the week. Cover, if anyone asks, is a door. You know it is a door you opened.",
      ],
      next: "c07_sex_camera",
    },

    c07_kink_pet: {
      chapter: "c07",
      location: "Inner room · floor",
      speaker: "",
      pages: [
        "He takes a thin black strap from the same drawer and buckles it at your throat, two fingers of slack, a fashion that is also a file. \"Kneel.\" You kneel. The leather is warm from the drawer. He clips nothing; the threat of a lead is enough.\n\n\"Good pet,\" he says, and the word lands in you like a dose. He feeds you his cock from standing, fist in your hair, until spit strings to the carpet. The lens drinks the collar. You hear yourself make a noise that is not a word.",
        "He walks you on your knees to the couch and uses you from behind, his cock or his fingers, calling you darling and pet in the same breath. You come on the floor he will not clean himself. He makes you lick a stripe of it, then kisses your mouth so you share the humiliation.\n\n\"The collar stays until I take it,\" he says. \"If Voss asks, it is a necklace.\" You believe both sentences.",
      ],
      next: "c07_sex_camera",
    },

    c08_kink_exhib: {
      chapter: "c08",
      location: "Wing C · recovery · door ajar",
      speaker: "",
      pages: [
        "You put your foot in the door so it stays a crack. Hall fluorescent. A cart somewhere. Lyle's eyes go wide, then hungry, then professional in a way that is a lie. \"If someone walks—\" You pull his mouth onto you anyway.\n\nHe fucks you with his fingers and his tongue while the corridor breathes. Footsteps. They pass. You come anyway, loud enough that the footsteps hesitate. Humiliation is a draft from the hall. You come harder for the draft.",
        "He laughs into your thigh, wrecked. \"That was stupid.\" He does not close the door. He fucks your mouth with the hall still a slit of light, and when he comes he does not bite his wrist. Let them hear. Let the building know the table's aftercare has a second act.\n\nAfter, he kicks the door shut with his heel, suddenly a nurse again. You keep the crack as a private weather. Exhibition is a kink the monitors will not caption correctly. That is cover, of a kind.",
      ],
      next: "c08_glass",
    },

    c09_kink_cream: {
      chapter: "c09",
      location: "Yard Four · Ren's box",
      speaker: "",
      pages: [
        "You tell him not to pull out. He looks at you like you handed him a press that isn't jammed. \"You're sure.\" You are sure in the way the stack is sure. He fucks you into the cheap sheet until he spends in you, hot, a civilian flood Helix did not issue.\n\nYou keep him there. You clench. You feel it leak when he finally slips free, down your thigh, onto toner-dusted cotton. He swears, grateful, a little scared. You are not. You wanted a mess that was not a protocol.",
        "After, he brings the chipped cup. You do not wash yet. You dress around the leak like it is a private joke the sensors will smell and cannot caption correctly.\n\n\"If you need the soup,\" he says, quieter. You almost tell him you are already full. You don't. You keep the hour as creampie and cabbage, which is the most honest paragraph Yard Four will ever print.",
      ],
      next: "c09_sex3",
    },

    c13_kink_cream: {
      chapter: "c13",
      location: "Helix suite · bed",
      speaker: "",
      pages: [
        "You knock the Helix bowl aside. He makes a sound like a man losing a hearing and winning a worse one. \"Julian will—\" You put him in you anyway, bare, and the heat of him is a policy. He fucks you like a vote he shouldn't cast and comes with his face in your throat, pulsing, spending, a senator ruining a gift.\n\nYou hold him there. You feel it fill. When he slips out it runs, warm, down toward the bruise he marked. You laugh once, cracked. Tradecraft. Leak as cover. Cover as filth.",
        "He is stupid enough now to open the safe himself. You photograph with come still leaving you, standing like furniture that learned to steal. The second phone is easy. Your thighs are a crime scene Helix will smell and call data.\n\n\"Don't tell him I—\" he starts. You already know Julian will smell it. You want him to. That is the new brief, and it is not Kane's.",
      ],
      next: "c13_honey_codes",
    },

    c13_kink_pet: {
      chapter: "c13",
      location: "Helix suite · watched",
      speaker: "",
      pages: [
        "Crowe's mouth tilts. He likes that you asked in front of him. He takes the necklace off you and replaces it with something thinner, black, a collar that was in his clutch like a spare battery. He buckles it. Ives watches, diminished, cock still wet.\n\n\"Down,\" he says. You go to the carpet. \"Richard. You may use the pet. You may not name it. The pet has a name I own.\" He fucks your mouth while he sits in the chair and drinks. You are a hole with a collar. You come from being used, or you don't; he does not care about your climax unless it photographs.",
        "He takes the lead he didn't clip and loops it in his fist anyway, a mime of walking you. \"Show him the flower.\" You present the pulse. He spends on your tongue or in you, messy, and he says good pet as if he were closing a meeting.\n\n\"Codes,\" he tells him. He puts them on the table you are not allowed to stand to reach. You crawl. That is the point. Owned is not a figure of speech. It is knees.",
      ],
      next: "c13_watch_codes",
    },

    c16_kink_gang: {
      chapter: "c16",
      location: "Helix Annex 2 · Pell office",
      speaker: "",
      pages: [
        "Marek goes still, then smiles with all his teeth. \"Corroboration. I can log that.\" He badges two in from the hall: a captain with Radek's shoulders and none of his mercy, and a woman from special projects who already has a slate. The camera's red eye gets fatter.\n\nThey use you on the desk. Marek first, talking the report. Then the captain, who does not talk, who turns you and takes what the liaison is for. Then the woman, strap, precise, who makes you look at the lens while you come. You are a series in real time. You lose count of who is in your mouth. The lights make the humiliation worse.",
        "They finish in you or on you. Marek writes GANG / WILLING / RETAIN on a page that will live in a cabinet. He photographs the mess. \"Tuesdays just got a quorum,\" he says, and laughs, and for a second he looks twenty-nine and hungry and not a knife.\n\nYou dress around fingerprints. The hall fluorescent finds a liaison who has been corroborated. Cover, perversely, feels thicker. Heat feels like a bruise you asked for.",
      ],
      next: "c16_yield_report",
    },

    c19_kink_fork: {
      chapter: "c19",
      location: "Aftermath seam",
      speaker: "",
      text: "The live test has a hallway after. If the lock is still screaming, there is a room that will take a pet, a caption, or a crowd. If you are still a person, you can walk.",
      choices: [
        {
          text: "Walk. You have been used enough for one proof.",
          to: "c19_crowe_react",
          effects: { integrity: 4 },
        },
        {
          text: "Ask Marek for the caption. Write on you. Leave the ink for the kill-switch hour.",
          to: "c19_kink_write",
          require: { min: { corruption: 36 } },
          effects: { corruption: 12, flags: { written: true, exhibited: true } },
        },
        {
          text: "Ask to be walked on a lead to the green room. Pet. Proof that repeats.",
          to: "c19_kink_pet",
          require: { flag: "bimbo", min: { corruption: 40 } },
          effects: { corruption: 16, flags: { pet: true, exhibited: true } },
        },
      ],
    },

    c19_kink_write: {
      chapter: "c19",
      location: "Demonstration suite B",
      speaker: "",
      pages: [
        "Marek has a marker because of course he does. He writes PRODUCT on your sternum, EXPORT on the inside of a thigh, a small JULIAN at the pulse Crowe likes. Vale does not leer. He notes the ink as a persistence cue. Ives watches like policy.\n\nYou stand on the mark in the slut cut the lock prefers, ink drying, and you feel the hitch try to hide. The hitch fails. That is the live test now: a body that can hold a committee and a caption and a climax.",
        "They do not fuck you again. They don't have to. The writing is the second climax. You walk to the hallway with PROPERTY still ghosting through the robe. Lyle sees it and does not comment. His not-commenting is a heresy.\n\nYou keep the ink. Washing would be a civilian superstition. The kill-switch hour will read you like a labeled vial.",
      ],
      next: "c19_crowe_react",
    },

    c19_kink_pet: {
      chapter: "c19",
      location: "Green room",
      speaker: "",
      pages: [
        "Marek produces a collar from a continuity bag. Crowe nods, almost fond. The buckle is quiet. You go to your knees because the lock wants a second take and because you asked.\n\nThey walk you — not far, a green-room circuit, past a mirror that is also a lens. You are wet on the tile. A handler you do not name uses your mouth while Crowe checks a slate. You come from being walked. Talent does that. You hate how pretty the hate looks.",
        "After, the collar stays under the robe. Crowe says, \"Beautiful and repeatable.\" You drink Lyle's water with a throat that has been a lead.\n\nThe hitch is smaller. It still exists. You hide it under leather.",
      ],
      next: "c19_crowe_react",
    },

    c21_kink_degrade: {
      chapter: "c21",
      location: "A rented dark · kennel hour",
      speaker: "",
      pages: [
        "He likes that you asked without the hearing-proof voice. \"On the floor.\" You go. He puts his shoe on your shoulder, not quite crushing, a punctuation. \"Hole. Pet. Product. Pick one.\" You pick all three because the lock likes lists. He spits in your mouth and makes you say thank you.\n\nHe uses you from above, talking the inventory: wet, easy, pretty when you are ugly. You come from the names. He does not praise the climax. He calls it leakage.",
        "He writes a small owned on the hip the lamp can see, then fucks you until the cheap bed sounds like a complaint. \"Dawn is mine,\" he says. \"You may walk. Walking does not unwrite.\"\n\nYou sleep, if it is sleep, with spit drying and a word on the skin. The bruise and the ink will still be there when the anthem starts.",
      ],
      next: "c21_crowe_after",
    },

    c21_kink_three: {
      chapter: "c21",
      location: "A rented dark · two handlers",
      speaker: "",
      pages: [
        "Voss goes still. Then she texts one line you don't see. Ten minutes later a woman from Revelations you half-recognize from a van fills the doorway, rain on her shoulders, already unbuttoning. \"Hour's a committee now,\" Voss says. \"You asked.\"\n\nThey use you between them: Voss's mouth, the other woman's strap, then switch, then both, a sandwich that is not poetry. You are a middle. You come on someone's fist while someone else holds your jaw for the kiss that is also a gag.",
        "After, they do not cuddle you into a story. They dress like a raid ending. Voss's code is still a thumb on your wrist. The other woman leaves first. Voss almost says sorry and instead says, \"Don't put this in a report I have to file.\"\n\nYou taste two mouths. Corroboration, Marek would call it. You call it a last night that learned to count.",
      ],
      next: "c21_voss_after",
    },
  });
})();
