(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    c12_start: {
      chapter: "c12",
      sleep: true,
      location: "Helix annex · sixteen hundred",
      speaker: "",
      journal: "Wardrobe first. Then the ballroom, with lighting built to sell the work.",
      pages: [
        "The Helix annex does not smell like a clinic and does not smell like a party. It smells like dry-cleaned stone and cold flowers. White stone. A fountain recycling the same water. A receptionist who is twenty-four and has been trained to say {{name}} as if your name were already on a seating chart.\n\nYou arrived from Plate Four with toast still in your stomach and Mia's soap still on your skin. The annex air takes both away within a corridor. That is HVAC priced like a defense contract. A fountain cherub has been sanded sexless by policy. Water climbs it and falls. You watch one cycle and stop.",
        "A handler who is not Voss — younger, smiling, wearing a pin that says GUEST EXPERIENCE — walks you past a wall of awards. Wellness. Community. A photograph of a clinic on a poorer plate that looks, if you squint, like Mia's loft with better paint. The caption says PARTNERSHIP. You think of Crowe's threat and do not squint.\n\n\"Director Crowe asked for you early,\" the smiler says. \"Wardrobe is on three. Please drink the water. The bubbles are magnesium. They help with lights.\" You drink because refusing water in this building is how people get marked as interesting, and you are already too interesting.",
        "The lift plays a soft note. Your reflection in the brass is the person the tram practiced: harder, cleaner, the bruise on your wrist hidden under a cuff that does not yet exist. You think of SAFE and RUN and the third word Mia forbade. The lift opens on a floor that is all mirrors and no windows. Windows would let the city see how people are dressed for the night.\n\nIn the brass, behind you, a camera no bigger than a nail-head watches. You do not wave. You step out into the mirrors. Somewhere a woman is putting pins in her mouth. Somewhere Crowe is already late on purpose.",
      ],
      next: "c12_annex",
    },

    c12_annex: {
      chapter: "c12",
      location: "Helix annex · wardrobe floor",
      speaker: "",
      pages: [
        "Wardrobe is a long room with racks that move when nobody is touching them. Clothes hang in plastic. A woman with pins in her mouth nods you onto a mark on the floor that has been worn pale by other feet. She does not introduce herself. Introductions would imply you were a client. You are here to be dressed.\n\n\"Phone,\" she says. You give it. She puts it in a bowl with other phones. \"Jewelry you walked in with.\" The cheap nothing from the archive goes into the bowl. Mia's smell is already gone. You feel the loss like a pulled hair. A garment near the end still has a tag with someone else's name, crossed out.",
        "Lights come up in stages. The pin-woman walks a slow circle. She makes notes on a slate that does not show its screen to you. Somewhere, Vale's measurements may still be live. Somewhere, Crowe has already chosen the ending of this outfit.\n\n\"Director's brief is intimacy that photographs as competence,\" the woman says, pins still in her mouth. \"You will be on the Director's arm for the first twenty minutes. After that you circulate. Senator Ives prefers a voice that does not compete with his. If you have opinions about export codes, you will store them in your mouth until a room with a door.\" She looks at your face the way she would look at a hem. \"Undress. The building has seen worse.\"",
      ],
      next: "c12_wardrobe",
    },

    c12_wardrobe: {
      chapter: "c12",
      location: "Helix annex · wardrobe",
      speaker: "",
      text: "The mark on the floor is cold through socks. Mirrors show you from every angle. The pin-woman waits with the patience of someone who has dressed assets and corpses and does not always distinguish.\n\nThe rack nearest you splits by cut: jackets cut close at the throat, dresses with open backs for a hand.",
      choices: [
        {
          text: "Let them put you in the suit Crowe signed.",
          to: "c12_dress_m",
          require: { gender: "male" },
        },
        {
          text: "Let them put you in the dress Crowe signed.",
          to: "c12_dress_f",
          require: { gender: "female" },
        },
      ],
    },

    c12_dress_m: {
      chapter: "c12",
      location: "Helix annex · wardrobe",
      speaker: "",
      pages: [
        "The shirt is a white that has never met a night market. It fits the throat as if someone measured you in your sleep. The trousers are dark enough to hide a bruise and tailored close enough that sitting will be a decision. The jacket has a weight between the shoulders that is not fashion; it is a reminder to stand straight. Cufflinks click into place: small Helix marks, almost modest. You would bet a week's archive pay that one of them talks.\n\nThe pin-woman knots the tie with an intimacy that is entirely professional and therefore worse. Her knuckles brush your sternum. \"Do not loosen this until the senator's room,\" she says. \"If there is a senator's room. If there is not, do not loosen it at all. Men who fidget at galas look like they still have jobs.\"",
        "Shoes: leather that has never touched Plate Four oil. They change your walk in three steps. You practice the walk between mirrors and hate how quickly the body agrees. A dab of scent at the jaw — not the aftershave Mia named, something greener, more expensive.\n\n\"Hands,\" she says. She files a nail that did not know it was wrong. She puts a watch on your left wrist that covers the bruise exactly. \"Director Crowe will stand on your right. His hand will find the watch or the spine. You will not flinch. Flinching reads as newness. Newness reads as prey.\" She steps back. The mirrors show a man who bills by the quarter-hour. Kane would recognize the costume. Mia would not. \"If the senator stands close, let him. Distance is a tell. Men his age think distance is disgust.\"",
      ],
      next: "c12_mirror",
    },

    c12_dress_f: {
      chapter: "c12",
      location: "Helix annex · wardrobe",
      speaker: "",
      pages: [
        "The dress is black. It takes light and returns a suggestion. The back is open to the low spine. Crowe will put a hand there. The front is modest enough for donors and precise enough for cameras. When the zipper closes, your breath has to learn a smaller space. The pin-woman does not apologize.\n\nHeels teach the walk Vale may have already begun to teach. Three steps and the hips finish a line they did not used to finish. A necklace sits cold on the sternum, a single stone the color of a civic camera. Earrings that will catch ballroom light and throw it at Ives' face. The zipper's last inch requires her knuckle on your spine. You feel the air of the room on your back, cooler, already halfway to a photograph.",
        "\"Hair up,\" the woman says. \"The Director likes a neck he can speak to without leaning into a microphone.\" Pins go in with the same competence as the dress. Scent at the throat and the insides of the wrists: not Mia's citrus, a darker flower made to linger on other people's clothes. You think of the river photograph and feel briefly, cleanly, sick.\n\nMakeup next. Mouth a shade that photographs as willing. Eyes lined so that looking down reads as thought instead of fear. When she is done, the mirrors show a woman the building can spend. \"Director Crowe will stand on your left or your right depending on the camera,\" the pin-woman says. \"His hand will find the open back. You will not flinch. If you must flinch, do it toward him, not away. Away looks like a story. Toward looks like a marriage.\" She makes you walk the mark again. \"Do not apologize with your ankles. The script is the neck and the mouth and the hand you will pretend to be surprised by.\"",
      ],
      next: "c12_mirror",
    },

    c12_mirror: {
      chapter: "c12",
      location: "Helix annex · wardrobe",
      speaker: "",
      pages: [
        "You are left alone with the mirrors for ninety seconds that are probably timed. The person who looks back has your eyes and someone else's budget. If CHRYSALIS has already started changing your body, the clothes finish the job: a silhouette that can be introduced, danced, taken upstairs. If it has not, the clothes do the work alone, which is almost more insulting.\n\nYou try Mia's name in your mouth. It still fits. You try your own name. It fits like the collar: well, and with a cost. You try a smile the pin-woman did not paint. It looks like the archive. You put it away. The annex smile is smaller and costs more. You do not touch your own face. Touching would smudge work someone else did.",
        "The smiler from downstairs returns with the phone, wiped, a single message left on the lock screen so you will see it before you are a person again. Crowe: I will find you at the door. Do not arrive with Marek. Do not arrive alone in a way that looks lonely. Arrive like a decision I already made.\n\nYou put the phone in the pocket or the clutch they have allowed you. The pin-woman sprays something at the air around you that is not perfume. \"Static,\" she says. \"The ballroom glass sings. This keeps you from looking startled when it does.\" She almost smiles. \"Good hunting. That is not in the script. I say it anyway.\" She walks you to the door. \"If you tear anything, come back. Tearing is honest. Honest is not the brief, but I am not paid to like the brief.\"",
      ],
      next: "c12_corridor",
    },

    c12_corridor: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "",
      pages: [
        "The skybridge to the ballroom is glass over a drop that used to be a factory floor and is now a lobby with trees that will never fruit. Below, people in lesser clothes are being sorted into lesser rooms: press, junior donors, the wellness raffle. You walk above them.\n\nThe glass sings, as promised. A high note when the wind hits the seal. You do not look startled. You look like a decision Crowe already made. That is the first performance of the night and it is for nobody. A man in a lesser suit looks up from the lobby trees. You give him nothing. The glass under your feet is thick. It would still kill you if it broke.",
        "Halfway across, Marek Pell is waiting as if the bridge were his office. He is younger than Crowe by a decade and hungrier by a career. His suit is warning-red and invited. He holds two glasses and does not offer you one yet.\n\n\"Plate Four,\" he says, pleasant. \"A clinic. Potatoes. Very novelistic. The Director liked the aggression frame more than the couple frame, in case you're taking notes on your own file. I liked the couple frame. It had warmth. Warmth is a renewable resource.\" He drinks from the glass he did not offer. \"You cleaned up. The annex always does such kind violence.\" He has placed himself where the wind hits the seal hardest, so that anyone arriving must hear the song and his voice together. You respect the blocking. You do not say so.",
      ],
      next: "c12_maren1",
    },

    c12_maren1: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "Marek",
      pages: [
        "Marek steps in until the skybridge becomes a two-person room. He smells like the flower they put on you, or you smell like him, or the building uses one scent for everyone. \"I wrote the first draft of tonight's brief,\" he says. \"Crowe rewrote the ending. He does that. He likes to put his hand on things I have already arranged. Including you.\"\n\nHis eyes do the inventory Mia did, without the love. Throat. Walk. The place the clothes hide the bruise. \"If you perform for him, perform for me too. I am the one who files. He is the one who keeps. People who only perform for the keeper get lost in the cabinet.\" A server tries to pass, sees the two of you, and takes another path. Marek does not glance at him.",
        "He finally offers the second glass. Champagne that has been poured long enough to go a little flat, a small domination. \"Ives likes to talk about his daughter when he has decided you are safe. The daughter is twenty-six and works in a foundation that washes his money until it looks like mercy. Do not mention her first. Let him spend her. Men his age think spending a daughter's name is intimacy.\"\n\nHe watches to see if you take the glass. The wind sings the seal. Below, a tree that will never fruit sheds a leaf that is probably glued on. Anything he gives you will have been held first.",
      ],
      next: "c12_marenchoice",
    },

    c12_marenchoice: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "",
      text: "Marek holds the flat champagne between you like a test that will be written down either way. Crowe's message said: do not arrive with Marek.",
      choices: [
        {
          text: "Take the glass. Let him think he owns the walk-in.",
          to: "c12_maren_glass",
          effects: { corruption: 6, cover: 4, heat: 4 },
        },
        {
          text: "Refuse. Arrive as Crowe's decision, not Marek's draft.",
          to: "c12_maren_refuse",
          effects: { integrity: 4, heat: 6 },
        },
        {
          text: "Ask what he wants that Crowe will not give him.",
          to: "c12_maren_ask",
          effects: { cover: 2, heat: 2 },
        },
      ],
    },

    c12_maren_glass: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "",
      pages: [
        "You take the glass. The champagne tastes like a battery and a flower. Marek's mouth does a small, pleased thing that is not a smile. \"Good,\" he says. \"I prefer assets who understand there are two men in the building who can ruin them, and only one who will write it as a tragedy.\"\n\nHe walks you the rest of the bridge, not quite touching, close enough that anyone below could invent a story. You remember Crowe's instruction and understand that you have already spent a little of it. Your borrowed walk keeps up because wardrobe already spent the hours. Below, someone in the raffle laughs at a prize that will be a subscription.",
        "At the ballroom doors he stops. \"Ives is already inside, near the east glass, pretending to admire the city he has been selling by the container. Crowe is late on purpose. He likes you to feel the room without a hand on you, so that when the hand arrives you are grateful.\" Marek leans in, his mouth almost at your ear. \"I am never late. Remember that when he makes gratitude look like love.\"\n\nHe takes the glass back, drinks what you left, and goes in first. You follow two steps behind. You taste battery on the back of your tongue. The pour was old on purpose.",
      ],
      next: "c12_doors",
    },

    c12_maren_refuse: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "",
      pages: [
        "You leave the glass in his hand. Marek's eyes brighten. Refusal is data. \"Loyalty,\" he says. \"How quaint. How photogenic. How easy to spend when the Director is bored.\" He pours the second glass into the first and drinks as if he had always meant to. \"Go on then. Be his arriving thought. I will be in the room, writing the version where you hesitated.\"\n\nHe does not walk with you. That is the punishment and the gift. You cross the last meters of singing glass alone, the way Crowe asked. It does not feel like integrity so much as obedience with better lighting. The seal hits a higher note as a gust hits the tower. You do not startle. He notices and files it.",
        "At the doors a man with a list finds your name without asking. The doors themselves are a meter of crystal with a Helix mark etched so faintly you only see it when you are already too close. Beyond, light. Music that has been designed not to be remembered. The smell of cold flowers and warm money.\n\nMarek enters by a side door you did not notice. Of course he does. Rivalry has a floor plan. The man with the list says {{name}} like a toast that has gone flat. The crystal door gives, then opens. You enter on a bar of music you did not choose.",
      ],
      next: "c12_doors",
    },

    c12_maren_ask: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "",
      pages: [
        "Marek laughs, surprised into something almost human. \"What I want,\" he says, \"is a conversion that has my name on the report instead of his. I want Ives' codes in a folder I open. I want you, not because I like you — I don't, you still smell faintly of a poorer plate — but because Crowe likes you, and I am tired of liking the same things second.\"\n\nHe pushes the glass into your hand anyway. \"That was free. The next true sentence will cost.\" You hold the glass and do not drink. A compromise that will satisfy neither man. He looks briefly like a person who might have been a friend in a different firm. Then the look closes. \"Don't make me like you,\" he says. \"Liking you would ruin the report.\"",
        "\"Go in,\" he says, milder. \"If you last until the senator's door, I will not be the one who opens it unless you ask. That is as close as I come to courtesy.\" He touches your cuff or your necklace, a small theft of the pin-woman's work, and walks in with the red suit doing the work red cloth is paid for.\n\nYou stand one breath on the singing glass and then you follow, because the alternative is to become a person who turns around, and that person is on Plate Four eating toast. The list-man finds your name without looking up. You take the door. Behind you the skybridge sings to nobody.",
      ],
      next: "c12_doors",
    },

    c12_doors: {
      chapter: "c12",
      location: "Helix ballroom · threshold",
      speaker: "",
      pages: [
        "The ballroom is a cylinder of glass hung on the side of the tower. The city is all around and below, plates stacked into light. Rain at this altitude has been switched to a glitter that will not streak anyone's silk. The ceiling is a second glass, and above that a weather grid performing aurora for people who can afford a fake sky.\n\nA quartet plays something with strings that sounds expensive and forgets itself every eight bars. Servers move like well-paid ghosts. On a low stage, a Helix logo turns so slowly it might be a prayer wheel if prayer wheels sold subscriptions. A server offers you a tray of things that used to be fish. You decline with the annex smile. Declining food is allowed; declining the room is not.",
        "You pause just inside the door because every room has a place to stand, even the beautiful ones. Faces turn and then politely unturn. You are new enough to be interesting and not famous enough to be a problem. That is the liaison window. It will close.\n\nEast glass: a man of fifty-eight with a senator's haircut and a drink that is already not his first. He is laughing at a joke a younger donor told, and the laugh is a little late. Ives. You do not go to him. Crowe's hand has not arrived. Someone's laugh hits the glass and comes back thinner. You step off the mark because remaining would be a pose, and poses are Marek's favorite evidence.",
      ],
      next: "c12_ballroom",
    },

    c12_ballroom: {
      chapter: "c12",
      location: "Helix ballroom · floor",
      speaker: "",
      pages: [
        "You circulate because standing still looks like a confession. A woman from a shipping board tells you CHRYSALIS will democratize selfhood. A man who owns three clinics tells you the poor will be grateful to be optimized. You make the face the pin-woman built: competence, intimacy, no opinions about export codes.\n\nChampagne here is not flat. It hurts the nose in a way that is meant to feel like celebration. You take a glass and hold it. You do not drink yet. A man asks if you have tried the new sleep stack. You say you prefer rain. He looks at you as if rain were a political position. In this room, it is. Crowe has not yet arrived. A woman's bracelet catches your sleeve and she apologizes to the cloth, not to you.",
        "The glass walls sing whenever the wind hits the tower. People have been sprayed; nobody startles. A photographer in matte black takes pictures that will look candid in a report. You turn your good side without being told. The body has learned.\n\nMarek is across the room, red, laughing with a pair of captains. Captain Radek is not among them, or is, in a better coat. You do not stare. Staring is how rivalries become public, and public rivalries get people like Mia wellness partnerships. You take three steps that are circulation and one that is a look at the east glass. Ives' drink is lower. The night is already spending him.",
      ],
      next: "c12_crowe",
    },

    c12_crowe: {
      chapter: "c12",
      location: "Helix ballroom · center",
      speaker: "",
      pages: [
        "Julian Crowe enters as if the room had been poorly tuned and he were the missing piece. Mid-forties. Black suit that does not compete with anyone's back or anyone's tie; it simply ends arguments. His hair is dark and exact. His mouth is the color of a decision. People lean toward him without stepping.\n\nHe does not look for you. He lets you see him look at the east glass, at Ives, at the fake aurora, and then he is beside you as if he had always been there. The first twenty minutes begin. The room notices the way rooms notice marriages and acquisitions. Cologne arrives a half-second before he does, the dark flower they put on you. People part without being asked. The first twenty minutes are a display. You are the object that makes his hands look kind.",
        "\"You kept the soap longer than I expected,\" he says, almost kind. \"Plate Four clings. That is its only power.\" His hand finds your back — the watch, the spine, the open dress or the jacket — and rests there with a weight that is not affection and is not not affection. Heat through cloth. A thumb that could be a pulse or a count.\n\n\"Smile,\" he says. \"Not at me. At the idea of me. Ives is watching to see whether you are a gift or a colleague. Gifts are easier. I would prefer you be both. Can you be both, {{name}}? Or did the nurse use up your talent for splitting?\" The thumb on your back taps once. You smile at the idea of him, as instructed, and the photographer's shutter sounds like a small, expensive insect.",
      ],
      next: "c12_hand",
    },

    c12_hand: {
      chapter: "c12",
      location: "Helix ballroom · Crowe's radius",
      speaker: "Crowe",
      pages: [
        "The hand does not move while he speaks. That is the point of the hand. You can feel each of his fingers as a separate policy. The photographer takes the picture that will caption itself: Director Crowe and liaison, aligned.\n\n\"Marek briefed you on the bridge,\" Crowe says. \"He always does. He thinks appetite is the same as authorship. I let him have the bridge because I have the floor.\" His nails are short. They still feel like a threat. \"Ives will ask what you do. You will say you translate between research and the people who fund it. If he puts his hand where mine is, you will not correct him until you are in a room with a door. Correction is for later. Later is why you were dressed.\" He steers. A donor says your name wrong and he does not correct him. You store the wrong name anyway.",
        "He steers you through a cluster of donors without seeming to steer. Names happen. You keep them. A woman with a foundation pin looks at Crowe's hand on you and files you under mistress or project or both. You let her. Cover is other people's nouns.\n\n\"You will dance with him before the speeches,\" Crowe says. \"I will be speaking. Marek will be watching to see if you look at me while you dance. Look at him. Looking at me is a tell I cannot afford and you cannot afford. If you need a god, look at the glass. The city is the only honest witness in this room, and it has been paid not to care.\" The aurora above the ceiling does a green that does not exist in this latitude. People sigh as if nature had been generous.",
      ],
      next: "c12_intros",
    },

    c12_intros: {
      chapter: "c12",
      location: "Helix ballroom · donor weather",
      speaker: "",
      pages: [
        "The next twenty minutes are a run of hands. Crowe's stays. Other hands arrive: a shake, a squeeze of the elbow, a man who touches the small of your back as if copying the Director and then dies a little when he looks at him. You say the translation sentence four times. It gets smoother.\n\nA junior minister asks if CHRYSALIS hurts. Crowe says, \"Only if you arrive attached to the wrong draft of yourself.\" People laugh. You do not. He squeezes once, approval or warning. The translation sentence, the fourth time, comes out like a product. You hear Kane in it and hate the lineage. A man to your left asks what you translate besides money. You say people. Crowe's mouth, in profile, almost approves the lie.",
        "You pass a table of glasses that have been arranged into a skyline. You pass a woman crying very beautifully in a corner because her donation tier did not include a private tour of Vale's floor. You pass Marek, who lifts his drink a millimeter. Crowe does not look at him. The non-look is the whole story.\n\nIves has moved from the east glass to a smaller knot of people who legislate. His laugh is later than before. The daughter has not yet been spent. You can see the shape of the evening: dance, speech, room, door. Crowe's thumb counts your vertebrae. A server refills your untouched champagne. You let it stand. Drinking would start a clock Ives already started for himself.",
      ],
      next: "c12_donors",
    },

    c12_donors: {
      chapter: "c12",
      location: "Helix ballroom · south glass",
      speaker: "",
      pages: [
        "Crowe leaves you with a shipping couple because leaving is how he proves you can stand. The hand lifts and the air there is suddenly stupid and cold. The couple want to talk about containers that never arrive. You think of Kane's boring ledger and almost, ruinously, smile a real smile.\n\n\"You're the one from the liaison office,\" the wife says. \"Julian said you have a talent for being believed. That's a terrifying compliment. I used to be believed. Then I married a fleet.\" She drinks. Her husband talks over her about export windows. You store his opinions in your mouth, as instructed. You could ruin him with a sentence Kane already owns. You store it. The wife sees you store it and looks, for one second, like she might ask you to.",
        "Across the glass, a tram crawls along a plate so far below it looks like a toy. You wonder if Mia's clinic lights are on. You wonder if the generator has been fixed. You wonder these things with your face arranged for containers, and the wife sees something anyway.\n\n\"Oh,\" she says, softer. \"You still have a person. Hide that better, or they'll put her on a program.\" She pats your arm and goes to find a better champagne, having done the first kind thing in the room that was not a tactic, or having done a tactic so kind you cannot tell. She leaves a print of expensive powder on your sleeve. You do not wipe it.",
      ],
      next: "c12_maren2",
    },

    c12_maren2: {
      chapter: "c12",
      location: "Helix ballroom · service seam",
      speaker: "Marek",
      pages: [
        "Marek finds you at a service seam where the glass meets a wall that has the decency to be opaque. He has a plate of something that used to be a bird. He does not eat it. \"He put his hand on you like a signature,\" Marek says. \"The room is already calling you his. I could file a correction. I could also file the Plate Four couple frame under leverage and let Ives see a nurse if he gets difficult.\"\n\nHe says it lightly. Lightly is how he cuts. You can feel Mia's slot, the cracked plate, the fruit knife, all of it sitting on this sentence. The uneaten bird shines under a glaze that cost more than Mia's rent. Marek turns the plate so the light hits your eyes. \"I can be kind,\" he says. \"Kindness is just a filing delay. Say you understand so I don't have to demonstrate.\"",
        "\"Or,\" Marek says, \"you can give me something Crowe doesn't have yet. A look. A word. A promise that when the senator's door closes, I get the first copy of whatever comes out of his mouth. He will keep the body of the night. I want the paper. I am reasonable. Paper lasts.\"\n\nThe quartet shifts into a piece that is meant to move people onto the floor. Crowe is being led toward the low stage. Ives is checking his cuffs, a man preparing to be charming. You have a slice of a minute in a seam to decide which hunger you feed. On the stage a technician taps Crowe's microphone. Ives checks his cuffs again. You have ten seconds left.",
      ],
      next: "c12_rivalchoice",
    },

    c12_rivalchoice: {
      chapter: "c12",
      location: "Helix ballroom · service seam",
      speaker: "",
      text: "Marek waits with the uneaten bird and the Plate Four photographs in his pocket, whether he is showing them or not.",
      choices: [
        {
          text: "Stay Crowe's. Tell Marek the paper goes through the Director.",
          to: "c12_rival_crowe",
          effects: { cover: 6, heat: 4 },
        },
        {
          text: "Cut Marek down. If he spends Mia, you spend his career.",
          to: "c12_rival_cut",
          effects: { integrity: 6, heat: 10, cover: -4 },
        },
        {
          text: "Give Marek the first copy. Buy Mia off the table.",
          to: "c12_rival_paper",
          effects: { corruption: 8, cover: 8, flags: { mia_protected: true } },
        },
      ],
    },

    c12_rival_crowe: {
      chapter: "c12",
      location: "Helix ballroom · service seam",
      speaker: "",
      pages: [
        "\"The paper goes through Crowe,\" you say. \"You want authorship, write a better brief.\" Marek's eyes narrow, then he laughs as if you had complimented his shoes. \"Look at you,\" he says. \"House-trained in an afternoon. I'll enjoy the report where that loyalty curdles.\"\n\nHe leaves the bird on a waiter's tray and melts back into red. You have bought a simpler night and a more dangerous morning. Crowe likes simple nights. He does not always pay for them. A waiter takes the bird without comment. You step out of the seam before the clean ledge can become a story about you.",
        "On the stage, Crowe tests a microphone with a word that is not hello. The room orients. Ives turns his whole body toward the sound like a man who has voted on lighting before. You step out of the seam and become visible again, unaccompanied, which is what the next part requires.\n\nA server murmurs that the Senator would like to be introduced before the remarks. You step into the light. The annex smile arrives without being asked. You let it. Ives' knot opens a space the size of a body. You walk into the space.",
      ],
      next: "c12_ives_seen",
    },

    c12_rival_cut: {
      chapter: "c12",
      location: "Helix ballroom · service seam",
      speaker: "",
      pages: [
        "You tell Marek, in a voice the glass will not carry, that if a nurse on Plate Four receives a partnership, a wellness visit, or a photograph in a folder that is not hers, you will make sure Ives hears who leaked his daughter's foundation first. You do not have that leak. You say it as if you do. Voss taught you that the threat is a shape; the facts can be filled later.\n\nMarek goes very still. Then he smiles with all his teeth. \"There you are,\" he says. \"I was worried the annex had dressed the fight out of you. Fine. The nurse stays a civilian. You just made me your problem instead. I prefer that. Problems get meetings.\"",
        "He touches your mouth with his thumb, a brief, insulting blessing, and goes to stand where Crowe can see that he has been close to you. Crowe, at the microphone, does not look. You taste metal and champagne.\n\nThe server finds you. Senator Ives would like to be introduced. You wipe your mouth and go to be a gift and a colleague, which is a job description that should not exist and does. You keep your hands visible. The server's murmur is practiced, kind, a little afraid of both of you. You thank him because thanks still work as cover. Then you go to be introduced to a man who prefers refusals public and nights private.",
      ],
      next: "c12_ives_seen",
    },

    c12_rival_paper: {
      chapter: "c12",
      location: "Helix ballroom · service seam",
      speaker: "",
      pages: [
        "\"First copy,\" you say. \"And Mia Renn stays out of every folder you open.\" Marek considers, then nods once, a contract in a chin. \"Paper for a nurse,\" he says. \"How sentimental. How easy to honor until it isn't. I'll take it anyway. I honor things longer than Julian does. That is my brand.\"\n\nHe does not ask you to shake on it. He takes your hand and holds it too long, a rehearsal for other rooms, then lets go as if bored. \"Go be delicious. I'll be the cabinet.\" You flex the palm he held. It smells faintly of the uneaten bird. You do not wipe it. A string phrase from the quartet climbs and dies. You use the death as a reason to turn toward east glass.",
        "You have spent a piece of the night's take before the night has earned it. You have allowed yourself to believe Marek's brand. The stage lights find Crowe. The server finds you. Ives would like to be introduced.\n\nYou walk toward the east glass with your back cold where Crowe's hand was and Marek's contract warm in the palm. East glass grows larger. Ives' laugh arrives late across the cylinder. A photographer kneels, rises, kneels. You do not give him the good side yet. The good side is a budget you will spend on Ives, not on the walk-up.",
      ],
      next: "c12_ives_seen",
    },

    c12_ives_seen: {
      chapter: "c12",
      location: "Helix ballroom · east glass",
      speaker: "",
      pages: [
        "Senator Ives is fifty-eight in the way powerful men are fifty-eight: well kept, slightly softened at the jaw, eyes that have learned to twinkle on command. His tuxedo is correct and a little tight at the waist. He holds his drink like a gavel. When he sees you coming he does the thing men like him do: he looks at the whole of you first, clothes and gait and the place Crowe's hand lived, and only then at your face.\n\n\"You're Julian's translation,\" he says, before anyone introduces you. \"He promised you wouldn't bore me. Come stand where the city can see I still have friends.\" A photographer kneels for the angle that will make Ives look taller. You adjust your weight so the kneel will also get your face in a way Kane can use. Ives' squeeze answers the adjustment. He thinks it was for him.",
        "His voice is radio-trained, warm, a little wet at the edges already. Up close he smells of expensive citrus that is not Mia's and of the particular sweat of a man who has been shaking hands for an hour. A pin on his lapel is a foundation crest. The daughter's washing machine, in miniature.\n\nYou stand where he indicates. The photographer takes it. Ives' hand hovers at your elbow and then commits, a squeeze that is almost uncle and almost inventory. \"They make you people too well now,\" he says. \"In my first term, liaisons still had scuffed shoes. I missed the scuffs. They made me feel like I was lying in a real country.\" You think of Mia's mug and put the thought away.",
      ],
      next: "c12_ives_meet",
    },

    c12_ives_meet: {
      chapter: "c12",
      location: "Helix ballroom · east glass",
      speaker: "Ives",
      pages: [
        "He talks the way a river talks when it has been put in a concrete channel: with force, and with nowhere to go but forward. Export windows. A colleague who is being difficult about medical devices that are also surveillance. The necessity of letting firms like Helix move faster than law, because law is a tram and firms are weather.\n\nYou say the translation sentence. He likes it. He likes that you did not decorate it. \"Julian said you were new and not new,\" he says. \"I know the type. I used to marry the type. Now I fund it.\" He laughs at his own joke late. The drink is doing the work drinks do. A woman from his knot laughs at a joke about medical devices. You store the joke's shape. If the night burns, jokes become exhibits. If the night earns, jokes become pillow talk.",
        "On the stage, Crowe begins to speak about community clinics and the democratization of selfhood. His voice fills the cylinder. Ives leans closer so he can keep talking under it, a man who will not be a silent audience even for a man who could end him. His shoulder touches yours. Heat. Wool. The foundation pin scrapes your sleeve.\n\n\"My daughter runs the pretty side of this,\" he says, and there it is, earlier than Marek promised, or exactly on time if you count the drink. \"Twenty-six. Smarter than me. She thinks I'm a romantic about industry. I'm not. I'm a romantic about rooms. Rooms are where the country actually happens.\" His eyes dip, not quite to your mouth, not quite not. \"Do you dance, or does Julian only dress you?\" Crowe's sentence about freedom lands and the applause comes on cue. You do not lean in or out. He feels the distance and, being who he is, calls it yes.",
      ],
      next: "c12_daughter",
    },

    c12_daughter: {
      chapter: "c12",
      location: "Helix ballroom · east glass",
      speaker: "",
      pages: [
        "You let him spend the daughter a little more because that is the brief and because interrupting a man like Ives is how rooms become hostile. He says she paints. He says she does not speak to him on Sundays. He says Sunday is when he calls anyway. You think of Sunday jokes and feel a nausea that has nothing to do with champagne.\n\nCrowe's speech hits a line about bodies as instruments of freedom. The room applauds on a cue you did not see. Ives applauds late, with the hand that is not on you. You watch his mouth spend a child who is twenty-six and paints. The spending is not sexual and is still a violence. You keep your face kind because kind is the brief and because disgust would be a tell he would enjoy.",
        "\"After he talks, we dance,\" he says. It is not a question. \"Then someone will show me a suite because someone always does, and you will come because Julian did not put you in those clothes to translate from a distance.\" He smiles, and for a second he is just a fifty-eight-year-old man who is lonely in a way money cannot fix. The second passes. The senator returns. \"If you're going to say no, say it now, while we still have an audience. I prefer my refusals public. They keep me honest. Honesty is a hobby I cannot afford in committee.\"\n\nThe quartet is waiting for the speech to end. Your body, in its new cut, already knows the steps. The question is not whether you can dance. The question is what the dance is for. Ives' open palm is damp. Damp is honest. You almost respect it.",
      ],
      next: "c12_danceoffer",
    },

    c12_danceoffer: {
      chapter: "c12",
      location: "Helix ballroom · east glass",
      speaker: "",
      text: "Crowe's last sentence lands. Applause. Ives' hand is open, palm up, a gentleman's joke that is also a hook.",
      choices: [
        {
          text: "Take his hand. Give the room the picture it paid for.",
          to: "c12_dance",
          effects: { cover: 8, corruption: 4, flags: { honey: true } },
        },
        {
          text: "Delay. One more circuit. Make him follow.",
          to: "c12_delay",
          effects: { integrity: 4, heat: 4 },
        },
        {
          text: "Look at Crowe on the stage, against orders, then take his hand anyway.",
          to: "c12_lookcrowe",
          effects: { heat: 8, corruption: 6 },
        },
      ],
    },

    c12_delay: {
      chapter: "c12",
      location: "Helix ballroom · floor edge",
      speaker: "",
      pages: [
        "You tell Ives you want one more glass and a breath of the singing glass before you embarrass a senator with your archive feet. He likes being deferred to if the deference still ends in yes. He lets you go with a look that follows.\n\nYou walk the edge. Marek watches. Crowe, coming off the stage, watches harder. You have bought sixty seconds of being a person who chooses. The seconds taste like the annex water: magnesium, lights, a lie about health. You stand at the singing glass and watch a tram the size of an insect. You do not let your face go to Plate Four long enough for Marek to file homesickness.",
        "Ives arrives as if he had always been walking this way. \"Breath taken,\" he says. \"I'm not a patient man in public. In private I can be taught.\" He offers the hand again. This time the room is looking because delay made a shape. You take it. The photographer loves you. Crowe's mouth does not move. That is his smile. His second offered hand is less of a joke. A server steps aside as if you were already a couple. Being a couple in this light is a job. You take the job as far as the dance floor and no farther, yet.",
      ],
      next: "c12_dance",
    },

    c12_lookcrowe: {
      chapter: "c12",
      location: "Helix ballroom · east glass",
      speaker: "",
      pages: [
        "You look at Crowe. It is a long enough look to be a problem. He is still on the stage, accepting a glass, and he receives the look as if he had ordered it and you had still been wrong to send it. A flicker at the corner of his mouth: anger, or appetite, or both.\n\nIves sees the look and files it. Men like him enjoy being the tool of someone else's fight. \"Julian always did like an audience,\" he says, almost kindly. \"Come on. Let's give him one.\" His fingers tighten, pleased. You will be billed for the look upstairs, in a smaller room, with a door. You step onto the floor anyway.",
        "You take his hand. His palm is damp. The foundation pin winks. As he leads you onto the floor you feel Crowe's attention like a second hand on your back, even from the stage. Marek, in red, watches both of you and writes the version where you hesitated toward the Director. Everyone is getting what they wanted except the person in the clothes, who is getting a dance. On the floor the first couples are already moving. You join them. His damp palm is a fact. Crowe, at the stage edge, has not drunk. You move to his count even when you are looking at Ives. That is the talent Crowe bought.",
      ],
      next: "c12_dance",
    },

    c12_dance: {
      chapter: "c12",
      location: "Helix ballroom · floor",
      speaker: "",
      pages: [
        "The floor is a disc of something that looks like water and feels like money. Ives leads with the confidence of a man who has been told he is good at this by people who need him. His hand settles where Crowe's settled, a copy, a theft, a continuation. You let the copy happen. Correction is for later.\n\nThe quartet plays the forgettable expensive thing. You move. The clothes do half the work. The body does the other half, trained or converted or simply afraid in a useful rhythm. His breath at your temple is heat you did not order and cannot send back. You count bars because counting is how you do not put your head on his shoulder. His lead is competent and a little vain. Vanity talks. Talk, later, is codes.",
        "He talks while he dances, mouth near your temple. Export codes. A vote that will open a corridor for CHRYSALIS components. The daughter again, Sunday, the paintings that are \"too honest.\" His breath is whiskey and mint. When he laughs, late, his chest hits your chest and stays a fraction too long.\n\n\"You're very quiet,\" he says. \"I like quiet. Quiet people hear the thing you didn't mean to say.\" His thumb moves on your back, testing whether Crowe's territory is still marked. It is. He seems to like that too. Some men are aroused by other people's signatures. The glass sings. You do not startle. You look at the city, as instructed. A flash from the matte photographer catches the watch or the necklace. You hate how easy the picture is.",
      ],
      next: "c12_dancebody",
    },

    c12_dancebody: {
      chapter: "c12",
      location: "Helix ballroom · floor",
      speaker: "",
      text: "The dance has a second minute. Bodies do what clothes tell them. Ives' attention is not abstract.",
      choices: [
        {
          text: "Stay in the suit's rules. Let him feel a man Crowe lent him.",
          to: "c12_dance_m",
          require: { gender: "male" },
        },
        {
          text: "Stay in the dress's rules. Let him feel a woman Crowe lent him.",
          to: "c12_dance_f",
          require: { gender: "female" },
        },
      ],
    },

    c12_dance_m: {
      chapter: "c12",
      location: "Helix ballroom · floor",
      speaker: "",
      pages: [
        "In the suit you are the version of a man Ives can take upstairs without explaining himself to a committee in his head. Close, but not a rival. Softened at the mouth, hard in the jacket, the watch hiding a bruise that would spoil the romance of industry. His hand on your back is proprietary in a way that would start a fight in a night market and starts a rumor here.\n\nHe says, \"Julian always did have an eye.\" He says, \"If you're what they say you are, the room upstairs will be simple.\" Simple, from him, means you will not need to be convinced. Close, you can smell the mint he used after the whiskey. His chest hair at the collar is grey. Fifty-eight is not a number in a file when it is sweat under wool. You file it anyway.",
        "You turn under his arm because the quartet asks for it and because turning hides your face from Marek's phone. For a second you see Crowe at the stage edge, glass in hand, watching the turn as if it were a procedure he had scheduled. The hand on your back tightens. Ives is not Crowe. He does not count vertebrae. He holds as if holding were the achievement.\n\nWhen the piece ends he keeps you one extra beat, a small public claim. Applause for the speech is still dying. People have seen enough. \"Suite,\" he says into your ear, almost sweet. \"Don't make me ask Julian to walk you there. I prefer to think you can still choose.\" You step back when he lets you, exactly one step, the distance of a person who can still choose.",
      ],
      next: "c12_afterdance",
    },

    c12_dance_f: {
      chapter: "c12",
      location: "Helix ballroom · floor",
      speaker: "",
      pages: [
        "In the dress you are the version of a woman Ives can take upstairs and call a conversation. The open back gives his hand skin. He uses it. His palm is damp on your spine; his fingers rest just above the zipper's end as if he might continue the thought. The heels make following look like agreement. The necklace throws light at his throat, a friendly accident that was designed in wardrobe.\n\nHe says, \"They make you too well.\" He says, \"My daughter would hate this room. That's how I know it's where the country happens.\" He is already confusing you with a feeling he has about being hated by a woman he funds. You feel each finger on your back. The heels make the follow look like appetite. You let the look stand.",
        "You turn because the quartet asks and because the dress asks and because not turning would be a story. Crowe, at the stage edge, watches the turn without drinking. Marek photographs the hand on the open back. You feel both men watching.\n\nWhen the piece ends Ives' mouth is too close to your cheek. He does not kiss. He is still in public. \"There's a suite that looks at the old river,\" he says. \"They told me that as if I would be moved. I am moved by people, not views. Come be a person with a door. If you need Julian's permission, he already gave it. He gave it when he put you in my hand.\" The almost-kiss dies in public, correctly. The heat of it stays on your cheek. The quartet bows. People pretend the dance was about music.",
      ],
      next: "c12_afterdance",
    },

    c12_afterdance: {
      chapter: "c12",
      location: "Helix ballroom · off the disc",
      speaker: "",
      pages: [
        "You come off the floor with Ives' heat still printed on the clothes. A server offers water. You take it. Magnesium, lights. Ives takes whiskey. Crowe arrives as if he had been walking this line all night, which he has.\n\n\"Beautiful,\" he says, to both of you and to neither. His hand returns to your back for one second, a recast of the role, then leaves. \"Senator. The suite on nineteen is unlocked. I will be in the adjacent for twelve minutes and then I will be nowhere, which is a gift. Marek will not be in the adjacent unless {{name}} is foolish enough to invite a file into a bed.\" Water after a dance tastes like the annex. Ives' whiskey is the honest drink in the cluster. You do not reach for it.",
        "Ives chuckles, late. \"Julian. You still talk like a contract.\" He clasps Crowe's shoulder with the professionalism of a man who has shaken many hands that could ruin him. Then he looks at you. \"Five minutes. I have to be seen leaving alone. You know the way, or you will.\" He goes toward a door that is not the main door. Men like him always know the seam.\n\nCrowe's mouth is near your ear the instant Ives is gone. The brief, finally, without an audience of donors. You watch Ives' back disappear into a seam and understand that the ballroom was only a long hallway after all. Donors orbit the two of you and then politely decay. The flower on your skin is louder now that the dance has heated it.",
      ],
      next: "c12_brief",
    },

    c12_brief: {
      chapter: "c12",
      location: "Helix ballroom · stage shadow",
      speaker: "Crowe",
      pages: [
        "\"He keeps the codes on a second phone in the suite safe, or in his mouth when he's drunk enough to think a body is a vault,\" Crowe says. \"You will get one or the other. If you get neither, you will get enough of his habits that Vale can build me a key. Do not be precious about methods. Precious is for people with other jobs.\"\n\nHis fingers rest at your wrist, over the watch, over the bruise. \"If you need chemical help, you already know whether you carry it. If you need me in the room, you will say so before the door closes, not after you have already broken. I will watch if watching makes you obedient. I will not watch if watching makes you brave. I am not in the market for your bravery tonight.\" You do not flex. Flexing would be a flinch. Flinching, the pin-woman said, reads as newness.",
        "He looks past you at the glass, the city, the paid witness. \"The nurse is safe as long as tonight earns. If tonight does not earn, I will make Plate Four a partner and you will thank me for the benefits. That is not a threat. That is the same sentence as the invitation.\"\n\nA pause. Something that might be mercy if you were very lonely. \"You look like my decision,\" he says. \"Go be it in a smaller room. Nineteen. The door will know your face. If you want to burn the night down instead, do it loudly enough that I can sell the fire. I hate quiet failures. They look like I mis-dressed someone.\" You want, ruinously, to ask about Mia by name. You do not. He has already used the word nurse. That is as close as mercy comes.",
      ],
      next: "c12_briefchoice",
    },

    c12_briefchoice: {
      chapter: "c12",
      location: "Helix ballroom · stage shadow",
      speaker: "",
      text: "Nineteen is waiting. Ives is being seen leaving alone. Marek is a red shape that could become a file. Crowe's cologne is the dark flower on your own skin.",
      choices: [
        {
          text: "Accept the honeytrap. Tell him you will earn.",
          to: "c12_accept",
          effects: { corruption: 8, flags: { honey: true } },
        },
        {
          text: "Ask him to be in the adjacent. It will cost.",
          to: "c12_askwatch",
          effects: { corruption: 6, heat: 6 },
        },
        {
          text: "Say you may blow the room if he crosses a line you still have.",
          to: "c12_mayblow",
          effects: { integrity: 8, heat: 8 },
        },
      ],
    },

    c12_accept: {
      chapter: "c12",
      location: "Helix ballroom · stage shadow",
      speaker: "",
      pages: [
        "You tell him you will earn. The words sit in your mouth like PREP. Crowe's eyes warm a degree that would be love in a civilian climate. \"Good,\" he says. \"I like you better when you are not performing a soul. Souls are noisy.\" He adjusts your tie or your necklace, a last wardrobe act, and sends you toward the seam Ives used.\n\nMarek watches you go and does not follow. Paper, or a threat, or a meeting: all of that can wait for what comes out of nineteen. You walk. The donors have begun to forget you already, which is cover. A woman with a foundation pin watches you go and files a noun you will not hear.",
        "The ballroom's fake aurora ripples. Donors begin to forget the speech. You walk through them. The singing glass hits a higher note; you do not startle. Static spray, training, the last civilian flinch sold for a watch that covers a bruise.\n\nNineteen is a lift and a corridor and a door that will know your face. You take all three. The lift to nineteen is lined with a darker brass. Your face in it looks like Kane's quarter-hour man and like Mia's friend and like neither. The progress bar does not show floors. Nineteen's first air is warmer. Warmth is part of the method. You taste it and think of the suite bottle already open, a man pouring for a person who has not yet arrived.",
      ],
      next: "c12_terrace",
    },

    c12_askwatch: {
      chapter: "c12",
      location: "Helix ballroom · stage shadow",
      speaker: "",
      pages: [
        "You ask him to be in the adjacent. Crowe studies you as if Vale had handed him a new chart. \"That is not a request for safety,\" he says. \"That is a request to be owned in real time. I can do that. I enjoy that. Understand what you are buying. If I watch, I keep.\"\n\nHe does not make you answer again. He has the answer. \"Adjacent,\" he says. \"Twelve minutes becomes the night. Marek stays out. If you look at the mirror, look as if you know I am the glass.\" His hand finds your back one last time, harder, a preview. You walk with that sentence on your skin. Marek's face, furious and impressed, is a look you will not be allowed to keep.",
        "You walk toward the seam with his attention already installed in the next room like furniture. The donors part. Marek's face, briefly visible, is furious and impressed, which on him is the same expression.\n\nThe lift to nineteen knows your face and Crowe's, two permissions, one night. The corridor smells of cold flowers. The door at the end is already ajar. Nineteen's corridor has no civic notices and no knitted hats. You walk through the flower smell. At the far end, the ajar door leaks whiskey light and a radio voice saying brief. You walk into the leak. Asking him to watch has already made the corridor narrower. You do not look back at the ballroom.",
      ],
      next: "c12_terrace",
    },

    c12_mayblow: {
      chapter: "c12",
      location: "Helix ballroom · stage shadow",
      speaker: "",
      pages: [
        "You tell him you may blow the room. Crowe's mouth goes thin, then amused. \"A line,\" he says. \"How archival of you. Blow it if you must. Bring me the fire in a shape I can bill. If you blow it for pride, I will take Plate Four and I will take you and I will not call that a contradiction.\"\n\nHe lets you go without adjusting the clothes. A small withheld intimacy. You feel it more than the hand.\n\n\"Nineteen,\" he says. \"The door still knows you. Doors here are not moral.\" You carry the withheld adjustment into the seam. People glance and unglance. A problem, not a gift. The seam Ives used is a service door dressed as design. You put your hand on it and feel the same warmth nineteen will offer.",
        "You walk. The ballroom continues being a cylinder of paid light. Ives has been seen leaving. The photographer is already bored of you, which is a kind of success. Marek lifts his glass, not toasting.\n\nIn the lift you see your face and try to find the person who bought potatoes. The person is there, under the static spray, under the flower, under the watch. Nineteen will decide how much of you comes back down. The lift opens on a corridor of cold flowers and one ajar door. You have not chosen fire yet. You have only reserved the right.",
      ],
      next: "c12_terrace",
    },

    c12_terrace: {
      chapter: "c12",
      location: "Helix tower · nineteen, antechamber",
      speaker: "",
      journal: "The gala did its work. The suite on nineteen is next.",
      pages: [
        "Nineteen's antechamber is quieter than the ballroom: a held breath after a speech. A low light. A bowl of the same cold flowers. A mirror that shows one person who has been prepared, not a committee. Through a second glass, the old river is a dark line in the city, and Mia's plate is a scatter of cheaper gold.\n\nThe suite door is ajar. Ives' voice, on a phone, is telling someone he will be brief. He will not be brief. Men who say brief are already spending the night. Without an audience the voice is thinner, needier, a man telling a staffer he will be brief while looking at a door as if the door were dinner.",
        "You can still turn around. The lift would take you. Voss would meet you in some rain and call you a coward and pour you a paper cup of something honest. Crowe would take Plate Four. Marek would file the couple frame. Ives would find another body that translates.\n\nYou put your hand on the ajar door. The wood is warm. Someone has been leaning on it, listening, or the building is always warm here. You do not go in yet. Going in is the next chapter. The open door means he has already decided you are the evening's last appointment. You can still turn around. You do not. You wait. Pushing the door comes next.",
      ],
      next: "c13_start",
    },
  });
})();
