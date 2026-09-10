(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    c08_start: {
      chapter: "c08",
      location: "Plate Six · Helix Continuity",
      speaker: "",
      journal: "Crowe sent {{name}} to Vale. The clinic does not call itself a clinic.",
      pages: [
        "The Helix clinic does not call itself a clinic on the street side. The facade says WELLNESS CONTINUITY in a typeface that wants to be a lullaby. Doors sigh open on a cushion of warm air that smells like citrus, ozone, and bleach trying to be expensive. Rain from the civic grid needles the glass in straight lines, because even weather is a product here, and tonight the product is persistence. You have been sent with a time, a wing number, and a sentence from Helene Crowe that was not a request. Vale will make you usable. Your badge still says liaison. Your mouth still says {{name}}. Neither fact impresses the building.\n\nA porter in a grey smock does not ask if you are lost. He glances at the chip in your badge and points you toward a corridor the color of milk. Soft music lives in the vents, something without a chorus. On the wall, a looped advertisement shows a woman touching her own throat as if she has just been given a better one. CHRYSALIS, the caption says. Continuity you can feel.",
        "You walk. Your coat drips on a floor that refuses to show footprints. Somewhere ahead a printer ticks like a patient metronome. You check the exits and find they are all the same door wearing different numbers. The last forty-eight hours sit in you like a bruise you have agreed to keep: Crowe's office, the tape, the way your own voice sounded when it was being spent. Revelations wanted the protocol. Helix wanted a body that would photograph as consent. You are the overlap.\n\nThrough a glass wall you see a waiting room that is trying not to be a waiting room. Ferns that have never known dirt. Magazines about sleep optimization. A man of about thirty sitting very still with a drip in his hand and an expression of polite astonishment, as if he has just been told a joke in a language he used to speak. He does not look at you. That is a kindness, or a symptom. The porter stops at a desk the color of bone and leaves you there without a word, which is how this building says you have arrived.",
      ],
      next: "c08_desk",
    },

    c08_desk: {
      chapter: "c08",
      location: "Continuity · intake",
      speaker: "",
      pages: [
        "The clerk is twenty-six or twenty-seven, hair pinned so neatly it looks like a decision. She does not smile. She asks for your badge, your name, and whether you have eaten in the last four hours. You give her {{name}} and the truth about the coffee. She types as if the keys are evidence.\n\n\"Wing C is expecting you,\" she says. \"Dr. Vale's block. You will surrender metallic objects, recording devices, and any injectables not issued by Helix. The locker is to your left. The gown is in the locker. The nurse will collect you.\" She slides a wafer of plastic across the desk. It is warm. It has your face on it, taken from a camera you did not pose for, and a string of digits that are not a name. \"This is your session token. If you lose it, the session continues without your opinion.\"",
        "You almost laugh and then do not, because the clerk is not performing. Behind her, a screen shows a schematic of a body with zones lighting up in slow sequence: throat, chest, pelvis, hands, the map of a person being rewritten as a product line. A legal crawl at the bottom mentions informed consent, data residency, and the fact that CHRYSALIS outcomes are individually variable. Variable is a word that has buried people.\n\nYou put your pistol in the locker because this is still, technically, a civilian wellness visit. You put Kane's PREP vial beside it if you still have it, or you put your empty hands in your pockets if you don't. The locker door closes with a sound like a polite argument ending. The wafer sticks to your palm. You follow the painted line on the floor. It is the color of a tongue.",
      ],
      next: "c08_wing",
    },

    c08_wing: {
      chapter: "c08",
      location: "Wing C · threshold",
      speaker: "",
      pages: [
        "Wing C is quieter than the lobby and more expensive in the way silence is expensive. The lighting is the color of late afternoon even though the rain grid outside has already decided it is night. You pass a room where someone is humming. You pass a room where someone is not. A cart of sealed trays waits against a wall, each tray labeled in the same careful type: NEURAL MAP / COHORT 12, DERMAL STACK B, APPETITE BRIDGE. The words are ordinary if you do not know what they do. You know enough.\n\nYour reflection follows you in the polished paint. It still looks like the person who got on the tram. That will not remain a reliable fact. You think of Voss, who told you not to let Helix write on you unless you were holding the pen. You think of Crowe, who does not believe in pens. You think of Mia, who still works nights in a clinic that does not smell like this, and you put her name down in the part of your head that is still a locked drawer.",
        "A door opens before you knock. The woman in it is twenty-seven, maybe twenty-eight, with a nurse's badge that says LILA RENNER and a face that has practiced kindness until the practice became a tool. Her hair is dark and pulled back. Her smock is the same milk color as the corridor. She looks at your token, then at your eyes, then at the place on your throat where a pulse is doing its civilian work.\n\n\"{{name}},\" she says, and she gets the stress right. \"I'm Lila. I'll be with you for the whole block. Dr. Vale is finishing a note. You can undress in here. I'll stay or step out, your choice, but I have to verify the baseline either way.\" She says it like a person offering a coat, not a person opening a file. That is the first cruelty: she means the coat. The file opens anyway.",
      ],
      next: "c08_lila_offer",
    },

    c08_lila_offer: {
      chapter: "c08",
      location: "Wing C · prep",
      speaker: "Lila",
      text: "She holds the door with her shoulder. Behind her: an exam room that has decided not to look like a theater. Soft chair. Steel table with a pad the color of skin. A drip stand that has never rusted. Cabinets with locks that look decorative and are not.\n\n\"Some people want a minute,\" she says. \"Some people don't want to be alone with the gown. Both are allowed. Neither changes the schedule.\"",
      choices: [
        {
          text: "Ask her to step out. Keep one door that is still yours.",
          to: "c08_gown_alone",
          effects: { integrity: 4 },
        },
        {
          text: "Let her stay. You are already past privacy.",
          to: "c08_gown_lila",
          effects: { corruption: 4, heat: 2 },
        },
      ],
    },

    c08_gown_alone: {
      chapter: "c08",
      location: "Wing C · prep",
      speaker: "",
      pages: [
        "Lila nods as if you have ordered tea and closes the door with a care that is almost tender. The room keeps its temperature at the exact point where gooseflesh is a choice. You take off the coat, the shirt, the rest, and fold them in the civilian stack the locker taught you. The gown is paper trying to be cloth. It opens at the back. Of course it does. You tie it and feel ridiculous and then stop feeling ridiculous, because ridicule is a luxury this building charges extra for.\n\nThere is a mirror over the sink. You do not use it yet. Mirrors in Helix are not furniture; they are instruments. Your bare feet find the floor warm. You sit on the chair because sitting on the table would be agreeing too early. The wafer token sits on the counter and watches you like a small, polite animal.",
        "Lila knocks once and comes in without waiting long enough for a second thought. She has a tray: cuffs that are not cuffs, a thermometer that does not go in a mouth, a slate already showing your name in a typeface that wants to be gentle. She looks at you the way a good nurse looks at a person who is about to be a procedure — not hungry, not bored, present in a way that still has a clock.\n\n\"Thank you,\" she says, as if privacy were a gift you gave the room. \"Baseline first. Then Dr. Vale. Then we talk about what Crowe requested and what you can still refuse.\" She says refuse as if the word still has a job. You file that. You also file the drip stand's shadow on the wall, which looks like a person holding a leash, and the faint citrus in the vent that will later be the smell of being rewritten. Your hands are cold. The room is not."
      ],
      next: "c08_vitals",
    },

    c08_gown_lila: {
      chapter: "c08",
      location: "Wing C · prep",
      speaker: "",
      pages: [
        "She stays. She does not turn her back in a pantomime of modesty. She hangs your coat, takes your shirt when you hand it over, and folds it as if it were a flag that had done nothing wrong. When you are down to skin she looks at you the way weather looks at a street: thoroughly, without appetite. The gown whispers against {{his}} shoulders. Her knuckles brush your spine as she ties it, and the touch is competent, and competence in this building is a kind of intimacy you did not consent to feeling.\n\n\"People think the undressing is the part that matters,\" Lila says, low. \"It isn't. The part that matters is when you start answering questions with your body because your mouth is tired. I'll try not to rush you there.\" She smells like unscented soap and the faint metallic ghost of sanitizer. Twenty-seven. Adult. Kind in a way that will still put a needle in you.",
        "You sit. She moves around you with the economy of someone who has done this to people who later sent thank-you notes and people who later tried to sue and people who later could not remember which of those they were. The tray comes out. Cuffs that are not cuffs. A slate with {{name}} already lit in a typeface that wants to be a lullaby.\n\n\"Baseline first,\" she says. \"Then Dr. Vale. Then we talk about what Crowe requested and what you can still refuse.\" Refuse, again, as if it were a medical instrument she is required to show you before she puts it away. You watch her throat when she swallows. You watch your own hands on your knees. The gown has already decided you are a patient. The rest of the night will be an argument about whether you are also a product. Rain needles the sealed window. The building does not care about weather except as a soundtrack."
      ],
      next: "c08_vitals",
    },

    c08_vitals: {
      chapter: "c08",
      location: "Wing C · exam",
      speaker: "Lila",
      pages: [
        "She takes your pulse at the wrist and then at the throat, two fingers, counting like a person who still believes in numbers. The cuff inflates. The thermometer sits in your ear and beeps as if it has found you guilty of being warm. She asks about allergies, implants, recreational chemistry, last sexual contact, last time you woke from a dream that felt like a briefing. You answer. Some of the answers are true.\n\n\"On the table, please. On your back. Knees easy.\" She says easy the way trainers say relax. You obey because the alternative is a conversation with security that ends in the same position with worse lighting. The pad is warm. The ceiling is a soft blank. A camera in the corner has a cap on it that may or may not be a cap. Lila sees you notice. \"Recording is on for clinical audit. Faces are blurred in the export unless Legal lifts it. Legal lifts it if you become a dispute.\"",
        "Her hands map you with a thoroughness that would be erotic if it were less employed. Sternum. Ribs. The inside of your elbows. The crease of your hip where the gown has already lost the argument. She asks you to breathe and you breathe. She asks you to cough and you cough. When she parts the gown she does it like a person opening a letter addressed to the building.\n\n\"I'm going to examine genitals and secondary sex characteristics for the baseline,\" she says. \"You can tell me to slow down. You cannot tell the protocol to skip. If something hurts in a way that isn't pressure, you say stop and I change angle. If something feels like arousal, that is a data point, not a confession. CHRYSALIS reads appetite. I need to know what yours looks like before we write on it.\" Her palm is dry. Her voice is kind. The kindness is a procedure. You feel yourself start to answer her anyway.",
      ],
      next: "c08_exam",
    },

    c08_exam: {
      chapter: "c08",
      location: "Wing C · exam",
      speaker: "",
      pages: [
        "What follows is not a seduction and it is not not one. Lila's fingers are professionally warm. She handles {{him}} as if {{he}} were a precise instrument that happened to be attached to a person. If you started this campaign in a male body she takes the weight of your cock in a gloved hand and notes circumference, response, the speed with which blood arrives when she strokes once, clinical, from root to head, and the way your hip tries to follow. If you started female she parts you with the same glove and finds you with two fingers, not searching for pleasure, finding it anyway because the body is a poor keeper of secrets. Either way you make a sound you did not budget.\n\n\"There,\" she says, almost gently. \"That's the bridge. Vale will want that intact.\" She does not take her hand away immediately. She waits for the flush to peak, watches your face the way a person watches a gauge, and only then lets you go, leaving you wet or hard or both under paper. Your integrity, if you still have a private definition of it, stands in the corner and takes notes it cannot use.",
        "She changes gloves. The snap is a small violence. She swabs, labels, slides a needle into the vein of your left arm with a courtesy that makes the sting feel like a favor. Blood goes out. Saline goes in, just enough to open a line. The drip stand is no longer a shadow. It is a fact.\n\n\"Dr. Vale likes to walk in when the line is live,\" Lila says. \"He says it saves a conversation about whether we are serious.\" She smooths the gown back over you and does not pretend that covering you returns what the exam took. \"You did well. That isn't a grade. It's me telling you your nervous system is still yours enough to flinch. Hold onto that. Some people leave it on the table.\" She checks the drip. Her hip is close to your shoulder. You could touch her. You do not. The door opens on a man who has never needed to be close to anyone.",
      ],
      next: "c08_vale",
    },

    c08_vale: {
      chapter: "c08",
      location: "Wing C · exam",
      speaker: "Dr. Vale",
      pages: [
        "Dr. Soren Vale is forty-four and dressed like a person who has never been late to his own ethics board. Grey shirt, no tie, hands that look washed even when they are still. He does not leer. That is the cruelty, just as the file promised. He looks at your chart, then at your face, then at the line in your arm, and you have the sense of being assembled from three objects into one sentence.\n\n\"{{name}}. Liaison track. Crowe's recommendation, Revelations' tolerance, my schedule.\" His voice is midland and unbothered. \"I am going to speak plainly because the poetry in this building is already overfunded. CHRYSALIS is not a costume. It is a rewrite of the tissues that make appetite, gait, scent, and the story a stranger tells about you in the first four seconds. The gala wants a story. Ives wants a story. Crowe wants a story that can walk into a room and come out with export codes in its mouth. You are here because your current body is an incomplete sentence.\"",
        "He pulls a stool close and sits without asking. Lila remains at the drip like a comma. Vale's gaze does not dip to the gown. He does not need it to. He already has the exam, the blood, the way your hip tried to follow a gloved hand.\n\n\"There is a consent packet,\" he says. \"It is real enough to survive a hearing. It is not real enough to survive Crowe if you use it as a door. I will still offer you choices inside the work, because choices are how we keep the nervous system from tearing. The choices are not whether this happens. The choices are how much of you we keep in the photograph.\" He folds his hands. \"You may ask questions. You may also save your breath for later, when breathing becomes interesting. Lila will stay. I prefer a witness who still likes the patient.\" The printer in the wall ticks, obedient, already sure of the ending."
      ],
      next: "c08_chrysalis",
    },

    c08_chrysalis: {
      chapter: "c08",
      location: "Wing C · exam",
      speaker: "Dr. Vale",
      pages: [
        "He turns the slate so you can see a stack of layers: endocrine, dermal, laryngeal, pelvic graft, olfactory, a neural appetite bridge that looks like a river delta drawn by someone who has never been in love. Each layer has a duration. Some are hours. Some are days. One is labeled PERSISTENCE and has no end date, only a footnote about booster compliance.\n\n\"The public brochure says wellness,\" Vale says. \"The private brochure says legend. Both are true in the way advertisements are true. We can raise a breast and drop a voice and invert a map so thoroughly that your own hand will hesitate on the way to wash. We can also do the surface — face, scent, a suggestion in the hip — and leave the rest of you as an argument you can still win in a locker room. What we cannot do is send you to Ives as you are and expect him to open. He has a type. Crowe has decided you will be it, or close enough that the difference becomes his problem.\"",
        "Lila adjusts the drip by a millimeter. Vale does not look at her. He looks at you as if you were a protocol that had grown a face.\n\n\"Side effects include heat, tears, orgasm that arrives without narrative, grief that arrives with one, and a period of days in which mirrors will feel like opposing counsel. You will want to touch yourself to see if you are still the author. You will be, in the legal sense. In the other sense, authorship is what we are selling.\" He lets that sit until the rain on some distant glass becomes audible again. \"The tape from Crowe's office is in my packet. I did not watch it for pleasure. I watched it to see how your face looks when you are spent. That is a clinical input. I am sorry if that sentence feels like a hand.\"",
      ],
      next: "c08_leverage",
    },

    c08_leverage: {
      chapter: "c08",
      location: "Wing C · exam",
      speaker: "",
      pages: [
        "The word tape lands in the room and takes a chair. You see Crowe's office again, the glass, the way she used your name like a key. Vale does not embellish. He does not need to. Lila's mouth tightens and then professionally un-tightens. She has heard worse. She has probably held the hands of people while worse happened.\n\n\"Revelations knows you are here,\" Vale continues. \"Handler Voss sent a note that I am to keep you breathing and, if possible, recognizable to yourself. I will keep you breathing. Recognizable is a negotiation. If you walk out unchanged, Crowe will find another way to write on you, and her ways involve cameras that do not blur. If you walk out rewritten, you will have a legend that can enter the gala without looking like a weapon. Those are the rails. I do not build rails for fun. I build them because people fall off.\"",
        "He sets a stylus on the slate. The consent packet blooms: initial here, here, here. A clause about neural appetite remaining Helix-adjacent for ninety days. A clause about emergency reversal being 'partial and traumatic.' A clause about sexual response being a monitored output. You read enough to know that reading more will not make you freer.\n\nLila leans in, voice for you alone. \"I will tell you when something is about to feel like dying and is only chemistry. I will also tell you if he exceeds what you signed. That is the most I can be on your side and still be employed.\" Her fingers rest, briefly, on the paper over your wrist. Vale waits. He is very good at waiting. The drip ticks. The building's music finds a new key and pretends it has always been there. You initial the air in your head before you initial the slate, a rehearsal that will not be entered into any log.",
      ],
      next: "c08_consent",
    },

    c08_consent: {
      chapter: "c08",
      location: "Wing C · exam",
      speaker: "Dr. Vale",
      text: "He turns the slate toward your free hand.\n\n\"This is the part where you initial. After that, the work splits by what you brought in. Assigned male at intake, Crowe wants conversion options. Assigned female, she wants an appetite stack or a medical minimum that still reads as 'done' on a scanner. You may ask for the smaller knife. You may ask for the larger. You may ask for nothing. Nothing has a reply.\"",
      choices: [
        {
          text: "Initial. Stay in the room with your eyes open.",
          to: "c08_fork",
          effects: { cover: 4, flags: { clinic: true } },
        },
        {
          text: "Initial because the tape already signed for you.",
          to: "c08_fork",
          effects: { integrity: -6, corruption: 6, flags: { clinic: true } },
        },
        {
          text: "Ask Lila, not Vale, what she would do in your skin.",
          to: "c08_ask_lila",
          effects: { integrity: 2, flags: { clinic: true } },
        },
      ],
    },

    c08_ask_lila: {
      chapter: "c08",
      location: "Wing C · exam",
      speaker: "Lila",
      pages: [
        "Vale does not object. He is interested in the answer the way he is interested in any output. Lila looks at your mouth, then at the drip, then back at you, and for a second she is twenty-seven in a city that eats nurses and not only a function of Wing C.\n\n\"I would take the smallest change that still lets me walk out without being collected in a van,\" she says. \"And I would hate myself for being practical. The people who ask for everything think they are being brave. Sometimes they are. Sometimes they are trying to get to the end of themselves before someone else does. I can't tell which one you are yet.\" Her glove flexes. \"If you go deep, I will stay in the room. If you refuse, I will still stay in the room. That is not a comfort. It is a fact about my shift.\"",
        "Vale makes a small note. You do not get to see whether it is about you or about her. He turns the slate again. Your initials go down in a handwriting that looks like yours and will be used as if it were a confession. The packet chimes, a cheerful little sound that does not belong in a room with a drip. Somewhere in the building a printer starts, obedient as a trained dog.\n\n\"Good,\" Vale says, and he does not mean morally. \"Now we choose the work.\" He glances at the intake sex on your file as if it were weather. The gown suddenly feels thinner. Lila's hand returns to the line in your arm, a pressure that says: still here. You understand that here is the last uncontested location you have, and that even here is leased. The citrus in the vent thickens. You swallow and taste metal."
      ],
      next: "c08_fork",
    },

    c08_fork: {
      chapter: "c08",
      location: "Wing C · decision",
      speaker: "Dr. Vale",
      text: "He waits until the packet has finished congratulating itself.\n\n\"Tell me how you want to be spent.\"",
      choices: [
        {
          text: "Hear the conversion options. You walked in male.",
          to: "c08_m_brief",
          require: { startGender: "male" },
        },
        {
          text: "Hear the stack options. You walked in female.",
          to: "c08_f_brief",
          require: { startGender: "female" },
        },
      ],
    },

    c08_m_brief: {
      chapter: "c08",
      location: "Wing C · decision",
      speaker: "Dr. Vale",
      pages: [
        "Vale does not soften it. \"Full conversion takes the night and the next two days of settling. We invert the pelvic map, raise a vaginal canal from graft and your own tissue, seat breasts that will ache like a second heart, drop the larynx, retune scent so a room will decide you are a woman before you speak. Gender marker in the building will change. So will the way your hand finds yourself in the dark. Body load will be significant. You will still be {{name}} on Revelations paper. You will not be the same animal in a bathroom.\"\n\nLila's eyes stay on your face. She has watched men nod at this paragraph and then try to sit up halfway through the drip. She has watched them come, weeping, into a body that had not existed at dinner. She does not tell you which kind you look like. The drip ticks. Your pulse answers it, traitorously on time.",
        "\"Surface only,\" Vale continues, \"is face, fat-pad, a breast that can pass under silk, scent, a gait cue. We leave the cock. We leave the legal sex. You will be a man in a woman's weather. Some targets find that interesting. Some find it a lie they can smell. Crowe prefers full. Ives is sloppier. Handler Voss, if she is still trying to pull you out, will prefer surface because it is reversible in the way a bad haircut is reversible: not really, but you can tell yourself a story.\"\n\nHe folds his hands again. \"Refusal is recorded. Refusal is also answered. Crowe's standing order is that an unmodified liaison does not leave Wing C with a working badge. If you refuse, I will still run a drip. A smaller one. Forced, if we are using honest words. You will take some body whether you like the taste. I am telling you this before you speak so that your no, if you give it, is not a children's no.\"",
      ],
      next: "c08_m_choice",
    },

    c08_m_choice: {
      chapter: "c08",
      location: "Wing C · decision",
      speaker: "",
      text: "The drip ticks. Lila's thumb is a warm circle on your inner arm. Vale looks at you with the patience of a man who has already written three versions of the next hour.\n\nThis is the knife. You can still choose which edge.",
      choices: [
        {
          text: "Full conversion. Make the legend complete. Let them have the man.",
          to: "c08_m_full1",
          effects: {
            gender: "female",
            body: 45,
            corruption: 16,
            integrity: -12,
            flags: { transitioned: true },
          },
        },
        {
          text: "Surface only. Give them a face they can sell. Keep what you can keep.",
          to: "c08_m_half1",
          effects: { body: 22, corruption: 8, integrity: -4, flags: { half: true } },
        },
        {
          text: "Refuse. Say no with your mouth and mean it.",
          to: "c08_m_force1",
          effects: { integrity: 8, heat: 6, body: 18, flags: { forced_mod: true } },
        },
      ],
    },

    c08_m_full1: {
      chapter: "c08",
      location: "Wing C · conversion",
      speaker: "Dr. Vale",
      pages: [
        "\"Full,\" Vale says, and for the first time something like respect moves through his face, or the professional cousin of respect. \"Lila, stack A with pelvic graft and laryngeal drop. Appetite bridge on a slow push. I want {{him}} conscious for the first map. Sedation if the heart rate becomes a speech.\"\n\nThey do not strap you in a theatrical way. They use padded guides at wrist and ankle that feel like being held by a careful crowd. The gown comes off. You are naked under lights that refuse to be cruel in the ordinary sense. Lila paints your chest, your throat, the hinge of your hips with a cold gel that smells like rain on plastic. Vale seats a mask that does not cover your eyes. \"Breathe the first three minutes,\" he says. \"After that, breathing will happen to you.\"",
        "The drip darkens from saline to something the color of weak tea and then to something that has no civilian name. Heat opens in your veins like a second circulation. Your nipples tighten as if a mouth had found them, except there is no mouth, only chemistry writing a letter to tissue that has never received one. You feel your cock swell and then, bewilderingly, recede from the center of the story, not gone, not yet, but no longer the sentence's subject. Lila's hand rests on your sternum.\n\n\"That's the endocrine door,\" she murmurs. \"Don't chase it. Let it come to you.\" Vale watches a screen. He does not watch your face for pleasure. He watches it for compliance of the nerves. You hear yourself make a sound that is not a word. The room tilts toward a future in which {{he}} is a she in every file that matters, and the tilt has a taste, copper and sweet, like blood after oranges.",
      ],
      next: "c08_m_full2",
    },

    c08_m_full2: {
      chapter: "c08",
      location: "Wing C · conversion",
      speaker: "",
      pages: [
        "Time becomes a hallway with too many doors. Lila's voice comes and goes: now the chest, now the throat, now I need you to push as if you were giving something back to the world. The graft work is not medieval. It is worse because it is gentle. You feel pressure deep between your legs, a stretching that is not a cock and is not yet a cunt, a canal being persuaded to exist. It hurts in a bright, specific way, and then the pain is rewritten as fullness, and then the fullness finds a nerve that has never been on any map you owned and lights it.\n\nYou come the first time without a narrative. It is not a male orgasm. It is not yet a female one. It is a system test. Your back arches. Lila holds your hip down with a forearm that is stronger than her voice. Vale says, \"Good bridge,\" the way a man says a bridge has not collapsed. Tears run into your ears. You are twenty-something and adult and being made, and the shame of coming for a machine is a kind of honesty you did not know you had.",
        "Breasts arrive as ache before they arrive as shape. The tissue swells under Lila's palms as she massages according to a diagram, thumbs circling nipples that have become too much information. When she pinches, lightly, to check capillary return, your new cunt — and it is a cunt now, wet around the instruments, clenching as if it had opinions — answers with a second climax that makes you sob a name that might be yours. Vale drops the larynx in a series of injections that taste like coins. Your voice, when you try it, comes out lower and then higher and then like a stranger asking to be let in.\n\n\"Say {{name}},\" Vale says. You say it. The room accepts the new frequency. Lila wipes your mouth with a cloth as if you were a child and a lover and a specimen, which is the job. \"Almost there,\" she says. \"The last of it is scent and gait. Those happen while you sleep. You can fight the sleep. I wouldn't.\" You fight for thirty seconds out of pride and then the pride lies down. The last thing you feel is Vale's uninterested hand checking the pulse at a throat that no longer belongs to the man who walked in.",
      ],
      next: "c08_m_full3",
    },

    c08_m_full3: {
      chapter: "c08",
      location: "Wing C · conversion",
      speaker: "Lila",
      pages: [
        "You surface in pieces. The first piece is wetness between your legs that is not urine and not the old male leftover. The second is the weight on your chest, modest, undeniable, a grammar change. The third is Lila's face, close, tired, still kind.\n\n\"Don't sit up like a hero,\" she says. \"The canal is real. The grafts are seated. If you tear them by proving a point I will be angry in a professional way.\" She helps you anyway, an inch at a time, until you are propped on the pad and can look down the new country of yourself. Breasts. A belly that has not changed and somehow has. The absence where a cock had been the subject of your life, and in its place a cleft, swollen, shaved, shining with whatever they used to keep you from tearing. You touch — of course you touch — and the contact is so immediate you hiss. Lila does not stop you. \"Map it. It's yours. That's the part they can't quite steal even when they write it.\"",
        "Vale is at the counter writing. He does not turn for the inspection. \"Marker is female,\" he says to the slate. \"Body load forty-plus. Persistence on. She —\" he uses the pronoun without ceremony — \"will be sore, leaking, and emotionally labile for forty-eight hours. Sexual response is high. That is intended. Gala is in the window.\" He glances back, finally, and still does not leer. \"You did the large knife. I will not congratulate you. Congratulations are for people who get to keep their souvenirs in a drawer. You are wearing yours.\"\n\nLila cleans you with warm cloths, between the new breasts, along the inner thighs, with a tenderness that would be love if love were a shift. When the cloth passes over your clit — and you have one, small, furious — your hips jump. \"I know,\" she says. \"I know. We'll go to recovery. You can hate me in a quieter room.\" You do not hate her. That is another problem the night has made.",
      ],
      next: "c08_recovery",
    },

    c08_m_half1: {
      chapter: "c08",
      location: "Wing C · surface",
      speaker: "Dr. Vale",
      pages: [
        "\"Surface,\" Vale says, and makes the note without disappointment. Disappointment would be a relationship. \"Lila, stack C. Face, fat-pad, breast B, scent, gait cue. We leave the primary sex. I want {{him}} able to pass at two meters under gala light and fail a locker-room inspection. That failure is sometimes a feature.\"\n\nThe guides go on your wrists anyway. The gown goes. Lila's gel is cold along your jaw, your chest, the hinge of your hip. You keep your cock because you asked to, and it lies against your thigh looking suddenly editorial, a comment on the paragraph being written above it. Vale seats the mask with fingers that have never needed to be kind. \"This will feel like a fever that knows your name,\" he says. \"Do not interpret it as desire unless you want to. Interpretation is optional. Chemistry is not. The building has already chosen chemistry.\"",
        "The drip goes amber. Heat climbs your neck and pools in your mouth as if you had been kissed by a building. Your face prickles; fat pads shift with a deep, dull complaint; your lips feel fuller when you press them together. Lila works your chest with both hands, encouraging tissue that was not a breast this morning to become the idea of one. The ache is specific. When she brushes a nipple the sensation is wrong and then exactly right, a stolen frequency. Your cock hardens without being invited, a loyalty you did not request.\n\n\"Ignore that if you can,\" Lila says. \"The bridge is listening to everything.\" You cannot ignore it. She wraps you in a glove, not to finish you, to measure, and the measuring is a stroke, and the stroke is enough to make your hips lift. Vale watches the numbers. \"Adequate,\" he says. You come into the glove with a sound that embarrasses the man you are trying to remain, while your chest flushes like a woman's first shame. The room files both facts.",
      ],
      next: "c08_m_half2",
    },

    c08_m_half2: {
      chapter: "c08",
      location: "Wing C · surface",
      speaker: "",
      pages: [
        "The second hour is scent and gait. They put you on your feet before you are ready and walk you up and down the milk corridor while the drip follows on its stand like a thin, devoted dog. Lila's hand is at your elbow. \"Weight through the hip,\" she says. \"Not a performance. A suggestion. If you act it, cameras will know. If you inhabit it, cameras will argue.\" Your new breasts — small, sore, real enough — move in a way that makes you want to cross your arms. Vale tells you not to. \"Ives likes the suggestion of uncertainty,\" he says. \"Do not deprive him of his hobby.\"\n\nIn the exam room again they take photographs that will live in a folder called LEGEND / SURFACE. You see one over Lila's shoulder: a man with a woman's weather in the cheeks and chest, mouth wet, eyes too open. You look expensive and compromised. You look like a person who could get into a gala and not get out clean.",
        "Vale writes. \"Half-work seated. Legal sex unchanged. He will pass silk and fail steam. Appetite up. Reversal is a story we tell donors.\" He looks at you at last. \"You kept the part you thought was the thesis. Understand that the thesis has been footnoted. When you touch yourself tonight you will find the old shape and a new electricity. Do not be surprised if the electricity wins an argument the shape thought it had already had.\"\n\nLila wipes the gel from your jaw with a cloth that smells like nothing. Her thumb lingers a half-second too long at the corner of your mouth, then remembers itself. \"Recovery,\" she says. \"Water. A mirror I will not make you use yet.\" You stand. The gait cue fires and your hip answers before your pride does. That is the surface: not a costume you can hang up. A habit the building has installed in the muscle.",
      ],
      next: "c08_recovery",
    },

    c08_m_force1: {
      chapter: "c08",
      location: "Wing C · decision",
      speaker: "",
      pages: [
        "\"No,\" you say, and you put the word on the table like a weapon that still has a serial number. \"No conversion. No surface. I walk out as I came.\" The room does not gasp. Rooms like this have heard no from people who later signed with their mouths.\n\nVale nods once, as if you have chosen a wine he does not drink. \"Recorded,\" he says. \"Lila, standing order.\" She closes her eyes for the length of a blink that might be a prayer and then opens them as an employee. \"I'm sorry,\" she says, and she is, and she still takes the extra strap from the drawer. The guides that felt like a crowd become a grip. Your wrists meet the pad. Your ankles follow. The gown is cut, not untied, a small violence that makes the policy audible.",
        "You fight. Of course you fight. You are a person who checks exits. The exit is a locked idea. Lila's forearm is across your sternum, not crushing, placing. \"Don't make me call Radek,\" she whispers. \"He likes this part. I don't.\" Vale is already hanging a bag the color of dirty ice. \"Forced modification, limited stack,\" he says to the slate, as calm as weather. \"Endocrine nudge, dermal suggestion, appetite bridge at half. We do not invert. We do not drop the larynx fully. We do enough that Crowe's scanner reads 'in process' and Revelations cannot claim we stole their boy whole.\"\n\nThe needle finds the open line. You tell him to stop. He does not. The cruelty is that he never raises his voice. Heat hits your groin like a hand you did not invite. Your cock fills, traitorous. Lila looks at the wall while she holds you, which is the only privacy she can still give.",
      ],
      next: "c08_m_force2",
    },

    c08_m_force2: {
      chapter: "c08",
      location: "Wing C · forced drip",
      speaker: "",
      pages: [
        "The drip does not care about your speech. It writes anyway. Your chest prickles, a faint blossoming under the skin that will not be breasts tomorrow and will not be nothing either, a tenderness as if someone had spent an hour at your nipples with a mouth that never asked. Your mouth waters. Your cock stays hard in the cool air, and when Lila has to shift her grip her wrist brushes it and you jerk as if shocked. \"Sorry,\" she says, automatic, absurd. Vale watches the numbers climb.\n\n\"Heart is fine,\" he says. \"Bridge is seating. He will be irritable, wet in the way men do not like to be called wet, and slightly sweet to a trained nose. Face will hold a softness for a week. That is enough for the gala if the clothes do their job.\" You call him something that would get you shot in a different building. He notes it. \"Anger is a clean output. Preferable to dissociation. Keep it if you can.\"",
        "They do not let you come on purpose and they do not let you not. The bridge finds the loop and runs it: arousal without story, a climax that arrives like a billing error. You spend yourself on your own belly while strapped to a table in a milk-colored room, and the shame is so complete it becomes a kind of silence. Lila cleans you with a cloth and does not meet your eyes until she must.\n\n\"It's done enough,\" she says. \"I hated that. I did it. Both things are true.\" Vale removes the extra straps as if returning borrowed books. \"You refused. I honored the refusal in the only way this wing honors anything: by making it smaller, not by making it vanish. Body load is real. Flag it however your people flag things. Forced. You may tell Voss I said the word.\" He looks at you then, still without hunger. \"Get your breath. Recovery is down the hall. If you swing at me I will let security finish the paragraph.\" You do not swing. Your hands are shaking too specifically for violence. They are shaking like a person who has been rewritten a little and knows the little is not nothing.",
      ],
      next: "c08_m_force3",
    },

    c08_m_force3: {
      chapter: "c08",
      location: "Wing C · forced drip",
      speaker: "Lila",
      pages: [
        "She sits you up. The room does a slow, nauseous roll and then agrees to be a room again. Your chest is too sensitive under the replacement gown. Between your legs you are yourself and not, slick, oversensitive, the cock you kept looking like it has heard a rumor it cannot stop thinking about. Lila offers water. You take it because dying of thirst would be a stupid addition.\n\n\"Voss will see it,\" she says, quiet, while Vale's back is turned to the sink. \"Not the whole stack. The sweetness. The way you hold your arms. If she is as good as her file, she will know we did this against your mouth. That might help you. It might also make her cruel in a different direction. I don't get to pick.\" Her hand hovers, then settles on your shoulder, a human weight. \"I can ask for a reversal consult. It will be denied. I can still ask, so it exists in a log.\"",
        "You tell her to ask, or you tell her not to waste the ink; either way she nods as if you have given her a task that will let her sleep. Vale dries his hands. \"Recovery,\" he says. \"Then clothes. Then you leave through the lobby like a person who had a wellness appointment. If you make a scene I will be forced to make a better one.\" He uses forced the way some men use unfortunately.\n\nYou stand. The gait is yours and a half-degree off, as if the floor had an opinion. Lila takes the drip stand. The line is still in your arm. You walk because walking is the last verb you can still do without permission. Behind you, the printer issues a page that will call this a limited continuity session with patient-initiated pause. The page will not mention the straps. Pages never do.",
      ],
      next: "c08_recovery",
    },

    c08_f_brief: {
      chapter: "c08",
      location: "Wing C · decision",
      speaker: "Dr. Vale",
      pages: [
        "Vale studies the female marker on your intake as if it were a completed form that still had a blank. \"You arrived already in the sex the gala prefers,\" he says. \"That saves us the inversion and costs us the excuse. Crowe's note is not make her a woman. Crowe's note is make her a door Ives will want to put his hands on. There are two honest versions of that work, and neither of them is a spa day, whatever the lobby claims.\"\n\nLila's mouth flattens. She has heard this speech. She has held the hands of women who asked for more than they could metabolize and women who asked for less than Crowe would accept. The drip in your arm is a small, cold comma. You feel, suddenly, the weight of having walked in already categorized, as if the building were disappointed it could not invent you from scratch.",
        "\"Depravity stack is our in-house name, not the brochure's,\" Vale continues, unembarrassed. \"Appetite bridge at full, scent that reads as available from two meters, pelvic sensitization, a breast and hip fill if you are under the silhouette Ives drinks to. You will want. You will wet at voices. You will come easier than is useful in a briefing and exactly as useful in a hotel corridor. Some assets ask for it because they want the job to be simpler than character. Some ask because they want to be ruined on purpose so no one else gets the credit.\"\n\nHe turns a page. \"Medical minimum is sensors, a light endocrine tune, a scent lock that lasts the gala week, and a note in the file that says we touched you. You will still be yourself in the dark. You will be slightly more photogenic to a man who has already decided. Crowe likes the stack. Voss will like the minimum. I like whichever one does not make you tear on my table. You will choose.\"",
      ],
      next: "c08_f_choice",
    },

    c08_f_choice: {
      chapter: "c08",
      location: "Wing C · decision",
      speaker: "",
      text: "The slate shows two columns. One is labeled CONTINUITY PLUS. One is labeled BASELINE COMPLIANT. Lila's fingers rest near your wrist, not stopping you, witnessing.\n\nVale waits. He is very good at waiting.",
      choices: [
        {
          text: "Depravity stack. If they want a door, give them a door that knows it's a door.",
          to: "c08_f_dev1",
          effects: { body: 28, corruption: 18, heat: 10, integrity: -10, flags: { depraved: true } },
        },
        {
          text: "Medical minimum. Let them scan a check mark. Keep the rest.",
          to: "c08_f_min1",
          effects: { body: 10, integrity: 6, cover: 4 },
        },
      ],
    },

    c08_f_dev1: {
      chapter: "c08",
      location: "Wing C · stack",
      speaker: "Dr. Vale",
      pages: [
        "\"Plus,\" Vale says, and Lila's breath leaves her in a way you will remember. \"Full bridge. Pelvic. Scent. Silhouette if indicated. She stays conscious. I want her to know the shape of what she bought.\" The gown is gone a moment later. You are a woman on a warm pad under lights that make every hair look like evidence. Lila gels your inner thighs, your lower belly, the undersides of your breasts, and the gel is cold enough to make you gasp in a register the bridge will later steal and reuse.\n\n\"This is going to feel like being wanted by the air,\" Lila says. \"If you need a word that isn't stop — stop still works for angle — use yellow and I'll change pace. I can't turn the bag off once Vale opens it. I can make the opening less lonely.\" Vale hangs a bag the color of dark roses. He does not look at your cunt. He looks at the screen that will stand in for it.",
        "The push is slow and total. Heat floods the bowl of your pelvis as if a mouth had opened inside you and started speaking. Your clitoris wakes with an opinion that is too large for its size. Lila's gloved fingers — two, then a third when you take them, because the protocol wants to know capacity — stroke the front wall with a patience that is not mercy. \"Bridge is seating,\" she says, and you come around her hand with a cry that makes you sound like a person being convinced. She does not stop. The stack is not interested in a single proof.\n\nVale adjusts a dial. Scent blooms from your skin, sweet and specific, a chemical sentence that says available in a dialect Ives's body will understand before his politics do. Your nipples draw so tight they hurt. Lila's free hand cups a breast, thumb checking, and the check is a pinch, and the pinch sends you over again, messier, ashamed, wet to the wrist of the woman who is being kind to you. \"Good,\" Vale says, to the number. The number is you.",
      ],
      next: "c08_f_dev2",
    },

    c08_f_dev2: {
      chapter: "c08",
      location: "Wing C · stack",
      speaker: "",
      pages: [
        "They do not leave you on one climax. The stack is a curriculum. Lila works you through a third while Vale talks, almost bored, about persistence windows and gala lighting. You hear yourself ask her to stop and hear yourself lift to her hand in the same breath. She looks wrecked in a small, employed way. \"I know,\" she keeps saying. \"I know. It's the bridge. It wants a deep groove so a stranger can find it later without a map.\" The stranger is theoretical. The groove is not. When she withdraws, you clench on nothing and feel emptied and overfull, a fruit split for display.\n\nIf your silhouette needed fill, it happens as a dull stretch in hip and breast, a pressure that makes the gown, when they finally give it back, sit differently. You look down and see a body that was already yours made more like a decision someone else would make in a hurry.",
        "Vale writes the word depraved into a field that will never be shown to a donor. \"Appetite high. Scent lock seven to ten days. She will need to masturbate or be used; unused charge becomes tremor and poor tradecraft. That is in the aftercare.\" He glances at you. \"You asked for the door. Doors do not get to be shocked that people walk through. Lila will teach you how to walk without coming in the tram. Try to learn. It is undignified when they have to wipe a liaison in a service closet.\"\n\nYou laugh, once, a cracked sound, because dignity is a joke the night has already told. Lila cleans you with warm water and a cloth, and when the cloth lingers you almost ask her to put her fingers back, which is the stack talking, which is also you. She shakes her head, not unkind. \"Recovery. If I give you more here it becomes my mouth on Crowe's order. I won't do that to either of us.\" She means it. You believe her. You also know belief is not a condom.",
      ],
      next: "c08_recovery",
    },

    c08_f_min1: {
      chapter: "c08",
      location: "Wing C · minimum",
      speaker: "Dr. Vale",
      pages: [
        "\"Minimum,\" Vale says, and you cannot tell if you have pleased him. \"Sensors. Light tune. Scent lock for the week. Lila, no bridge at full. I will not have her leaking in the tram because Crowe likes theater.\" Lila's shoulders drop a centimeter. Relief, or the professional cousin of it. The gown still comes off. The gel still goes on, cold enough to make you flinch in a way the camera will call compliance. There is no world in this wing where you keep your clothes and also get a check mark.\n\nThe sensors are thin as cicada wings, pressed along the inside of your thighs, under each breast, at the hinge of your jaw. They wake with a fizz you feel in your teeth. \"These report arousal and fear to the file,\" Vale says. \"They do not transmit live unless Crowe pays for live. Assume she will pay if you disappoint her. Assume disappointment is a product they know how to invoice.\"",
        "The endocrine nudge is a smaller bag, straw-colored, almost humble. It still finds your cunt. Heat blooms, manageable, a low tide rather than a wreck. Lila's exam afterward is thorough and shorter: two fingers, a count, a swab, a nod. You are wet. You would have been wet anyway; tables do that. She does not chase a climax out of you, and the fact that you notice the omission tells you how close this building sits to sex even when it is being conservative.\n\n\"Scent lock,\" Vale says, and a mist touches your throat, your wrists, the hair between your legs. You smell, faintly, like night-blooming something that does not grow on the Stack. \"Ives will decide you are healthy. Healthy is his word for a woman he might forgive himself for.\" He writes baseline compliant with the same hand that would have written depraved. \"You kept more of yourself than Crowe wanted. That will be a conversation she has with you later. I am not paid to sit in on her conversations.\"",
      ],
      next: "c08_f_min2",
    },

    c08_f_min2: {
      chapter: "c08",
      location: "Wing C · minimum",
      speaker: "Lila",
      pages: [
        "Lila helps you sit. The sensors tug when you move, a reminder with an adhesive and a lawyer. \"You chose the small knife,\" she says, and there is something like respect in it. \"Don't let anyone tell you that was cowardice. The stack makes the job easier and the morning harder. You'll still have to do the job. You'll just get to come home to a body that remembers your passwords.\"\n\nShe offers water. You drink. Vale is already at the sink, washing as if the room were ordinary. Maybe for him it is. You look at your hands. They are the same hands. The scent on your wrists is not. That is the minimum: a difference you could explain away at a party and not explain away to yourself at 3 a.m. when the rain grid is set to civic melancholy and the grate-flower looks like a witness.",
        "\"Recovery anyway,\" Lila says. \"Even small work gets a quiet room. If you shake, that's the tune. If you want to touch yourself, wait until you're alone unless you want it in the audit.\" She almost smiles. \"I say that to everyone. Almost no one waits.\" You stand. The gown behaves. Your hips are yours. You feel, absurdly, like you have gotten away with something in a building that does not allow getaways, only delays.\n\nVale speaks without turning. \"If she underperforms at the gala, Crowe will send her back for the rest. You should mention that, Lila. I forget to mention consequences when people have been sensible. Sensible people think consequences are for others.\" Lila mentions it. You file it. The drip comes out of your arm with a sting that feels almost like a boundary. You miss it for a second, which is how you know the building has already started teaching you the wrong hungers.",
      ],
      next: "c08_recovery",
    },

    c08_recovery: {
      chapter: "c08",
      location: "Wing C · recovery",
      speaker: "",
      pages: [
        "The recovery room is trying to be a hotel and failing in a way that is almost sweet. Low light. A bed that is wider than a table and narrower than trust. Water. Crackers that taste like the idea of salt. A mirror with a cloth over it, which is either mercy or a test. Lila parks you on the bed and finally sits, as if her knees had also signed a packet.\n\nYou take inventory because that is tradecraft and also because if you do not name the changes they will name you. Whatever Vale ran is in you: heat in the pelvis, a new weight or a new tenderness or a new scent, a sense that your skin is listening harder than it used to. The line is out. A cotton ball is taped to the bruise. You are twenty-something, adult, employed by two firms, and you have just been edited.",
        "Lila drinks your water when she thinks you are not looking, then looks caught, then does not apologize. \"I skip lunch on conversion nights,\" she says. \"Don't put that in a report.\" She checks your pupils, your hands, the place between your legs with a glance that asks permission and then does the job anyway because permission is a courtesy, not a rail. \"You're stable. Emotional weather will be stupid for a day. If you dissociate in the lobby I will come get you and we will pretend you forgot a bag.\"\n\nThe cloth on the mirror waits. The crackers wait. Your clothes — or the clothes Helix has decided are yours now — wait on a chair in a bag that looks like retail. Somewhere a tram bell sounds through concrete, ordinary as a heartbeat. You are still in the building. The building is still in you. Those two facts will have to walk out together.",
      ],
      next: "c08_lila_after",
    },

    c08_lila_after: {
      chapter: "c08",
      location: "Wing C · recovery",
      speaker: "Lila",
      text: "She stands to leave you with the cloth and the bag, then stops with her hand on the door.\n\n\"Aftercare can be a pamphlet,\" she says. \"It can also be me, if you don't want the first time you touch this work to be alone with Helix lighting. That is not in Vale's order. It is in mine. You can say no and I will go get you tea and be a nurse. You can say yes and I will still be a nurse. I need you to hear both sentences.\"",
      choices: [
        {
          text: "Ask her to stay. Let a person touch what the protocol wrote.",
          to: "c08_lila_yes",
          effects: { corruption: 8, heat: 8, integrity: -4 },
        },
        {
          text: "Tea. Distance. You will meet this body without an audience.",
          to: "c08_lila_no",
          effects: { integrity: 6 },
        },
      ],
    },

    c08_lila_yes: {
      chapter: "c08",
      location: "Wing C · recovery",
      speaker: "",
      pages: [
        "She locks the door with a badge tap that will show as aftercare / extended in a log no one reads until someone dies. Then she washes her hands as if this were still a clinic, because it is. When she comes to the bed she does not kiss you first. She asks where it hurts in the way that is not pain. You show her. She is twenty-eight and careful and her mouth, when it finally finds your mouth, tastes like the water she stole.\n\nWhat she does is explicit and not theatrical. If Vale gave you a cunt she fucks you with two fingers and then three, slow, curled, her thumb on the new clit until you shake apart into the cheap pillow with a sound the room was not built to hold. If he left you a cock she rides the sensitivity the drip left behind, stroking you with a slick, medical patience until you spend on her fist, helpless, while her other hand pins your hip so you do not tear whatever else they seated. If you are a woman on the minimum she puts her mouth between your legs and licks as if she were apologizing to a specific nerve. You hold her hair and come like a person clocking out.",
        "After, she rests her forehead on your thigh and breathes like she has run. \"That was me,\" she says. \"Not the stack. If you need to hate someone, hate Vale for the bag and me for the door. Split it fairly.\" She cleans you again, because she cannot not. The second cleaning is almost worse than the sex: it returns you to being a patient.\n\nYou ask her why. She shrugs with one shoulder. \"Because I am still trying to be a person on a shift that wants me to be a function. Because you looked at the covered mirror like it was a weapon. Because tomorrow you will be on a tram with this in you and I will be drawing blood from someone else. Don't make it a love story. I don't get those.\" She stands, straightens her smock, becomes Lila Renner, 27, Wing C. \"Tea anyway. Then the glass. Then you leave. I won't walk you out. If I walk you out I will do something career-ending like tell you not to come back.\"",
      ],
      next: "c08_glass",
    },

    c08_lila_no: {
      chapter: "c08",
      location: "Wing C · recovery",
      speaker: "",
      pages: [
        "She nods as if you have chosen the correct dressing for a wound. \"Good,\" she says, and you cannot tell whether she means good for you or good for her ability to sleep. \"Tea is terrible. Drink it anyway. Sugar is not a moral failure.\" She leaves and returns with a cup that tastes like a meeting that ran long. You drink. She does not sit on the bed again. The distance is a gift with sharp corners, and you are grateful for the cut.\n\n\"When you lift the cloth,\" she says, \"do it standing. Sitting makes people bargain. You are not bargaining. You are meeting. If you cry, cry. If you get hard or wet, that's the work, not a verdict about whether you wanted this. Wanting is a luxury this wing sells under another name, and the receipt never has your handwriting.\"",
        "You thank her and hate how small the sentence is. She almost touches your hair and then does not, which is the most intimate thing left in the room. \"Vale will come by with clothes and a discharge that is a threat in landscape format. I will be in the corridor if your legs fail. They usually don't. The ones who fail are the ones who try to be fine at the desk.\"\n\nShe goes. The door hush is complete. You are alone with a covered mirror, a body that has been written on, and the civic rain doing its product work against a window that does not open. The crackers are still there. You eat one because eating is a way of remaining an animal that chooses. It tastes like nothing and like getting away with a smaller crime than the building offered.",
      ],
      next: "c08_glass",
    },

    c08_glass: {
      chapter: "c08",
      location: "Wing C · recovery",
      speaker: "",
      pages: [
        "You take the cloth off the mirror the way you would take a sheet off a face you were sent to identify. The glass does its job. Whatever you were at intake is still in the eyes — that is the part CHRYSALIS has not yet learned to mint cheaply — and the rest is a negotiation. Softness or swell or a mouth that looks more kissable to a senator. A chest that is no longer a closed argument. If you were converted, the person who looks back is a woman you have not met, wearing {{name}} like a borrowed coat. If you were half-made or forced, the person is a man in a woman's weather. If you came in female, the person is you with the building's fingerprint in the pupils.\n\nYou do not smash the glass. Smashing would be a scene. You put your hand on it and the hand is warm and the glass is not, and that difference is the most honest thing you have touched in an hour.",
        "You turn. You look down. You touch, once, because Lila was right about authorship. The sensation is too much or not enough or both, a radio tuned between stations. You take your hand away before the audit of your own nerves becomes a second shift. The bag on the chair waits. Inside: underwear that is the correct cut for what you are now, a dress or a shirt that Crowe's people selected, a coat that is nicer than the one you surrendered. A card that says CONTINUITY FOLLOW-UP with a time you will not keep if you are free and will keep if you are not.\n\nYou dress slowly. Zippers are philosophical. When you are covered you look like a person who could ride a tram. That is the point and the threat. The door opens on Vale without a knock, because knocking is for people who believe in the fiction of rooms.",
      ],
      next: "c08_discharge",
    },

    c08_discharge: {
      chapter: "c08",
      location: "Wing C · recovery",
      speaker: "Dr. Vale",
      pages: [
        "He has a folder and your locker items in a tray. The pistol looks obscene next to a pack of gauze. Kane's PREP, if you brought it, looks like a cousin of the bags they hung on you, a family reunion no one asked for. Vale does not comment on either. He has the gift of treating weapons and cotton as the same class of object.\n\n\"You are discharged to the city,\" he says. \"No alcohol tonight. No combat. Sexual activity is not forbidden; it is data. If you take a stranger, assume we will smell it on the sensors or the stack. If you take no one, assume the stack will complain. Handler Voss will want a debrief. I have not told her the details. That is your currency, not mine.\" He holds out a pen. You sign a page that says you left ambulatory and informed. You were ambulatory. Informed is a word with a flexible spine, and tonight it bends toward Helix.",
        "\"One more thing.\" He looks at your face the way he looked at the chart: assembled. \"Subject Zero is in this building on Tuesdays. You are not ready to meet her. If you come back asking for more work because the first dose felt like meaning, I will put you on a list I do not like keeping. Meaning is not a side effect I am licensed to treat.\" He steps aside.\n\nLila is in the corridor as promised. She does not walk you out. She mouths a word that might be luck and might be sorry. You pass the room where the man from the lobby is no longer sitting. The ferns remain. The advertisement on the wall has looped back to the woman touching her throat. You do not touch yours until the lobby doors, when the warm air lets go and the rain grid's needles find you like a name.",
      ],
      next: "c08_street",
    },

    c08_street: {
      chapter: "c08",
      location: "Plate Six · rain deck",
      speaker: "",
      pages: [
        "Outside, the Stack is doing its night arithmetic. Neon runs. A food stall sells noodles that smell like the life you had when clinics were places you visited for other people. Your coat is too nice. Your skin is too loud. A man passing on the left looks at you and makes a decision you used to be on the other side of, or the same side of, depending on what Vale wrote. You feel the look in places that did not used to take meetings.\n\nYou walk to the tram stop because standing in front of Helix is a confession. Rain needles the back of your neck. You think of Crowe, who will be pleased in the way a locksmith is pleased. You think of Voss, who will be angry in the way a handler is angry when the asset comes back altered and still breathing. You think of Mia, whose clinic smells like cheap soap and children who are not in this story, and you do not text her. The drawer in your head stays shut. For now.",
        "Your phone vibrates. Unknown number, then a second later the number you were told to memorize: Voss. The message is one line. Tomorrow. Rain deck three, Plate Nine. Tell me what they took. She does not ask if you are all right. She is not a person who uses all right as a measurement.\n\nThe tram arrives, full of people practicing being unremarkable. You get on and practice with them, and fail in small ways only you can feel: the way the strap's vibration travels; the way a stranger's perfume hooks; the way your reflection in the black window is a rumor of {{name}}. You hold the rail. You do not come. You do not cry. You ride. Tomorrow Voss will subtract the parts she does not need. Tonight the city keeps you, wet, rewritten, still employed, still a person who can choose the next station even if {{he}} cannot choose the body that arrives there.",
      ],
      next: "c08_end",
    },

    c08_end: {
      chapter: "c08",
      location: "Tram · night",
      speaker: "",
      journal: "Vale's work is in {{name}}. Voss wants a debrief in the rain.",
      pages: [
        "At your stop the doors open on a plate that has not heard of CHRYSALIS except as an advertisement. You walk the last blocks to the rented slot like a person carrying a glass of water that must not spill. The stairwell smells of other people's dinners. Your key works. That feels like an oversight.\n\nInside, you do not turn on the overhead. The ventilation throat breathes. The paper flower on the grate has not moved. You stand in the dark and put a hand on the door and then on yourself, once, a roll call. Present. Altered. Adult. Not done. The rain on the grate sounds like typing. You let it type. Sleep, when it comes, is a series of briefings you did not attend, in a voice that is yours and is not, saying yes in a room that smelled like citrus and copper.",
      ],
      next: "c09_start",
    },
  });
})();
