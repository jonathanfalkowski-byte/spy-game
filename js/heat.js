(function () {
  window.STORY = window.STORY || {};
  const S = window.STORY;

  if (S.c07_sex_mouth) Object.assign(S.c07_sex_mouth, { next: "c07_heat_fork" });
  if (S.c08_m_full3) Object.assign(S.c08_m_full3, { next: "c08_heat_newbody" });
  if (S.c08_m_half2) Object.assign(S.c08_m_half2, { next: "c08_heat_newbody" });
  if (S.c08_m_force3) Object.assign(S.c08_m_force3, { next: "c08_heat_newbody" });
  if (S.c08_f_dev2) Object.assign(S.c08_f_dev2, { next: "c08_heat_newbody" });
  if (S.c08_f_min2) Object.assign(S.c08_f_min2, { next: "c08_heat_newbody" });
  if (S.c08_lila_yes) Object.assign(S.c08_lila_yes, { next: "c08_lila_heat_fork" });
  if (S.c09_sex2) Object.assign(S.c09_sex2, { next: "c09_heat_fork" });
  if (S.c13_honey_m) Object.assign(S.c13_honey_m, { next: "c13_heat_fork" });
  if (S.c13_honey_f) Object.assign(S.c13_honey_f, { next: "c13_heat_fork" });
  if (S.c13_watch_m) Object.assign(S.c13_watch_m, { next: "c13_watch_heat_fork" });
  if (S.c13_watch_f) Object.assign(S.c13_watch_f, { next: "c13_watch_heat_fork" });
  if (S.c16_yield_fuck) Object.assign(S.c16_yield_fuck, { next: "c16_heat_fork" });
  if (S.c16_lite) Object.assign(S.c16_lite, { next: "c16_heat_fork" });
  if (S.c21_mia_sex2) Object.assign(S.c21_mia_sex2, { next: "c21_mia_heat_fork" });
  if (S.c21_voss_sex2) Object.assign(S.c21_voss_sex2, { next: "c21_voss_heat_fork" });
  if (S.c21_crowe_sex2) Object.assign(S.c21_crowe_sex2, { next: "c21_crowe_heat_fork" });

  Object.assign(S, {
    c07_heat_fork: {
      chapter: "c07",
      location: "Inner room",
      speaker: "Julian Crowe",
      text: "He wipes your mouth with his thumb and looks at the lens like a third person in the bed.\n\n\"The tape has a spine,\" he says. \"I can stop at spine. Or I can make you filthy enough that no lawyer calls it acting.\"",
      choices: [
        {
          text: "Spine only. Get the recording and get dressed.",
          to: "c07_sex_bed",
          effects: { integrity: 4 },
        },
        {
          text: "Let him wreck you for the lens. You want it on the record.",
          to: "c07_heat_wreck1",
          effects: { corruption: 12, integrity: -8, flags: { slept_crowe: true } },
        },
        {
          text: "Ask him to keep you on the floor until you can't talk.",
          to: "c07_heat_floor1",
          require: { min: { corruption: 35 } },
          effects: { corruption: 16, integrity: -12, flags: { depraved: true } },
        },
      ],
    },

    c07_heat_wreck1: {
      chapter: "c07",
      location: "Inner room",
      speaker: "",
      pages: [
        "He puts you on your knees facing the glass. The pupil is a black coin. He stands over you, shirt gone, and feeds you his cock slow, then mean, his fist in your hair so the camera gets your eyes watering.\n\n\"Look at it while you eat me,\" he says. \"I want playback to show you knew who was watching.\" You look. You lick. He tastes like salt and expensive soap. When he grinds, your nose is in him and you can't breathe except when he lets you.",
        "He comes on your tongue with a hiss through his teeth, then pulls you off by the hair and slaps your cheek once, light, possessive, not a beating. \"Again. Deeper.\" He fucks your mouth with his hips until spit runs down your chin onto your chest. The lens drinks it.\n\nWhen he is shaking he pushes you onto your back and fucks your mouth from above. You hold his thighs because falling would look like refusal. He uses your throat until a second orgasm wrecks his composure. For one second he is just a man coming. Then he is Crowe again.",
      ],
      next: "c07_heat_wreck2",
    },

    c07_heat_wreck2: {
      chapter: "c07",
      location: "Inner room",
      speaker: "",
      pages: [
        "He turns around and takes you with his hand, then his mouth, filthy and precise. If you have a cock he sucks you until you are leaking on his tongue and he stops, holds you there, looks at the glass. \"Don't you dare come until I say.\" You last because the tape can ruin you.\n\nIf you have a cunt he spreads you with two fingers and sucks your clit like he is extracting a confession. You try to stay quiet. He won't allow quiet. \"Give me the sound. Pleasure is harder to argue with in court.\"",
        "He lets you come with his fingers in you and his other hand on your throat, not choking, placing. You soak his wrist or spend on his tongue. He shows the wet to the lens like evidence.\n\nThen he fucks you: fingers, his cock, already hard, no drawer required, or he turns you and fucks you until the couch complains. He makes you say yes, {{name}}, look at the glass, I want this. You say it. You almost mean it. That is the point of the recording.",
      ],
      next: "c07_sex_camera",
    },

    c07_heat_floor1: {
      chapter: "c07",
      location: "Inner room · floor",
      speaker: "",
      pages: [
        "He laughs, pleased, and points at the carpet. \"On your back. Legs open. I am going to use you like a toy that signed a form.\" You go down. The floor is hard. He kneels over your mouth first, then crawls down and fucks you, grinding until your thoughts thin to wet heat.\n\nHe spits on you. He talks dirty in the same voice he uses on donors. \"This is what you are now. A mouth. A hole. A pretty problem I get to solve on camera.\" You moan. He watches the moan like evidence.",
        "He fucks you until you come once, then doesn't stop. Overstimulation makes you twist; he pins your wrists with one hand and keeps going. \"Good. Ugly. I want ugly. Pretty is deniable.\"\n\nWhen you start crying he kisses the tears and keeps his fingers in you. He makes you lick them clean after. Then he puts those fingers in his own mouth, looking at the lens, and smiles with his teeth. \"Mine,\" he tells the tape. You believe him.",
      ],
      next: "c07_sex_camera",
    },

    c08_heat_newbody: {
      chapter: "c08",
      location: "Wing C · table",
      speaker: "Lyle",
      text: "The work is seated. Your new nerves are still ringing. Lyle's glove is off. Vale has stepped out to dictate.\n\n\"You can wait for aftercare,\" he says quietly. \"Or you can feel it now, while it's screaming, so the first orgasm isn't in a Helix tram.\"",
      choices: [
        {
          text: "Wait. You will not come on their table.",
          to: "c08_recovery",
          effects: { integrity: 6 },
        },
        {
          text: "Touch yourself. Learn the new wiring in front of him.",
          to: "c08_heat_touch",
          effects: { corruption: 10, body: 4 },
        },
      ],
    },

    c08_heat_touch: {
      chapter: "c08",
      location: "Wing C · table",
      speaker: "",
      pages: [
        "He doesn't help at first. He watches. You slide a hand between your legs. If they gave you a cunt it is swollen, slick with their gel and your own want, clit so loud a brush makes your hips jump. You rub in small circles and hate how fast you get there.\n\nIf they left you a cock it is wet at the tip, too sensitive, and your chest aches when you stroke. You come in a few minutes like a teenager, shaking, making a noise the monitors log as 'bridge response.'",
        "Lyle's breath catches. \"Again,\" he whispers. \"Slower. Find what isn't the bag.\" You try. Second time takes longer. You finger yourself or stroke until your thighs shake and you soak the pad. He finally puts his ungloved fingers over yours and steers.\n\nYou come on his hand with your other fist in your mouth. He tastes his fingers after, clinical and not. \"That's yours,\" he says. \"Remember the difference.\"",
      ],
      next: "c08_recovery",
    },

    c08_lila_heat_fork: {
      chapter: "c08",
      location: "Wing C · recovery",
      speaker: "Lyle",
      text: "He is still on the bed, mouth wet, smock wrinkled. The lock is still red.\n\n\"That was aftercare,\" he says. \"If you want filthy, say so. I will still be a nurse in the morning. Tonight I can be a mouth.\"",
      choices: [
        {
          text: "Enough. Tea. You need a person, not another protocol.",
          to: "c08_glass",
          effects: { integrity: 4 },
        },
        {
          text: "Stay. Fuck you like you aren't on shift.",
          to: "c08_lila_filth",
          effects: { corruption: 10, heat: 6 },
        },
      ],
    },

    c08_lila_filth: {
      chapter: "c08",
      location: "Wing C · recovery",
      speaker: "",
      pages: [
        "He strips the smock. Under it he is twenty-eight, narrow-hipped, a scar on his knee, hair coming down. He kisses you like he is stealing something Vale owns. You put him on his back and eat him until he fists the cheap pillow and comes on your tongue, biting his own wrist to stay quiet.\n\nThen he rolls you and fucks you, or he puts his cock in your mouth again, selfish, shaking, whispering filthy nurse things: how wet the table made you, how he wanted to put his mouth on you during the drip, how he is going to hell and he does not care.",
        "If you have a cunt he fucks you with four fingers, then his mouth, then a toy from a locked drawer that is definitely not on the aftercare pamphlet. He makes you come until you push at his head and he only slows, not stops. \"One more. For you. Not for him.\"\n\nYou break. You soak his chin. He laughs into you, wrecked. After, you lie in Helix lighting that was never meant for this, smelling like sex and antiseptic. He puts the smock back on and becomes a function. You keep the memory anyway.",
      ],
      next: "c08_glass",
    },

    c09_heat_fork: {
      chapter: "c09",
      location: "Yard Four · Ren's box",
      speaker: "",
      text: "He is still inside the hour. Ink on your hip. Soup on his breath.\n\nYou can leave as a person who stole one kind thing. Or you can stay and be greedy with a stranger who does not know your file.",
      choices: [
        {
          text: "Get dressed. Keep it as one hour.",
          to: "c09_sex3",
        },
        {
          text: "Stay. Make him use you until the tram schedule is a joke.",
          to: "c09_heat_more",
          effects: { corruption: 10, integrity: -4 },
        },
      ],
    },

    c09_heat_more: {
      chapter: "c09",
      location: "Yard Four · Ren's box",
      speaker: "",
      pages: [
        "You pull him back down. You tell him not to be careful. He swears, grateful, and fucks you harder, the cheap bed knocking the wall. You get on top and use his cock, or you sit on his face until your thighs shake and he has to tap out to breathe.\n\nHe comes on your tits or in you, depending what you allow. You make him watch you finish yourself after, two fingers, looking at him. \"Say my name.\" He says {{name}} like a prayer he didn't know.",
        "Round three is slower, meaner in a sweet way: his thumb on your clit while he's in you, or his fist slick around you while he kisses your mouth. You come ugly. He laughs, forehead to yours. \"You're going to kill me.\"\n\nYou almost sleep. You don't. People who sleep in Yard Four become stories. You kiss him once more, deep, and then you start looking for the coat.",
      ],
      next: "c09_sex3",
    },

    c13_heat_fork: {
      chapter: "c13",
      location: "Helix suite · bed",
      speaker: "",
      text: "Ives is stupid with it now: open mouth, wet cock, codes leaking out of him between breaths. The job is done enough to steal.\n\nYou can take the safe and go. Or you can let a fifty-eight-year-old senator use you like the gift Crowe wrapped.",
      choices: [
        {
          text: "Get the codes. That was the brief.",
          to: "c13_honey_codes",
          effects: { cover: 6 },
        },
        {
          text: "Stay in his lap. Let him finish in your mouth. Then steal.",
          to: "c13_heat_more",
          effects: { corruption: 12, flags: { ives: true } },
        },
        {
          text: "Ask him to talk while he fucks your throat. Get every number.",
          to: "c13_heat_throat",
          require: { min: { corruption: 40 } },
          effects: { corruption: 14, integrity: -8 },
        },
      ],
    },

    c13_heat_more: {
      chapter: "c13",
      location: "Helix suite · bed",
      speaker: "",
      pages: [
        "You stay. He groans like you gave him a vote. You suck him until he is kicking the sheets, then you let him push your head, not quite cruel. He tastes like latex and whiskey-sweat. When he comes you swallow because spit on Helix sheets is a photograph waiting to happen.\n\nHe pets your hair, disgusting and sincere. \"Julian picks well.\" You hate how the praise lands in your gut as heat.",
        "He gets hard again, old-man miracle, PREP or fear or you. He fucks you from behind, talking: export windows, a colleague's name, the safe backwards. You store it between the slaps of skin. You come or you don't; he does not care enough to be insulted.\n\nWhen he rolls off, the second phone is still in the trousers. Now you go get it, mouth wet, thighs wet, looking like the job.",
      ],
      next: "c13_honey_codes",
    },

    c13_heat_throat: {
      chapter: "c13",
      location: "Helix suite · bed",
      speaker: "",
      pages: [
        "You put him on his back and take him down your throat until your eyes water. \"Talk,\" you rasp when you come up. He talks. Numbers. Ports. The daughter's Sunday, which you did not ask for. You go back down so you don't have to look at him while he spends a child in a sentence.\n\nHe holds your head and fucks your mouth in short, grateful thrusts. You gag. You stay. The codes keep coming. This is the brief wearing a cock.",
        "He finishes with a broken sound. You don't swallow this time; you let it run down your chin so he sees what he did. He looks wrecked. You look like a weapon.\n\n\"Safe,\" you say. He opens it himself, hands shaking. That is easier than stealing. You photograph everything. You do not kiss him goodbye.",
      ],
      next: "c13_honey_codes",
    },

    c13_watch_heat_fork: {
      chapter: "c13",
      location: "Helix suite · watched",
      speaker: "Julian Crowe",
      text: "He has not joined. He could. The chair is a choice he is offering you with his eyes.",
      choices: [
        {
          text: "Let him stay in the chair. Being watched is enough.",
          to: "c13_watch_codes",
        },
        {
          text: "Ask him to get on the bed. Two mouths. One file.",
          to: "c13_watch_join",
          effects: { corruption: 16, flags: { owned: true, slept_crowe: true } },
        },
      ],
    },

    c13_watch_join: {
      chapter: "c13",
      location: "Helix suite · bed",
      speaker: "",
      pages: [
        "Crowe stands, undresses without hurry, and the room becomes a hierarchy you can taste. He kisses Ives first, to remind him he is furniture, then he kisses you, deeper, thumb on your teeth, spit shared like a stamp.\n\nHe puts your mouth on his cock while Ives fucks you. You are a sandwich of use: senator in you, director on your tongue, wet, loud, instructed. Ives obeys. You come with Crowe's cock on your lip and Ives in you and Crowe's voice saying mine.",
        "He takes Ives' place and fucks you, while Ives watches, diminished, stroking himself like a man at a meeting he no longer chairs. He makes you look at him while you come a second time, messy, unpretty. \"See? Even the vote is mine.\"\n\nAfter, he wipes you with a hotel cloth like a signature drying. \"Codes on the table. {{name}} does not kneel for you, Richard. They kneel for me.\" He puts the card where he points. You are shaking. You are also, horribly, proud.",
      ],
      next: "c13_watch_codes",
    },

    c16_heat_fork: {
      chapter: "c16",
      location: "Helix Annex 2 · Pell office",
      speaker: "Marek Pell",
      text: "He is still on you, slate in reach, pulse stupid. The camera's red eye is fat.\n\n\"Once can have a footnote,\" he says. \"Say no and we dress. Say yes and I put you on the desk and I file the sound.\"",
      choices: [
        {
          text: "Dress. Once was the deal.",
          to: "c16_yield_report",
          effects: { integrity: 4 },
        },
        {
          text: "Desk. Footnote. Let him write the wet into the minutes.",
          to: "c16_heat_desk",
          effects: { corruption: 10, flags: { depraved: true } },
        },
      ],
    },

    c16_heat_desk: {
      chapter: "c16",
      location: "Helix Annex 2 · Pell desk",
      speaker: "",
      pages: [
        "He clears the slate with one arm and puts you on the wood. Cold laminate on your back. He spreads your legs and eats you or sucks you with hungry, unpretty sounds, then stands and fucks you against the edge, knit still half on, watching the door like a professional even while he moans.\n\n\"Say my name,\" he orders. You say Marek. He slams in harder. \"Again.\" You say it until it is a rhythm.",
        "He flips you and takes you from behind, one hand on the back of your neck, the other recording a voice memo: time, cooperative, vocalization, second climax. You come on his fingers with your cheek on a folder labeled SPECIAL PROJECTS.\n\nShe comes with his teeth in your shoulder, then laughs into the microphone. \"End note.\" He pulls out, wipes you with a memo he will shred, and kisses your mouth. \"Tuesdays just got longer. Dress. You look like my report.\"",
      ],
      next: "c16_yield_report",
    },

    c21_mia_heat_fork: {
      chapter: "c21",
      location: "A rented dark · bed",
      speaker: "Mia",
      text: "She is still around you, or still tasting you, dumplings forgotten. Her mark is on her throat.\n\n\"We can stop,\" she says. \"Or you can let me have you like I have wanted since you were just a stupid joke on Sundays. No firms. Just us being greedy.\"",
      choices: [
        {
          text: "Hold her. Let the one time be enough.",
          to: "c21_mia_after",
          effects: { integrity: 4 },
        },
        {
          text: "Stay in her. Be greedy. Forget the heading for an hour.",
          to: "c21_mia_more",
          effects: { integrity: 2, corruption: 4 },
        },
      ],
    },

    c21_mia_more: {
      chapter: "c21",
      location: "A rented dark · bed",
      speaker: "",
      pages: [
        "You stay. She laughs, wet, and rolls you so she can ride, slow, watching your face like vitals. She is vocal now, not night-shift quiet: fuck, there, don't you dare freeze. You thumb her clit while she's on you and she comes shaking, then keeps moving, greedy, a little mean in a way you love.\n\nYou put her on her back and fold her legs up and fuck her like you mean to live here. She tells you she loves you in a wrecked whisper and then swears at you for making her say it. You say it back or you kiss her so you don't have to. Either way she comes again, crying, holding your ears.",
        "After the third time you are both stupid. She licks you clean, or you lick her, lazy, filthy, laughing when teeth happen. The sheet is a disaster. She eats a cold dumpling naked and feeds you one, and it is the most erotic thing in the room because it is ordinary.\n\n\"Sunday,\" she says. \"Soup. Even if you're a heading.\" You nod. You almost sleep in her. You don't quite. Last nights that become sleep become mornings, and mornings get harvested. You keep your eyes on her instead of the window.",
      ],
      next: "c21_mia_after",
    },

    c21_voss_heat_fork: {
      chapter: "c21",
      location: "A rented dark · bed",
      speaker: "Voss",
      text: "She is still on you, rain-smell, holster on the chair. The night off has a curfew. She is offering to break it.",
      choices: [
        {
          text: "Let her keep the code. Sleep against her thigh.",
          to: "c21_voss_after",
        },
        {
          text: "Ask her to use you again. Handler-mean. No poetry.",
          to: "c21_voss_more",
          effects: { corruption: 8 },
        },
      ],
    },

    c21_voss_more: {
      chapter: "c21",
      location: "A rented dark · bed",
      speaker: "",
      pages: [
        "She makes a sound that is almost a laugh and almost a growl. \"On your stomach.\" She fucks you with her fingers, then a blunt toy from her coat you did not know she carried, and she talks in your ear like a debrief: breathe, take it, don't you freeze, mammal.\n\nYou come on the cheap sheet with her weight on your back. She doesn't stop until you are shaking and swearing. \"Good,\" she says. \"That's the opposite of refrigerated.\"",
        "She lets you roll over and put your mouth on her until she comes on your tongue, fist in your hair, the old skull-check turned into spending. After, she is quieter. She almost touches your hair and then doesn't.\n\n\"Curfew's broken,\" she says. \"Don't make a habit. I still leave before the anthem.\" You nod, wrecked, grinning like an idiot. She looks away so she doesn't have to grin back.",
      ],
      next: "c21_voss_after",
    },

    c21_crowe_heat_fork: {
      chapter: "c21",
      location: "A rented dark · bed",
      speaker: "Julian Crowe",
      text: "The brass lamp is still on. He is still in you, or still wet on your mouth. Dawn is a rumor he owns.\n\n\"I can leave you stamped and sleeping,\" he says. \"Or I can make this room a suite for one more hour and you can be as filthy as you were on my floor.\"",
      choices: [
        {
          text: "Keep the stamp. Let his watch the window.",
          to: "c21_crowe_after",
        },
        {
          text: "Ask to be used. No hearing-proof voice. Just him.",
          to: "c21_crowe_more",
          effects: { corruption: 12, flags: { owned: true } },
        },
      ],
    },

    c21_crowe_more: {
      chapter: "c21",
      location: "A rented dark · bed",
      speaker: "",
      pages: [
        "He smiles with teeth. \"Darling.\" He puts you on your back and fucks your mouth, then fucks you, then sits against the cheap headboard while you crawl to him. He is loud now, a little, the honesty he bills. You eat him until your jaw aches. He comes on your mouth and makes you kiss him after so you taste it together.\n\nHe fucks you with his cock, already hard, and he talks filth that would not survive a hearing: how you look wrecked, how he will keep you, how he will show Marek the bruise if you are very good.",
        "You come crying, angry, hard. He likes the anger. He fucks you through it. After, he holds your throat and makes you say mine. You say it. The lamp coins your wet skin.\n\n\"There,\" he whispers, almost a person. \"That is the night. Tomorrow I am a director again. Tonight you are the only file I want open.\" He does not sleep. You do, a little, with his fingers still in you like a bookmark.",
      ],
      next: "c21_crowe_after",
    },
  });
})();
