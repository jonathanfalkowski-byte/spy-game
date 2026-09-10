(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    c22_start: {
      chapter: "c22",
      sleep: true,
      location: "A glass that has no plants",
      speaker: "",
      journal: "Who you are is no longer a recruitment question.",
      pages: [
        "The corridor person is Kane, or a Kane-shaped hour. He looks like a man who has already billed the ending and is only here to watch you sign. The thin case on the table is open now. Stamp. Blank card. Pen. Your paper cup has made a stain on the card that he glances at with the distaste he reserves for uncontrolled fluids and uncontrolled saints.\n\n\"{{name}},\" he says. \"The orchard is closed. The last night is spent. The city has a heading ready and will apply it with or without your consent. I am offering you the courtesy of walking toward the one you can live in, if living is still the verb. If it is not, there is a heading for that too. We are not sentimental. We are complete.\" He sits. He does not offer you the third chair. The third chair is for people who still think they are witnesses.",
        "Outside the glass the Stack performs worklight. Trams. Clinics. A Helix tooth that may or may not still mint. Revelations' darker rectangle. Plate Four's hospital holding its punctures. You can still see, if you squint, the kind of life in which you buy noodles with a punch card and send Sunday jokes. That life is a rumor you slept next to or refused. It will not be the heading unless you fight the numbers with your hands.\n\nKane turns the blank card toward you. The stain looks like a smaller country. \"Identity,\" he says, ticking boxes in the air. \"Double. Owned. Converted. Talent. Burned. The engine already knows which door your flags prefer. You may still put your hand on a different handle. Hands have been your only honest instrument. Use them once more, and then I will stop paying the people who currently don't know you exist, or I will start paying them under a new name. Either way the quarterly closes.\"",
      ],
      next: "c22_mirror",
    },

    c22_mirror: {
      chapter: "c22",
      location: "A glass that has no plants",
      speaker: "",
      pages: [
        "There is a mirror on the far wall that you did not notice because noticing mirrors has been a workplace hazard since intake. You notice it now because Kane watches you notice it. {{name}} stands in the glass with the face the campaign spent. If the chairs got their dosage into you, the face is a legend: mouth, throat, the new weather of a body that learned to be read as woman, or the half-state of someone who stalled and now lives in a doorway. If you refused, the face is the intake face wearing a last night and an orchard. Either way the eyes still flinch. Kane smiles with his mint. He has always liked the product.\n\nYou look until the flinch happens and then you keep looking, which is the only exercise Vale never prescribed. The person in the glass is an adult. Twenty-one and then some. Not a metaphor. Not a demo. A long novel's last chapter wearing a paper-cup stain and a coat that remembers Sublevel C. You could smash the mirror. You could ask for a new name. You could ask for the old one to be carved deeper. Kane would bill any of those as completeness.",
        "\"Don't perform revelation,\" he says. \"Just pick. If you walk out as yourself, we can bury the rest in the drawer that floods. If you walk out as two people, we will sell both. If you walk out as Crowe's, we will invoice him. If you walk out as a successful conversion, we will put you on a poster that says wellness and means weapon. If you walk out as talent, we will put you on a loop that says wellness and means porn. If you walk out dead, we will leak a story that makes recruitment easier. Those are the genres. I told you to pick one. I am, as ever, not your priest.\"\n\nThe city inhales against the glass. Your hands are clean. Provisional. Stubborn. You think of Mia's dumplings, Voss's three seconds, Crowe's lamp, the unused bed, the glitter in a grate, the daemon in a wet fist, the title on a desk, the dirty copy in a shoe. You think of Subject Zero, stable, non-testifying. You think of Lyle mopping at five. You put your hand on the table because tables are for deciding.",
      ],
      next: "c22_choose",
    },

    c22_choose: {
      chapter: "c22",
      location: "A glass that has no plants",
      speaker: "Kane",
      pages: [
        "Kane slides the pen. It is cheap. Cheap pens are harder to trace and easier to throw away. \"If you do nothing,\" he says, \"the building will file you by the numbers: heat and cover, corruption and integrity, body and the flags you set when you thought no one was counting. Doing nothing is also a choice. I respect it the way I respect drowning.\"\n\nHe waits. He has waited through twenty-two chapters of other people's mouths. You can give him a genre. You can walk out and let the engine apply one. Both will land you in a long room with no next chapter, which is what endings are. The water in the jug has never touched weather. You pour a second glass and do not drink it. Pouring is a delay that still looks like living.",
        "The stamp sits in the case like a small tooth. You have seen teeth. You have been a tooth. You have been a key. You have been a night. Now you are being asked to be a heading, which is smaller than a person and larger than a name. The glass ticks. Kane's mint reaches you, antiseptic, the first smell of the campaign and the last.\n\n\"Whenever you are finished deciding,\" he says, almost kind, which is how you know he is afraid of the quarterly. \"The city has other appointments.\"",
      ],
      choices: [
        {
          text: "Keep the name. Walk out as {{name}}. Identity.",
          to: "c22_identity",
          effects: { integrity: 8 },
        },
        {
          text: "Stay in the seam. Live as two. Double.",
          to: "c22_double",
          effects: { flags: { double: true } },
        },
        {
          text: "Accept the stamp. Be Crowe's. Owned.",
          to: "c22_owned",
          effects: { flags: { owned: true } },
        },
        {
          text: "Wear the legend. Do not come back. Converted.",
          to: "c22_converted",
          effects: { flags: { transitioned: true } },
        },
        {
          text: "Refuse the heading. Become kindling. Burned.",
          to: "c22_dead",
          effects: { cover: -20, heat: 20 },
        },
      ],
    },

    c22_identity: {
      chapter: "c22",
      location: "Plate Nine · outbound weather",
      speaker: "",
      pages: [
        "You keep the name. Kane's face does the small disappointed thing it does when a product remains a person. He stamps the card anyway, because completeness requires ink, and the stamp says ACTIVE — CLOSED FILE — DO NOT CONVERT. He slides it to you. You put it in the coat that remembers the orchard and you walk out of the glass without taking the third chair, because you were never a witness. You were the thing witnessed. That is over, or it is as over as these things get.\n\nWorklight on the plate is almost kind. You buy noodles with cash like a superstition. The woman at the cart does not know you have held a kill switch. She punches a loyalty card and you almost laugh, and then you do laugh, a short civilian sound that scares a pigeon that the city still permits as decoration. The noodles are too hot. You burn your mouth. Pain without a clinic feels like wealth.",
        "If you gave Voss the daemon, the Helix tooth on Seven is quieter this month. Chairs sit dark. Incomplete subjects plateau in bodies they did not order and did not finish; some of them send you money from countries with trees, as Lyle predicted, and you do not spend it on anything that photographs. If you burned the codes, the tooth is busy rebuilding and your face is a rumor security tells to new hires. If you did neither and still walked out as yourself, you have stolen the heading from the numbers by stubbornness, which is the oldest tradecraft.\n\nVoss does not meet you. She sends a paper cup to a locker with no note. The tea is made right. You drink it on a tram that is going toward Plate Four, or toward a station that still has trees on a mural. You do not call her. Pairs get used. You keep the smaller country in your mouth, bergamot and regret's legal cousin, and you let the handler remain a roof. Roofs last longer if you do not stand on them every night.",
      ],
      next: "c22_identity_2",
    },

    c22_identity_2: {
      chapter: "c22",
      location: "Plate Four · clinic hour",
      speaker: "",
      pages: [
        "Mia finds you because you send the room, finally, like a person. The message is not cinematic. It is an address and a time and the word dumplings. She arrives in the coat that is too thin, hair that never learned to photograph, and she looks at your face for the freezer. She does not find enough of it to run. She finds enough of it to be angry for ten minutes in a kitchen that is not rented dark, a kitchen with a window that faces a ventilation throat and a paper flower someone else stuck there, a cousin of yours.\n\nYou tell her more than a true sentence and less than a file. You tell her you are done being convertible on paper. You tell her the firms will not be. She puts a dumpling in your mouth to shut it and then she cries, once, efficiently, the way nurses cry when they have a break in eleven minutes. You hold her. Holding a civilian without a camera is still the gift. If you took her to bed on the last night, the mark on her throat is a faint story about a shelf. If you refused, her shoulder under your cheek is the same country it was on the floor. Either way she is thirty-one and here and not leverage today.",
        "Sundays resume, badly at first, like a limb after a chair. You send the bad jokes. She sends soup you will not eat because you are stubborn and then you eat it because she is stubborner. You do not tell her everything. Everything is how people become files. You tell her enough that she can sleep, which is a different completeness than Kane's.\n\nSometimes she stays. Sometimes you walk her to the tram and do not get on, a small theater of not making her a pair in a photograph. The city allows this theater because it is busy minting other people. You take the allowance. You do not confuse it with safety. Safety is a wellness word. You are trying, instead, to be specific, which is the only identity that ever worked.",
      ],
      next: "c22_identity_3",
    },

    c22_identity_3: {
      chapter: "c22",
      location: "A country that still has trees · later",
      speaker: "",
      pages: [
        "Kane's second life, if you earned it, is not a beach. It is a town that still prints weather by accident: rain that is not assigned, heat that is not a status bar. You take it or you don't. If you stay in the Stack, you stay as a night-archive ghost with a closed file and a pistol you no longer oil every morning. If you leave, you leave on a train that crosses the old river and does not ask for a legend. The trees are real and disappointing, which is how you know they are not a mural. You touch the bark like a superstitious idiot. No one films it. The absence of film makes you dizzy for a week.\n\nWork, when it comes, is small. A records job. A kitchen. A nothing that does not require a badge. Your hands, which opened cradles and people, learn to open jars. The flinch happens less. Sometimes a stranger says {{name}} in a shop and you wait for the reagent-taste and it does not come, and you have to step outside and breathe because the product Kane liked has gone off. Going off is a kind of health.",
        "You dream of the orchard less. When you do, the fans are a congregation that has lost its priest. Vale writes to you once, a letter on paper, because he is vain about archives. He says the chairs, if they went dark, taught him a new word for plateau. He does not thank you. You do not answer. Lyle sends a postcard with no return: mopped. That one you keep in the drawer that does not flood because you bought a cabinet that is just a cabinet.\n\nRadek you see once, years later, in a station, jaw still souvenir. He looks at your hands and nods, the nod of men who logged a dream and then lived. You do not drink with him. Drinking would write a sequel. You are done with sequels that bill by the quarter-hour.",
      ],
      next: "c22_identity_4",
    },

    c22_identity_4: {
      chapter: "c22",
      location: "Wherever the name still fits",
      speaker: "",
      pages: [
        "Crowe does not chase you if you walked out as yourself. He chases projects. You have made yourself a poor investment: closed file, unconvertible, a flinch that no longer photographs well. Marek sends, once, a photograph of the atrium marble with no caption. You delete it. Deleting is a skill you learned late and like. Julian Crowe will own other mouths. You wish, in a way that is not kind and is not not kind, that those mouths have last nights they chose. Then you stop wishing about him, because wishing is how he stays in the room.\n\nSubject Zero — if you met you, if that file sat in your eye — remains COMPLETE / STABLE / NON-TESTIFYING. You do not try to make you testify. Testimony is a firm hunger. You leave an orange on a certain bench one winter because the file mentioned oranges, and you never know if it was taken by the right person. That is as close as you come to being a saint. Saints, Voss said, are kindling. You prefer to be kindling that stayed in the bundle.\n\nIves dies or does not die; senators have a way of doing both at once. His FOR THE RECORD sits in a packet someone still holds, or in glitter, or in Voss's daemon. His daughter inherits a name that smells of rye and does not write to you. You are grateful. Daughters who write become chapters.",
        "You get older in the correct direction. The body, minted or not, remains yours in the legal sense that matters on bad nights: no one else has the remote. You take lovers sometimes, if Mia did not become the only kitchen, and you tell them enough. You do not tell them the cultivar names. BOSC can stay a pear. When you are alone you still check exits. That trivia used to be what firms paid for. Now it is how you sit in cafes. You let it be a scar instead of a product. Scars are allowed to be ugly. Ugliness, a handler told you, is harder to subpoena.",
      ],
      next: "c22_identity_5",
    },

    c22_identity_5: {
      chapter: "c22",
      location: "A Sunday that keeps happening",
      speaker: "",
      pages: [
        "Years on, the heading is boring, which is the victory. People introduce you as {{name}} and do not glance at a handler for confirmation. You have a key that opens one door. You have a cup that is not paper. You have a window that faces something other than a throat, or the same throat made honest by time. The weather, if you stayed in the Stack, is still decided; you just no longer work for the people who decide it. If you left, the rain is stupid and uneven and you love it like a dog.\n\nSometimes at 04:00 you wake and feel the orchard in your teeth, the completeness of a progress bar, the convertible line blinking. You put your palm on your sternum and feel the mammal working. You say the name out loud until it fits without biting. You do not call a channel. Channels are for people who still have a next. You have a now. Now is a smaller country and you can defend it until morning, which is the closest thing to tenderness that still works.",
        "Kane's quarterly closed. Voss is a roof you do not stand on. Crowe is a lamp you did not keep, or kept and use to read books that are not files. Mia, if she is in the kitchen, burns the soup and blames you, correctly. If she is not, Sunday still arrives and you still send the joke to a number that may or may not answer. The sending is the identity. The answering is extra.\n\nThere is no next chapter. That is the point. You get up. You make tea wrong or right. You go to the window and let the city, or the trees, see a person who held a kill switch and then went back to being called {{name}}, which was the hardest theft and the only one you kept. The flinch happens, smaller, meaner, still yours. You keep it. You do not sell it. The morning, unassigned or assigned, continues, and you continue with it, an adult in a body, a closed file that learned how to stay open on the inside.",
      ],
    },

    c22_double: {
      chapter: "c22",
      location: "The seam · two phones",
      speaker: "",
      pages: [
        "You stay in the seam. Kane's mint does not change; he has always liked products that bill twice. He stamps two cards and you put them in different shoes. One card loves Voss's roofs. One card loves Crowe's lamps. Both cards love you the way a vice loves a finger. You walk out of the glass and the city splits around you like a tram-gap. You do not look down. Looking down is how doubles remember they used to be singular.\n\nThe harvest — if you kept it — lives in pieces. A daemon handshake that keeps CHRYSALIS from fruiting at scale when Voss needs a win. Title metadata that keeps Crowe from burning a building when he needs a win. The whole prayer never sits in one room. You are the room. You sleep badly. Sleep is for people who have one name on the nightstand. You have two nightstands, in two slots, on two plates, and a third bed you rent when the first two are being watched.",
        "Voss knows. Of course she knows. She drinks tea in your Plate Nine dark and says, \"Seams close.\" She does not extract you. Extracting a double is how you lose the other eye. She takes the fragments you feed her and she does not put her mouth on yours unless you ask on a night that is not last, a night that is merely late. When she fucks you it is economy and a break in the economy and then she leaves by a different stair than the one Crowe's people watch. When she refuses, she keeps watch for an hour and calls it logistics. You love her in the way seams love the side that still has a code. You do not say it. Saying it would collapse a side.",
        "Crowe knows. Of course he knows. He finds the other slot and leaves a brass lamp and a note: DARLING, SPLIT THINGS BRUISE. He bills you in hours and in skin. When you go upstairs he stamps your mouth and asks for fragments with his hand already on your hip, placing. You give him enough to keep the atrium marble unstained by your blood. You withhold enough to keep Voss's roofs intact. Marek writes reports that contradict each other and is promoted for the poetry. Vale, delighted, calls you a patient who doses themselves. You stop seeing Vale because delight like that is a chair.",
      ],
      next: "c22_double_2",
    },

    c22_double_2: {
      chapter: "c22",
      location: "Two plates · one body",
      speaker: "",
      pages: [
        "Mia is the wound. You cannot split a Sunday. You try. You send jokes from one phone and silence from the other and she, who is not a spy and is an adult, understands that she is being managed. She shows up anyway, once, at the wrong slot, and sees the brass lamp, or she shows up at the right slot and sees Voss's paper cup, and her face does the vitals look and then a look you have not earned. \"I am not a seam,\" she says. \"Do not use me as the third nightstand.\" She leaves the dumplings. You eat them cold for a week like penance that does not work.\n\nYou protect her by starving the thread, which is the old failure. Or you hint, which puts her on a hotter list. Or you told her too much already and now she works nights with a knowledge that makes her hands shake on trays. You send money to Plate Four under a name that is not yours. She returns it. Nurses can smell paid silence. The returned envelope is the most honest object in your two apartments.",
        "Living double is a craft. You change coats in service lifts. You keep two toothbrushes and one pistol and you never let the pistol meet both toothbrushes in the same photograph. You learn the city's plate-gaps the way other people learn prayers. Heat rises and falls like a tide you cannot see from only one roof. Cover is a number you feed with lies that are shaped like hours. Integrity sits in the middle, a bone that will not set because you keep using both hands to hold different doors shut.\n\nKane invoices both firms for 'liaison continuity.' You are a line item with a pulse. The quarterly loves you. You hate the quarterly with a purity that is almost identity. Purity is dangerous in a seam. You dilute it with sex, with rain, with lamps, with the cheap pleasure of getting away with a tram ride no one billed correctly.",
      ],
      next: "c22_double_3",
    },

    c22_double_3: {
      chapter: "c22",
      location: "A year of doors",
      speaker: "",
      pages: [
        "A year in, the seam narrows. Voss puts a hand on the back of your skull in a stairwell and says, \"I can still pull you out. One side. Not both. Both is a story we tell about people we later bury.\" You almost go with her. The almost becomes a kiss that is not tradecraft and then she lets you go because you did not say the sentence. Crowe, the same month, offers a suite that would collapse the Nine slot into a schedule. \"Stop decorating the split,\" he says. \"Come upstairs and be one expensive thing.\" You almost go. The almost becomes his mouth on yours in a lift that does not show floors, and then you get out at a service level and walk until the citrus dies.\n\nRadek stops you once, bruise-twin, and does not arrest you. \"You look like two stairwells,\" he says. \"Pick one before I have to write you down twice.\" You thank him as if thanks were a side. He shakes his head and buys mint. The city is full of people who would like you to be simpler. Simplicity is a heading you refused.\n\nThe packet fragments get hungrier. Voss wants a deeper daemon when Helix starts a quiet rebuild. Crowe wants a cleaner title when a foreign campus comes online. You give each a piece that hurts the other just enough to keep them from shaking hands over your grave. Vale would call it titration. You call it Tuesday. Tuesdays last forever when you are the dose.",
        "You take a third name for the beds that are not theirs. The third name buys noodles and does not punch a card. The third name is the closest thing you have to {{name}}, and you visit it like an affair. Sometimes you sleep there without a phone. Those sleeps are thin and holy. You wake from them crying, which you did not do in the orchard. The third name cannot last. Affairs get found. You know. You have been the finding.",
      ],
      next: "c22_double_4",
    },

    c22_double_4: {
      chapter: "c22",
      location: "The seam closing",
      speaker: "",
      pages: [
        "The close, when it comes, is not a shootout. It is a calendar. Both firms schedule you at the same hour on the same plate, a coincidence so clean it has to be Kane, or Marek, or the building itself deciding it is tired of a mammal in its hinge. You stand in a weather lip between Seven and Nine with a phone in each pocket and you feel the doors coming. Voss from the north roof. Crowe from the glass. Rain assigned to 'civic melancholy' because focus groups still like the way neon looks wet.\n\nYou could pick. Picking is identity. You could run. Running is how folk songs start. You put both phones on the lip and you walk to the third name's noodle cart and you buy a bowl with cash and you eat it while the phones scream in the rain like abandoned children. You do not go back for them. That is the only way a seam becomes a person again: you leave the hardware to the weather.",
        "They find you anyway, of course. Voss finds you first, because she is field, and she looks at your empty pockets and almost smiles. \"Ugly,\" she says. \"Good.\" She does not take you to a car. She sits on a crate and watches you finish the noodles. Crowe finds you second, because he is office, and he looks at Voss and at you and at the cheap bowl and he laughs, the expensive laugh, not kind. \"Very well,\" he says. \"Starve us both. I can bill hunger.\" They do not shoot each other. They are too professional. They shoot you with waiting. You let them wait until the bowl is empty.\n\nAfter that you are not a good double. You are a burned double, which is a status line you have seen in a different life. You live. Living is smaller. You keep one phone and it is stupid and it only knows Mia's number and a cart. Voss sends tea to a locker without a note. Crowe leaves the lamp in a window you will pass if you are careless. You are careless once a year, on purpose, to prove the seam can still bruise. Then you go back to noodles. It is not winning. It is not a heading Kane likes. It is a person who was two rooms and then chose a cart. The city does not know how to file carts. You take the loophole and you eat.",
      ],
      next: "c22_double_5",
    },

    c22_double_5: {
      chapter: "c22",
      location: "A cart that does not punch twice",
      speaker: "",
      pages: [
        "Years on, people say you used to be someone who worked both sides of the Helix war. They say it the way they say weather used to be real. You do not correct them. Correction is a second phone. You have a key that opens one door now, a cheap slot with a paper flower, and you have a cup that is sometimes paper because some habits are scars. The flinch happens when either firm is in the news. You let it happen. You do not sell it.\n\nMia, if she forgave the third nightstand, comes on Sundays with soup and a rule: no lamps, no cups she does not recognize. You keep the rule. It is a better code than either firm's. If she did not forgive, you send the joke anyway and you do not expect dumplings. Expectation is how seams recruit. Voss you see on a platform once, older, still subtracting. She nods at your hands. You nod at her rain. Crowe you see on a screen, testifying about wellness, thumb not on anyone's mouth. You turn the screen off. Turning off is a skill.",
        "There is no next chapter that bills. There are only bowls. You take yours standing up, because sitting looks like a meeting. The weather grid writes civic melancholy on your sleeves and you walk home in it like a person who has already been two people and is trying, finally, to be the one who burns your tongue on noodles and does not call it tradecraft. The name {{name}} fits if you do not bite down. You do not bite down. You chew. You swallow. You go in out of the rain, one door, one lock, one mammal, no next, which is the only ending a double can afford without splitting again.",
      ],
    },

    c22_owned: {
      chapter: "c22",
      location: "Helix · a suite that used to be a slot",
      speaker: "",
      pages: [
        "You accept the stamp. Kane invoices Crowe before you reach the lift. The lift does not show floors. It shows a progress bar, and this time the bar is your remaining autonomy, and it completes with a chime that sounded like a wedding in a language you did not speak in the orchard. Julian Crowe is in the lamp. He does not ask if you are sure. Sure is a civilian superstition. He puts his thumb on your mouth and the paint is wet. He says, \"Darling,\" and the word finally has only one mouth to fit.\n\nThe suite is high enough that the Stack looks like inventory. Sheets better than the rented dark. A closet that already holds your size, minted or not. A schedule on a glass panel: morning walk, clinic if needed, atrium appearances, nights that are not last because they are numbered. Marek brings a report and looks at your throat the way he looked at BOSC, hungry, promoted, denied the first claim and promoted for surviving the denial. You let him look. Looking is in his job description. Touching you now requires Crowe's initials. Marek hates the initials. Hate keeps her useful.",
        "Voss's channel dies on the second day and stays dead. You stand at the suite glass and try to find the north roof and you cannot, because Helix's weather is in the way. You drink tea made right by a person who is not Voss and it tastes like a closed file. You do not cry. Crying photographs as regret and regret is a heading Crowe does not permit in his collection. You put the flinch on like jewelry when he comes home. He likes it. He pays for it with his hands, competent, unkind, extremely present. You come under him with the brass lamp on because he likes to see what he owns. You let yourself be seen. Seen is the marriage.",
        "If you gave her title in the orchard, the legal object lives in a drawer that does not flood, and CHRYSALIS fruits under her name. Chairs wake. Incomplete subjects complete. You attend one launch in a dress or a suit she chose and you smile the smile focus groups like. If you did not give her the packet and still ended here, she owns the night and the schedule and the flinch, and she hunts the protocol as sport while you wait in good sheets. Either way your status line is no longer a rumor. Owned asset. The words sit on you the way her mouth sits on you: placed, not grabbed.",
      ],
      next: "c22_owned_2",
    },

    c22_owned_2: {
      chapter: "c22",
      location: "The suite · nights that are numbered",
      speaker: "",
      pages: [
        "Sex is a clause. She bills it honestly, as she promised. Some nights she wants your mouth and the hearing-proof voice. Some nights she wants you on your stomach and her fingers making you shake while she talks about foreign campuses. Some nights she only wants to watch you sleep, which is worse, because sleeping under a collector is how you learn you are rare. You learn her body the way you learned exits: automatically, completely, a trivia she pays for. Mid-forties, exact, a weapon that also likes wine. You pour the wine. You do not spit in it. Spitting is a folk song. You are not kindling. You are a cabinet.\n\nShe is not always in the room. Ownership includes absence. In the absences you walk the atrium like a patient who has been improved. The chrysalis sculpture opens and closes. You look at the nothing inside and do not tell it jokes. Lyle passes once with a tray and does not speak. Her eyes do the kind thing that is still a procedure. You almost ask her to mop you. You do not. Vale checks your panels if the body was in his chairs; his hands are clean; he says dosage the way other people say good morning. You say nothing. Nothing is permitted if it is elegant.",
        "Mia texts Sunday soup and you do not answer, or you answer from a number that is not yours: I'm fine. The lie is a leash you put on her so Crowe will not. You hate the virtue of it. You keep the virtue. If you spent the last night in Mia's bed, the memory is a country you visit with the lamp off, unauthorized. If you refused Mia, you are grateful in a way that feels like Crowe's patience. Voss you do not text. You would rather be owned than be extracted into a car that does not stop, because extraction now would be another firm winning, and you are tired of being a score.\n\nRadek sees you in a stairwell and looks at your hands and does not find the pistol. \"There you are,\" he says, not fond. \"They rewrote the part that files tickets.\" You smile the donor smile. He buys mint. You go upstairs. The progress bar in the lift completes. You complete with it.",
      ],
      next: "c22_owned_3",
    },

    c22_owned_3: {
      chapter: "c22",
      location: "Helix · a year of initials",
      speaker: "",
      pages: [
        "A year in, your name is still {{name}} on the suite door and something else on the letterhead: liaison emeritus, special projects, a phrase that means mouth. Crowe takes you to a hearing and Ives's empty chair is a joke she does not laugh at in public. She puts her hand on your knee under the table, placing. You do not flinch for the cameras. You save the flinch for the lamp. She rewards the saving. The reward is her mouth, late, unhurried, an audit you fail beautifully on purpose because failing is the intimacy she understands.\n\nYou are not unhappy every hour. That is the part no folk song wants. Good sheets are good. The food is exact. She is funny in a cruel way that keeps you awake, which is better than the freezer. She remembers how you take tea even though she does not drink it. She leaves you alone with books that are not files. She does not, ever, pretend this is love. The honesty is the leash you chose. On bad nights you want Voss's three seconds. On worse nights you want Mia's dumplings. On the worst nights you want the unused bed and the guest called want and the closed door. Then Crowe comes home and the worst night becomes a clause and you come and you sleep and the schedule starts again.",
        "Marek tries, once, to take you against a rack in a new orchard, a sequel building. You say no because no now belongs to Crowe, and the belonging is a sick joke you both hear. Marek smiles with a new tax status and writes you down as STILL CONVERTIBLE / NOT MINE. You almost like her for the last two words. Vale publishes a paper on loyalty as an endocrine event. Your file is in the appendix, anonymized badly. Kane sends a fruit basket. You throw the fruit away and keep the basket for Marek's reports. Completeness loves containers.",
        "You ask Crowe, once, in the lamp, if you can leave. He considers it as policy. \"Walking is permitted,\" she says. \"Returning is required. If you walk and do not return I will not chase the smoke. I will chase you. You are a project. I have said so.\" You walk the next day to Plate Four and stand across from the hospital and do not go in. You return. He does not gloat. He takes you to bed and is almost careful, which is his version of thank you. You hate the thank you. You come anyway. The mammal does not honor grudges.",
      ],
      next: "c22_owned_4",
    },

    c22_owned_4: {
      chapter: "c22",
      location: "The drawer that does not flood",
      speaker: "",
      pages: [
        "You see the drawer. He shows you because showing is a kind of stamp. Title, if he holds it, sits next to photographs of your flinch and a copy of Kane's invoice and a note in her hand: KEEP. The note is not love. It is inventory with a pulse. You touch the packet and he watches to see if you will burn it. You do not. Burning now would be a folk song in a suite, and folk songs stain marble. You close the drawer. He kisses you like a filing.\n\nSubject Zero dines with you once, a warning and an advertisement at the same table. COMPLETE / STABLE / NON-TESTIFYING, beautiful the way a closed protocol is beautiful. Zero says, \"He will keep you until keeping is less interesting than replacing. Make yourself interesting without becoming a chair.\" You do not know how. You try books. You try being funny. You try refusing the bed one night, a small unused country. Crowe stays twenty minutes as a witness, as he did in the rented dark if you refused him then, and the witnessing still works. You ask for the bed before the twenty is up. She does not say I told you so. She is too competent for that.",
        "The city spends you in photographs: atrium, gala, a wellness launch, your mouth not quite yours. Friends you do not have see the photographs and think you won. Winning is a heading. You live under it. Sometimes, in worklight, you take the brass lamp to the window and signal nothing at the north roof. Nothing answers. Nothing is permitted if it is elegant. You put the lamp back. You pour wine. You wait for her key, which is also yours, which is the remaining joke.",
      ],
      next: "c22_owned_5",
    },

    c22_owned_5: {
      chapter: "c22",
      location: "A numbered night · no next",
      speaker: "",
      pages: [
        "Years on, you are still in the suite or in the next suite, the one with better glass. Your name on the door has not changed. Your body has, the ordinary way or the CHRYSALIS way; either way she has kept the remote in the drawer with KEEP. You are not Subject Zero. You can still testify. You do not. Testimony is a firm hunger and you are on a diet she chose. You have a cup that is not paper. You have a lamp. You have a schedule that includes, now, an hour with no initials, which you spent months earning. In that hour you sit on the floor like you sat with Mia, if you ever did, and you eat something inelegant, and you do not file it.\n\nCrowe goes gray at the temples with precision. She still bills honestly. She still does not call it love. You still do not ask her to. On her birthday you give her nothing that photographs and she looks, for one unguarded second, like the woman who brought a lamp to a cheap room. Then the face closes. You live with the close. It is a better weather than funeral weather. It is assigned, but it is assigned to you.",
        "There is no next chapter. Ownership does not end; it changes cabinets. You turn the lamp on because she is late and you have learned to like the coin of light on your own throat. You say {{name}} at the glass and the flinch happens, smaller, jewelry. You keep it for her and for the hour with no initials. When her key sounds, you stand. You are an adult. You were offered a chair and you sat, and the sitting became a life, and the life is not a folk song. It is a suite. It is a mouth. It is a drawer that does not flood. You open the door before she can knock, because that is the courtesy you have left, and you let the stamp find you, and you do not look tragic. Tragedy, she said, is for people who weren't offered a chair. You were. You took it. The night numbers itself. You go in.",
      ],
    },

    c22_converted: {
      chapter: "c22",
      location: "Vale's morning · a name in two tenses",
      speaker: "",
      pages: [
        "You wear the legend. Kane's face does the pleased thing it does when a product completes. He stamps the card CONVERTED LEGEND — STABLE — REASSIGN and he says your old name once, like a courtesy to a dead relative, and then he does not say it again. The person in the glass is a woman the chairs finished, or nearly: the mouth, the throat, the weather of hips and scent and gait that Helix sells as wellness and intelligence shops wear until the original owner forgets to come back. You came back. You just came back as this. The flinch still happens. It looks different on this face. Kane bills the difference.\n\nVale is the one who walks you out, not Kane. His hands are clean. He speaks of dosage, not congratulations. \"You will want to go looking for {{name}} in drawers,\" he says. \"Don't. The drawers flood. Live in the tense I built. It is a better engineering than grief.\" Lyle holds the door and does not mop your cheek, though he looks as if he would like to. \"If you hate us,\" she says, \"hate us on time. Don't be late to your own life.\" You almost laugh. The laugh comes out in the voice they gave you. The voice is good. That is the cruelty.",
        "The city reads you as woman without a hearing. Trams offer you seats that are politics. A man looks at your mouth and does not see a liaison. That was the point. You buy noodles and the cart woman says honey without knowing the word is a file. You take the bowl to a window and you eat as if eating could nail the soul to the new bone. It cannot. It helps. The body works. The body likes salt and heat and being looked at in the way this city looks at women it has not yet billed. You are twenty-one and then some. You are not a riddle. You are a successful conversion walking around with a pulse, a warning and an advertisement, Subject One if anyone were counting.\n\nCrowe sends clothes. Of course he does. The clothes fit the legend. You wear one dress to see if the stamp still wants you. It does. You do not go upstairs, or you do, depending on the flags you can still feel under the new skin. Voss sends a paper cup to a locker with no note. The tea is made right. You drink it and cry in the voice they gave you, which makes the crying feel like someone else's, which is almost a mercy.",
      ],
      next: "c22_converted_2",
    },

    c22_converted_2: {
      chapter: "c22",
      location: "A legend learning Sundays",
      speaker: "",
      pages: [
        "Mia is the first civilian to say the new weather out loud. She comes when you send the room. She looks at you for a long time, vitals, not inventory. \"You're still the person who sent bad jokes,\" she says, and then, because she is honest, \"and you are also not. I can love both if you don't make me take an exam.\" She does not ask to see the scars the chairs left. She sees them anyway, later, if you take her to bed, and her mouth is careful in the way nurses are careful with new skin. If you refuse the bed, she sits on the floor and eats dumplings and treats your voice as a fact, not a trick. Either way she is the only person who uses your old name once, as a test, and then stops when you flinch, and then uses {{name}} like a person, not a reagent.",
        "Sex in this body is a curriculum. You learn it with Mia, or with a stranger who does not know the file, or with Crowe's competent hands if ownership came with the legend, or with Voss in a late room if the handler can stand the tense Vale built. You come differently. You want differently. Appetite was in the protocol; they did not hide that. What they hid was how grief would sit in the appetite like a bone. You fuck to find out whether you are still in the room. Sometimes you are. Sometimes you go into the freezer and have to be called back by a woman saying hey, stay. You stay when you can. You apologize when you cannot. Apology is a civilian superstition you are trying to afford.\n\nThe original owner — the man intake filed — does not come back. That is the success. You wait for him anyway, at 04:00, in mirrors you were taught not to notice. He does not arrive. A woman arrives, tired, adult, holding a paper cup. You nod at her. She nods back. The nod is the whole romance with yourself. You do not decorate it. Decorating is how legends become posters.\n\nKane puts you on a poster anyway, once, eyes blacked, a wellness campaign that means weapon. You see it on a tram. CHRYSALIS: CONTINUITY IS CARE. Your own gait, licensed. You get off at the next stop and vomit noodles into a civic bin. Then you go to work, whatever work a converted legend is allowed: liaison, speaker, quiet proof. You do the work. Work is how you stay in the tense.",
      ],
      next: "c22_converted_3",
    },

    c22_converted_3: {
      chapter: "c22",
      location: "Subject Zero's bench",
      speaker: "",
      pages: [
        "You meet Zero on a bench that smells, faintly, of orange peel. COMPLETE / STABLE / NON-TESTIFYING looks at your finished weather and does not congratulate you. \"They will say you chose this,\" Zero says. \"They will be half right. Half is enough for them. It will not be enough for you at 04:00. Bring fruit. Fruit is not a firm.\" You bring fruit the next week. Zero is not there. The orange you leave is gone by evening. You never know. Not knowing is as close as you come to faith.\n\nVale writes a paper. You are in it as a success curve. You write in the margin of the copy Lyle steals for you: still flinches. You mail it to no one. You keep it in a cabinet that is just a cabinet. Lyle visits once, off shift, and drinks your bad tea and says, \"I mopped. I still mop. If you ever want to be a hallway instead of a legend, I know a clinic that is just a clinic.\" You do not go. Not yet. The offer sits in you like Sunday soup.",
        "If you shut the mint down after wearing it, you are a paradox the firms hate: the last fruit, the closed orchard. People write you letters you do not answer. If the mint continued, you see new faces on trams with the same gait and you look away, a courtesy and a cowardice. Radek looks at your hands in a stairwell and finds no pistol and says, \"They rewrote you into someone who files tickets.\" You say, \"I file them in my own name.\" He almost respects that. Respect on his face looks like a bruise thinking.\n\nCrowe, if he does not own you, still sends clothes. You return them. Returning is a skill. If he owns you, the legend lives in a suite and the stamp finds the new mouth and he says convertible as jewelry. You let him. Or you take the hour with no initials and sit on the floor and eat inelegant food in a body that was engineered for cameras. Both can be true in a long enough life.",
      ],
      next: "c22_converted_4",
    },

    c22_converted_4: {
      chapter: "c22",
      location: "A town that still has trees · or the Stack's late commerce",
      speaker: "",
      pages: [
        "You leave or you stay. If you leave, the trees are real and disappointing and no one reads your gait as a product for a whole week, and the dizziness of that is better than PREP. You take a records job under {{name}} and a woman in the shop says miss as if it were weather, and you stand in the stupid uneven rain and let it ruin a dress Crowe did not pick. If you stay, you stay as a person the plates have already accepted, which is a different safety: the safety of being believed. Being believed is how legends forget to come back. You remember on purpose. Memory is your remaining disobedience.\n\nLovers come. Some want the story. You do not give them cultivar names. Some want the body and not the file. Those are easier and lonelier. Mia, if she stayed in the curriculum, learns you like a language and you learn her like a kitchen. She calls you {{name}} in the dark and the name fits without biting if you do not ask it to be the old tense. Voss, if she can stand it, puts her hand on the back of your new skull and checks whether you still have one. You do. She says, \"Mammal,\" and it is still the right word. You sleep against her thigh in a smaller country that does not care what the poster said.",
        "You get older in the correct direction. The protocol's appetite eases into something more like a person's. You still check exits. You still flinch. The flinch is not product now; it is proof the original owner left a note. You keep the note. You do not show it to Vale. You show it to the woman in the glass at 04:00 and she nods, tired, adult, and you both go back to bed.",
      ],
      next: "c22_converted_5",
    },

    c22_converted_5: {
      chapter: "c22",
      location: "A morning that uses one voice",
      speaker: "",
      pages: [
        "Years on, the heading is converted and the life is not a poster. People introduce you as {{name}} and do not glance at a clinician for confirmation. You have a key. You have a cup. You have a window. The weather is assigned or stupid depending on the town. You make tea wrong or right. You burn your tongue. Pain without a clinic is still wealth. You send Sunday jokes in the voice they gave you and the jokes are still bad, which is how Mia knows the house is not on fire, if Mia is the house.\n\nSometimes you dream you are in intake again and Kane is asking for assigned sex at the door, and you wake before you answer, and the woman you are puts a palm on her own sternum and feels the mammal they did not invent, only edited. You say: I am here. I did not come back. I stayed. The sentences are all true. Truth, in this tense, is a braid, not a line. You can live in a braid. You have lived in worse rooms.",
        "There is no next chapter. There is a dress or a shirt on a chair and a city that still mints people and a you who got off the tram when the poster appeared and then got back on the next one, later, because living requires transit. You go to the window. You let the trees or the plates see a successful conversion who learned to be specific anyway. The flinch happens. You keep it. You do not sell it. You do not let Vale name it. You name it {{name}}, and the name holds, and the morning continues, and you continue with it, an adult woman in a body that was a campaign and is now, finally, just a morning. No next. That is the point. You turn away from the glass and you put the kettle on, and the kettle does not show a progress bar, and you almost smile, and then you do, in the voice they gave you, which is yours now because you stayed long enough to pay the last installment in ordinary days.",
      ],
    },

    c22_dead: {
      chapter: "c22",
      location: "Heat · a city that wants a story",
      speaker: "",
      pages: [
        "You refuse the heading. Kane's mint goes still. He stamps the card anyway: BURNED — DO NOT EXTRACT — USE FOR INTAKE. He does not slide it to you. He slides it into the drawer that floods and you understand that you are already weather. Cover at the floor. Heat at the ceiling. The glass room has become a kill-box with good water. You walk out anyway, because walking is the last tradecraft that looks like living, and the drones drop to an illegal height and then remember the law and rise, which is how you know someone has already sold the feed.\n\nIf you ground the keys in the orchard, the glitter is still in your palms under a certain lamp. If you did not, the refusal now is the same verb in a later tense: no cabinet, no seam, no legend, no stamp. You will not be filed complete. You will be leaked. Kane said it at the start of this room. We will leak a story that makes recruitment easier. You are going to be a folk song. Voss told you saints are kindling. You picked the fire no one can stand next to.",
        "The first hour is almost ordinary. Noodles. A punch card you will not live to fill. The cart woman says honey and you take the bowl to a weather lip and you eat while the city paints your gait onto a board in Radek's building. The second hour is less ordinary. A car that does not stop at lights passes twice. Not Voss's. Voss's cars wait. This one inventories. You throw the bowl away and you go down, not up. Up is roofs and pairs and photographs. Down is laundry annexes and the old ugly honesty.\n\nMia texts: you alive. You look at the words until they blur. You type a period. You delete it. You type: don't come. She will come anyway if you give her a plate. You do not give her a plate. You break the phone under a rack's foot, a private orchard, glitter of a smaller country. Sunday soup will go unsent. That is the price of not being a stranger's story in her ear. You hope she hates you. Hate is safer than stairs.",
      ],
      next: "c22_dead_2",
    },

    c22_dead_2: {
      chapter: "c22",
      location: "Under-plate · the ugly honesty",
      speaker: "",
      pages: [
        "Voss finds the pieces of the phone and not you. She stands in real rain on a lip you have already left and she says your name like setting a bone that is not there. You hear it later, in a rumor, because the city sells handler grief as proof the work meant something. She does not write a speech for a corpse. She writes a stipend for Mia that Kane does not know about, if she can find Mia without making her a pair. She fails or she succeeds. You will not know. Not knowing is the last courtesy you can give either of them.\n\nCrowe does not chase smoke. He said so. He chases projects. You have made yourself smoke on purpose and he is professionally bored, which is the safest thing you can be to him. Marek wants a body to put in a report. He hunts the under-plate with his shoes and his hunger and he finds a coat you abandoned that still smells of orchard. He takes the coat. He writes SUBJECT DECLINED. STILL CONVERTIBLE. MISSING. The last word is the only one that is true. You keep moving.",
        "Radek almost catches you in a service throat. Mint on his breath. Bruises that know your bruises. You look at each other like men — like people — who have already done the stairwell. He does not draw. \"Don't make me write you down,\" he says, the old line. You say, \"Then don't look.\" He looks at your hands and then at the wall. You pass. He will log a dream. Dreams are harder to subpoena than bodies. You owe him nothing and you owe him the rest of your pulse. The debt will not be paid. That is what burned means.\n\nYou sleep in a linen annex that believes it is unimportant. Importance is a lighting design. You have none. You wash in water that has not been assigned hotel honest. You taste iron. You do not take PREP, if you ever did; you need the panic. Panic keeps you off the tram cameras. You eat stolen bread and think about dumplings and do not cry, because crying is cinematic and Mia forbade it in a room you will not see again.",
      ],
      next: "c22_dead_3",
    },

    c22_dead_3: {
      chapter: "c22",
      location: "A story the city tells",
      speaker: "",
      pages: [
        "The leak happens on a Thursday. Revelations needs intake. Helix needs a cautionary. They share you like a tray. The story is wrong in all the ways that recruit: you were a saint, you were a traitor, you burned a future, you saved children, you fucked a director and a handler and a nurse and then vanished into weather. Some of it is true. Truth is a braid they cut into lines. Your face — the intake face, or the converted one — sits on a tram advertisement with the eyes not quite blacked. CHRYSALIS CAN BE UNDONE. Or: DO NOT BE THIS. Or: JOIN THE PEOPLE WHO STOPPED THIS. The same photograph, three captions. Kane always liked four-box forms. He made do with three.\n\nPeople on plates tell the folk song. They add verses. In one you died in the orchard under a rack named BOSC. In one you got out to trees. In one you are still in the walls, a mammal in the hinge, eating linen. You like that one. You are not in the walls. You are in a town that is not supposed to exist on the map, a spill of housing under the last plate, where the grid's weather arrives late and wrong. The rain is uneven. You love it like a dog. You do not touch anyone's mouth. You work a nothing job that pays in cash and coughs. Your name here is not {{name}}. Your name here is a word you heard on a tram. You flinch when you hear the old one in a stranger's radio. The flinch is still product. You cannot stop being useful. You can stop being findable, mostly.",
        "Lyle, off shift, puts a paper flower on a grate on Plate Two. You never see it. Vale writes in a private notebook: incomplete follow-up. He does not file it. Ives's FOR THE RECORD is read in a hearing that uses your leak as color. His daughter does not write. Subject Zero leaves an orange on a bench. It rots. Rot is also continuity.\n\nYou live three months like this, then six, then a year that should have been impossible. Impossibility is a kind of cover. Heat cools when the song gets old. Songs get old. New saints are minted. You are a verse people skip.",
      ],
      next: "c22_dead_4",
    },

    c22_dead_4: {
      chapter: "c22",
      location: "Under the last plate · a year of skippable verses",
      speaker: "",
      pages: [
        "A year in, you see Mia on a screen in a shop window, not a leak — a hospital campaign for night-shift funding. She looks older by a month that was a year. She does not look like a woman who heard your death from a stranger. She looks like a woman who heard nothing and invented a door called silence. You stand in the uneven rain and you do not go to Four. You send nothing. Sunday stays empty. The emptiness is the last protection you can afford. If you were kind, you would die more completely. You are not kind. You are burned. You keep a pulse in a town with late weather and you let her have the door.\n\nVoss you see in a reflection that might be a wish. A dark coat. A paper cup. You do not turn. Turning is how pairs get photographed. The reflection moves on. You buy bread. Your hands shake once, a mutiny Kane is not here to bill. You let them shake. You eat.",
        "Crowe's face appears on a civic feed, wellness, continuity, care. Her thumb is not on a mouth. You feel the place on your lip where paint was tested. You spit in the rain, which is not the same as spitting in wine, and you go back to the nothing job. Marek gets a promotion you read about on scrap paper. STILL HUNGRY, you think, and almost smile. You do not smile. Smiling is for after, and after is a heading you refused.\n\nYour body, minted or not, stays yours because no one here has a remote. That is the folk song's quiet verse, the one they do not print: the kindling lived. The kindling learned to be damp. Damp things burn badly. You stay damp on purpose. You wash in late weather. You do not get elegant.",
      ],
      next: "c22_dead_5",
    },

    c22_dead_5: {
      chapter: "c22",
      location: "Late weather · no next",
      speaker: "",
      pages: [
        "Years on, if you get them, the heading is burned and the life is a skipped verse. People on the plates tell your song wrong. You let them. Correction is how you get found. You have a key that opens a door that does not deserve the word suite. You have a cup that is always paper because you will not keep anything a raid would enjoy. You have a window that faces a throat, and you have stuck a paper flower to the grate, a superstition you stole from yourself. The rain arrives late and stupid. You stand in it until your coat gives up and believes it.\n\nSometimes at 04:00 you say {{name}} and the flinch happens and you are, for a second, the person Kane opened a file on, the person Voss met with coffee, the person Mia sent jokes to, the person Crowe stamped, the person who stood in an orchard and chose ash. Then the second ends. You are the word you heard on a tram. You make tea wrong. You burn your mouth. Pain without a clinic is wealth. You do not send Sunday. You do not stand on roofs. You do not go upstairs. You check exits and you do not apologize to the empty room for it.",
        "There is no next chapter. That is what you bought with the glitter and the broken phone and the unused heading. The city closed you as kindling and you refused to burn on schedule. You get up. You go to the nothing job. You come home. You lock what can be locked. You lie down in the damp and you feel the mammal working, embarrassingly loyal, and you let it work. Tomorrow the grid will assign something to the upper plates and assign nothing down here, and you will walk through the nothing like a person who held a kill switch and then became unfileable. The name in your mouth does not fit unless you bite. You bite. You bleed a little. You swallow. You sleep. No next. The dark agrees to hold you without a knock, and for the first time since the card in the locker, the dark keeps its word.",
      ],
    },
  });
})();
