(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    c09_start: {
      chapter: "c09",
      sleep: true,
      location: "Your rented slot · morning",
      speaker: "",
      journal: "First morning after Vale. The body woke before the name did.",
      pages: [
        "Morning in the Stack is a civic setting on the grid. The rain lifts to a drizzle that looks like industry and calls it dawn. Your slot fills with the smell of other people's rice and a vent that has never learned your name. You wake because a tram bell has decided you should, and because the body Vale wrote on will not let sleep stay locked.\n\nFor a few seconds you are only a pulse. Then the pulse finds chest, finds hip, finds the place between your legs that is either new or old and changed, and the seconds end. You are {{name}}. You are adult. You are twenty-something and employed by two firms. In the dark you still have to check. The paper flower on the grate has not moved.",
        "You do not sit up like a hero. Lyle's voice is still in the muscle: don't tear what they seated; don't perform fine. You roll, slowly, and the sheet tells on you. Heat. Damp. A sensitivity that makes cotton feel like a hand. If you came on the tram last night you do not remember it, which is not the same as not having done it. The stack, the half-work, the forced drip, the minimum — whichever sentence you signed — is still working in your nerves.\n\nYour phone has a message from Voss already, timestamped 05:02, which means she did not sleep or she wants you to think she did not. Rain deck three. Evening. Do not be late and do not be charming. You put the phone face down. Charm is a tool she does not trust you with today. The mirror above the sink is a cheap rectangle and it is waiting. You can meet it now or you can meet it after the body has had water. Either way the glass will not blink first.",
      ],
      next: "c09_bed",
    },

    c09_bed: {
      chapter: "c09",
      location: "Your rented slot · morning",
      speaker: "",
      pages: [
        "You put a hand on yourself the way you would put a hand on a weapon you were not sure was loaded. Inventory is tradecraft. Inventory is also how you stay honest, and honesty is a limited resource this week. The skin is yours in the legal sense. The electricity under it is shared. When you press, the press answers too quickly.\n\nYou take the hand away before the inventory becomes a second shift. Shame arrives on time, civilian, useless. You did not ask the city for a moral. You asked it for a job and it handed you a rewrite. Outside, someone laughs in the corridor. You envy them in a small, specific way that has nothing to do with joy and everything to do with unexamined flesh.",
        "Dressing will be a problem. So will not dressing. The bag from Helix sits on the chair like a guest who has overstayed and paid the rent. Inside: the cut that matches what you are now, the coat that is too nice, the card for a follow-up you will treat as a threat. Your old clothes are in the locker on Plate Six or in a bag you do not remember carrying. Either way they belong to a yesterday that still has your face in it.\n\nYou stand. The floor is cold. The gait cue, if Vale seated one, fires in the hip before pride can object. You catch the sink with both hands and look at the tap instead of the glass. Water first. Then the meeting. Then the city, which will not care what you signed so long as you look like a person who can pay for a tram. Your mouth says {{name}} to the porcelain, a roll call. The porcelain does not argue.",
      ],
      next: "c09_gate",
    },

    c09_gate: {
      chapter: "c09",
      location: "Your rented slot · glass",
      speaker: "",
      text: "The cheap rectangle waits. You can lift your eyes or you can wash your hands for twenty minutes and call it hygiene. The building you left last night does not do hygiene. It does continuity. Continuity means they do not let you look away.\n\nHow do you meet the face they issued.",
      choices: [
        {
          text: "Meet the woman Vale made. Full conversion, first morning.",
          to: "c09_trans",
          require: { flag: "transitioned" },
        },
        {
          text: "Meet the surface. Man with a woman's face and chest.",
          to: "c09_half",
          require: { flag: "half" },
        },
        {
          text: "Meet what they forced. Look at what they took.",
          to: "c09_forced",
          require: { flag: "forced_mod" },
        },
        {
          text: "Meet the stack. The body that wants.",
          to: "c09_depraved",
          require: { flag: "depraved" },
        },
        {
          text: "Meet the minimum. Same face, louder skin.",
          to: "c09_min",
          require: { startGender: "female", notFlag: "depraved" },
        },
        {
          text: "Meet whatever is there. You did not take notes.",
          to: "c09_generic",
        },
      ],
    },

    c09_trans: {
      chapter: "c09",
      location: "Your rented slot · glass",
      speaker: "",
      pages: [
        "The woman in the glass is not a costume. That is the first shock of the morning. She has your eyes — the part CHRYSALIS has not learned to mint cheaply — and a mouth that looks like it has been kissed by a building. Breasts you did not grow in any ordinary year sit on you as fact. When you turn, they turn. When you breathe, they move. Your voice, when you try it, comes out in the frequency Vale dropped into your throat, {{name}} said like a secret that got promoted.\n\nYou part the cheap underwear Helix issued and look because looking is the job and also because if you do not look someone else will describe you first. The cunt is real, swollen from sleep, a cleft that answers the pad of your finger with a heat so immediate you have to hold the sink. You do not come. You could. That is the new physics. You take the hand away shaking and laugh once, a sound the old chest could not have made.",
        "There is grief in it, and curiosity, and a professional note you hate: this will work. Ives will see a woman. Crowe will see a completed order. Voss will see an asset she may not be able to pull out by the name she filed. You splash water until the laugh stops. Water runs between your breasts and startles you like a stranger's mouth.\n\nYou try your old stance in the glass and the stance fails. The hip has a suggestion. The shoulder has less. You are still the person who checks exits. The exits have moved inside the skin. You dry your hands on a towel that smells of other tenants and say, quietly, she, because the pronoun is a tool and tools do not require belief. Belief can come later, or not. The gala will not wait for theology. Neither will the tram.",
      ],
      next: "c09_shower",
    },

    c09_half: {
      chapter: "c09",
      location: "Your rented slot · glass",
      speaker: "",
      pages: [
        "The man in the glass has a woman's softness now, and the softness is tissue, not lighting. Your face has a roundness at the cheek and mouth that will pass at two meters under gala light. Your chest has a breast's idea of itself: small, sore, undeniable when a shirt pulls. You cup one because you are an idiot and a professional and the nerve is a live wire. Your cock is still there, half-hard from nothing but morning and chemistry, looking editorial against a body that has been footnoted.\n\nYou stroke once, experimental, and the old shape delivers a new electricity. Vale said the electricity would win arguments. He was not wrong. You take the hand away before you spend yourself into the sink like a person with no tradecraft. The scent lock, if that is what this sweetness is, makes the slot smell faintly like night flowers that do not grow on this plate.",
        "Passing will be a negotiation. Silk will say yes. Steam will say no. A bathroom will be a test. You practice the gait in three steps and hate how natural the third one feels. Habit is what they installed. Habit is how legends stay seated when the actor wants a union break.\n\nYou tell the glass you are still a man. The glass does not take dictation. It shows a liaison who can enter a room as a rumor and leave as a receipt. You splash water, watch it run over the new swell, and understand why Crowe prefers full and why you did not give it to him. The leftover is not dignity exactly. It is a spare key. Spare keys get lost. You put this one in the part of your head that still has a locked drawer, next to Mia's name, and you do not open either.",
      ],
      next: "c09_shower",
    },

    c09_forced: {
      chapter: "c09",
      location: "Your rented slot · glass",
      speaker: "",
      pages: [
        "The theft is visible if you know how to look, and you do, because you were looking when they did it. A softness at the mouth. A tenderness in the chest that is not breasts and is not nothing, nipples that flinch at cotton as if a mouth had spent an hour there without asking. Your cock is yours and it is also a rumor, oversensitive, a little wet in a way you were taught not to name. The gait is a half-degree off. The sweetness on your skin is a flag Vale said Voss would smell.\n\nYou say no to the glass, late, a children's no that still has to be said. The glass shows a man who refused and was written on anyway. Anger arrives, clean, the output Vale said he preferred to dissociation. You hold it. You will need it on the rain deck. You will need it if you decide to lie. You will need it if you decide not to.",
        "You touch your chest and the touch is a bruise that does not show. You touch your cock and it answers like a collaborator. The shame of that collaboration is so complete it becomes useful: you now know exactly how the building enters a person. Not with a speech. With a bag the color of dirty ice and a nurse who said sorry while he held you down.\n\nLyle's face crosses the glass like a watermark. You do not forgive him. You do not have to, to use what he gave you — the word forced, logged, a sentence Voss can spend. You splash water until your hands stop shaking enough to hold a toothbrush. The toothbrush is civilian. You cling to civilian objects. The city is a grid. Grids do not care if you can swim. They care if you stay in the lane.",
      ],
      next: "c09_shower",
    },

    c09_depraved: {
      chapter: "c09",
      location: "Your rented slot · glass",
      speaker: "",
      pages: [
        "The woman in the glass looks like you if you had been designed by a committee that drinks. Silhouette a little more Ives than you woke with two days ago. Mouth wet. Pupils that take light as if light were a hand. When you move, scent lifts off your throat, sweet, specific, a chemical sentence that says available in a dialect the tram will understand before the driver does. Between your legs you are already slick. That is not a mood. That is a product feature.\n\nYou put two fingers in because Vale said unused charge becomes tremor and poor tradecraft, and because you are trying to be a good employee of your own nervous system. The orgasm is fast and unearned and it drops you against the sink with a sound the neighbors can probably invoice. You hate how easy it was. You also feel your hands steady. The stack keeps its receipts.",
        "Crowe wanted a body Ives would want to put his hands on. You are that body, and you know it, which is supposed to be power and feels like standing in a corridor with no locks. You wipe your fingers on the towel and do not look at them. Looking would be a second scene. You need coffee. You need a bathroom that is not this one. You need, treacherously, another pass at the same nerve, and you refuse it the way you refuse a second drink before a briefing.\n\n\"{{name}},\" you tell the glass, and the glass accepts the name as if names were still the point. They are not. The point is whether you can ride a tram without coming, walk into a public toilet without making a theology of the doors, and meet Voss tonight with a report that is not just the word wet. You dry your face. You do not dry the rest. The rest will not stay dry. That is the curriculum.",
      ],
      next: "c09_shower",
    },

    c09_min: {
      chapter: "c09",
      location: "Your rented slot · glass",
      speaker: "",
      pages: [
        "The woman in the glass is you. That was the point of the small knife. Same eyes. Same mouth. A faint sweetness at the wrist that you could explain as soap if anyone asked, and no one who matters will ask nicely. The sensors tug when you lift your arm, cicada-thin, a lawyer under the skin. You look like a person who had a wellness appointment. You look like a person who got away with a delay.\n\nYou test the heat. It is there, low tide, not a wreck. You could work like this. You could also be sent back for the rest if the gala underperforms, Vale's little gift of a consequence. The minimum is not safety. It is a smaller invoice. You file that next to Vale's threat about coming back for the rest, and you do not decorate the file with hope.",
        "You wash your face and watch water take the night off your mouth. For a moment you let yourself feel the ugly cousin of pride: you did not ask the building to invent a new animal. You asked it to stamp a file. The stamp still burned. The burn is information. You will take it to Voss or you will hide it, and either choice will be a kind of sex the firms understand.\n\nThe paper flower watches. You almost tell it you are fine. Fine is a word Lyle would not let you use at the desk. You use it anyway, privately, a lie that keeps the slot from becoming a clinic. Then you turn toward the shower because the city will smell last night on you — citrus, copper, gel — and you need to smell like someone who lives here.",
      ],
      next: "c09_shower",
    },

    c09_generic: {
      chapter: "c09",
      location: "Your rented slot · glass",
      speaker: "",
      pages: [
        "The glass shows {{name}} in morning light that has never been paid to be kind. Whatever Vale ran is in the pupils and the mouth and the way your hand hesitates on the way to wash. You do not have a neat flag for it in this moment, or you do and you are refusing the taxonomy. You are refusing the labels.\n\nYou inventory anyway. Heat in the pelvis. A sweetness you did not buy at a stall. Skin that listens harder. You are still the person who got on a tram to training with a pistol in a grocery bag. You are also the person who left Wing C ambulatory and informed, two words Helix uses loosely. The cheap rectangle does not arbitrate. It only reports.",
        "You splash water and watch it take a version of you down the drain, the version that believed mornings were neutral. They are not. Mornings are when you have to walk without a director. You dry your face on a towel that has hosted other people's mouths. You say he in your head, then she, then {{name}}, then nothing.\n\nOutside, the plate is already doing commerce. You will have to join it. Bodies that stay indoors after CHRYSALIS start to think the room is the only audience. You need witnesses who are not Vale. You need, dangerously, a witness who is not Voss either. The city is full of them. Some of them will want to touch you. Some of them you may let. That is later. Now is soap. You work it into the bruise in your elbow until the citrus of Wing C is only a rumor the water cannot quite kill.",
      ],
      next: "c09_shower",
    },

    c09_shower: {
      chapter: "c09",
      location: "Your rented slot · water",
      speaker: "",
      pages: [
        "The shower is a narrow stall that shares a wall with someone else's argument. Water pressure on the Stack is a class issue; yours is the class that gets lukewarm and calls it luck. You step in and the first hit of spray on rewritten skin is a briefing you did not schedule. Nipples, clit or cock, the inner elbow where the bruise is — everything files a report. You put your forehead on the plastic wall and breathe until the report becomes just water.\n\nSoap. Cheap. Floral in a way that fights Helix sweetness and loses. You wash like a person destroying evidence, which you are, except the evidence is neural and does not rinse. When your hand goes low you make it clinical, a nurse's pass, Lyle's voice in the muscle. Map it. It's yours. That's the part they can't quite steal. You do not know if he was right. You know the sentence is the only souvenir that did not come in a bag.",
        "You come anyway, or you almost do and stop, depending on how much charge the night left you. Either way you make a sound the neighbor's argument covers. Water runs down the new or old geography and into a drain that has heard worse. You shut the tap before the lukewarm becomes an insult.\n\nTowel. Hair. The small civilian sequence that keeps you from walking into the plate like a specimen. In the fogged glass you are a smear, which is a mercy. You write {{name}} in the fog with a finger and then wipe it, because names on mirrors are for people who still think bathrooms are private. Yours will not be, today. Public tile is coming. You can feel it the way you used to feel a tail on a street: a pressure between the shoulder blades that is really a pressure in the future.",
      ],
      next: "c09_dress",
    },

    c09_dress: {
      chapter: "c09",
      location: "Your rented slot",
      speaker: "",
      pages: [
        "Clothes are a decision. Helix's cut versus your old jacket. You try the issued pieces because they will photograph as continuity and because your old waistbands may no longer be honest. Fabric sits on sore tissue with the intimacy of a hand that paid. If you have breasts now, even small ones, the shirt becomes a conversation with every stair. If you do not, the shirt still knows something happened; cloth is a terrible liar.\n\nYou add the coat that is too nice. You look like a liaison. You look like a person who could be going to a clinic or a crime. On the Stack those are often the same building. The pistol goes into the bag that looks like groceries because you are still the sort of animal that checks exits. Kane would approve. Voss would tell you a grocery bag is a cliché and then use it anyway.",
        "You almost put on a hat and then do not. Hats are for people who think the face is the problem. The face is only the caption. The problem is the way you will occupy a square of tile in a public bathroom when the body asks for a door. You pocket the wafer token by accident — no, it is in the coat Helix gave you, a leftover, warm as a guilty coin — and you leave it on the table. If you lose it, Vale said, the session continues without your opinion. You do not need a souvenir of that sentence.\n\nKeys. Phone. The card you will not keep. You pause with your hand on the latch and do the old roll call: pulse, exits, lie of the day. The lie of the day is I am fine. You will tell it to kiosk clerks and tram cameras. You will not tell it to Voss unless you choose the lying fork tonight. The latch is sticky. You take that as a fact and leave.",
      ],
      next: "c09_street",
    },

    c09_street: {
      chapter: "c09",
      location: "Plate Four · morning grid",
      speaker: "",
      pages: [
        "The plate is a wet machine. Noodles, toner, a preacher with a speaker that has given up on God and taken a contract with a vitamin firm. Rain needles in straight lines. You walk into it as if you had always had this gait, this coat, this sweetness. A man on a loading lip looks at you and makes a decision. You feel the decision in a place that used to be private. That is the first public fact of the day: you are readable.\n\nYou used to be the one who read. Tradecraft is a habit of looking out. CHRYSALIS is a habit of being looked onto. The two habits fight in the doorway of a convenience kiosk while you buy coffee that tastes like a burnt meeting. The clerk is twenty-one, tired, uninterested. You almost weep with gratitude for uninterested. You take the cup and do not drop it. Hands still work. That is a win you will not put in a report.",
        "Mia's clinic is six plates down and one bad decision away. You do not go. If she sees you like this she will ask a kind question and you will have to invent a language. Kind questions are how civilians get written into packets. You drink. The coffee finds the bruise in your arm and the heat in your pelvis and files both under morning.\n\nA tram advertisement overhead shows a woman touching her throat. CHRYSALIS. Continuity you can feel. You look at it the way a person looks at their own X-ray in a shop window. Someone behind you clicks their tongue because you have stopped in the flow. You move. The city does not permit stillness unless you pay for a table. You do not have a table. You have a bladder, suddenly, urgently, the tea and the coffee and the drip's leftover joining into a civilian need that will not wait for a private philosophy. Public bathroom. The words arrive like a briefing.",
      ],
      next: "c09_kiosk",
    },

    c09_kiosk: {
      chapter: "c09",
      location: "Plate Four · transit kiosk",
      speaker: "",
      pages: [
        "The transit kiosk on this plate was designed by someone who had never needed to pee. It sits between a noodle hatch and a booth that sells SIM chips of uncertain loyalty. The sign says FACILITIES in a typeface that wants to be municipal. The doors are three: a figure in trousers, a figure in a skirt, a figure that is a triangle and a circle having a meeting. The floor is wet. The air is disinfectant and urine negotiating a treaty.\n\nYou stand there longer than a person with a clear gender stands. A woman of about forty with a grocery trolley does not look at you; she has her own war. A boy who is definitely twenty-two and trying to grow a beard looks at you too long and then at his phone, which is worse. Your coffee is a prop. The doors are not paid to answer what your body is.",
        "This is the identity crisis the file promised, and it is not a poem. It is tile. It is the animal need to empty a bladder in a city that sorts animals by silhouette. If Vale minted you a woman, the skirt door is the correct lie and the correct truth and they are the same knife. If he left you a man with a woman's face, both figured doors are a risk and the triangle is a confession. If you walked in female and only got a stamp, you still hesitate, because hesitation is what they installed in the nerves even when they left the map.\n\nYou could go back to the slot. You could hold it to the next plate. You could also stop being a child about plumbing. The coffee cup flexes in your hand. You choose a door the way you chose a knife last night: knowing the building will write it down even if the building is only a kiosk camera with a cracked lens.",
      ],
      next: "c09_doors",
    },

    c09_doors: {
      chapter: "c09",
      location: "Transit kiosk · facilities",
      speaker: "",
      text: "Three doors. One bladder. A camera with a cracked lens that still counts as a witness.\n\nThe city is about to learn which silhouette you are willing to spend.",
      choices: [
        {
          text: "Women's. Take the skirt door and the story that comes with it.",
          to: "c09_women",
          effects: { cover: 4, heat: 2 },
        },
        {
          text: "Men's. Take the trousers and dare the steam to call you a liar.",
          to: "c09_men",
          effects: { heat: 6, cover: -4 },
        },
        {
          text: "Accessible. Refuse the binary even if it photographs as fear.",
          to: "c09_access",
          effects: { integrity: 4, heat: 2 },
        },
      ],
    },

    c09_women: {
      chapter: "c09",
      location: "Kiosk · women's",
      speaker: "",
      pages: [
        "The skirt door sighs the way Helix doors sigh, cheaper. Inside: two stalls, one sink, a dryer that has died and become sculpture. A woman at the sink is thirty-five and rinsing an apple she will eat on a tram, hands red from cheap water. She glances at you in the mirror and does the math. Whatever Vale wrote, the math comes out close enough that she makes room. That is a passing grade. It feels like being let into a country on a forged paper you also bled for.\n\nYou take the stall. The lock is a hook. You pee sitting because standing is a theology you do not have time for, and the relief is so animal you could cry. Paper. Cheap. You touch yourself only to know you are dry enough to stand, and the touch is a mistake, a spark. You bite your lip and wait it out. The woman at the sink leaves. The dryer remains dead. You are alone with tile that has hosted a thousand versions of this hesitation.",
        "At the sink you wash like Lyle taught you: thorough, unhurried, as if hygiene could restore authorship. The mirror here is metal and kind to no one. You look like a person who chose the skirt door. You look like a person the apple-woman did not report. That is the morning's second win. You do not smile. Smiling in bathroom metal is how people start speeches.\n\nA second woman comes in, younger, twenty-four, earbuds in, and does not look at you at all. You could kiss her for it. You do not. You dry your hands on your coat because the dryer is art. When you step out, the plate's noise returns like a hand on the back of your neck. You still have coffee. You still have a tram to miss or catch. The crisis is not over. It has only used the toilet.",
      ],
      next: "c09_platform",
    },

    c09_men: {
      chapter: "c09",
      location: "Kiosk · men's",
      speaker: "",
      pages: [
        "The trousers door smells like the argument soap lost. Two urinals, one stall, a man of about fifty at the sink washing a comb. He looks at you in the mirror and the look sticks. Whatever Vale wrote on your face and chest is a rumor in this steam. You take the stall because urinals are a test you did not schedule. The lock is a hook. You pee sitting or standing according to the hardware you still have, and either way you feel like a person committing a small crime in a room designed for small crimes.\n\nThe fifty-year-old does not leave. You hear him wait. Waiting is a kind of touching. You finish, flush, and come out with your face set to civilian. He looks at your chest, your mouth, the sweetness, and his expression does an ugly little mathematics. \"Wrong door,\" he says, not loud. You could break his nose. You could show him a badge that would make this worse. You say, \"It's a toilet,\" and wash your hands with a thoroughness that is almost violence.",
        "He leaves first, which is a gift or a recruitment of the next witness. The metal mirror shows you flushed, readable, a liaison who just spent heat for the privilege of plumbing. If you are still legally male, you were correct and still punished. If you are not, you were a woman in the men's and the city will remember the silhouette even if the man does not file it.\n\nYou dry your hands on your coat. You step out into noodle steam and rain needles and the preacher's vitamin god. Your pulse is a drum in the bruise. You keep the coffee like a weapon that got cold. The crisis has not resolved. It has acquired a sentence you will or will not tell Voss: I chose the trousers and the trousers did not choose me back. You drink the cold coffee anyway, because wasting it would be a smaller surrender you refuse to add to the morning's list.",
      ],
      next: "c09_platform",
    },

    c09_access: {
      chapter: "c09",
      location: "Kiosk · accessible",
      speaker: "",
      pages: [
        "The triangle-and-circle door has more room and a rail and the particular cleanliness of a space people use when they do not want to be sorted. You lock it. The click is the first private sound of the day that was not a shower. You pee. You do not cry. You sit longer than the need requires because the stall is a room that does not ask you to be a legend. The floor is wet. The soap is the same cheap floral as your slot. You almost laugh, and the laugh is a dry little thing that dies on the rail.\n\nSomeone tries the door, polite, then less polite. You say occupied in the voice Vale left you, and the voice works, and that is a data point you did not want. You wash at the low sink. The mirror is metal and wide enough to show the whole argument: coat, face, the body as a paragraph with too many editors.",
        "You do not hurry because hurrying would concede that the person outside owns the clock. When you open, it is a man with a cane, sixty, who nods as if you have returned a borrowed book. No math. No wrong door. You could weep. You nod back and step into the plate with your coffee and your pulse and a small, stupid hope that the rest of the day could be this: rooms that do not sort, witnesses who only want the rail.\n\nThe hope lasts eleven seconds, which is how long it takes to reach the tram stairs. Hope is not a plan. It is a rest stop. You take it. You put it down. The city does not charge you extra. That, too, feels like an oversight. You keep the coffee. You keep the pulse. You keep the rail of that nod as a souvenir that did not come in a Helix bag.",
      ],
      next: "c09_platform",
    },

    c09_platform: {
      chapter: "c09",
      location: "Plate Four · tram platform",
      speaker: "",
      pages: [
        "The platform is wet. Trains come like slow ammunition, the same as the night you met Kane, except you are no longer the same caliber. People practice being unremarkable. You practice and fail in ways only you can score: the strap's vibration when a train noses in; a stranger's cologne that hooks the bridge; the reflection in the safety glass that is a rumor of {{name}} in a too-nice coat.\n\nYou stand in the yellow band because the yellow band is a rule and rules feel like kindness when your skin is a negotiation. A teenager — no, twenty-one, you check, you will keep checking for the rest of your life in this story — films the rain for an account that sells melancholy. Their camera passes over you and does not stop. You are not content. You are grateful. Gratitude is becoming a bad habit.",
        "The tram you want is the one that goes toward Plate Nine by a long, stupid route. You are not meeting Voss until evening. The route is an excuse to be in motion, because motion keeps the stack from turning the slot into a second clinic. You board. The doors close on the preacher and the kiosk and the doors you chose. Inside: heat, wet wool, a man eating seeds, a woman doing invoices on a cracked slate. You take a strap. The vibration climbs your arm and does not stop at the arm.\n\nYou breathe the way Lyle said, if he said anything about trams, and if he did not you invent him saying it: don't chase it; let it come to you; then don't let it. The city slides past in plates. Factory. Residences. A stretch of old river that is now a drainage throat with lights. You are going nowhere that is a mission. That is the luxury and the danger. Nowhere is where strangers live.",
      ],
      next: "c09_tram",
    },

    c09_tram: {
      chapter: "c09",
      location: "Tram · mid-stack",
      speaker: "",
      pages: [
        "By the third stop the tram has a weather of its own. Someone's soup. Someone's cheap cologne. Your sweetness, if you have it, joining the mix like a traitor. You catch a woman of about thirty watching your mouth. She looks away with the courtesy of a person who still believes in courtesy. You almost tell her it is all right. It is not all right. It is data.\n\nThe train brakes and the strap yanks and the yank is a hand. You make a sound that is not a word and turn it into a cough. A man to your left, thirty-two, print-ink under his nails, glances at you with a question that is not are you okay and is not not that. His coat is the honest kind of cheap. His eyes are tired in a way that has nothing to do with firms. Civilian. Adult. Not a spy. You can smell toner on him, and skin.",
        "You should change cars at the next stop. That is tradecraft. You stay because you are conducting an experiment called can I be in a body in public without becoming a scene, and experiments require subjects, and you have volunteered yourself. The man does not speak. He holds the next strap. His knuckles are ink-stained and very human. You look at them too long. He notices. The notice is a current. The current finds the work Vale seated and sits down in it as if it had paid rent.\n\nPlate Seven slides by, then the dark of a connector tube. In the tube the windows become mirrors. You see yourself seeing him seeing you. A triangle of looking. The identity crisis, which you had filed under bathrooms, opens a second office in your mouth. You could get off. You could ask his name. You could ride to the yard and become a story about a person who did not get off. The doors open on Plate Eight's rain. He does not get off. Neither do you.",
      ],
      next: "c09_gaze",
    },

    c09_gaze: {
      chapter: "c09",
      location: "Tram · connector",
      speaker: "",
      pages: [
        "He speaks at last, low, a voice used to machines that complain. \"You look like you're going to fall.\" It is not a line. It is an observation. You tell him you are fine, which is the lie of the day, and he nods as if he has heard fine from people who were bleeding. \"I'm off at Yard Four. There's a canteen that doesn't ask questions if you buy the soup.\" He says it like a weather report. He is not a handler. He is a man who has offered soup to strangers because the Stack teaches you that soup is the smallest safe door.\n\nYou could take the soup. You could take more than soup. Your body, which is a joint account, has already voted. Your mouth still has a share. The tram lurches. His shoulder brushes yours, toner and heat, and the brush is accidental in the way accidents are a language.",
        "You think of Voss, who told you not to be charming. You think of Vale, who said strangers are data. You think of Lyle, who said don't make it a love story. You think of the tape, of Crowe, of the way your own spent face lives in a packet. Another body on yours today would be a choice or a symptom. Distinguishing those is the job they cannot automate yet.\n\nHe looks at your mouth again, then at your eyes, and something in him decides you are a person, not a product, which is either true or the kindest error on this train. \"I'm Soren,\" he says, and you flinch because that is Vale's name, and he sees the flinch and amends, \"Ren. People call me Ren. I print nights. You're—\" He waits. You can give him {{name}} or a lie or nothing. The doors will open on Yard Four in two stops. The experiment is leaving the laboratory.",
      ],
      next: "c09_hook",
    },

    c09_hook: {
      chapter: "c09",
      location: "Tram · Yard Four approach",
      speaker: "",
      text: "Ren waits. Thirty-two. Ink under the nails. Soup. A canteen that does not ask. Behind that, a room you can smell on him: cheap sheets, toner, a window onto a ventilation throat like yours.\n\nThe stack, the half, the forced drip, the minimum — none of them get to vote unless you let them. That is the last fiction you still like.",
      choices: [
        {
          text: "Give him {{name}}. Get off at Yard Four. Use a stranger to meet the body.",
          to: "c09_sex1",
          effects: { corruption: 10, heat: 8, integrity: -6 },
        },
        {
          text: "Keep your name. Ride past. Refuse the canteen and the hands.",
          to: "c09_refuse1",
          effects: { integrity: 8, cover: 4 },
        },
      ],
    },

    c09_sex1: {
      chapter: "c09",
      location: "Yard Four · service stairs",
      speaker: "",
      pages: [
        "You say {{name}} and it lands in his face like a small, true object. He does not repeat it as if he owned it. That is why you follow him off the tram into Yard Four's rain, which is industrial and honest, a drizzle that has never been focus-grouped. The canteen is real: steam, soup, a woman of fifty who does not look up from her slate. You buy two bowls because buying is a way of remaining a person who chooses. The soup is salt and cabbage. You eat enough to prove you can. He watches your mouth without pretending he is not.\n\n\"I have a room over the shop,\" he says. \"You can dry. You can leave. I'm not a story.\" You almost tell him you are made of stories and all of them have firms in the credits. Instead you stand. He stands. The fifty-year-old still does not look up. You love her a little for that.",
        "The shop is a narrow throat of presses and the smell of heat on paper. His room is a box with a window onto the same kind of grate you have, no flower. He locks the door because Yard Four is not a kind plate. Then he waits again, which is a form of respect you did not know you needed. You take his inked hand and put it on you, on the work, on the place that has been a clinic and a crisis and a curriculum. He inhales as if you had burned him.\n\n\"Tell me if I am stupid,\" he says. You tell him slower. He is slower. His mouth finds your mouth and he tastes like soup and toner, civilian, unassigned. You kiss him like a person stealing a file. He is thirty-two and warm and he does not know CHRYSALIS is a product. He thinks you are a wet stranger with a too-nice coat. That ignorance is the first kind thing a man has done for you in days.",
      ],
      next: "c09_sex2",
    },

    c09_sex2: {
      chapter: "c09",
      location: "Yard Four · Ren's box",
      speaker: "",
      pages: [
        "Clothes become a negotiation you win by not explaining. If Vale gave you a cunt he finds it with fingers that have learned patience from machines, and you are so wet it startles him into a laugh he swallows against your throat. He fucks you on the cheap sheets with his coat still half on, a man who did not plan this and is trying not to be a thief. You take him anyway, greedy for someone who asked. You come around him too fast, the stack or the grief or the simple fact of being entered, and you bite his shoulder so you do not say Lyle or Vale or Voss. He holds still until you tell him to move, and then he moves, harder, and the second climax is uglier and more yours.\n\nIf he finds a cock he does not make a speech. He takes you in his mouth with a practical hunger, ink-stained fingers on your hip, spit, the new electricity and the old shape arguing until the argument spends itself on his tongue. You shake. He wipes his mouth with the back of his hand like a printer wiping a plate. \"Okay,\" he says, as if okay were a setting. You pull him up and stroke him until he comes on your belly, hot, ordinary, a fact that belongs to this room and not to a packet.",
        "If you are a woman on the minimum he still looks at you as if the sensors were not there, because he cannot see them, and you let yourself forget them for the length of his cock pushing in, slow, the rail of his arm under your neck. You come because you decide to, not because a bag decided, and the difference is a thin gold wire you will try to keep. After, he breathes into your hair and does not ask what firm you belong to. You almost tell him. That is how you know to leave soon.\n\nThe window grate ticks with rain. His heartbeat is stupid and human under your ear. You are {{name}} in a box over a print shop, adult, rewritten, briefly un-audited. The identity crisis does not end. It sits in the chair and waits. You let it wait. You put your mouth on his collarbone and taste salt that no clinic issued.",
      ],
      next: "c09_sex3",
    },

    c09_sex3: {
      chapter: "c09",
      location: "Yard Four · Ren's box",
      speaker: "",
      pages: [
        "Aftercare, civilian edition: a cloth that is not sterile, water in a chipped cup, his silence. He does not ask for a number. You do not offer one. You dress in the too-nice coat and look like a liaison again, which is a grief. He sits on the bed in his trousers and watches you the way a person watches a train they are not late for.\n\n\"If you need the soup again,\" he says, \"the canteen is there. I am not always.\" It is the opposite of a leash. You could cry. You tell him thank you and he nods, and the nod is enough. You do not kiss him at the door because kisses at doors become promises and you are already over-promised to Crowe and Kane and a rain deck.\n\nDown the service stairs the shop's heat hits you, then the yard's rain. You smell like toner and sex and Helix sweetness in a braid no sensor will parse cleanly. Vale said if you take a stranger they will smell it. Let them. This one was yours. That is a lie and a truth in the same coat.",
        "On the platform you do not take the first tram. You let two go, standing in the yellow band, counting your pulse down from the place where it had been a drum in someone else's sheets. The crisis has a new shape: you can be used by a protocol and still choose a mouth. The two facts do not cancel. They sit together like strangers on a strap.\n\nYour phone buzzes. Voss, again. Do not be late. You type I won't and do not type I was in a print shop learning my name with my body. Some reports are for rain decks. Some are for you. You keep this one. The third tram opens its doors like a mouth that has been paid. You get on. You hold the rail. You do not come. You ride toward the plate that will take you home and then, later, toward the woman who thinks she can still pull you out.",
      ],
      next: "c09_rejoin",
    },

    c09_refuse1: {
      chapter: "c09",
      location: "Tram · past Yard Four",
      speaker: "",
      pages: [
        "You keep {{name}} in your mouth and shake your head, not unkind. \"I don't do canteens.\" He accepts it the way a man who works nights accepts a jam in the press: a fact, not an insult. \"Then don't fall,\" he says, and gives you the strap as if it were a tool. At Yard Four he gets off. Through the wet glass you watch him walk toward steam and soup and a life that will not put him in a packet. The doors close. The experiment ends without a subject.\n\nYou feel the stack, or the half, or the forced heat, complain. Unused charge. Vale's aftercare, smug even in absence. Your hands want a door, a stall, a stranger. You give them the rail instead. The metal is honest. It does not promise soup. You hold it until your palm hurts, a small civilian pain you chose, and that choosing is the whole of the refusal's dignity.",
        "Pride arrives, thin, usable. You refused. Refusal has a price; the spec said that in a different building, on a different night, and it is still true. The price today is riding with a body that has been taught to want and a mind that has chosen not to spend. You can live with that price. You have lived with worse invoices.\n\nA child — no. A woman of twenty-three with a school slate, adult, yawning — takes Ren's place at the strap. She does not look at you. You look at the dark of the next tube and see your own face, unkissed, unspent, still a crisis. The face looks like someone who can meet Voss without smelling like toner. That is cover. Cover is a kind of chastity the firms understand. You hold it. You also hold the knowledge that you wanted the soup. Wanting is not doing. The difference is the last private room you have.",
      ],
      next: "c09_refuse2",
    },

    c09_refuse2: {
      chapter: "c09",
      location: "Tram · loop home",
      speaker: "",
      pages: [
        "You ride the long way back, plate by plate, a civilian doing an errand that does not exist. The preacher is gone. The CHRYSALIS ad loops on a different car, the woman touching her throat as if she had been given a better one. You do not touch yours. You watch a man eat seeds and envy the simplicity of seeds.\n\nAt a connector you almost get off to find a bathroom and finish what the refusal left humming. You stay on. Finishing would be a private stranger, your own hand, and you are saving that for a room with a lock you trust. The slot's lock is sticky. You trust it the way you trust a metaphor: not at all, and then anyway. The seeds man gets off. You stay. Staying is a verb the stack cannot fully automate yet, and you spend it like cash.",
        "Your phone stays face down until Voss's third message. Confirm. You type confirmed and put the phone away like a knife. The identity crisis does not need a climax to be complete. It is a day. It is tile and straps and a man named Ren who will eat soup alone and not know he was a fork in a spy's file. You wish him the soup. You wish yourself a brain that can hold no and not turn it into a performance for Vale's sensors.\n\nWhen your plate arrives the rain has been set to something almost like weather. You walk the blocks with your hands in the too-nice coat and your body loud and unused. Unused is a word that can mean weapon. You let it. Tonight Voss will ask what they took. You can say: not this. Not the part where I chose the rail. It is a small theft you stole back. Small thefts are how people stay people until the gala.",
      ],
      next: "c09_rejoin",
    },

    c09_rejoin: {
      chapter: "c09",
      location: "Plate Four · afternoon",
      speaker: "",
      pages: [
        "Afternoon on your plate is a thinner machine. The noodle hatch changes oil. The kiosk bathroom is still there, doors and all, a monument to your morning theology. You do not go in again. Once is a crisis. Twice is a ritual, and rituals belong to Helix.\n\nYou buy food that requires chewing because chewing is a way of remaining an animal that chooses. It tastes like salt and the idea of chicken. You eat on a wet bench facing a drainage throat that used to be a view. People pass. Some look. You file the looks and do not spend them. The body, whether used or refused, has settled into a lower hum. You can work in this. You can also break in this. Distinguishing those is evening's job. You wipe grease from your mouth with the too-nice coat and do not apologize to the cloth. Cloth has already learned too much.",
        "You think, against advice, about names. {{name}} on Revelations paper. {{name}} in Ren's mouth, or not. {{name}} in Voss's file, the flinch Kane liked, the product CHRYSALIS eats. You think about taking a new one, the flag they keep in the drawer for people who go too far in, and you put the thought down. New names are a later knife. Today you keep the old one even if the animal wearing it has been edited.\n\nA tram bell. A civic anthem leaked from a window. The paper-flower slot waiting. You walk home the long way, past Mia's plate-direction and not toward it, a loyalty that looks like neglect. She sent a joke sometime this week. You have not opened it. Opening it would be a kind door. Kind doors are how civilians get written in. You keep her in the drawer. The drawer is getting crowded. Drawers usually are, before they flood.",
      ],
      next: "c09_spiral",
    },

    c09_spiral: {
      chapter: "c09",
      location: "Your rented slot · late day",
      speaker: "",
      pages: [
        "The slot smells like soap fighting Helix and losing. You lock the sticky latch and stand in the dark again because dark is cheaper than meeting the cheap rectangle a second time. Your coat goes on the chair. Your body goes on the bed. The ventilation throat breathes. You put a hand on your sternum and feel a heart that did not get rewritten, only surrounded.\n\nIdentity is a word firms use when they want to sell a repair. You do not need a repair. You need a report that does not lie about the tile, the strap, the soup you took or did not take. You need to know whether he is still a useful pronoun or a courtesy you are extending to a ghost. You say both out loud, he and she, and the slot does not issue a citation. That is the most freedom you have purchased all day.",
        "Sleep tries. You do not let it; evening is coming and Voss will smell dreams on you if you arrive soft. You wash your face. You dress again, not Helix-perfect, something that looks like a person who walked in weather. The pistol goes back in the grocery bag. You look at the covered place where a follow-up card sits and you leave it. Continuity can wait. Debrief cannot.\n\nOn the way out you pause at the grate. The paper flower is still there. You do not touch it. Touching would be a scene. You tell it, quietly, that you are going to see the woman who thinks she can pull you out, and that you do not know if you want to be pulled, and that this uncertainty is the first true thing you have said to an object all day. The flower does not answer. Flowers on grates are not paid to answer. They are paid to stay. You can learn from that. You step into the corridor, into the stairwell of dinners, into the rain that has been set, again, to civic melancholy, because focus groups like the way neon looks wet, and because you are going to stand in it and tell a handler what they took.",
      ],
      next: "c09_end",
    },

    c09_end: {
      chapter: "c09",
      location: "Tram to Plate Nine",
      speaker: "",
      journal: "{{name}} spent a day in the rewrite. Voss is the next meeting.",
      pages: [
        "The tram to Plate Nine is fuller than the morning's experiment. People going home to slots and lies and vitamin gods. You stand in the yellow band of a different car and do not look for toner-stained knuckles. If Ren is printing, let him print. If you are still wet from him, let the rain explain it. If you refused him, let the rail still be in your palm, a ghost of metal.\n\nPlate Nine's rain deck three is a known geometry: leaking advertisement, the pill that makes sleep productive, the place Kane first made you wait. Voss will be there with a paper cup and an expression that has buried better people than you. She will look at the work. She will ask what they took. You will have three knives: honest, lie, double. You have not chosen yet. The not-choosing is a small room you sit in while the tram dives through a tube and your reflection becomes, for a connector's length, the only other operative in the glass.",
        "You check the exits out of habit. The exits are doors that will open on rain. You check your face in the black window. The face is {{name}}, edited, adult, still flinching when a name is used like a key. Kane said the flinch was the product. CHRYSALIS eats people who have it and people who don't. The difference is how loud they are afterward.\n\nYou decide, as the brakes begin, that you will be loud enough to hear yourself, even if you later choose to lie. Hearing yourself is not honesty. It is inventory. Inventory is how you walk onto a rain deck without becoming a specimen again. The doors have not opened. Wet air is a rumor in the seals. Neon is a color on the other side of glass. Voss is waiting: leaking ad, cup, subtracting. This chapter ends in the yellow band. The next one starts when the mouth of the car opens and the rain deck is allowed to have you.",
      ],
      next: "c10_start",
    },
  });
})();
