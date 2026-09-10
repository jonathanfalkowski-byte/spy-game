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
      speaker: "Helene Crowe",
      text: "She wipes your mouth with her thumb and looks at the lens like a third person in the bed.\n\n\"The tape has a spine,\" she says. \"I can stop at spine. Or I can make you filthy enough that no lawyer calls it acting.\"",
      choices: [
        {
          text: "Spine only. Get the recording and get dressed.",
          to: "c07_sex_bed",
          effects: { integrity: 4 },
        },
        {
          text: "Let her wreck you for the lens. You want it on the record.",
          to: "c07_heat_wreck1",
          effects: { corruption: 12, integrity: -8, flags: { slept_crowe: true } },
        },
        {
          text: "Ask her to keep you on the floor until you can't talk.",
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
        "She puts you on your knees facing the glass. The pupil is a black coin. She stands over you, dress gone, and feeds you her cunt like a briefing: slow, then mean, her fist in your hair so the camera gets your eyes watering.\n\n\"Look at it while you eat me,\" she says. \"I want playback to show you knew who was watching.\" You look. You lick. She tastes like salt and expensive soap. When she grinds, your nose is in her and you can't breathe except when she lets you.",
        "She comes on your tongue with a hiss through her teeth, then pulls you off by the hair and slaps your cheek once, light, possessive, not a beating. \"Again. Deeper.\" She fucks your mouth with her hips until spit runs down your chin onto your chest. The lens drinks it.\n\nWhen she is shaking she pushes you onto your back and sits on your face. You hold her thighs because falling would look like refusal. She rides your mouth until a second orgasm wrecks her composure. For one second she is just a woman coming. Then she is Crowe again.",
      ],
      next: "c07_heat_wreck2",
    },

    c07_heat_wreck2: {
      chapter: "c07",
      location: "Inner room",
      speaker: "",
      pages: [
        "She turns around and takes you with her hand, then her mouth, filthy and precise. If you have a cock she sucks you until you are leaking on her tongue and she stops, holds you there, looks at the glass. \"Don't you dare come until I say.\" You last because the tape is a gun.\n\nIf you have a cunt she spreads you with two fingers and sucks your clit like she is extracting a confession. You try to stay quiet. She won't allow quiet. \"Give me the sound. Pleasure is harder to cross-examine.\"",
        "She lets you come with her fingers in you and her other hand on your throat, not choking, placing. You soak her wrist or spend on her tongue. She shows the wet to the lens like evidence.\n\nThen she fucks you: fingers, a strap she takes from a drawer like office supplies, or she puts you inside her and bounces until the couch complains. She makes you say yes, {{name}}, look at the glass, I want this. You say it. You almost mean it. That is the point of the recording.",
      ],
      next: "c07_sex_camera",
    },

    c07_heat_floor1: {
      chapter: "c07",
      location: "Inner room · floor",
      speaker: "",
      pages: [
        "She laughs, pleased, and points at the carpet. \"On your back. Legs open. I am going to use you like a toy that signed a form.\" You go down. The floor is hard. She kneels over your mouth first, then crawls down and sits on your cock or straps into you, grinding until your thoughts thin to wet heat.\n\nShe spits on you. She talks dirty in the same voice she uses on donors. \"This is what you are now. A mouth. A hole. A pretty problem I get to solve on camera.\" You moan. She films the moan with her eyes.",
        "She fucks you until you come once, then doesn't stop. Overstimulation makes you twist; she pins your wrists with one hand and keeps going. \"Good. Ugly. I want ugly. Pretty is deniable.\"\n\nWhen you start crying she kisses the tears and keeps her fingers in you. She makes you lick them clean after. Then she puts those fingers in her own mouth, looking at the lens, and smiles with her teeth. \"Mine,\" she tells the tape. You believe her.",
      ],
      next: "c07_sex_camera",
    },

    c08_heat_newbody: {
      chapter: "c08",
      location: "Wing C · table",
      speaker: "Lila",
      text: "The work is seated. Your new nerves are still ringing. Lila's glove is off. Vale has stepped out to dictate.\n\n\"You can wait for aftercare,\" she says quietly. \"Or you can feel it now, while it's screaming, so the first orgasm isn't in a Helix tram.\"",
      choices: [
        {
          text: "Wait. You will not come on their table.",
          to: "c08_recovery",
          effects: { integrity: 6 },
        },
        {
          text: "Touch yourself. Learn the new wiring in front of her.",
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
        "She doesn't help at first. She watches. You slide a hand between your legs. If they gave you a cunt it is swollen, slick with their gel and your own want, clit so loud a brush makes your hips jump. You rub in small circles and hate how fast you get there.\n\nIf they left you a cock it is wet at the tip, too sensitive, and your chest aches when you stroke. You come in a few minutes like a teenager, shaking, making a noise the monitors log as 'bridge response.'",
        "Lila's breath catches. \"Again,\" she whispers. \"Slower. Find what isn't the bag.\" You try. Second time takes longer. You finger yourself or stroke until your thighs shake and you soak the pad. She finally puts her ungloved fingers over yours and steers.\n\nYou come on her hand with your other fist in your mouth. She tastes her fingers after, clinical and not. \"That's yours,\" she says. \"Remember the difference.\"",
      ],
      next: "c08_recovery",
    },

    c08_lila_heat_fork: {
      chapter: "c08",
      location: "Wing C · recovery",
      speaker: "Lila",
      text: "She is still on the bed, mouth wet, smock wrinkled. The lock is still red.\n\n\"That was aftercare,\" she says. \"If you want filthy, say so. I will still be a nurse in the morning. Tonight I can be a mouth.\"",
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
        "She strips the smock. Under it she is twenty-eight, small-breasted, a scar on her knee, hair coming down. She kisses you like she is stealing something Vale owns. You put her on her back and eat her until she fists the cheap pillow and comes on your tongue, biting her own wrist to stay quiet.\n\nThen she rolls you and rides your cock or sits on your face again, selfish, shaking, whispering filthy nurse things: how wet the table made you, how she wanted to put her mouth on you during the drip, how she is going to hell and she does not care.",
        "If you have a cunt she fucks you with four fingers, then her mouth, then a toy from a locked drawer that is definitely not on the aftercare pamphlet. She makes you come until you push at her head and she only slows, not stops. \"One more. For you. Not for him.\"\n\nYou break. You soak her chin. She laughs into you, wrecked. After, you lie in Helix lighting that was never meant for this, smelling like sex and antiseptic. She puts the smock back on and becomes a function. You keep the memory anyway.",
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
        "You stay. He groans like you gave him a vote. You suck him until he is kicking the sheets, then you let him push your head, not quite cruel. He tastes like latex and whiskey-sweat. When he comes you swallow because spit on Helix sheets is a photograph waiting to happen.\n\nHe pets your hair, disgusting and sincere. \"Helene picks well.\" You hate how the praise lands in your gut as heat.",
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
      speaker: "Helene Crowe",
      text: "She has not joined. She could. The chair is a choice she is offering you with her eyes.",
      choices: [
        {
          text: "Let her stay in the chair. Being watched is enough.",
          to: "c13_watch_codes",
        },
        {
          text: "Ask her to get on the bed. Two mouths. One file.",
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
        "Crowe stands, undresses without hurry, and the room becomes a hierarchy you can taste. She kisses Ives first, to remind him he is furniture, then she kisses you, deeper, thumb on your teeth.\n\nShe puts your mouth on her cunt while Ives fucks you. You are a sandwich of use: senator in you, director on your tongue. She instructs both of you. He obeys. You come with her clit on your lip and his cock in you and her voice saying mine.",
        "She takes Ives' place and straps you or rides your face, while he watches, diminished, stroking himself like a man at a meeting he no longer chairs. She makes you look at him while you come. \"See? Even the vote is mine.\"\n\nAfter, she wipes you with a hotel cloth like a signature drying. \"Codes on the table. She does not kneel for you, Richard. She kneels for me.\" He puts the card where she points. You are shaking. You are also, horribly, proud.",
      ],
      next: "c13_watch_codes",
    },

    c16_heat_fork: {
      chapter: "c16",
      location: "Helix Annex 2 · Pell office",
      speaker: "Maren Pell",
      text: "She is still on you, slate in reach, pulse stupid. The camera's red eye is fat.\n\n\"Once can have a footnote,\" she says. \"Say no and we dress. Say yes and I put you on the desk and I file the sound.\"",
      choices: [
        {
          text: "Dress. Once was the deal.",
          to: "c16_yield_report",
          effects: { integrity: 4 },
        },
        {
          text: "Desk. Footnote. Let her write the wet into the minutes.",
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
        "She clears the slate with one arm and puts you on the wood. Cold laminate on your back. She spreads your legs and eats you or sucks you with hungry, unpretty sounds, then stands and fucks you against the edge, knit still half on, watching the door like a professional even while she moans.\n\n\"Say my name,\" she orders. You say Maren. She slams in harder. \"Again.\" You say it until it is a rhythm.",
        "She flips you and takes you from behind, one hand on the back of your neck, the other recording a voice memo: time, cooperative, vocalization, second climax. You come on her fingers with your cheek on a folder labeled SPECIAL PROJECTS.\n\nShe comes with her teeth in your shoulder, then laughs into the microphone. \"End note.\" She pulls out, wipes you with a memo she will shred, and kisses your mouth. \"Tuesdays just got longer. Dress. You look like my report.\"",
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
      speaker: "Helene Crowe",
      text: "The brass lamp is still on. She is still in you, or still wet on your mouth. Dawn is a rumor she owns.\n\n\"I can leave you stamped and sleeping,\" she says. \"Or I can make this room a suite for one more hour and you can be as filthy as you were on my floor.\"",
      choices: [
        {
          text: "Keep the stamp. Let her watch the window.",
          to: "c21_crowe_after",
        },
        {
          text: "Ask to be used. No hearing-proof voice. Just her.",
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
        "She smiles with teeth. \"Darling.\" She puts you on your back and sits on your face, then on your cock, then on the cheap headboard while you crawl to her. She is loud now, a little, the honesty she bills. You eat her until your jaw aches. She comes on your mouth and makes you kiss her after so you taste it together.\n\nShe fucks you with the strap she brought in the coat, because of course she did, and she talks filth that would not survive a hearing: how you look wrecked, how she will keep you, how she will show Maren the bruise if you are very good.",
        "You come crying, angry, hard. She likes the anger. She fucks you through it. After, she holds your throat and makes you say mine. You say it. The lamp coins your wet skin.\n\n\"There,\" she whispers, almost a person. \"That is the night. Tomorrow I am a director again. Tonight you are the only file I want open.\" She does not sleep. You do, a little, with her fingers still in you like a bookmark.",
      ],
      next: "c21_crowe_after",
    },
  });
})();
