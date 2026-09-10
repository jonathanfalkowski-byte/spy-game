(function () {
  const S = window.STORY;
  if (!S) return;

  function addChoice(id, choice, index) {
    const n = S[id];
    if (!n || !Array.isArray(n.choices)) return;
    if (n.choices.some((c) => c.to === choice.to)) return;
    if (typeof index === "number") n.choices.splice(index, 0, choice);
    else n.choices.push(choice);
  }

  addChoice(
    "c08_m_choice",
    {
      text: "Talent conversion. Woman they can film. Bimbo stack on a completed body.",
      to: "c08_m_talent1",
      effects: {
        gender: "female",
        body: 55,
        corruption: 24,
        heat: 14,
        integrity: -18,
        flags: { transitioned: true, depraved: true, bimbo: true },
      },
    },
    1
  );

  addChoice(
    "c08_f_choice",
    {
      text: "Talent stack. Not just a door — a porn-star product Helix can export.",
      to: "c08_f_talent1",
      effects: { body: 40, corruption: 26, heat: 16, integrity: -16, flags: { depraved: true, bimbo: true } },
    },
    1
  );

  addChoice(
    "c09_gate",
    {
      text: "Meet the talent. The face they will loop.",
      to: "c09_bimbo",
      require: { flag: "bimbo" },
    },
    0
  );

  addChoice(
    "c15_male_choice",
    {
      text: "Completion plus talent. Finish the woman and seat the performer lock.",
      to: "c15_talent_gown",
      effects: {
        corruption: 16,
        body: 28,
        heat: 10,
        integrity: -10,
        flags: { transitioned: true, depraved: true, bimbo: true, agreed_all: true },
      },
    },
    1
  );

  addChoice(
    "c15_fem_choice",
    {
      text: "Talent lock. Deepen into export-star, not just durable camouflage.",
      to: "c15_talent_gown",
      effects: { corruption: 14, body: 18, heat: 12, integrity: -8, flags: { depraved: true, bimbo: true, agreed_all: true } },
    },
    1
  );

  addChoice(
    "c19_ask_three",
    {
      text: "Perform as talent. Give the lens a porn proof, not a kiss.",
      to: "c19_perform_star",
      require: { flag: "bimbo" },
      effects: { corruption: 18, body: 6, heat: 10, flags: { honey: true, ives: true, star_demo: true } },
    },
    0
  );

  addChoice(
    "c22_choose",
    {
      text: "Take the talent heading. Be the product they film.",
      to: "c22_star",
      require: { flag: "bimbo" },
      effects: { flags: { bimbo: true } },
    },
    4
  );

  addChoice("c22_choose", {
    text: "Ask for the talent heading anyway. You want the loop even without the stack.",
    to: "c22_star",
    require: { min: { corruption: 60, heat: 50 }, notFlag: "bimbo" },
    effects: { flags: { bimbo: true }, heat: 8, corruption: 8 },
  });

  Object.assign(S, {
    c08_m_talent1: {
      chapter: "c08",
      location: "Wing C · talent conversion",
      speaker: "Dr. Vale",
      journal: "Vale seated CHRYSALIS talent on a completed female legend.",
      pages: [
        "\"Talent,\" Vale says, and Lyle's mouth goes tight. \"That is the in-house word. Brochure says performance continuity. Clients say porn star when they are drunk and export asset when they are not. You walked in male. You are asking for inversion plus the performer lock: neural appetite tuned to cameras, a voice that reads as available even when you are saying no to a handler, a body that will wet for a lens. I will not pretend this is a legend you can take off. This is a career they can invoice.\"\n\nLyle's thumb stops circling. \"Yellow still works for angle,\" he says, quiet. \"Stop still works for angle. The bag, once it's open, does not care about your old name.\" Vale hangs two lines: the tea-dark conversion, and a second bag the color of cheap lipstick. \"Conscious for the first map. Sedation if the heart makes a speech. Talent wants a subject who remembers being filmed. Memory is part of the product.\"",
        "The gown is gone. Guides at wrist and ankle. Gel on chest, throat, the hinge of hips. The first drip is the conversion you already priced in your head: heat, the cock receding from the sentence, nipples writing a letter tissue has never received. Then the second bag opens and the room acquires an audience that is not there. You feel looked-at from the inside. A phantom shutter. Your mouth wants to make a shape that photographs.\n\n\"That's the performer lock seating,\" Lyle murmurs. \"Don't chase the camera. It will chase you.\" You come the first time before the graft is even a cunt, a system test for a career. Vale says, \"Good bridge,\" the way a man says a contract has a signature line. You hear yourself moan in a frequency you do not own yet. The moan is already usable. That is the theft.",
      ],
      next: "c08_m_talent2",
    },

    c08_m_talent2: {
      chapter: "c08",
      location: "Wing C · talent conversion",
      speaker: "",
      pages: [
        "The canal is persuaded to exist. You come on the instruments because the talent stack does not wait for a private life. Breasts arrive as ache, then as shape Lyle massages into a silhouette that will read on cheap screens as well as gala glass. When he pinches a nipple to check capillary return, your new cunt clenches and you sob {{name}} in a voice Vale is dropping, coin by coin, into a throat that will sell honey without meaning it.\n\n\"Say it again,\" Vale says. \"Softer. Talent is not volume. Talent is the suggestion that you would do this even if we were not paying the lights.\" You say it softer. You hate how easy the softness is. Lyle wipes your mouth. \"I know,\" he says. \"I know. They want a woman who looks like she invented the appetite. We are installing the invention.\"",
        "Scent blooms: available, specific, a dialect porn lighting understands. Gait is walked into you in the milk corridor with the lipstick bag still dripping. You catch your reflection in a dark panel: not just female. Glossed. A mouth that looks like it has been used. Eyes that take light as if light were a client.\n\nVale writes TALENT / EXPORT into a field donors never see. \"You will need use or the tremor comes. Unused charge in a talent subject is worse than in a depravity-only. You start hunting cameras. Poor tradecraft. Aftercare is: masturbate, be fucked, or be filmed. Preferably a rotation. Handler Voss will call this a waste of an operative. Crowe will call it a product line. I call it what you signed.\"",
      ],
      next: "c08_m_talent3",
    },

    c08_m_talent3: {
      chapter: "c08",
      location: "Wing C · talent conversion",
      speaker: "Nurse Lyle",
      pages: [
        "You surface wet, leaking, breasts sore, a clit that wants a lens. Lyle does not let you sit up like a hero. \"Map it. It's yours. That's the part they can't quite steal even when they write star on the file.\" You touch. The contact is immediate. You could come again for nothing. You take the hand away shaking.\n\nThe man who walked in is not in the room. A woman is, wearing {{name}} like a stage name that still has a pulse. You are adult. You asked for the large knife plus the career. The building has given you both. The cruelty is that it feels, in the body, like competence.",
      ],
      next: "c08_recovery",
    },

    c08_f_talent1: {
      chapter: "c08",
      location: "Wing C · talent stack",
      speaker: "Dr. Vale",
      journal: "Vale seated CHRYSALIS talent on a woman who already had the sex the gala prefers.",
      pages: [
        "\"Talent on a female intake,\" Vale says. \"We skip inversion. We do not skip the lock. You are already in the sex the rooms prefer. What you are buying is the rest: appetite that does not wait for character, a face that reads as porn even in a briefing, pelvic and throat maps that will perform on command and then keep performing when the command is over. Some women ask for this because they want the job simpler than a self. Some because they want to be ruined on purpose so no one else gets the credit. Helix will not care which. Helix will invoice.\"\n\nLyle gels you. The lipstick bag hangs beside the rose-dark depravity line. \"You will wet at voices,\" Vale continues. \"You will come for a camera you cannot see. You will find it difficult to keep a civilian conversation from becoming a scene. That is not a side effect. That is the specification.\"",
        "The push is slow and total. Heat in the pelvis; Lyle's fingers seating capacity; the second bag opening a phantom audience in your skull. You come around his hand and the orgasm has a shape that wants to be watched. You hear yourself ask for more in a voice that sounds like a clip. Vale adjusts a dial. \"Performer lock. You will look at reflective surfaces as if they were paying. Correct that in recovery or you will make a scene in a tram glass.\"\n\nYou laugh, cracked, because you can already feel the tram glass. Lyle's free hand cups a breast. The pinch sends you over again. \"Good,\" Vale says, to the number. The number is a star they have not named yet. The name will be {{name}} until a client buys a better one.",
      ],
      next: "c08_f_talent2",
    },

    c08_f_talent2: {
      chapter: "c08",
      location: "Wing C · talent stack",
      speaker: "",
      pages: [
        "They do not leave you on one climax. Talent is a curriculum with an audience. Lyle works you while Vale talks lighting, persistence, export windows, the difference between a liaison who fucks and a product who can be looped. You lift to his hand and tell him to stop in the same breath. He looks employed and wrecked. \"It's the lock,\" he says. \"It wants a groove a stranger can find without a map. The stranger can be a thousand people. That is the point of a star.\"\n\nIf your silhouette needed fill, it happens. The gown, when they give it back, sits like a costume you will be asked to take off on schedule. Vale writes TALENT / EXPORT. \"Aftercare: use. Film if offered. Do not let unused charge become a hunt. Handler Voss will try to pull you out. Tell her the truth or a lie; either way she will smell the lipstick bag. You asked for a career. Careers do not get to be shocked that people buy tickets.\"",
      ],
      next: "c08_recovery",
    },

    c09_bimbo: {
      chapter: "c09",
      location: "Your rented slot · glass",
      speaker: "",
      pages: [
        "The woman in the glass is not only converted, if you were converted, and not only hungry, if you walked in female. She is lit. That is the first violence of the morning: you look like someone paused a clip. Mouth wet. Pupils that take the cheap rectangle as if it were paying. Breasts that argue with the air. When you turn, you check the turn. The lock wants a second take.\n\nYou part what Helix issued. If Vale inverted you, the cunt is real and already slick. If you arrived a woman, it is still yours and it is also a product feature. Two fingers. The orgasm is fast, unearned, and you hear yourself make a sound that wants an audience. Neighbors could invoice. You hate how pretty the hate looks on this face.",
        "If intake filed a man, he is not in the glass. A star is, wearing his eyes like jewelry. If intake filed a woman, she is still {{name}} and also a loop Helix can sell. Either way you splash water and the water running between your breasts startles you like a stranger's mouth, and then you almost smile for no one, which is the lock, which is also you.\n\n\"{{name}},\" you tell the glass, and it accepts the name as a stage name. The gala will not wait. Neither will the tramp of wanting to be seen. You dry your face. You do not dry the rest. The rest is the career. You will take it to Voss as a report or as a confession. Both will be sex the firms understand. The paper flower watches like a civilian who still thinks faces are for talking.",
      ],
      next: "c09_shower",
    },

    c15_talent_gown: {
      chapter: "c15",
      location: "Helix clinic · talent second pass",
      speaker: "Dr. Soren Vale",
      pages: [
        "\"Talent, second pass,\" Vale says. \"If you are still filed male, this includes completion: you will leave female, inverted, locked. If you are already female, we skip the canal and we do not skip the career. Either way the neural set today is the performer lock. Appetite, gaze, a throat that sells honey, a pelvis that will perform for Ives or a lens or a room that is only a camera. Reversal window dies when we lock. You will want to be watched. That will feel like a self. It is a specification.\"\n\nLyle holds the gown. You put it on because clothes are a vote and you have already voted. The ferns do not move. You envy them. Vale's hands are dry. \"I will not call it liberation. I will call it a product line. You may still hate us on time.\"",
      ],
      next: "c15_talent_work",
    },

    c15_talent_work: {
      chapter: "c15",
      location: "Helix clinic · talent second pass",
      speaker: "",
      effects: { gender: "female", body: 10 },
      pages: [
        "The ring scanner writes SECOND PASS / TALENT CANDIDATE over a ghost of you. Infusion. Maps at throat and pelvis. If there was a cock this morning, it is not the subject by the time Lyle says breathe. If there was already a cunt, it is taught to answer a shutter. You come on the table because the lock is seating and because you are an adult who signed a red line. Tears without asking. Vale does not comment. He adjusts a drip.\n\n\"Look at the dark panel,\" he says. You look. You hold the look. Your mouth makes the shape. \"Good. That is the difference between depravity and talent. Depravity wants. Talent wants to be seen wanting.\" Lyle wipes your mouth. His heresy is a look that says he would unhook the bag if the building allowed it. The building does not.",
      ],
      next: "c15_talent_after",
    },

    c15_talent_after: {
      chapter: "c15",
      location: "Helix clinic · alcove",
      speaker: "Nurse Lyle",
      pages: [
        "The cloudy glass. The softer chair. You sit as a woman the file will sell. \"Sip. Slow. If you gulp, the voice will catch and the catch will photograph as distress, and distress is a different product.\" He tapes aftercare to your wrist: use. Do not hunt cameras in public. Return if the want-dial spikes past working. The strip looks like a club band.\n\n\"Marek will try to file you as a clip before the week is out. Crowe will like you. Voss will smell lipstick. I am not supposed to say lipstick. I am saying it because you paid in a walk and a cunt and a lock.\" He almost touches your hair and doesn't. \"If you can still choose showers that aren't ours, do. If you cannot, you are already on the loop. I mop at five. I will not be in the edit.\"",
      ],
      next: "c15_after",
    },

    c19_perform_star: {
      chapter: "c19",
      location: "Demonstration suite B · talent proof",
      speaker: "",
      pages: [
        "You do not kiss him like a climate. You give the room the clip it bought. Clothes off on the mark. You look at the moth, the lens, Marek's tablet, Ives's maintained mouth, and you let the lock do what it was seated to do. You are wet before he touches you. That is the specification. He makes a sound that will become a slide and also a trailer.\n\nWhat follows is sex built for loop: you on the platform, him narrating like a law, your voice selling honey while a hitch still lives somewhere Vale did not quite kill. You take him because the script wants a climax that can be cropped — mouth, then cunt or cock, then the second take. You come because the map was built for an audience. You come a second time because talent does not like a single proof. Marek makes a small hungry noise. Crowe's pleasure is weather. Vale does not leer. Radek looks at the door as if the door were a horizon that still has a country on it.",
        "After, Ives looks older and pleased in a way that will write policy. \"There. Not only a person. A product that can still choose. That is what my committee wanted and was afraid to type.\" He forgets the silver band on the table. Crowe touches your ankle. \"Beautiful and useful and repeatable,\" he says. \"I dreamed a circuit. Don't make me a liar.\"\n\nYou drink Lyle's water with a mouth that has been used as a trailer. The hidden mic has eaten every sound. Voss, in the wall, has had an hour that is going to be a war. You keep the hitch. It is smaller. It still exists. That is the last unmonetized organ, and you can feel Helix trying to invoice it.",
      ],
      next: "c19_after_choice",
    },

    c22_star: {
      chapter: "c22",
      location: "Helix · export talent",
      speaker: "",
      journal: "{{name}} took the talent heading. The loop is the life.",
      pages: [
        "Kane's face does the pleased thing it does when a product completes and then the slightly dirtier thing it does when the product can be sold twice. He stamps the card TALENT — EXPORT STAR — STABLE LOOP. He says your intake sex once, like a courtesy to a dead relative, and then he does not. \"If you walked in a man, congratulations: the original owner forgot to come back and the replacement films. If you walked in a woman, you were already the sex they prefer and you still asked for the career. Either way Revelations will invoice Helix for the body and Helix will invoice clients for the clip. I am, as ever, not your priest. I am the quarterly.\"\n\nVale walks you out, not Kane. Dosage, not flowers. \"You will want a camera when you are alone. That is not romance. That is the lock. Give it a schedule or it will hunt. Lyle has a list of approved circuits. I have a paper that will call you a success curve. Try not to read the comments.\"",
        "The city reads you as a woman who does porn, even when you are buying noodles. That was the point. Trams offer seats that are politics and stares that are unpaid extras. A poster — eyes not quite blacked — offers CHRYSALIS: CONTINUITY YOU CAN FEEL. Your mouth. Your gait. Licensed. You do not vomit this time. The lock likes the poster. That is the horror and the competence.\n\nCrowe books you. Of course he does. Not only a suite. A circuit: wellness launches that are sex with better lighting, private rooms for men like Ives who buy futures, a Helix channel that is not supposed to exist and does. You perform. You get paid in clothes, in a body that stays hungry, in a name that is still {{name}} until a client prefers a pet name. You learn which nights you can still feel the hitch. You hide those nights. Hiding is the last tradecraft.",
      ],
      next: "c22_star_2",
    },

    c22_star_2: {
      chapter: "c22",
      location: "A circuit that bills by the climax",
      speaker: "",
      pages: [
        "Mia is the first civilian to say the word. She comes when you send a room that is not a set. She looks at you for vitals, not inventory, and then she is angry in a kitchen. \"You're still the person who sent bad jokes,\" she says, \"and you are also a clip. I can love a person. I cannot love a loop. Don't make me take that exam every Sunday.\" If you take her to bed, her mouth is careful with new skin and then less careful, because she is honest, and you come too fast because the lock thinks any mouth is an audience. She says hey, stay. You stay when you can. If you refuse the bed, she still sees the shine. She leaves soup. You eat it on a floor like a person. The soup is the only unfilmed thing in the week.\n\nVoss does not pull you out. She sends a paper cup with no note and a second note that is only: I told you. The tea is made right. You drink it and cry in the voice they gave you, which makes the crying usable, which is why you stop. You do not call her. Pairs get used. Stars get used faster.",
        "Sex is work. Work is sex. The distinction dies in a well-lit room. You fuck clients, cameras, Crowe's competent schedule, sometimes a stranger who does not know the file and thinks they found a girl in a bar. You come. You want. Appetite was the protocol. What they hid is that grief sits in the appetite like a bone you can still choke on if you are not performing. You choke in bathrooms. Then you go back out and sell honey. You are twenty-something and adult. You are not a riddle. You are a product line with a pulse.",
      ],
      next: "c22_star_3",
    },

    c22_star_3: {
      chapter: "c22",
      location: "Subject Zero's bench · a warning that filmed",
      speaker: "",
      pages: [
        "Zero looks at what they made of you and does not congratulate you. \"They will say you chose this,\" Zero says. \"They will be half right. Half is enough for a trailer. It will not be enough at 04:00. Bring fruit. Fruit is not a firm. Do not film the fruit.\" You bring fruit. You almost photograph it. You do not. Zero is not there to see it. Not knowing whether they would care is as close as you come to a private life.\n\nVale's paper calls you a success. Marek files you as REPEATABLE. Radek looks at your hands in a stairwell and finds no pistol. \"They rewrote you into someone who files tickets with her mouth,\" he says. You say, \"I file them in a name they didn't buy.\" He almost respects that. You do not fuck him. Some doors you still keep shut.",
      ],
      next: "c22_star_4",
    },

    c22_star_4: {
      chapter: "c22",
      location: "A town with trees · or the circuit's late commerce",
      speaker: "",
      pages: [
        "You leave or you stay. If you leave, the trees are real and disappointing and for a week no one reads your gait as a product, and then someone does, because the lock taught you to be findable. You take a records job under {{name}} and you still get recognized from a clip that was not supposed to leave Helix. You stay anyway, in the stupid rain, and you let it ruin a dress Crowe picked, and you do not film the rain. If you stay in the Stack, you stay as a person the plates have already accepted as a star, which is a safety: the safety of being believed. Being believed is how legends forget to come back. You remember on purpose, in bathrooms, with the hitch.\n\nLovers come. Some want the story of the man, if there was a man. You do not give them that for free. Some want the body and the loop. Those are easier and lonelier. Mia, if she stayed, learns you like a language and you try not to perform for her. Trying is the remaining disobedience. Voss, if she can stand it, puts a hand on the back of your skull and checks whether you still have one. You do. She says, \"Mammal.\" You sleep against her thigh and do not ask if she watched the poster. You know she did. Handlers watch. That is the job.",
      ],
      next: "c22_star_5",
    },

    c22_star_5: {
      chapter: "c22",
      location: "A morning that still wants a camera",
      speaker: "",
      pages: [
        "Years on, the heading is talent and the life is a circuit that sometimes looks like a life. People introduce you as {{name}} and glance at a screen for confirmation. You have a key to a place that is not always a set. You have a cup. You have a window. You still check whether the window is filming. Sometimes it is not. Those mornings you put the kettle on and the kettle does not show a progress bar, and you almost smile, and then you do, in the voice they gave you, which is yours because you stayed in it long enough to pay the installments in ordinary days and extraordinary nights.\n\nThe original owner — if intake filed a man — does not come back. A woman arrives in the glass at 04:00, tired, adult, glossy even in the dark, holding a paper cup. You nod at her. She nods back. The nod is the romance with yourself. You do not decorate it. Decorating is how stars become posters. Kane put you on a poster anyway. You got off the tram. You got back on. Living requires transit.\n\nThere is no next chapter that bills. There is a shoot at eleven or there is not. You go to the window. You let the plates see a successful conversion, a woman who asked for a door and got a career, a product who kept a hitch in a drawer that does not flood. You keep the hitch. You do not sell it if you can help it. You name it {{name}}, and the name holds, and the morning continues, and you continue with it, an adult in a body that was a campaign and is now, also, a job. No next. That is the point. You turn away from the glass. You put the kettle on. You do not look at the dark panel until the tea is done. That delay is the whole remaining self. You drink. You go.",
      ],
    },
  });

  if (S.c08_m_talent3 && S.c08_heat_newbody) S.c08_m_talent3.next = "c08_heat_newbody";
  if (S.c08_f_talent2 && S.c08_heat_newbody) S.c08_f_talent2.next = "c08_heat_newbody";
})();
