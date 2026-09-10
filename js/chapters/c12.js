(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    c12_start: {
      chapter: "c12",
      location: "Helix annex · sixteen hundred",
      speaker: "",
      journal: "Wardrobe first. The ballroom is a weapon with lighting.",
      pages: [
        "The Helix annex does not smell like a clinic and does not smell like a party. It smells like a decision that has been dry-cleaned. White stone. A fountain that recycles the same eight liters of water into the idea of abundance. A receptionist who is definitely twenty-four and has been trained to say {{name}} as if the name were already on a seating chart.\n\nYou arrived from Plate Four with toast still arguing in {{his}} stomach and Mia's soap still arguing on {{his}} skin. The annex air takes both away within a corridor. That is not magic. That is HVAC priced like a defense contract. A fountain cherub has been sanded sexless by policy. Water climbs it and falls, climbs and falls, a subscription to the idea of grace. You watch one cycle and stop. Cycles are how this building explains bodies to itself.",
        "A handler who is not Voss â younger, smiling, wearing a pin that says GUEST EXPERIENCE as if guests experienced anything voluntarily â walks you past a wall of awards. Wellness. Community. A photograph of a clinic on a poorer plate that looks, if you squint, like Mia's loft with better paint. The caption says PARTNERSHIP. You think of Crowe's threat and do not squint.\n\n\"Director Crowe asked for you early,\" the smiler says. \"Wardrobe is on three. Please drink the water. The bubbles are magnesium. They help with lights.\" You drink because refusing water in this building is how people get marked as interesting, and you are already too interesting. The smiler's pin catches annex light and throws it at {{his}} eye like a friendly accident. Guest experience. You file the phrase next to partnership and wellness. All three mean a hand on a spine that has not been introduced.",
        "The lift plays a note that wants to be a lullaby. Your reflection in the brass is the person the tram practiced: harder, cleaner, the bruise on {{his}} wrist hidden under a cuff that does not yet exist. You think of SAFE and RUN and the third word Mia forbade. The lift opens on a floor that is all mirrors and no windows. Windows would let the city see how people are assembled. In the brass, behind {{him}}, a camera no bigger than a nail-head watches the progress bar. You do not wave. Waving at cameras is how people confess they still think they are in a conversation. The lullaby note ends on a floor that has no number. You step out into mirrors that have been waiting to finish you. Somewhere a pin-woman is putting metal in her mouth. Somewhere Crowe is already late on purpose.",
      ],
      next: "c12_annex",
    },

    c12_annex: {
      chapter: "c12",
      location: "Helix annex · wardrobe floor",
      speaker: "",
      pages: [
        "Wardrobe is a long room with racks that move when nobody is touching them. Garments hang like sedated animals. A woman with pins in her mouth nods you onto a mark on the floor that has been worn pale by other feet. She does not introduce herself. Introductions would imply you were a client. You are a silhouette that needs finishing.\n\n\"Phone,\" she says. You give it. She puts it in a bowl with other phones that have been politely arrested. \"Jewelry you walked in with.\" The cheap nothing from the archive goes into the bowl. Mia's smell is already gone. You feel the loss like a pulled hair. The racks breathe when the vents kick, a herd shifting. A garment near the end still has a tag with someone else's name, crossed out, not yet yours. You look away. Names on tags are a kind of grave the annex pretends is inventory.",
        "Lights come up in stages, as if your body were a product launch. The pin-woman walks a slow circle. She makes notes on a slate that does not show its screen to you. Somewhere, Vale's measurements may still be live. Somewhere, Crowe has already chosen the ending of this outfit and is only waiting for the cloth to catch up.\n\n\"Director's brief is intimacy that photographs as competence,\" the woman says, pins still in her mouth. \"You will be on the Director's arm for the first twenty minutes. After that you circulate. Senator Ives prefers a voice that does not compete with his. If you have opinions about export codes, you will store them in your mouth until a room with a door.\" She looks at {{his}} face as if it were a hem. \"Undress. The building has seen worse.\" Your own smell is already losing the argument with the vents. Mia's soap goes the way Plate Four's drizzle went: recycled into a product you will not be offered. The pin-woman's slate chirps. Somewhere, a number that used to be a body updates itself.",
      ],
      next: "c12_wardrobe",
    },

    c12_wardrobe: {
      chapter: "c12",
      location: "Helix annex · wardrobe",
      speaker: "",
      text: "The mark on the floor is cold through socks. Mirrors multiply {{him}} into a committee. The pin-woman waits with the patience of someone who has dressed assets and corpses and does not always distinguish.\n\nThe rack nearest you splits by cut: jackets with throats like invitations, dresses with backs like blank pages for a hand.",
      choices: [
        {
          text: "Let them cut you into the suit Crowe signed.",
          to: "c12_dress_m",
          require: { gender: "male" },
        },
        {
          text: "Let them pour you into the dress Crowe signed.",
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
        "The shirt is a white that has never met a night market. It fits the throat as if someone measured {{him}} in {{his}} sleep. The trousers are dark enough to hide a bruise and tailored close enough that sitting will be a decision. The jacket has a weight between the shoulders that is not fashion; it is a reminder to stand as if you owned the air. Cufflinks click into place: small Helix marks, almost modest. You would bet a week's archive pay that one of them talks.\n\nThe pin-woman knots the tie with a intimacy that is entirely professional and therefore worse. Her knuckles brush {{his}} sternum. \"Do not loosen this until the senator's room,\" she says. \"If there is a senator's room. If there is not, do not loosen it at all. Men who fidget at galas look like they still have jobs.\" The shirt's cotton has never been wrung by a human hand. It makes a sound when you lift {{his}} arms that is almost like money. She pins a stray thread and the pin is warm from her mouth. You do not think about mouths. You fail.",
        "Shoes: leather that has never touched Plate Four oil. They change {{his}} walk in three steps. You practice the walk between mirrors and hate how quickly the body agrees. A dab of scent at the jaw â not the aftershave Mia named, something greener, more expensive, a forest that does not exist on this continent.\n\n\"Hands,\" she says. She files a nail that did not know it was wrong. She puts a watch on {{his}} left wrist that covers the bruise exactly. \"Director Crowe will stand on your right. Her hand will find the watch or the spine. You will not flinch. Flinching reads as newness. Newness reads as prey.\" She steps back. The committee in the mirrors looks like a man who bills by the quarter-hour and has never once been surprised by a bill. Kane would recognize the costume. Mia would not. She turns you to the left mirror, then the right, as if symmetry were a moral quality. \"If the senator stands close, let him. Distance is a tell. Men his age think distance is disgust.\" She dabs the scent again, a second coat, a second country.",
      ],
      next: "c12_mirror",
    },

    c12_dress_f: {
      chapter: "c12",
      location: "Helix annex · wardrobe",
      speaker: "",
      pages: [
        "The dress is black in the way deep water is black: it takes light and returns a suggestion. The back is open to the low spine, a blank page. Crowe will write on it with a hand. The front is modest enough for donors and precise enough for cameras. When the zipper closes, {{his}} breath has to learn a new smaller house. The pin-woman does not apologize. Breath is a design element.\n\nHeels teach the walk Vale may have already begun to teach. Three steps and the hips have a sentence they did not used to finish. A necklace sits cold on the sternum, a single stone the color of a civic camera. Earrings that will catch ballroom light and throw it at Ives' face like a friendly accident. The zipper's last inch requires her knuckle on {{his}} spine. She does not apologize for the intimacy. Intimacy is the brief. You feel the air of the room become a second skin, cooler, more public, already halfway to a photograph.",
        "\"Hair up,\" the woman says. \"The Director likes a neck she can speak to without leaning into a microphone.\" Pins go in with the same competence as the dress. Scent at the throat and the insides of the wrists: not Mia's citrus, a darker flower that has been engineered to linger on other people's clothes. You think of the river photograph and feel briefly, cleanly, sick.\n\nMakeup is a map. Mouth a shade that photographs as consent. Eyes lined so that looking down reads as thought instead of fear. When she is done, the committee in the mirrors is a woman the building can spend. \"Director Crowe will stand on your left or your right depending on the camera,\" the pin-woman says. \"Her hand will find the open back. You will not flinch. If you must flinch, do it toward her, not away. Away looks like a story. Toward looks like a marriage.\" She makes {{him}} walk the mark again. The heels write a sentence the floor has heard from other feet. \"Do not apologize with your ankles,\" she says. \"Ankles are not in the script. The script is the neck and the mouth and the hand you will pretend to be surprised by.\"",
      ],
      next: "c12_mirror",
    },

    c12_mirror: {
      chapter: "c12",
      location: "Helix annex · wardrobe",
      speaker: "",
      pages: [
        "You are left alone with the mirrors for ninety seconds that are probably timed. The person who looks back has {{his}} eyes and someone else's budget. If CHRYSALIS has begun its weather in the body, the clothes complete the forecast: a silhouette that can be introduced, danced, taken upstairs. If it has not, the clothes do the work alone, which is almost more insulting.\n\nYou try Mia's name in {{his}} mouth. It still fits. You try {{his}} own name. It fits like the collar: well, and with a cost. You try a smile the pin-woman did not paint. It looks like the archive. You put it away. The annex smile is smaller and costs more. Ninety seconds. You count them against the river photograph as if counting could keep a plant alive. A vent ticks. Ninety becomes eighty. You do not touch {{his}} own face. Touching would smudge a map someone else drew, and you are not yet ready to admit you miss the smudge.",
        "The smiler from downstairs returns with the phone, wiped, a single message left on the lock screen so you will see it before you are a person again. Crowe: I will find you at the door. Do not arrive with Maren. Do not arrive alone in a way that looks lonely. Arrive like a decision I already made.\n\nYou put the phone in the pocket or the clutch they have allowed you. The pin-woman sprays something at the air around {{him}} that is not perfume. \"Static,\" she says. \"The ballroom glass sings. This keeps you from looking startled when it does.\" She almost smiles. \"Good hunting. That is not in the script. I say it anyway. The script is a coward.\" She walks {{him}} to the door like a technician walking a device to a van. \"If you tear anything, come back. Tearing is honest. Honest is not the brief, but I am not paid to like the brief.\" The door opens on the skybridge's first note.",
      ],
      next: "c12_corridor",
    },

    c12_corridor: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "",
      pages: [
        "The skybridge to the ballroom is glass over a drop that used to be a factory floor and is now a lobby with trees that will never fruit. Below, people in lesser clothes are being sorted into lesser rooms: press, junior donors, the wellness raffle. You walk above them like a rumor.\n\nThe glass sings, as promised. A high note when the wind hits the seal. You do not look startled. You look like a decision Crowe already made. That is the first performance of the night and it is for nobody, which is how the good ones start. A man in a lesser suit looks up from the lobby trees and for a second sees {{him}} as a story he will tell later, badly. You give him nothing. Nothing is a craft. The glass under {{his}} feet is thicker than ethics and thinner than a fall.",
        "Halfway across, Maren Pell is waiting as if the bridge were her office. She is younger than Crowe by a decade and hungrier by a career. Her dress is the red of a warning that has been invited. She holds two glasses and does not offer you one yet.\n\n\"Plate Four,\" she says, pleasant. \"A clinic. Potatoes. Very novelistic. The Director liked the aggression frame more than the couple frame, in case you're taking notes on your own file. I liked the couple frame. It had warmth. Warmth is a renewable resource.\" She drinks from the glass she did not offer. \"You cleaned up. The annex always does such kind violence.\" Maren's red is a wound the building has decided is decorative. She has placed herself where the wind hits the seal hardest, so that anyone arriving must hear the song and her voice in the same register. You respect the blocking. You do not say so.",
      ],
      next: "c12_maren1",
    },

    c12_maren1: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "Maren",
      pages: [
        "Maren steps in until the skybridge becomes a two-person room. She smells like the flower they put on you, or you smell like her, or the building has a single throat. \"I wrote the first draft of tonight's brief,\" she says. \"Crowe rewrote the ending. She does that. She likes to put her hand on things I have already arranged. Including you.\"\n\nHer eyes do the inventory Mia did, without the love. Throat. Walk. The place the clothes hide the bruise. \"If you perform for her, perform for me too. I am the one who files. She is the one who keeps. People who only perform for the keeper get lost in the cabinet.\" A server tries to pass, sees the two-person room, and takes another sky. Maren does not glance at him. People who file do not glance; they wait for the subject to offer a margin.",
        "She finally offers the second glass. Champagne that has been poured long enough to go a little flat, a small domination. \"Ives likes to talk about his daughter when he has decided you are safe. The daughter is twenty-six and works in a foundation that washes his money until it looks like mercy. Do not mention her first. Let him spend her. Men his age think spending a daughter's name is intimacy.\"\n\nShe watches to see if you take the glass. The wind sings the seal. Below, a tree that will never fruit sheds a leaf that is probably glued on. The unoffered glass has already lost its beads. You can see the future in that: anything she gives you will have been held first. The leaf that may be glued turns once in a vent and does not fall. Even the trees here are on message.",
      ],
      next: "c12_marenchoice",
    },

    c12_marenchoice: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "",
      text: "Maren holds the flat champagne between you like a test that will be written down either way. Crowe's message said: do not arrive with Maren.",
      choices: [
        {
          text: "Take the glass. Let her think she owns the walk-in.",
          to: "c12_maren_glass",
          effects: { corruption: 6, cover: 4, heat: 4 },
        },
        {
          text: "Refuse. Arrive as Crowe's decision, not Maren's draft.",
          to: "c12_maren_refuse",
          effects: { integrity: 4, heat: 6 },
        },
        {
          text: "Ask what she wants that Crowe will not give her.",
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
        "You take the glass. The champagne tastes like a battery and a flower. Maren's mouth does a small, pleased thing that is not a smile. \"Good,\" she says. \"I prefer assets who understand there are two women in the building who can ruin them, and only one who will write it as a tragedy.\"\n\nShe walks you the rest of the bridge, not quite touching, close enough that anyone below could invent a story. You remember Crowe's instruction and understand that you have already spent a little of it. Spending is the night's grammar. She walks as if the bridge were a runway she had designed. Your borrowed walk keeps up because wardrobe already spent the hours. Below, someone in the raffle laughs at a prize that will be a subscription. The laugh rises and dies against the glass. Her shoulder almost touches {{his}} and does not. The almost is a draft. You walk inside it because drafts are how this building moves people without appearing to push.",
        "At the ballroom doors she stops. \"Ives is already inside, near the east glass, pretending to admire the city he has been selling by the container. Crowe is late on purpose. She likes you to feel the room without a hand on you, so that when the hand arrives you are grateful.\" Maren leans in, her lips almost at {{his}} ear. \"I am never late. Remember that when she makes gratitude look like love.\"\n\nShe takes the glass back, drinks what you left, and goes in first. You follow two steps behind like a decision that has been slightly edited. You taste battery on the back of {{his}} tongue and understand that the pour was old on purpose. Age in a drink is a small humiliation. You swallow it. Humiliation is a language she and Crowe both speak; you are learning the dialect.",
      ],
      next: "c12_doors",
    },

    c12_maren_refuse: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "",
      pages: [
        "You leave the glass in her hand. Maren's eyes brighten. Refusal is data. \"Loyalty,\" she says. \"How quaint. How photogenic. How easy to spend when the Director is bored.\" She pours the second glass into the first and drinks as if she had always meant to. \"Go on then. Be her arriving thought. I will be in the room, writing the version where you hesitated.\"\n\nShe does not walk with you. That is the punishment and the gift. You cross the last meters of singing glass alone, the way Crowe asked, which does not feel like integrity so much as obedience with better lighting. The singing seal hits a higher note as a gust shoulders the tower. You do not startle. She notices the non-startle and files it under annex spray or under training. Either file is a win for someone who is not you.",
        "At the doors a man with a list finds {{his}} name without asking. The doors themselves are a meter of crystal with a Helix mark etched so faintly you only see it when you are already too close. Beyond, light. Music that has been designed not to be remembered. The smell of cold flowers and warm money.\n\nMaren enters by a side seam you did not notice. Of course she does. Rivalry is a floor plan. The man with the list has a mouth that has said yes to worse people. He says {{name}} like a toast that has gone flat. The crystal door gives a little, then a lot, the way rooms do when they have already decided you are inside. Music leaks through the crystal before the door finishes opening, the forgettable expensive thing already in progress. You enter on a bar you did not choose. Entering on someone else's bar is the night in miniature.",
      ],
      next: "c12_doors",
    },

    c12_maren_ask: {
      chapter: "c12",
      location: "Helix tower · skybridge",
      speaker: "",
      pages: [
        "Maren laughs, surprised into something almost human. \"What I want,\" she says, \"is a conversion that has my name on the report instead of hers. I want Ives' codes in a folder I open. I want you, not because I like you â I don't, you still smell faintly of a poorer plate â but because Crowe likes you, and I am tired of liking the same things second.\"\n\nShe pushes the glass into {{his}} hand anyway. \"That was free. The next true sentence will cost.\" You hold the glass and do not drink. A compromise that will satisfy neither woman. The night is full of those; they are the only honest currency. She looks briefly, dangerously, like a person who might have been a friend in a different firm. Then the look closes. \"Don't make me like you,\" she says. \"Liking you would ruin the report.\" The glass in {{his}} hand is warming. You still do not drink.",
        "\"Go in,\" she says, milder. \"If you last until the senator's door, I will not be the one who opens it unless you ask. That is as close as I come to courtesy.\" She touches {{his}} cuff or {{his}} necklace, a small theft of the pin-woman's work, and walks in with the red dress doing the kind of work red dresses are paid for.\n\nYou stand one breath on the singing glass and then you follow, because the alternative is to become a person who turns around, and that person is on Plate Four eating toast. The red dress enters the cylinder and the cylinder accepts it as if color were a credential. You count two breaths on the bridge because Voss said two breaths are how you keep a name. Then you spend the third on the door. The list-man finds {{his}} name without looking up, a talent that is also an insult. You take the insult and the door. Behind you the skybridge sings to nobody.",
      ],
      next: "c12_doors",
    },

    c12_doors: {
      chapter: "c12",
      location: "Helix ballroom · threshold",
      speaker: "",
      pages: [
        "The ballroom is a cylinder of glass hung on the side of the tower like a thought the building had about heaven. The city is all around and below, plates stacked into a geology of light. Rain on this altitude has been switched to a glitter that will not streak anyone's silk. The ceiling is a second glass, and above that a weather grid performing aurora for people who can afford to be lied to about the sky.\n\nA quartet plays something with strings that sounds expensive and forgets itself every eight bars. Servers move like well-paid ghosts. On a low stage, a Helix logo turns so slowly it might be a prayer wheel if prayer wheels sold subscriptions. A server offers you a tray of things that used to be fish. You decline with the annex smile. Declining food is allowed; declining the room is not. The logo on the stage completes a rotation you did not see begin.",
        "You pause on the mark just inside the door because every room has a mark, even the beautiful ones. Faces turn and then politely unturn. You are new enough to be interesting and not famous enough to be a problem. That is the liaison window. It will close.\n\nEast glass: a man of fifty-eight with a senator's haircut and a drink that is already not his first. He is laughing at a joke a younger donor told, and the laugh is a little late. Ives. You do not go to him. Crowe's hand has not arrived. The room has not yet written you into a sentence. Someone's laugh hits the glass and comes back thinner. Acoustics as policy. You step off the mark because remaining would be a pose, and poses are Maren's favorite evidence. The floor takes {{his}} weight as if it had been waiting for this exact number of kilos.",
      ],
      next: "c12_ballroom",
    },

    c12_ballroom: {
      chapter: "c12",
      location: "Helix ballroom · floor",
      speaker: "",
      pages: [
        "You circulate because stillness is a confession. A woman from a shipping board tells you CHRYSALIS will democratize selfhood. A man who owns three clinics tells you the poor will be grateful to be optimized. You make the face the pin-woman built: competence, intimacy, no opinions about export codes.\n\nChampagne here is not flat. It hurts the nose in a way that is meant to feel like celebration. You take a glass and hold it. Drinking is a clock. You do not start it yet. A man asks if you have tried the new sleep stack. You say you prefer rain. He looks at you as if rain were a political position. In this room, it is. Crowe has not yet arrived to make the weather make sense. You move. A woman's bracelet catches {{his}} sleeve and apologizes to the cloth, not to you. Cloth is the citizen here. You are the rental inside it.",
        "The glass walls sing whenever the wind shoulders the tower. People have been sprayed; nobody startles. A photographer in matte black takes pictures that will look candid in a report. You turn {{his}} good side without being told. The body has learned. That learning is a kind of grief you do not have time to wear.\n\nMaren is across the room, red, laughing with a pair of captains. Captain Radek is not among them, or is, in a better coat. You do not stare. Staring is how rivalries become public, and public rivalries get people like Mia wellness partnerships. You take three steps that are circulation and one that is a look at the east glass. Ives' drink is lower. The night is already spending him. You feel, briefly, like a person arriving to a crime with an invitation, which is accurate.",
      ],
      next: "c12_crowe",
    },

    c12_crowe: {
      chapter: "c12",
      location: "Helix ballroom · center",
      speaker: "",
      pages: [
        "Helene Crowe enters as if the room had been poorly tuned and she were the missing frequency. Mid-forties. Black dress that does not compete with anyone's back or anyone's tie; it simply ends arguments. Her hair is up. Her mouth is the color of a decision. People lean toward her without stepping, a field effect.\n\nShe does not look for you. She lets you see her look at the east glass, at Ives, at the aurora lie, and then she is beside {{him}} as if she had always been there. The first twenty minutes begin. The room notices in the way rooms notice marriages and acquisitions. Perfume arrives a half-second before she does, the dark flower they put on you, origin clarified. People part without being asked. You understand that the first twenty minutes are not a privilege. They are a display case, and you are the object that makes her hands look kind.",
        "\"You kept the soap longer than I expected,\" she says, almost kind. \"Plate Four clings. That is its only power.\" Her hand finds {{his}} back â the watch, the spine, the open dress â and rests there with a weight that is not affection and is not not affection. Heat through cloth. A thumb that could be a pulse or a count.\n\n\"Smile,\" she says. \"Not at me. At the idea of me. Ives is watching to see whether you are a gift or a colleague. Gifts are easier. I would prefer you be both. Can you be both, {{name}}? Or did the nurse use up your talent for splitting?\" The thumb on {{his}} back taps once, a metronome. Smile. You smile at the idea of her, as instructed, and the photographer's shutter sounds like a small, expensive insect. The room tastes the picture and finds it nutritious.",
      ],
      next: "c12_hand",
    },

    c12_hand: {
      chapter: "c12",
      location: "Helix ballroom · Crowe's radius",
      speaker: "Crowe",
      pages: [
        "The hand does not move while she speaks. That is the point of the hand. You can feel each of her fingers as a separate policy. The photographer takes the picture that will caption itself: Director Crowe and liaison, aligned.\n\n\"Maren briefed you on the bridge,\" Crowe says. \"She always does. She thinks appetite is the same as authorship. I let her have the bridge because I have the floor.\" Her nails are short. They still feel like a threat. \"Ives will ask what you do. You will say you translate between research and the people who fund it. If he puts his hand where mine is, you will not correct him until you are in a room with a door. Correction is for later. Later is why you were dressed.\" She steers. The steering is a conversation the floor understands. A donor says your name wrong and she does not correct him; wrong names are a kind of cover she is willing to spend. You store the wrong name anyway. Storage is the job under the job.",
        "She steers you through a cluster of donors without seeming to steer. Names happen. You keep them. A woman with a foundation pin looks at Crowe's hand on {{him}} and files you under mistress or project or both. You let her. Cover is other people's nouns.\n\n\"You will dance with him before the speeches,\" Crowe says. \"I will be speaking. Maren will be watching to see if you look at me while you dance. Look at him. Looking at me is a tell I cannot afford and you cannot afford. If you need a god, look at the glass. The city is the only honest witness in this room, and it has been paid not to care.\" The aurora above the ceiling does a green that does not exist in this latitude. People sigh as if nature had been generous. You look at the glass, as she will soon order, and see only a city that has been paid not to care, working overtime.",
      ],
      next: "c12_intros",
    },

    c12_intros: {
      chapter: "c12",
      location: "Helix ballroom · donor weather",
      speaker: "",
      pages: [
        "The next twenty minutes are a weather system of hands. Crowe's stays. Other hands arrive: a shake, a squeeze of the elbow, a man who touches the small of {{his}} back as if copying the Director and then dies a little when she looks at him. You say the translation sentence four times. It gets smoother. Smoothness is a kind of dirt.\n\nA junior minister asks if CHRYSALIS hurts. Crowe says, \"Only if you arrive attached to the wrong draft of yourself.\" People laugh. You do not. She squeezes once, approval or warning. The translation sentence, the fourth time, comes out like a product. You hear Kane in it and hate the lineage. Crowe's squeeze is approval. Approval sits on the bruise under the watch and makes it throb in time with the quartet. A man to {{his}} left asks what you translate besides money. You say people. Crowe's mouth, in profile, almost approves the lie. People is the most expensive noun in the cylinder.",
        "You pass a table of glasses that have been arranged into a skyline. You pass a woman crying very beautifully in a corner because her donation tier did not include a private tour of Vale's floor. You pass Maren, who lifts her drink a millimeter. Crowe does not look at her. The non-look is a novel.\n\nIves has moved from the east glass to a smaller knot of people who legislate. His laugh is later than before. The daughter has not yet been spent. You can see the shape of the evening like a corridor: dance, speech, room, door. Crowe's thumb counts {{his}} vertebrae as if counting down. A server refills {{his}} untouched champagne as if fullness were a moral state. You let it stand. Drinking would start the clock Ives already started for himself. Crowe's thumb arrives at a vertebra she has not counted yet and claims it.",
      ],
      next: "c12_donors",
    },

    c12_donors: {
      chapter: "c12",
      location: "Helix ballroom · south glass",
      speaker: "",
      pages: [
        "Crowe leaves {{him}} with a shipping couple because leaving is how she proves you can stand. The hand lifts and the air there is suddenly stupid and cold. The couple want to talk about containers that never arrive. You think of Kane's boring ledger and almost, ruinously, smile a real smile.\n\n\"You're the one from the liaison office,\" the wife says. \"Helene said you have a talent for being believed. That's a terrifying compliment. I used to be believed. Then I married a fleet.\" She drinks. Her husband talks over her about export windows. You store {{his}} opinions in {{his}} mouth, as instructed. The husband's fleet talk is a weather you have heard in ledgers. Containers that never arrive. You could ruin him with a sentence Kane already owns. You store it. The wife sees you store it and looks, for one second, like she might ask you to.",
        "Across the glass, a tram crawls along a plate so far below it looks like a toy for a cruel child. You wonder if Mia's clinic lights are on. You wonder if the generator has been fixed. You wonder these things with {{his}} face arranged for containers, and the wife sees something anyway.\n\n\"Oh,\" she says, softer. \"You still have a person. Hide that better, or they'll put her on a program.\" She pats {{his}} arm and goes to find a better champagne, having done the first kind thing in the room that was not a tactic, or having done a tactic so kind you cannot tell. Helix breeds both. She leaves a print of expensive powder on {{his}} sleeve, a civilian mark in a room of assigned scents. You do not wipe it. For a minute you wear a person who warned you, which is the closest this floor will come to Plate Four.",
      ],
      next: "c12_maren2",
    },

    c12_maren2: {
      chapter: "c12",
      location: "Helix ballroom · service seam",
      speaker: "Maren",
      pages: [
        "Maren finds you at a service seam where the glass meets a wall that has the decency to be opaque. She has a plate of something that used to be a bird. She does not eat it. \"She put her hand on you like a signature,\" Maren says. \"The room is already calling you hers. I could file a correction. I could also file the Plate Four couple frame under leverage and let Ives see a nurse if he gets difficult.\"\n\nShe says it lightly. Lightly is how she cuts. You can feel Mia's slot, the cracked plate, the fruit knife, all of it sitting on this sentence like a weight. The uneaten bird shines under a glaze that cost more than Mia's rent. Maren turns the plate so the light hits {{his}} eyes. \"I can be kind,\" she says. \"Kindness is just a filing delay. Say you understand so I don't have to demonstrate.\"",
        "\"Or,\" Maren says, \"you can give me something Crowe doesn't have yet. A look. A word. A promise that when the senator's door closes, I get the first copy of whatever comes out of his mouth. She will keep the body of the night. I want the paper. I am reasonable. Paper lasts.\"\n\nThe quartet shifts into a piece that is meant to move people onto the floor. Crowe is being led toward the low stage. Ives is checking his cuffs, a man preparing to be charming. You have a slice of minute in a seam to decide which hunger you feed. On the stage a technician taps Crowe's microphone and the tap goes through the cylinder like a swallowed bone. Ives checks his cuffs again. You have ten seconds of seam left. Ten seconds is a room if you use it as one.",
      ],
      next: "c12_rivalchoice",
    },

    c12_rivalchoice: {
      chapter: "c12",
      location: "Helix ballroom · service seam",
      speaker: "",
      text: "Maren waits with the uneaten bird and the Plate Four photographs in her pocket, whether she is showing them or not.",
      choices: [
        {
          text: "Stay Crowe's. Tell Maren the paper goes through the Director.",
          to: "c12_rival_crowe",
          effects: { cover: 6, heat: 4 },
        },
        {
          text: "Cut Maren down. If she spends Mia, you spend her career.",
          to: "c12_rival_cut",
          effects: { integrity: 6, heat: 10, cover: -4 },
        },
        {
          text: "Give Maren the first copy. Buy Mia off the table.",
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
        "\"The paper goes through Crowe,\" you say. \"You want authorship, write a better brief.\" Maren's eyes narrow, then she laughs as if you had complimented her shoes. \"Look at you,\" she says. \"House-trained in an afternoon. I'll enjoy the report where that loyalty curdles.\"\n\nShe leaves the bird on a waiter's tray and melts back into red. You have bought a simpler night and a more dangerous morning. Crowe likes simple nights. She does not always pay for them. She leaves a smear of glaze on the service ledge, a small waste that is also a signature. You do not touch it. Touching her leftovers is how people get written into the second paragraph of a night. A waiter takes the bird without comment. The ledge is clean again, as if hunger had never sat there. You step out of the seam before cleanliness can become a story about you.",
        "On the stage, Crowe tests a microphone with a word that is not hello. The room orients. Ives turns his whole body toward the sound like a man who has voted on lighting before. You step out of the seam and become visible again, unaccompanied, which is what the next part requires.\n\nA server murmurs that the Senator would like to be introduced before the remarks. The night's corridor shortens. You step into light that has been waiting to make you visible for the senator. The annex smile arrives without being asked. You let it. Loyalty, she called it. The word sits in {{his}} mouth like a cufflink that talks. Ives' knot opens a space the size of a body. You walk into the space. The annex smile holds. Under it, Plate Four's generator keeps a time nobody here has paid for.",
      ],
      next: "c12_ives_seen",
    },

    c12_rival_cut: {
      chapter: "c12",
      location: "Helix ballroom · service seam",
      speaker: "",
      pages: [
        "You tell Maren, in a voice the glass will not carry, that if a nurse on Plate Four receives a partnership, a wellness visit, or a photograph in a folder that is not hers, you will make sure Ives hears who leaked his daughter's foundation first. You do not have that leak. You say it as if you do. Voss taught you that the threat is a shape; the facts can be filled later.\n\nMaren goes very still. Then she smiles with all her teeth. \"There you are,\" she says. \"I was worried the annex had dressed the fight out of you. Fine. The nurse stays a civilian. You just made me your problem instead. I prefer that. Problems get meetings.\" Her thumb on {{his}} mouth leaves a print the pin-woman will not have budgeted for. You taste salt and a flower that is also on {{his}} own wrists. The building, you think, has one throat, and tonight everyone is speaking through it.",
        "She touches {{his}} mouth with her thumb, a brief, insulting blessing, and goes to stand where Crowe can see that she has been close to you. Crowe, at the microphone, does not look. The non-look again. You taste metal and champagne.\n\nThe server finds you. Senator Ives would like to be introduced. You wipe {{his}} mouth and go to be a gift and a colleague, which is a job description that should not exist and does. You walk toward Ives with the metal taste and the threat still unfinished in {{his}} chest. Unfinished threats are live ammunition. You keep {{his}} hands visible. Visible hands are how you do not become the photograph of a problem too early. The server's murmur is practiced, kind, a little afraid of both of you. You thank him because thanks still work as cover. Then you go to be introduced to a man who prefers refusals public and nights private.",
      ],
      next: "c12_ives_seen",
    },

    c12_rival_paper: {
      chapter: "c12",
      location: "Helix ballroom · service seam",
      speaker: "",
      pages: [
        "\"First copy,\" you say. \"And Mia Renn stays out of every folder you open.\" Maren considers, then nods once, a contract in a chin. \"Paper for a nurse,\" she says. \"How sentimental. How easy to honor until it isn't. I'll take it anyway. I honor things longer than Helene does. That is my brand.\"\n\nShe does not ask you to shake on it. She takes {{his}} hand and holds it too long, a rehearsal for other rooms, then lets go as if bored. \"Go be delicious. I'll be the cabinet.\" Her contract-chin is already a memory she will write as a signature. You flex the palm she held. It smells faintly of the uneaten bird and of a woman who files. You do not wipe it. Wiping would be a tell that you still hope to be clean. A string phrase from the quartet climbs and dies. You use the death as a reason to turn toward east glass. Turning looks like duty. Duty is the only walk that will not photograph as flight.",
        "You have spent a piece of the night's take before the night has earned it. You have allowed yourself to believe Maren's brand. Belief is a kind of PREP. The stage lights find Crowe. The server finds you. Ives would like to be introduced.\n\nYou walk toward the east glass with {{his}} back cold where Crowe's hand was and Maren's contract warm in the palm. The aurora above the ceiling does a pretty, lying ripple. East glass grows larger. Ives' laugh arrives late across the cylinder. You walk into the laugh as if it were weather you had ordered. The aurora lies again, prettier. Pretty is the building's first language and its last mercy. A photographer kneels, rises, kneels. You do not give him the good side yet. The good side is a budget you will spend on Ives, not on the walk-up.",
      ],
      next: "c12_ives_seen",
    },

    c12_ives_seen: {
      chapter: "c12",
      location: "Helix ballroom · east glass",
      speaker: "",
      pages: [
        "Senator Ives is fifty-eight in the way powerful men are fifty-eight: well kept, slightly softened at the jaw, eyes that have learned to twinkle on command. His tuxedo is correct and a little tight at the waist. He holds his drink like a gavel. When he sees you coming he does the thing men like him do: he looks at the whole of you first, clothes and gait and the place Crowe's hand lived, and only then at {{his}} face.\n\n\"You're Helene's translation,\" he says, before anyone introduces you. \"She promised you wouldn't bore me. Come stand where the city can see I still have friends.\" A photographer kneels for the angle that will make Ives look taller. You adjust {{his}} weight so the kneel will also get {{his}} face in a way Kane can use if Kane is still a person who uses faces. Ives' squeeze answers the adjustment. He thinks it was for him.",
        "His voice is radio-trained, warm, a little wet at the edges already. Up close he smells of expensive citrus that is not Mia's and of the particular sweat of a man who has been shaking hands for an hour. A pin on his lapel is a foundation crest. The daughter's washing machine, in miniature.\n\nYou stand where he indicates. The photographer takes it. Ives' hand hovers at {{his}} elbow and then commits, a squeeze that is almost uncle and almost inventory. \"They make you people too well now,\" he says. \"In my first term, liaisons still had scuffed shoes. I missed the scuffs. They made me feel like I was lying in a real country.\" He smells of a citrus that has never been in a clinic lotion. You think of Mia's mug and put the thought in a drawer the annex did not inventory. Drawers are how you survive rooms that want all of you on the table.",
      ],
      next: "c12_ives_meet",
    },

    c12_ives_meet: {
      chapter: "c12",
      location: "Helix ballroom · east glass",
      speaker: "Ives",
      pages: [
        "He talks the way a river talks when it has been put in a concrete throat: with force, and with nowhere to go but forward. Export windows. A colleague who is being difficult about medical devices that are also surveillance. The necessity of letting firms like Helix move faster than law, because law is a tram and firms are weather.\n\nYou say the translation sentence. He likes it. He likes that you did not decorate it. \"Helene said you were new and not new,\" he says. \"I know the type. I used to marry the type. Now I fund it.\" He laughs at his own joke late. The drink is doing the work drinks do. A woman from his knot laughs at a joke about medical devices. The laugh is a vote. You store the joke's shape. If the night burns, jokes become exhibits. If the night earns, jokes become pillow talk. Either way, you are the ear.",
        "On the stage, Crowe begins to speak about community clinics and the democratization of selfhood. Her voice fills the cylinder. Ives leans closer so he can keep talking under it, a man who will not be a silent audience even for a woman who could end him. His shoulder touches {{his}}. Heat. Wool. The foundation pin scrapes {{his}} sleeve.\n\n\"My daughter runs the pretty side of this,\" he says, and there it is, earlier than Maren promised, or exactly on time if you count the drink. \"Twenty-six. Smarter than me. She thinks I'm a romantic about industry. I'm not. I'm a romantic about rooms. Rooms are where the country actually happens.\" His eyes dip, not quite to {{his}} mouth, not quite not. \"Do you dance, or does Helene only dress you?\" Crowe's sentence about freedom lands and the applause is a trained animal. Ives' shoulder is a second climate. You do not lean in or out. Neutral is a kind of honey. He feels the neutral and, being who he is, calls it yes.",
      ],
      next: "c12_daughter",
    },

    c12_daughter: {
      chapter: "c12",
      location: "Helix ballroom · east glass",
      speaker: "",
      pages: [
        "You let him spend the daughter a little more because that is the brief and because interrupting a man like Ives is how rooms become hostile. He says she paints. He says she does not speak to him on Sundays. He says Sunday is when he calls anyway. You think of Sunday jokes and feel a nausea that has nothing to do with champagne.\n\nCrowe's speech hits a line about bodies as instruments of freedom. The room applauds on a cue you did not see. Ives applauds late, with the hand that is not on {{him}}. You watch his mouth spend a child who is twenty-six and paints. The spending is not sexual and is still a violence. You keep {{his}} face kind because kind is the brief and because disgust would be a tell he would enjoy. His applause, late, brushes {{his}} arm. Late is his weather. You do not speed him. Speeding a senator is how rooms become hostile, and you have not chosen fire yet.",
        "\"After she talks, we dance,\" he says. It is not a question. \"Then someone will show me a suite because someone always does, and you will come because Helene did not put you in those clothes to translate from a distance.\" He smiles, and for a second he is just a fifty-eight-year-old man who is lonely in a way money cannot metabolize. The second passes. The senator returns. \"If you're going to say no, say it now, while we still have an audience. I prefer my refusals public. They keep me honest. Honesty is a hobby I cannot afford in committee.\"\n\nThe quartet is waiting for the speech to end the way a dog waits for a door. Your body, in its new cut, already knows the steps. The question is not whether you can dance. The question is what the dance is for. The quartet lifts their bows like a question. Your body, traitor and employee, has already answered. Ives' open palm is damp. Damp is honest. You almost respect it. Respect is not the same as stepping in, but it is how stepping in begins.",
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
        "You tell Ives you want one more glass and a breath of the singing glass before you embarrass a senator with {{his}} archive feet. He likes being deferred to if the deference still ends in yes. He lets you go with a look that follows.\n\nYou walk the edge. Maren watches. Crowe, coming off the stage, watches harder. You have bought sixty seconds of being a person who chooses. The seconds taste like the annex water: magnesium, lights, a lie about health. You stand at the singing glass and watch a tram the size of an insect. Plate Four is a rumor of cheaper gold. You do not let {{his}} face go there long enough for Maren to file homesickness. Homesickness is leverage with better lighting. Champagne you did not ask for arrives and you hold it like a passport. The singing glass puts a hairline cold through the stem. You count the hairline instead of the tram.",
        "Ives arrives as if he had always been walking this way. \"Breath taken,\" he says. \"I'm not a patient man in public. In private I can be taught.\" He offers the hand again. This time the room is looking because delay made a shape. You take it. The photographer loves you. Crowe's mouth does not move. That is her smile. His second offered hand is less of a joke. The room has noticed the shape of waiting. You take it and feel the night click forward one notch, a lock that has been polite long enough. A server steps aside as if you were already a couple. Being a couple in this light is a job. You take the job as far as the disc and no farther, yet, and feel, very clearly, the difference between a dance and a door.",
      ],
      next: "c12_dance",
    },

    c12_lookcrowe: {
      chapter: "c12",
      location: "Helix ballroom · east glass",
      speaker: "",
      pages: [
        "You look at Crowe. It is a long enough look to be a problem. She is still on the stage, accepting a glass, and she receives the look as if she had ordered it and you had still been wrong to send it. A flicker at the corner of her mouth: anger, or appetite, or the same thing in her climate.\n\nIves sees the look and files it. Men like him enjoy being the instrument of someone else's weather. \"Helene always did like an audience,\" he says, almost kindly. \"Come on. Let's give her one.\" The look costs you. You feel the cost in the way Ives' fingers tighten, pleased to be the tool of a weather between women. Crowe's flicker is a whole memo. You will be billed for it upstairs, in a smaller room, with a door. Ives' pleased tightening is a small, ugly music. You step onto the disc anyway. Stepping is the bill coming due in public, which is cheaper than letting the look become a speech.",
        "You take his hand. His palm is damp. The foundation pin winks. As he leads you onto the floor you feel Crowe's attention like a second hand on {{his}} back, even from the stage, even at this distance. Maren, in red, watches both of you and writes the version where you hesitated toward the Director. Everyone is getting what they wanted except the person in the clothes, who is getting a dance. On the floor the first couples are already moving, donors pretending the speech was a waltz. You join them as a rumor that has found a rhythm. His damp palm is a fact. Facts, Mia said, are harder to disappear. You are becoming one. Crowe, at the stage edge, has not drunk. Not drinking is her metronome. You move to it even when you are looking at him. That is the talent she bought. That is the talent you are spending.",
      ],
      next: "c12_dance",
    },

    c12_dance: {
      chapter: "c12",
      location: "Helix ballroom · floor",
      speaker: "",
      pages: [
        "The floor is a disc of something that looks like water and feels like money. Ives leads with the confidence of a man who has been told he is good at this by people who need him. His hand settles where Crowe's settled, a copy, a theft, a continuation. You let the copy happen. Correction is for later.\n\nThe quartet plays the forgettable expensive thing. You move. The clothes do half the work. The body does the other half, trained or converted or simply afraid in a useful rhythm. His breath at {{his}} temple is a climate you did not order and cannot send back. The forgettable music forgets itself on schedule. You count bars because counting is how you do not put {{his}} head on his shoulder like a person who has run out of methods. His lead is competent and a little vain, a man who has been praised by staff. You let the vanity work. Vanity talks. Talk, later, is codes. The floor's fake water throws {{his}} borrowed shape back in fragments.",
        "He talks while he dances, mouth near {{his}} temple. Export codes. A vote that will open a corridor for CHRYSALIS components. The daughter again, Sunday, the paintings that are \"too honest.\" His breath is whiskey and mint. When he laughs, late, his chest hits {{his}} chest and stays a fraction too long.\n\n\"You're very quiet,\" he says. \"I like quiet. Quiet people hear the thing you didn't mean to say.\" His thumb moves on {{his}} back, testing whether Crowe's territory is still marked. It is. He seems to like that too. Some men are aroused by other people's signatures. The glass sings. You do not startle. You look at the city, as instructed, the only honest witness, paid not to care. A flash from the matte photographer catches the watch or the necklace and throws it back as a star. People like stars. Stars are how this room explains hunger to itself. You let {{him}} be briefly celestial and hate the ease of it.",
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
        "In the suit you are the version of a man Ives can take upstairs without explaining himself to a committee in his head. Close, but not a rival. Softened at the mouth, hard in the jacket, the watch hiding a bruise that would spoil the romance of industry. His hand on {{his}} back is proprietary in a way that would start a fight in a night market and starts a rumor here.\n\nHe says, \"Helene always did have an eye.\" He says, \"If you're what they say you are, the room upstairs will be simple.\" Simple, from him, means you will not need to be convinced. Simple means the honey is already in the pour. Close, you can smell the mint he used after the whiskey, a courtesy that is also a strategy. His chest hair at the collar is grey. Fifty-eight is not a number in a file when it is sweat under wool. You file it anyway.",
        "You turn under his arm because the quartet asks for it and because turning hides {{his}} face from Maren's phone. For a second you see Crowe at the stage edge, glass in hand, watching the turn as if it were a procedure she had scheduled. The hand on {{his}} back tightens. Ives is not Crowe. He does not count vertebrae. He holds as if holding were the achievement.\n\nWhen the piece ends he keeps {{him}} one extra beat, a small public claim. Applause for the speech is still dying. People have seen enough. \"Suite,\" he says into {{his}} ear, almost sweet. \"Don't make me ask Helene to walk you there. I prefer to think you can still choose.\" The extra beat of his hold is a small public marriage. A donor smiles as if blessing it. Crowe's unmoving mouth is the real blessing, or the real license. You step back when he lets you, exactly one step, the distance of a person who can still choose.",
      ],
      next: "c12_afterdance",
    },

    c12_dance_f: {
      chapter: "c12",
      location: "Helix ballroom · floor",
      speaker: "",
      pages: [
        "In the dress you are the version of a woman Ives can take upstairs and call a conversation. The open back gives his hand a country. He uses it. His palm is damp on {{his}} spine; his fingers rest just above the zipper's end as if he might continue the thought. The heels make following look like agreement. The necklace throws light at his throat, a friendly accident that was designed in wardrobe.\n\nHe says, \"They make you too well.\" He says, \"My daughter would hate this room. That's how I know it's where the country happens.\" He is already confusing you with a feeling he has about being hated by a woman he funds. The open back is a country his palm has annexed without a vote. You feel each finger as a separate export window. The heels make the follow look like appetite. You let the look stand. Looks are cheaper than explanations.",
        "You turn because the quartet asks and because the dress asks and because not turning would be a story. Crowe, at the stage edge, watches the turn without drinking. Maren photographs the hand on the open back. You feel both women like climate.\n\nWhen the piece ends Ives' mouth is too close to {{his}} cheek. He does not kiss. He is still in public. \"There's a suite that looks at the old river,\" he says. \"They told me that as if I would be moved. I am moved by people, not views. Come be a person with a door. If you need Helene's permission, she already gave it. She gave it when she put you in my hand.\" His almost-kiss dies in public, correctly. The death of it is still a heat on {{his}} cheek. You file the heat. Upstairs it will either be a tool or a reason to blow a room. The quartet bows. People pretend the dance was about music.",
      ],
      next: "c12_afterdance",
    },

    c12_afterdance: {
      chapter: "c12",
      location: "Helix ballroom · off the disc",
      speaker: "",
      pages: [
        "You come off the floor with Ives' heat still printed on the clothes. A server offers water. You take it. Magnesium, lights. Ives takes whiskey. Crowe arrives as if she had been walking this line all night, which she has.\n\n\"Beautiful,\" she says, to both of you and to neither. Her hand returns to {{his}} back for one second, a recast of the role, then leaves. \"Senator. The suite on nineteen is unlocked. I will be in the adjacent for twelve minutes and then I will be nowhere, which is a gift. Maren will not be in the adjacent unless {{name}} is foolish enough to invite a file into a bed.\" Water after a dance tastes like the annex: magnesium, lights, a lie about health that has become a ritual. Ives' whiskey is the honest drink in the cluster. You do not reach for it. Honesty in a glass is still a clock.",
        "Ives chuckles, late. \"Helene. You still talk like a contract.\" He kisses her cheek with the professionalism of a man who has kissed many women who could ruin him. Then he looks at you. \"Five minutes. I have to be seen leaving alone. You know the way, or you will.\" He goes toward a door that is not the main door. Men like him always know the seam.\n\nCrowe's mouth is near {{his}} ear the instant he is gone. The brief, finally, without an audience of donors. Crowe's mouth at {{his}} ear smells like the flower and like a decision. The brief is finally going to take off its donor clothes. You watch Ives' back disappear into a seam and understand that the ballroom was only a long corridor after all. Donors orbit the two of you and then politely decay. You are already a rumor moving toward a seam. The flower on {{his}} skin is louder now that the dance has heated it. Louder is not the same as honest.",
      ],
      next: "c12_brief",
    },

    c12_brief: {
      chapter: "c12",
      location: "Helix ballroom · stage shadow",
      speaker: "Crowe",
      pages: [
        "\"He keeps the codes on a second phone in the suite safe, or in his mouth when he's drunk enough to think a body is a vault,\" Crowe says. \"You will get one or the other. If you get neither, you will get enough of his habits that Vale can build me a key. Do not be precious about methods. Precious is for people with other jobs.\"\n\nHer fingers rest at {{his}} wrist, over the watch, over the bruise. \"If you need chemical help, you already know whether you carry it. If you need me in the room, you will say so before the door closes, not after you have already broken. I will watch if watching makes you obedient. I will not watch if watching makes you brave. I am not in the market for your bravery tonight.\" Her fingers on the watch are a reminder that the bruise is still there, still useful, still a sentence she can read in the dark. You do not flex. Flexing would be a flinch. Flinching, the pin-woman said, reads as newness.",
        "She looks past {{him}} at the glass, the city, the paid witness. \"The nurse is safe as long as tonight earns. If tonight does not earn, I will make Plate Four a partner and you will thank me for the benefits. That is not a threat. That is the same sentence as the invitation.\"\n\nA pause. Something that might be mercy if you were very lonely. \"You look like my decision,\" she says. \"Go be it in a smaller room. Nineteen. The door will know your face. If you want to burn the night down instead, do it loudly enough that I can sell the fire. I hate quiet failures. They look like I mis-dressed someone.\" The city in the glass does not look back. Paid witness. You want, ruinously, to ask about Mia by name. You do not. Names in this shadow become addresses. She has already used the word nurse. That is as close as mercy comes in her climate.",
      ],
      next: "c12_briefchoice",
    },

    c12_briefchoice: {
      chapter: "c12",
      location: "Helix ballroom · stage shadow",
      speaker: "",
      text: "Nineteen is waiting. Ives is being seen leaving alone. Maren is a red shape that could become a file. Crowe's perfume is the dark flower on {{his}} own skin.",
      choices: [
        {
          text: "Accept the honeytrap. Tell her you will earn.",
          to: "c12_accept",
          effects: { corruption: 8, flags: { honey: true } },
        },
        {
          text: "Ask her to be in the adjacent. It will cost.",
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
        "You tell her you will earn. The words sit in {{his}} mouth like PREP. Crowe's eyes warm a degree that would be love in a civilian climate. \"Good,\" she says. \"I like you better when you are not performing a soul. Souls are noisy.\" She adjusts {{his}} tie or {{his}} necklace, a last wardrobe act, and sends {{him}} toward the seam Ives used.\n\nMaren watches you go and does not follow. Paper, or a threat, or a meeting: all of that can wait for what comes out of nineteen. She sends {{him}} with a look that would be a kiss if kissing were how she filed. You walk. The donors have begun to forget you already, which is cover, which is a gift you do not thank her for. A woman with a foundation pin watches {{him}} go and files a noun you will not hear. You walk under the filing. Walking is the last thing in this cylinder that still looks like a choice.",
        "The ballroom's aurora lie ripples. Donors begin to forget the speech. You walk through them like a rumor that has found a floor. The singing glass hits a higher note; you do not startle. Static spray, training, the last civilian flinch sold for a watch that covers a bruise.\n\nNineteen is a lift and a corridor and a door that will know {{his}} face. You take all three as if they were a tram back to a clinic, which they are not. The lift to nineteen is lined with a darker brass. {{His}} face in it looks like Kane's quarter-hour man and like Mia's friend and like neither. The progress bar does not show floors. Buildings that do this are embarrassed to have bodies, Kane said. He was right about the embarrassment. Nineteen's first air is warmer. Warmth is a method. You taste it and think of the suite bottle already open, a head start, a man pouring for a person who has not yet arrived and has always been arriving.",
      ],
      next: "c12_terrace",
    },

    c12_askwatch: {
      chapter: "c12",
      location: "Helix ballroom · stage shadow",
      speaker: "",
      pages: [
        "You ask her to be in the adjacent. Crowe studies {{him}} as if Vale had handed her a new chart. \"That is not a request for safety,\" she says. \"That is a request to be owned in real time. I can do that. I enjoy that. Understand what you are buying. If I watch, I keep.\"\n\nShe does not make you answer again. She has the answer. \"Adjacent,\" she says. \"Twelve minutes becomes the night. Maren stays out. If you look at the mirror, look as if you know I am the glass.\" Her hand finds {{his}} back one last time, harder, a preview. Owned in real time. The phrase sits under the flower on {{his}} skin and begins to work. You walk with it. Maren's fury-impressed face is a small, human weather you will not be allowed to keep.",
        "You walk toward the seam with her attention already installed in the next room like furniture. The donors part. Maren's face, briefly visible, is furious and impressed, which on her is the same expression.\n\nThe lift to nineteen knows {{his}} face and Crowe's, two permissions, one night. The corridor smells of cold flowers. The door at the end is already a mouth. Nineteen's corridor has no civic notices and no knitted hats. The cold flowers here are the same species as the ballroom's, cut from the same unreality. You walk through their smell as if through a second static spray. At the far end, the ajar door leaks whiskey light and a radio voice saying brief. You walk into the leak. Asking her to watch has already made the corridor narrower. Narrow is how keeping begins. You do not look back at the ballroom. Looking back is a civilian reflex, and she is already the glass ahead.",
      ],
      next: "c12_terrace",
    },

    c12_mayblow: {
      chapter: "c12",
      location: "Helix ballroom · stage shadow",
      speaker: "",
      pages: [
        "You tell her you may blow the room. Crowe's mouth goes thin, then amused. \"A line,\" she says. \"How archival of you. Blow it if you must. Bring me the fire in a shape I can bill. If you blow it for pride, I will take Plate Four and I will take you and I will not call that a contradiction.\"\n\nShe lets {{him}} go without adjusting the clothes. A small withheld intimacy. You feel it more than the hand.\n\n\"Nineteen,\" she says. \"The door still knows you. Doors here are not moral.\" The withheld adjustment of {{his}} clothes is a colder hand than the one on the spine. You carry it into the seam. People glance and unglance. A problem, not a gift. You practice the posture of a person who might still set a fire. The seam Ives used is a service door dressed as design. You put {{his}} hand on it and feel the same warmth nineteen will offer, blood in the walls, a building that pretends wood can be innocent.",
        "You walk. The ballroom continues being a cylinder of paid heaven. Ives has been seen leaving. The photographer is already bored of you, which is a kind of success. Maren lifts her glass, not toasting.\n\nIn the lift you see {{his}} face and try to find the person who bought potatoes. The person is there, under the static spray, under the flower, under the watch. Nineteen will decide how much of {{him}} comes back down. In the brass {{his}} eyes look like the archive's: tired, still flinching when a name is used like property. The flinch, Kane said, is the product. You take it upstairs anyway, because products do not get to choose their shelves, and you have not yet chosen fire. The lift opens on a corridor of cold flowers and one ajar door. You have not chosen fire yet. You have only reserved the right. Reservation is a civilian word. You take it upstairs like contraband.",
      ],
      next: "c12_terrace",
    },

    c12_terrace: {
      chapter: "c12",
      location: "Helix tower · nineteen, antechamber",
      speaker: "",
      journal: "The gala did its work. The suite is the second half of the dress.",
      pages: [
        "Nineteen's antechamber is quieter than the ballroom in the way a held breath is quieter than a speech. A low light. A bowl of the same cold flowers. A mirror that does not multiply you into a committee, only into one person who has been prepared. Through a second glass, the old river's concrete throat is a dark line in the city, and Mia's plate is a scatter of cheaper gold.\n\nThe suite door is ajar. Ives' voice, on a phone, is telling someone he will be brief. He will not be brief. Men who say brief are already spending the night. Ives' voice on the phone is the radio voice minus an audience, which makes it worse: thinner, needier, a man telling a staffer he will be brief while looking at a door as if the door were a meal.",
        "You can still turn around. The lift would take you. Voss would meet you in some rain and call you a coward and pour you a paper cup of something honest. Crowe would take Plate Four. Maren would file the couple frame. Ives would find another body that translates.\n\nYou put {{his}} hand on the ajar door. The wood is warm. Someone has been leaning on it, listening, or the building is always warm here, blood in the walls. You go in because the clothes have a destination and because you are still, ruinously, the person who did not throw Kane's card away. The senator looks up, pleased, lonely, fifty-eight, and the night becomes a room with a door. The wood under {{his}} palm is warm the way living things are warm. You push. The suite opens on whiskey light and a man who has taken off his jacket as if that were already intimacy. The night, which has been a cylinder of glass, becomes a room. Rooms, he said, are where the country happens.",
      ],
      next: "c13_start",
    },
  });
})();
