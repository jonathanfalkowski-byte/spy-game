(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    c20_start: {
      chapter: "c20",
      location: "Plate Seven · rain deck",
      speaker: "",
      journal: "The Orchard is open for one night. Export codes. Kill switch.",
      pages: [
        "The weather grid over Plate Seven has been set to funeral weather since noon, a civic courtesy for a senator's closed-door hearing that never happened. Rain arrives in ruled lines, each drop the same size, each interval the same lie. Helix Dynamics stands at the far edge of the plate like a white building in the dark. The wellness logos have been dimmed for 'maintenance.' The maintenance is you.\n\nYou have a window of forty-one minutes before the night shift rotates and the biometric doors remember they are doors. In your coat: a badge that has already died twice, a pistol that has been fired in a stairwell you will not put in a report, and a blank drive the size of a fingernail. Kane called it a harvest tool. Voss called it a confession. Crowe did not call it anything. She sent a calendar invite titled ORCHARD and a photograph of your own face from a camera you never agreed to.",
        "Below the deck, the Stack does its usual midnight work. Trams move workers toward sleep. Clinics drain their last appointments into paper cups. Someone on a lower plate is burning incense that is illegal only if you sell it without a license. You check the exits because that is the last civilian habit you have not sold. There are three. One of them is a lie with a camera in it.\n\n{{name}}. The name still fits in your mouth if you do not bite down. After tonight it will belong to whoever holds the codes — Voss with her wet coat and her remaining ethics, Crowe with his office that smells of citrus and other people's futures, or you, which is the most dangerous of the three because you have already proven you can want two things that cannot share a room. The rain soaks your sleeves until the fabric gives up.",
      ],
      next: "c20_tram",
    },

    c20_tram: {
      chapter: "c20",
      location: "Service tram · inbound",
      speaker: "",
      pages: [
        "The service tram does not take tourists. Its seats are molded for people who have already accepted that their spines are a workplace. You sit among night janitors and a woman with a Helix lanyard who is crying without sound, the way people cry when they have been trained not to stain the brand. The car smells of wet wool and the citrus solvent Helix uses to make guilt smell like cleanliness.\n\nA screen above the door loops a wellness advertisement: CHRYSALIS CAN BE UNDONE. CONSULT YOUR CLINICIAN. The actor's smile has been licensed from a dead woman. You know this because Vale mentioned it once, the way other people mention the weather, as if theft of a face were a seasonal condition. The tram crosses the plate-gap and the city opens underneath you like a cut. You do not look down. Looking down is how people remember they used to live here.",
        "Your earpiece ticks once. Not a voice. A presence. Voss on one encrypted channel, Crowe on another, both of them too professional to speak first. They are waiting to see which name you answer to when the door opens. That is the test. It has always been the test.\n\nThe janitors get off at Plate Six. The crying woman stays until Plate Five, then stands as if someone pulled a string in her back. She looks at you. She has the kind of face CHRYSALIS likes: unfinished, still capable of surprise. She almost says your name and then decides she dreamed it. The doors take her. You ride the last two stops alone with the advertisement and the smell of solvent and The kill switch is not a metaphor. It is a key. Keys do not care who they open.",
      ],
      next: "c20_gate",
    },

    c20_gate: {
      chapter: "c20",
      location: "Helix · north service gate",
      speaker: "",
      pages: [
        "The north gate is a rectangle of light in a wall that pretends to be stone. Helix poured the facade to look older than the firm. Old things get forgiven. The scanner is new. It wants a badge, a vein, and a reason. You have two of those if you are lucky, and a story if you are not.\n\nRain needles the canopy. A drone hangs at the legal height, pretending to be a lantern. Captain Radek's people painted the approach last month after the gala: yellow chevrons, a kindness that is also a kill-box. You stand in the chevrons because standing outside them is how civilians get filmed for training videos. Your pulse is a professional object. You make it behave.",
      ],
      choices: [
        {
          text: "Badge in as liaison. Walk like you still belong on their letterhead.",
          to: "c20_badge",
          effects: { cover: 6, heat: 4 },
        },
        {
          text: "Ghost the scanner. Use the dead intern's credentials Kane left in the lining.",
          to: "c20_ghost",
          effects: { cover: -4, heat: 8, flags: { ghost: true } },
        },
        {
          text: "Service tunnel. Hands, lockpicks, the old ugly honesty.",
          to: "c20_service",
          effects: { integrity: 4, heat: 6, flags: { combat: true } },
        },
      ],
    },

    c20_badge: {
      chapter: "c20",
      location: "Helix · north service gate",
      speaker: "",
      pages: [
        "The badge still believes in you. That is the most insulting loyalty left in the building. The scanner kisses your vein, finds the liaison protocol Kane paid a clerk to keep warm, and the gate opens with the soft approval of a clinic admitting a paying patient. Warm air comes out smelling of grapefruit peel and money.\n\nA night receptionist looks up from a novel about people who have weekends. She sees a person who has been here before and does not need to be invented. \"Late consult?\" she asks, because Helix trains them to offer a story so you will not invent a better one. You tell her Sublevel C, records audit, Senator Ives's office requested a duplicate. She does not flinch at the senator's name. She files it next to other names that buy silence in bulk. The turnstile accepts your hip like a familiar argument.",
        "Inside, the wellness atrium is lit for sleep-studies: low amber, no corners. A fountain recycles water that has never touched weather. On the wall, a kinetic sculpture of a chrysalis opens and closes on a timer. You used to find it elegant. Now it looks like a mouth practicing.\n\nYour earpiece warms. Voss, very quiet: \"Good. Don't linger in the glass. Crowe likes to watch the atrium the way other people watch aquariums.\" You do not answer. Answering is how you pick a side too early. The sculpture opens again. Inside it there is nothing, which is the point they sell and the point they hide.",
      ],
      next: "c20_atrium",
    },

    c20_ghost: {
      chapter: "c20",
      location: "Helix · north service gate",
      speaker: "",
      pages: [
        "The intern's name was Pavel. He drowned in a parking structure in a way that photographed as accident. Kane kept his credentials the way other men keep a saint's bone. You press the dead man's vein-map to the glass and the scanner hesitates, a machine experiencing a moral feeling. Then it opens, because Helix would rather admit a ghost than admit a failure.\n\nThe receptionist does not look up. Ghosts are not her department. You walk through the turnstile and feel the camera's attention slide off you the way oil slides off a treated coat. Heat gathers at the back of your neck anyway. Somewhere a log is being written in a tense that will become past if you live.",
        "The atrium receives you without a story. That is worse than being welcomed. People with stories can be filed. People without them get investigated by humans. You keep your pace at the speed of someone who has forgotten a charger on a lower floor. The chrysalis sculpture opens on its timer and you do not look at it. Looking is a tell.\n\nCrowe's channel clicks. She does not speak. She lets you hear the ice in a glass, which is her way of saying she already knows which door you used. Voss stays silent longer. Silence from Voss is not ice. It is a hand on the back of your skull, checking whether you still have a skull.",
      ],
      next: "c20_atrium",
    },

    c20_service: {
      chapter: "c20",
      location: "Helix · cargo throat",
      speaker: "",
      pages: [
        "The service tunnel is honest in the way bruises are honest. Condensation. A smell of ozone and the sweet rot of flowers left too long in a reception vase. You work the lock with a strip Kane swore was legal in two countries that no longer exist. The tumblers argue and then agree. You go in on your hands for three meters because the first camera is lazy and pointed at faces, not at the people willing to crawl.\n\nYour coat takes the floor's wet. Your knees take the rest. This is the part of the work that never makes the dossier photographs: the undignified, the animal, the proof that firms still have to hire mammals. A cart of linen goes by above you on the next tier. Someone laughs at a joke about a doctor. You wait until the laugh dies the way you wait for a shot to finish echoing.",
        "You surface in a laundry annex that believes it is unimportant. Importance is a lighting design. This room has none. You straighten, check the pistol, check the drive, check the name you are still using. {{name}} still answers. That will do for the next forty minutes.\n\nA service lift stands open. You take the stairs instead. Lifts remember weight. Stairs only remember pain, and pain is common enough to be invisible. Your earpiece ticks. Voss: \"Ugly entrance. Good. Ugly is harder to subpoena.\"",
      ],
      next: "c20_atrium",
    },

    c20_atrium: {
      chapter: "c20",
      location: "Helix · wellness atrium",
      speaker: "",
      pages: [
        "However you arrived, the atrium makes you the same person: a silhouette against branded amber, a possible patient, a possible thief. The fountain talks to itself. A night playlist offers piano that has been tested on focus groups for its ability to lower heart rate without lowering spending. You cross the marble as if you have a right to be late.\n\nOn the mezzanine, a figure in a dark coat watches the sculpture. Not Crowe. Too still for Marek. You do not change your pace. Changing pace is how watchers learn they have been seen. The figure turns out to be a coat on a stand, left by someone who believed they would return. Helix is full of objects practicing being people. You have been one of them. You may still be.",
        "The directory lists SUBLEVEL C — RECORDS / ORCHARD in the same typeface as YOGA and FERTILITY. That is the firm's joke and its theology: everything that can be grown can be filed. You take the staff corridor because the public stairs are prettier and therefore watched.\n\nHeat in the building is not temperature. It is attention. You feel it gather the way you feel a storm the grid has not admitted yet. Somewhere, Radek's board is painting a little icon on a map. The icon has your gait. You taught it that gait by surviving too many hallways.",
      ],
      next: "c20_radek",
    },

    c20_radek: {
      chapter: "c20",
      location: "Staff stair · B to C",
      speaker: "Radek",
      pages: [
        "Captain Radek is in the stairwell as if stairwells were a rank. He has the face of a man who sleeps in shifts and never in the same country twice. The bruise along his jaw is old enough to be a souvenir and new enough to be a warning. If you took the combat path through this firm, that bruise has a twin somewhere on you. He looks at your hands first. Professionals always do.\n\n\"Liaison,\" he says, and makes the word sound like a wound that did not scab clean. \"Sublevel C is closed. Vale's night protocol. You want records, you file a ticket like a citizen.\" His sidearm is not drawn. That is not kindness. That is confidence that he can draw it in the time it takes you to finish a sentence. The stairwell smells of concrete and the mint tablets Helix issues to security so their breath will not offend donors.",
        "Behind him, the door to C shows a red stripe. Red means the orchard is fruiting: servers at full write, export packets compiling, the kill switch awake and listening for a voice. You can hear the fans through the door, a sound like a congregation pretending to be machines.\n\nRadek waits. He has waited in worse rooms. \"Don't make me write you down,\" he says. \"I am tired of writing people down. They never read as well as they looked in the hallway.\"",
      ],
      choices: [
        {
          text: "Talk. Sell him Ives, audit, the lie that still has a senator's seal on it.",
          to: "c20_radek_talk",
          effects: { cover: 4, integrity: 2 },
        },
        {
          text: "Don't talk. Close the distance. Stairwells forgive speed.",
          to: "c20_radek_fight",
          effects: { heat: 12, cover: -8, flags: { combat: true, beaten: true } },
        },
        {
          text: "Show him Voss's token. Let him hate the firm that isn't his.",
          to: "c20_radek_talk",
          effects: { heat: 6, flags: { honest: true } },
          require: { notFlag: "owned" },
        },
      ],
    },

    c20_radek_talk: {
      chapter: "c20",
      location: "Staff stair · B to C",
      speaker: "Radek",
      pages: [
        "You give him Ives's name the way you would give a dog a piece of meat you are not sure is clean. The senator's seal is still a magic trick in this building. Radek's mouth does something that is not a smile. \"Ives is in a car that does not stop at lights,\" he says. \"If he sent you, he sent you to be found. You understand that.\"\n\n\"I understand I have a window,\" you say. \"You can stand in it or you can log that you saw a liaison and went back to your mint.\" He studies your face for the flinch Kane once called product. You do not give it to him. You give him boredom, which is the only emotion security trusts.",
        "He steps aside the way a cliff steps aside for weather. \"If Crowe asks, I never liked you,\" he says. \"If Voss asks, I never saw you. If you ask me later for a favor, I will remember this conversation as a dream I had about a person who should have stayed on the tram.\"\n\nYou pass him. His coat smells of rain that did not come from the grid, which means he has been on a roof. Roofs are where people go to decide whether to remain employed. The red stripe on the door accepts the badge, or the ghost, or the violence you have not spent yet. The fans get louder. The orchard is real.",
      ],
      next: "c20_descent",
    },

    c20_radek_fight: {
      chapter: "c20",
      location: "Staff stair · B to C",
      speaker: "",
      pages: [
        "You do not announce the decision. Announcing is for people who want witnesses. You take the last two stairs as if you missed a step and your shoulder finds the place under his arm that Vale once marked on a chart as 'compliance hinge.' Radek is faster than the chart. He always was. The railing hits your ribs and the mint on his breath becomes a weather.\n\nIt is not a movie. It is a short, ugly negotiation conducted in weight. He tries to put you on the landing. You put his head against the painted chevron that says MIND THE TREAD. The pistol stays holstered because a shot in a stairwell is a press release. His elbow finds your mouth. You taste the iron Helix puts in its water and the older iron you brought with you.",
        "He goes down on one knee the way men go to altars they do not believe in. You do not finish him. Finishing him would be a different story and you are already over budget. You take his pass-chip because the door likes chips more than it likes blood. He laughs once, breathless, almost fond.\n\n\"There you are,\" he says. \"I was starting to think they'd rewritten you into someone who files tickets.\" You leave him sitting against the wall with his mint and his dignity and a bruise that will match whatever you are growing under your coat. The red stripe drinks the stolen chip. The orchard inhales you.",
      ],
      next: "c20_descent",
    },

    c20_descent: {
      chapter: "c20",
      location: "Sublevel C · clinic throat",
      speaker: "",
      pages: [
        "Sublevel C was poured to be forgotten. The lights are the color of old milk. The floor has the give of a clinic that expects gurneys. You pass a window into a room where a chair waits with straps that have been redesigned to look like comfort. CHRYSALIS always did prefer the aesthetics of consent.\n\nSomewhere a humidifier sings. The air is wet enough to take fingerprints out of conversation. You walk as if you have a chart in your hand. Imaginary paper is still paper if your shoulders believe it. The fans behind the orchard door are a tide now. You feel them in your teeth.",
        "A cart of sealed bags sits unattended. Each bag has a barcode and a first name. No last names. Last names are for people who still have families that have not been converted into emergency contacts. You do not open a bag. Opening would be curiosity, and curiosity is how Subject Zero started, according to the file you were not supposed to finish reading.\n\nYour own name is not on the cart. That should comfort you. It does not. Absence is also a filing system. You wipe your mouth in case Radek left a story there, and you go on toward the light that is not wellness amber but server-white, the color of a god that has invoices.",
      ],
      next: "c20_clinic",
    },

    c20_clinic: {
      chapter: "c20",
      location: "Sublevel C · night clinic",
      speaker: "",
      pages: [
        "Vale's night clinic is still awake. Of course it is. Conversion does not punch a clock; it only punches tickets. The glass is half-frosted in the corporate way that means privacy for the firm and exposure for the patient. You see a silhouette on a table, not moving enough to be asleep, moving too much to be gone. Nurse Lyle crosses the glass with a tray. He sees you. He does not drop the tray. That is his professionalism and his tragedy.\n\nHe comes to the hall door and opens it the width of a conscience. The clinic smell reaches you: alcohol, warm plastic, the sweet chemical that means someone's endocrine panel is being rewritten in real time. You have smelled it on your own sheets. You may smell it on them again if tonight goes the way Crowe prefers.",
        "\"You shouldn't be on C,\" Lyle says. His voice is the kind of kind that still bills by the procedure. \"Vale is in the orchard. He said if you came, I should tell you the switch is real, and that pretty language is how patients forgive us.\" He looks at your hands the way Radek did, then at your mouth, then at the place on your throat where a CHRYSALIS port would sit if you had agreed to all of it.\n\nBehind him, the silhouette on the table makes a sound that might be a name. It is not yours. You are grateful and ashamed of the gratitude. Lyle waits. He has always been better at waiting than the doctors. Waiting is how he stays a person.",
      ],
      choices: [
        {
          text: "Ask him for the clean way in. Trust the kindness that is still a procedure.",
          to: "c20_lila_kind",
          effects: { integrity: 6, heat: -2 },
        },
        {
          text: "Tell him to go back to the table. You didn't come for mercy.",
          to: "c20_lila_hard",
          effects: { corruption: 6, integrity: -4 },
        },
      ],
    },

    c20_lila_kind: {
      chapter: "c20",
      location: "Sublevel C · night clinic",
      speaker: "Nurse Lyle",
      pages: [
        "Lyle's mouth tightens, which is how he smiles when smiling would be a violation. \"Service lock on the orchard is coded to Vale's left hand and to a night nurse override I am not supposed to have. I have it because someone has to turn the lights off when the doctors forget patients are not equipment.\" He presses a fob into your palm. It is warm. He has been holding it since he saw you in the glass, which means he decided before you arrived.\n\n\"If you shut it down,\" he says, very low, \"the people on the tables don't vanish. They just stop being improved. Some of them will hate you for that. Some of them will send you money from countries with trees. I don't know which kind I am. I don't know which kind you are.\" His eyes are tired in a human way the firm has not yet productized.",
        "You close your hand around the fob. It feels like a small animal that has already chosen you. \"Vale will talk,\" he adds. \"He always talks when the fruit is ripe. Don't let him make it sound like philosophy. It's inventory.\"\n\nShe goes back to the silhouette. You hear his voice change into the voice he uses for people whose names are being rewritten: soft, specific, refusing to be a recording. You leave him that. It is the only unstolen thing in the hallway. The orchard door is ten meters away and glowing as if it were glad.",
      ],
      next: "c20_vale",
    },

    c20_lila_hard: {
      chapter: "c20",
      location: "Sublevel C · night clinic",
      speaker: "",
      pages: [
        "Lyle searches your face for the person who used to flinch at your own name. She does not find enough of that person to bargain with. She nods once, a clinical acceptance, and steps back so the door can close on the silhouette and the tray and the last kind sentence in the building.\n\n\"Then don't die in my hallway,\" she says. \"I have to mop it, and I am off at five.\" It would be funny if it were not the most honest boundary anyone has offered you in months. You leave her the hallway. You take the rest.",
        "The orchard lock does not love you. It wants Vale or a nurse or a story with a barcode. You give it the dead intern, or Radek's chip, or the violence still drying on your mouth. The bolt thinks about morality and then does what bolts do. Cold air comes out. Server cold. The kind that keeps secrets crisp and bodies optional.\n\nBehind the glass, Lyle does not watch you go. That is a mercy you did not earn. You feel the lack of it like a missing tooth and you walk into the white.",
      ],
      next: "c20_vale",
    },

    c20_vale: {
      chapter: "c20",
      location: "The Orchard · antechamber",
      speaker: "Vale",
      pages: [
        "Dr. Soren Vale stands in the antechamber as if he grew there. He has not slept; he has metabolized. His coat is clean. His hands are the cleanest objects in the firm. He looks at you the way he looks at a panel: not hungry, not kind, interested in whether the numbers will hold.\n\n\"{{name}},\" he says, and uses the name like a reagent. \"You are on time for a theft. That is rare. Most thieves are early because they are afraid, or late because they want to be seen. You are exactly where the protocol predicted, which should concern you more than it concerns me.\" The antechamber is small. A bench. A dish of mints. A screen showing orchard temperature as a flat green line that has never been allowed to become weather.",
        "\"The kill switch is not cruelty,\" Vale continues, because he cannot help teaching. \"It is a courtesy to the board. If CHRYSALIS is ever ruled a weapon, someone must be able to stop the minting. If it is ruled a therapy, someone must be able to sell the stop as ethics. You are here to decide which ruling you prefer to carry in your pocket.\" He gestures at the inner door. It is already unlocked. Of course it is. He wanted you to hear the lecture first.\n\n\"I will not stop you,\" he says. \"Stopping you would imply I have a preference about who owns the human future. I have preferences about dosage, not ownership. Ownership is a political superstition. Dosage is real.\" He steps aside. The mint dish remains. You do not take one. You have taken enough sweetness from this building.",
      ],
      next: "c20_orchard",
    },

    c20_orchard: {
      chapter: "c20",
      location: "The Orchard",
      speaker: "",
      pages: [
        "The orchard is a cold server hall. Racks stand in rows like trees that learned to bill. Each rack has a cultivar name in Helix's gentle typeface: BOSC, ANJOU, COMICE, FORELLE. The fans are loud. The floor is grated so that dropped things and dropped people can be retrieved without poetry. White light eliminates the idea of evening. Your breath shows. That feels like a secret the room did not authorize.\n\nAt the far end, a console waits with two physical keys in a locked cradle and a screen already awake. Someone prepared this. Vale, or Marek, or the part of the building that has always been a mouth. The screen says EXPORT PACKET READY — IVES / CHRYSALIS / CROSS-BORDER. A progress bar is complete. Completeness is the most threatening state a bar can reach.",
        "You walk the rows because rushing would be a tell to the cameras, and there are cameras, even here, especially here. The air tastes of metal and the sweet dust of overworked plastic. Your coat becomes a refrigerated fact. You think, briefly, of Mia's clinic on Plate Four, where the cold is the kind that keeps vaccines honest. This cold keeps something else honest: the list of who can be rewritten, and how quickly, and for how much.\n\nThe cradle opens to your badge, or your stolen chip, or Lyle's fob. Two keys. One labeled SHUTDOWN in the same typeface as yoga. One labeled TITLE in a typeface that wants to be law. Shutdown kills the mint. Title transfers it. Together they are a country. You have forty minutes that have become twenty-two.",
      ],
      next: "c20_terminal",
    },

    c20_terminal: {
      chapter: "c20",
      location: "The Orchard · export console",
      speaker: "",
      pages: [
        "The console knows your fingers. That is either tradecraft or a intimacy you did not consent to. You slot the harvest drive. The packet begins to pour: protocol, client index, endocrine maps, the voice-print library, the gait library, the kill-switch daemon that can brick every CHRYSALIS chair on three plates and two foreign campuses. It is smaller than you expected. Apocalypses have gotten efficient.\n\nOn a side pane, Senator Ives's authorization string unspools in a font designed for men who still sign with fountain pens. He authorized the export as 'humanitarian wellness transfer.' He authorized it drunk, you suspect, the way he authorized other things when he mentioned his daughter and then looked at your mouth as if your mouth could be a treaty. The string is valid. Validity is the senator's last remaining talent.",
        "A second pane offers CLIENT PREVIEW. Names. Some you know. A judge. A news anchor whose laugh you have heard on trams. A Revelations accountant Kane swore was clean. Subject Zero, listed as COMPLETE / STABLE / NON-TESTIFYING. Marek Pell, listed as PARTIAL / LOYAL. Your own file sits near the bottom as ACTIVE LIAISON / CONVERTIBLE. The word sits there without shame. Convertible. Like a bond. Like a coat.\n\nThe drive drinks. Twenty percent. The fans change pitch, a congregation standing. Your earpiece blooms with two lights at once. Voss and Crowe have stopped waiting. They can feel the packet moving the way sharks feel a wire in the water. You have not yet decided whose water this is.",
      ],
      next: "c20_ives",
    },

    c20_ives: {
      chapter: "c20",
      location: "The Orchard · export console",
      speaker: "",
      pages: [
        "Ives's voice is not here and is everywhere. The authorization includes a personal note, because the senator cannot sign anything without leaving a fingerprint of self-pity. FOR THE RECORD I WAS TOLD THIS WOULD PREVENT A WAR BETWEEN FIRMS. FOR THE RECORD MY OFFICE DOES NOT CONDONE BODY THEFT. FOR THE RECORD. He repeats the phrase as if repetition were innocence. You have sat across from him in a room that smelled of rye and the expensive soap he uses to wash other people's decisions off his hands.\n\nHe mentioned his daughter the way men mention a church they no longer attend. He looked at you as if you could be convinced to be a better country than the one he serves. You took his codes anyway, or you will, now, which is the same verb in different tenses. The packet is at forty percent. The note will copy with it. History likes to travel with the weapon.",
        "You could delete the note. You could leave it as a hook in the throat of whoever receives the drive. Voss would use it to hang him. Crowe would use it to own him more completely than she already does. You — if you keep it — could use it as a second key, the human one, the one that opens hearings instead of servers.\n\nThe orchard does not care. It cares about temperature and write-speed. You are the only superstitious object in the row. Your hands hover over CLIENT PREVIEW. Reading is a kind of theft that does not show on cameras. Not reading is a kind of cowardice that does not show either. Both will live in you.",
      ],
      choices: [
        {
          text: "Open the list. Know who you are about to save or sell.",
          to: "c20_read_yes",
          effects: { integrity: 4, heat: 4, flags: { ives: true } },
        },
        {
          text: "Take the packet blind. Names are how people become leverage.",
          to: "c20_read_no",
          effects: { cover: 6, corruption: 4 },
        },
      ],
    },

    c20_read_yes: {
      chapter: "c20",
      location: "The Orchard · export console",
      speaker: "",
      pages: [
        "You open it. The list is a city. Not the Stack's tourist map — the other city, the one that eats. Donors. Subjects. A pediatric researcher whose work you once admired in a paper you read when you still had Sundays. Two names from Mia's hospital, which makes your stomach perform a civilian function. A column marked LEVERAGE shows photographs, some of them sexual in the bored way blackmail is sexual, some of them merely medical, which is worse.\n\nYou do not linger on the photographs. Lingering is how Crowe wins even when he is not in the room. You let the names pass through you like a cold drink. They will sit in you later, at 04:00, when sleep tries to happen. The packet ticks to seventy. Knowing does not slow the copy. Knowing only slows the person.",
        "Near the end: MIA RENN — ASSOCIATE / UNCOMPROMISED / MONITOR. Or, if the last months went the other way, a different line, a dirtier one. The file does not blink. Files never do. You close the preview before the orchard can watch your face change. Vale was right about metaphors. This is inventory. You have just become a warehouse.\n\nYour hands are steady. That is not virtue. That is training. Virtue would have been staying on the tram. The drive shines a thin green vein. Almost done. Almost a country in your pocket. The fans kneel.",
      ],
      next: "c20_packet",
    },

    c20_read_no: {
      chapter: "c20",
      location: "The Orchard · export console",
      speaker: "",
      pages: [
        "You kill the preview. The names remain names you have not eaten. That will not make you innocent. It will make you faster. The packet runs like water finding a drain. You watch the bar because watching is a way not to think about Mia, or Voss's rain, or Crowe's mouth when he says own as if it were a caress and a filing status.\n\nIgnorance is a tool. Kane taught that. Voss hates it. Crowe sells it in gift boxes. You hold the tool and feel its cheapness and use it anyway. The drive hits ninety. Your reflection in the dark glass beside the screen looks like a person who has already left.",
        "A small mercy: you will not have to remember a judge's birthmark while you decide who gets the switch. A small cost: someone on that list will be rewritten next month and you will not be able to say you didn't know the shape of it. You will only be able to say you chose not to look, which is the civilian version of a war crime.\n\nThe bar completes. The orchard chimes in a tone Helix uses for completed yoga classes. You almost laugh. You do not. Laughter in a server room is how cameras learn you are still human enough to hunt.",
      ],
      next: "c20_packet",
    },

    c20_packet: {
      chapter: "c20",
      location: "The Orchard · export console",
      speaker: "",
      pages: [
        "The harvest drive sits in your palm like a tooth you have just lost and are not ready to throw away. Two keys in the cradle: SHUTDOWN, TITLE. The physical keys are theater — Vale's courtesy to boards who still believe in objects — but the theater is bound to the packet. Without the keys' handshake the daemon will not wake. You take both. The cradle looks robbed, which is accurate.\n\nYou make copies because you were trained by people who do not believe in single points of failure, including yourself. One image on the harvest drive. A second, thinner image on a card in your shoe that Kane would call unsanitary and Voss would call correct. The orchard logs the copy. Of course it does. Logging is the firm's prayer.",
        "Now the only question left is the oldest one in this city: who you hand the prayer to. The fans have not changed. The cold has not changed. You have. You can feel the change as a heat that does not belong in this room, a human weather gathering under your coat.\n\nFootsteps on the grate. Not Vale. Vale does not hurry and does not wear shoes that announce policy. Marek Pell comes through the rows like a rumor that got funded. He has a sidearm and a smile and the particular glow of someone who has been waiting to be the scene.",
      ],
      next: "c20_maren",
    },

    c20_maren: {
      chapter: "c20",
      location: "The Orchard",
      speaker: "Marek Pell",
      pages: [
        "Marek stops at a polite distance that is also a shooting distance. His coat is open. Under it, the black of Helix night staff, tailored to remind you he has a body and that the body is part of his report. Crowe's lieutenant. Younger. Hungrier. He looks at the empty cradle, then at your hand, then at your mouth, as if the codes might be in your teeth.\n\n\"Director Crowe asked me to offer you a ride,\" he says. \"He also asked me to offer you a reason to be late. I am authorized to be either a door or a bed. You can tell me which one photographs better.\" The fans make a chapel of the offer. His perfume is the same citrus as the atrium, worn warmer, worn like a joke about cleanliness.",
        "You could shoot him. The orchard would record it as a thermal event. You could give him the drive and become a line in his loyalty column. You could let him put his mouth on you against a server rack named BOSC and buy four minutes of confusion in the cameras, which is sometimes the same thing as living.\n\nHe tilts his head. \"Don't look pious. You came into our fruit. Fruit stains. I'm just offering you a say in the color.\" His eyes are bright with the specific arousal of people who were promoted for wanting. It is not fake. That is what makes it usable. That is what makes it dangerous.",
      ],
      choices: [
        {
          text: "Take the minutes. Use his mouth, his hunger, the cameras' confusion.",
          to: "c20_maren_yes",
          effects: { corruption: 10, heat: 8, flags: { honey: true } },
        },
        {
          text: "Keep the distance. He is a report with a pulse.",
          to: "c20_maren_no",
          effects: { integrity: 6, cover: 4 },
        },
      ],
    },

    c20_maren_yes: {
      chapter: "c20",
      location: "The Orchard · BOSC row",
      speaker: "",
      pages: [
        "He does not kiss you first. Kissing would imply a civilian grammar. He takes you by the belt and puts your back against BOSC, the rack humming through your spine into his wrist. He makes a sound that is half laugh, half filing note. His mouth finds yours as if he has practiced on a briefing photo. He tastes of mint and the metallic chill of the room and a sweetness he put there on purpose.\n\nHis hand goes into your coat and does not reach for the drive. He is better than that. He reaches for skin, for the heat you brought in from the stairwell, for the proof that you can still be lowered into a body. You let him. Letting is a tactic and a want and you are no longer in a job that separates those cleanly. The grate bites the soles of your shoes. His thigh slots between yours with professional accuracy. The fans cover the wetter sounds. That is why he chose this row.",
        "He gets you open because he wants the report to include the image and because he wants the image. Cold air finds the back of your neck while he fucks you against the rack, unhurried, thorough, a man conducting an audit with his cock. You hold the metal, not his hair; holding his hair would be a promise. He looks at you once, eyes bright, mouth wet, and the look says: you can still be owned in pieces even if you leave with the whole packet.\n\nYou come with your teeth closed and your hand locked on metal that does not care. He follows, then stands, wipes his mouth with the back of his wrist, and is immediately a lieutenant again. \"Four minutes,\" he says, voice roughened into honesty. \"Crowe will know anyway. I wanted you to remember that I got there first.\" He does not take the drive. He wants you to carry it to his director like a dog that has learned a trick. You step away from BOSC. The rack keeps humming. You keep the taste of mint and copper and a decision you will not put in the journal.",
      ],
      next: "c20_comms",
    },

    c20_maren_no: {
      chapter: "c20",
      location: "The Orchard · BOSC row",
      speaker: "Marek Pell",
      pages: [
        "\"No,\" you say, and the word comes out cleaner than you feel. Marek's smile does not fall; it changes tax status. He holsters the offer the way he holsters the sidearm: still present, just not in his hand.\n\n\"Pity,\" he says. \"You would have been a good line in the report. 'Subject declined. Still convertible.'\" He walks a circle that is not quite a threat. \"Crowe isn't going to kneel in a server room. He'll wait in a place with better lighting and worse mercy. I was doing you a kindness. Kindness is the one thing you people keep refusing as if it were poison.\"",
        "\"It is poison,\" you say. \"It's just mixed with something I used to like.\" He almost respects that. Respect on his face looks like hunger that has been told to sit.\n\n\"Then run your little auction,\" he says. \"Voss on one channel, Crowe on the other, you in the cold pretending the keys are a moral philosophy. I'll be in the atrium. If you bleed, try not to ruin the marble. We just sealed it.\" He leaves through the trees. His shoes write a diminishing argument on the grate. You are alone with the packet and the two voices about to become people.",
      ],
      next: "c20_comms",
    },

    c20_comms: {
      chapter: "c20",
      location: "The Orchard",
      speaker: "",
      pages: [
        "Both channels open at once. The orchard, traitorously, has enough quiet between fan-cycles for you to hear rain on two different roofs. Voss is on a Revelations blackout deck. Crowe is in his glass office above the atrium, ice already in the glass you heard an hour ago. They do not speak over each other. They have done this dance with other assets. You are simply the current music.\n\nYou could pull the earpiece. You do not. Listening is the last courtesy you owe the people who made you possible. The drive weighs nothing and enough to change your posture. SHUTDOWN in one pocket. TITLE in the other. The copies in your shoe like a sin you can walk on.",
        "A camera in the corner ticks its iris. Somewhere, Vale is watching a temperature graph instead of your face, which is his form of decency. Lyle is turning a body that is not yours. Radek is deciding whether to report a dream. Marek is in the atrium ruining the idea of marble with her patience.\n\nYou stand in the white hall of other people's futures and you prepare to choose.",
      ],
      next: "c20_voss_ask",
    },

    c20_voss_ask: {
      chapter: "c20",
      location: "Orchard · Voss channel",
      speaker: "Voss",
      pages: [
        "\"{{name}}.\" Voss says your name like she is setting a bone. Older. Field. The sadist with a code, still convinced the code might get you out if you stop decorating it with exceptions. Rain on her end is real rain, not grid; she is outside the firm's weather on purpose. \"You have the packet. I can hear it in your breathing. Don't give me poetry. Give me the daemon and the list and I will burn CHRYSALIS down to a wellness pamphlet. The chairs go dark. The mint stops. People stay the shape they were this morning, for better and for worse.\"\n\nA pause. She does not fill pauses with comfort. \"I know what it costs. I know what you've let them put in you, or what you've refused, or what you've done in rooms I wasn't allowed to enter. I am not clean. I am offering you a shutdown, not a baptism. You walk out. We extract. Mia keeps a city that still has a nurse in it. You keep whatever is left of your name. That is the deal. It has always been the deal. I just stopped pretending it would feel like winning.\"",
        "Her voice roughens, which is as close as she comes to putting her mouth on the wire. \"If you give it to Crowe, she will not kill you. That is not mercy. She will keep you. She will put your body on a subscription and your will on a leash that photographs well. If you keep both copies you will live in the seam until the seam closes on your throat. If you destroy it, you become the kind of saint this city uses for kindling. I am not asking you to be good. I am asking you to pick a fire I can stand next to.\"\n\nYou can hear her hand around a paper cup. You can hear that she has not slept. You can hear, underneath the handler, the woman who once pulled you out of rain and called it work so neither of you would have to call it care. \"I'm on the north roof in twelve minutes,\" she says. \"Don't make me wait with a speech already written for a corpse.\"",
      ],
      next: "c20_crowe_ask",
    },

    c20_crowe_ask: {
      chapter: "c20",
      location: "Orchard · Crowe channel",
      speaker: "Julian Crowe",
      pages: [
        "Julian Crowe does not say your name first. He says \"Darling,\" which is worse, because it fits too many mouths. Ice turns in him glass. \"Marek tells me you were disciplined. Or entertaining. Either way, you have my property in your pocket. Bring it upstairs. I will not insult you with a speech about the future of wellness. You have seen the chairs. You know what we mint. You know that someone will mint it. The only adult question is whether you sit on the board or under it.\"\n\nShe lets you hear him stand, the quiet expensive sound of a woman who has never crawled a service tunnel. \"Voss will offer you a shutdown. It is a pretty word for abandoning every incomplete subject to whatever half-body we left them in. It is also a pretty word for putting Revelations back on top of a market they do not understand. Kane will sell the ashes. You know he will. I am offering you title. Not a metaphor. The legal object. You give me the packet, I give you a life that does not have to hide in trams. I give you a room. I give you my hands, which you have already learned are not kind and are extremely competent.\"",
        "A softer note, almost intimate, the blackmail-as-tenderness he has always preferred to guns. \"I do not need you to love me. I need you to stop pretending love is the currency. Bring me the keys, {{name}}. I will own the protocol and I will own the part of you that still flinches, and I will keep both in a drawer that does not flood. That is the most honest marriage left in the Stack.\"\n\nShe does not give you a roof and a time. He gives you an elevator that will open if you approach it with him property. The ice turns again. \"If you burn it,\" he adds, almost curious, \"I will not chase the smoke. I will chase you. Smoking is a habit. You are a project.\"",
      ],
      next: "c20_decision",
    },

    c20_decision: {
      chapter: "c20",
      location: "The Orchard",
      speaker: "",
      pages: [
        "The congregation of fans holds its breath between cycles. You are alone with two keys, one drive, one dirty copy, and a body that has been used as a signature. This is the kill switch. Not the daemon — you. The moment where the campaign stops being a sequence of rooms and becomes a name people will use later as a warning or a toast.\n\nVoss's rain. Crowe's ice. Marek's mouth or Marek's contempt. Lyle's fob cooling in your pocket. Vale's lecture dissolving into inventory. Ives's FOR THE RECORD clinging to the packet like a guilty child. Mia, who may still believe you are kind. The convertible line in your own file, blinking even though you closed the pane.",
        "You can give Voss the daemon and let the chairs go dark. You can give Crowe title and become the kind of owned that comes with sheets and a salary. You can keep both images and live as a seam until someone sews you shut. You can smash the keys on the grate and put the drive under a rack's foot until it is a bright useless powder, and walk out with nothing but the knowledge that nobody mints anyone with this particular machine tomorrow.\n\nThe white light does not blink. You decide the way you have decided everything since Kane's card: with your hands, because your mouth has already been used too often as a yes.",
      ],
      choices: [
        {
          text: "Give Voss the packet. Shutdown. Let the mint die.",
          to: "c20_to_voss",
          effects: { integrity: 12, cover: -6, heat: 8, flags: { shutdown: true } },
        },
        {
          text: "Give Crowe title. Walk upstairs into a life that owns you back.",
          to: "c20_to_crowe",
          effects: { corruption: 14, integrity: -10, flags: { owned: true } },
        },
        {
          text: "Keep both copies. Be the seam. Play both roofs.",
          to: "c20_keep",
          effects: { cover: 8, corruption: 8, integrity: 4, heat: 10, flags: { double: true } },
        },
        {
          text: "Destroy the keys and the drive. No one mints this tomorrow.",
          to: "c20_burn",
          effects: { integrity: 10, cover: -12, heat: 16, flags: { burned_codes: true } },
        },
      ],
    },

    c20_to_voss: {
      chapter: "c20",
      location: "The Orchard",
      speaker: "",
      pages: [
        "You put TITLE back in the cradle like a snake you have decided not to keep and you take SHUTDOWN and the harvest drive and you walk. The orchard does not bless you. Blessing is a wellness word. You pass Vale in the antechamber. He sees which key is missing and nods as if a dosage has been administered correctly.\n\n\"Aesthetically crude,\" he says. \"Clinically decisive. The incomplete subjects will plateau. Some will sue the air. I will be employed by whoever inherits the chairs. Do not ask me to thank you.\" You do not. You take the stairs because the elevator is Crowe's sentence. Your earpiece carries her silence, which is sharper than a threat. Voss only says, \"North roof. Don't run. Running looks guilty on thermal.\"",
        "Marek is in the atrium, as promised. He sees your face and knows. He does not draw. He looks briefly, brilliantly disappointed, like a person who lost a bet he wanted to lose in a more interesting way. \"Saint,\" he says. \"Try not to slip in the rain. Martyrs stain worse than blood.\"\n\nYou cross the marble. The chrysalis sculpture opens on its timer and there is still nothing inside. You go up through air that gets colder and more honest. The north roof door tastes of rust and old cigarettes, the civilian kind. Voss is a dark shape against a weather grid that has given up pretending. She holds out her hand. You put a country in it. Her fingers close with a care that is not tenderness and is not not tenderness. \"Good,\" she says. \"Now we leave before the building notices it has been made mortal.\"",
      ],
      next: "c20_out",
    },

    c20_to_crowe: {
      chapter: "c20",
      location: "Helix · Crowe's lift",
      speaker: "",
      pages: [
        "You leave SHUTDOWN in the cradle like a virtue you cannot afford and you take TITLE and the drive and you walk to the elevator Crowe promised would open. It does. The interior is mirrored. You watch yourself become a person carrying a leash in your own hand. Vale watches you pass and writes something on a pad that is probably the word expected.\n\nThe lift does not show floors. It shows a progress bar. You have seen this joke before. It is less funny when the bar is your remaining autonomy. Your earpiece carries Voss's breath, one long inhale that does not become a sentence. Then she cuts the channel, which is the most violent thing she has done to you. The absence lands in your chest like a dropped key.",
        "Crowe's office is glass and night and a single lamp that knows how to touch a throat. She is in the lamp. Mid-forties. Blackmail as intimacy. She does not take the drive from your fingers; she waits until you set it on the desk yourself, because the ritual matters. Title transfers with a chime that sounds like a wedding in a language you do not speak.\n\n\"There,\" she says, and comes around the desk, and puts her thumb on your mouth the way a person tests whether paint is dry. \"You may still sleep in your own slot tonight. Tomorrow the slot becomes a suite and the suite becomes a schedule. Don't look tragic. Tragedy is for people who weren't offered a chair.\" She kisses you like a stamp. You let the stamp adhere. Owned is no longer a rumor in a status line. It is the taste of her mouth and the weight of a legal object that used to be a choice.",
      ],
      next: "c20_out",
    },

    c20_keep: {
      chapter: "c20",
      location: "The Orchard",
      speaker: "",
      pages: [
        "You take both keys. You take the drive. You keep the dirty copy in your shoe. You tell Voss, \"North roof, I have it,\" in a voice that is almost true. You tell Crowe, \"Coming up,\" in a voice that is the other almost. Then you cut both channels and you walk a third way, the service spine that leads to a rain deck neither of them owns.\n\nThis is the seam. It feels like standing in a door that is closing from both sides. Vale sees your pockets and actually smiles, a small clinical expression of delight at an impure sample. \"Double agents are just patients who dose themselves,\" he says. \"Try not to overlap the medications.\" You do not answer. Answering would be a dosage.",
        "Marek finds you at the service door and reads the lie on you like a price tag. She could shout. She does not. \"Oh,\" she says, almost affectionate. \"You're going to die interesting.\" She lets you pass because interesting is a kind of loyalty she understands. The rain deck hits you with grid-water that has been programmed to feel like regret. You have two countries in your clothes and no roof that will not eventually ask you to pick.\n\nYou send Voss a fragment: daemon handshake, enough to keep CHRYSALIS from fruiting at scale for a week. You send Crowe a fragment: title metadata, enough to keep her from burning the building to find you. Neither fragment is the whole prayer. The whole prayer walks with you, in a shoe, toward a night that will have to be survived before it can be judged.",
      ],
      next: "c20_out",
    },

    c20_burn: {
      chapter: "c20",
      location: "The Orchard",
      speaker: "",
      pages: [
        "You put the keys on the grate and you use the rack's foot and your heel and the ugly strength of a person who has run out of cleverness. SHUTDOWN snaps first, a bright cheap sound. TITLE takes two hits and a sound like a tooth. The harvest drive you grind until the fingernail of it becomes glitter that will live in this floor's cracks like a rumor. The dirty copy in your shoe you take out and feed to the same metal until there is no second country, no seam, no saint, no owner.\n\nThe orchard alarms in a tone Helix uses for fire and for unscheduled birth. Vale appears in the antechamber and looks at the glitter with something that might be grief if he permitted himself civilian organs. \"Inelegant,\" he says. \"And complete. We will rebuild. You have bought a delay and a story. Stories are expensive. I hope you can afford what they charge you.\"",
        "Both channels detonate into voices and then into silence as you drop the earpiece into the glitter and grind that too. Voss will come to the roof and find weather. Crowe will find an elevator that opens on nobody. Marek will find marble and a saint's rumor. You take the stairs three at a time because the building has noticed it has been made mortal and mortality makes buildings bite.\n\nHeat blooms on every camera. Your face is a wanted object now, not a convertible one. You hit the rain deck with your lungs full of server-cold and your hands sparkling with microscopic countries. The grid-rain washes some of it off. Not enough. Never enough. You run like a person who has just insulted the idea of keys.",
      ],
      next: "c20_out",
    },

    c20_out: {
      chapter: "c20",
      location: "Plate Seven · weather lip",
      speaker: "",
      pages: [
        "However the orchard ended, the plate receives you as weather. The funeral setting is still on. Neon runs. A tram in the distance practices being unremarkable. You are remarkable now; you can feel it in the way a drone adjusts its height to keep you legal and visible. Your coat is wrong for innocence. Your mouth is wrong for prayer. You walk anyway, because walking is the last tradecraft that looks like living.\n\nIf you gave Voss the packet, she is already in a car that does not stop at lights, already feeding the daemon to people who will not toast you. If you gave Crowe title, a suite is being turned down by hands you have not met. If you kept both, your shoe is a border. If you burned it, your palms still itch with glitter that will show under a certain lamp in a certain precinct.",
        "Kane texts a single line to a number you were told to swallow: RECEIVED / DENIED / SPLIT / ASH — he has always liked four-box forms. You do not answer. Answering Kane is how you become a quarterly report. A second text arrives from a civilian thread you have been starving or feeding depending on the month. Mia: you alive or did the archive finally eat you. The old joke. The old door.\n\nYou look at the words until they stop being words and become a pulse. Tonight is not the night you explain export codes to a nurse. Tonight is the night you find a room that will hold a body until morning, because morning is when the city starts spending what you just did. You put the phone away. You keep moving. The rain writes the same sentence it wrote at the start, and you are still not sure whether you believe it.",
      ],
      next: "c20_kane",
    },

    c20_kane: {
      chapter: "c20",
      location: "Service tram · outbound",
      speaker: "",
      pages: [
        "Kane does not meet you. Kane never meets you at the bleeding edge; he meets invoices. His follow-up is a voice note you play once with the tram's piano advertisement under it like a joke the city did not authorize. \"If you shut it down, congratulations, you have made us popular with people who like trees. If you sold it, congratulations, you have a future that will require a dentist who does not ask questions. If you split it, congratulations, you are now the product. If you burned it, congratulations, you are a folk song. Folk songs get covered by worse singers. Call me when you decide which genre you can live in.\"\n\nHe pauses. In the pause you hear him sip something that is trying to be coffee. \"Voss is not your mother. Crowe is not your wife. I am not your priest. The file stays open until someone closes it with a body or a stamp. Try to pick the stamp. Bodies are messy on the quarterly.\" The note ends. The advertisement offers you a productive sleep. You almost throw the phone. You do not. Phones are how Mia finds you. Phones are how the firms find you. The symmetry is the insult.",
        "A man across the aisle watches your hands. You fold them. Folded hands photograph as prayer or as someone hiding glitter. The tram dives through a plate-gap and your stomach performs the civilian function again. You let it. You are still a mammal. The orchard did not take that, only the illusion that mammals get to choose their weather.\n\nYou ride past Plate Four — Mia's hospital a pale block with night windows like a punctured chart — and you do not get off. Getting off would be a chapter you are not ready to title. You ride to a slot that may still be yours, or to a hotel that rents by the moral, or to the kind of room Voss keeps for people she has not given up on. The city does not ask which. The city only asks that you pay.",
      ],
      next: "c20_slot",
    },

    c20_slot: {
      chapter: "c20",
      location: "A rented dark",
      speaker: "",
      pages: [
        "The room you find is seven meters by four or it is a suite with a lamp that knows throats or it is a handler's bolt-hole with a paper cup already sweating on a crate. The specifics belong to the choice you made. The feeling does not. The feeling is a body arriving after a theft, unsure whether it has stolen a weapon or become one.\n\nYou lock what can be locked. You wash your hands until the water runs without sparkle. You look at the mirror the way you were taught not to, long enough to see whether {{name}} is still the person in the glass. The person looks tired enough to be true. The person looks like you could still be rewritten if someone with clean hands and a tray decided to try.",
        "Outside, the funeral weather clicks off on a timer. The grid switches to 'late commerce,' a drizzle designed to move people into shops. You sit on the edge of whatever bed this is and you feel the night arrange itself around the fact of you. Tomorrow the firms will spend the orchard. Tonight there is a last personal hour — maybe two — before the city files you under a heading.\n\nYou take off the coat. You keep the pistol close enough to be a conversation. You do not sleep. Sleep is for people who have not just held a kill switch in their mouth and decided what kind of animal they are. Somewhere a tram goes by, practicing. Somewhere a clinic humidifier sings. Somewhere Voss or Crowe or both are writing your name in different inks. You turn off the lamp with your hand, which is still yours, which is the whole remaining joke.",
      ],
      next: "c20_end",
    },

    c20_end: {
      chapter: "c20",
      location: "A rented dark",
      speaker: "",
      journal: "Orchard closed. The codes went where {{name}} sent them.",
      pages: [
        "You lie in the dark and inventory what the orchard took and what it left. It left your name, for now. It left a pulse. It left the old flinch, smaller, meaner, still useful. It left the knowledge that Lyle will mop a hallway at five and that Vale will be employed by someone and that Radek will log a dream and that Marek will write a report that smells of citrus and want.\n\nIt left the last night. People like you do not get many of those. The ones you get are usually spent on work. This one might be spent on a person. Mia, if you still deserve a civilian mouth. Voss, if you can stand a code that bites. Crowe, if ownership is the honesty you have left. Or no one, which is also a kind of vow.",
        "The building's civic anthem does not play; it is too late for anthems and too early for forgiveness. You put your palm on your own chest and feel the mammal working. Tomorrow you will be a heading: shutdown, owned, double, ash. Tonight you are a person in a room who has not yet opened the door to whoever is going to ask for the last true thing.\n\nYou keep the door closed a little longer. Then the last personal hour will spend itself in this same dark, because that is the job, and because the job has become the only way you know how to be touched. The dark agrees to hold you until someone knocks. Someone will knock. In this city they always do. Not yet. Not this chapter.",
      ],
      next: "c21_start",
    },
  });
})();
