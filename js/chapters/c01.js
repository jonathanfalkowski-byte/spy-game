(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    c01_start: {
      chapter: "c01",
      location: "The Stack · rain deck",
      speaker: "",
      journal: "Revelations opened a file on {{name}}.",
      pages: [
        "Rain on the Stack does not fall so much as get decided. The weather grid over Plate Nine is set to 'civic melancholy' three nights a week because focus groups like the way neon looks wet. The droplets are a little too even. They hit the decking in a rhythm that sounds designed, like a soundtrack for people who still want to believe weather is a conversation with God instead of a procurement line.\n\nYou stand under a leaking advertisement for a pill that promises to make your sleep more productive. The model in the poster has the kind of smile that has been edited at the muscle. Your coat is the cheap kind of expensive: good collar, bad lining, a pocket that already knows the shape of a folded card. Your phone has been quiet for eleven days, which in this city means either you are free or you have already been sold and the paperwork is catching up.",
        "You came here because a woman in a grey coat left a card in your locker at the night archive where you still pretend to be civilian. The archive is a basement of other people's secrets with a coffee machine that burns everything it touches. You catalogued marriage licenses and sealed settlements and one very boring shipping ledger that was not boring at all if you knew how to count containers that never arrived. The card said REVELATIONS and a time and nothing else. You told yourself you would throw it away. You did not.\n\nBelow the deck, trains move like slow ammunition. Someone laughs too loudly two platforms over, the laugh of a person performing okay. You check the exits out of habit. You have always checked exits. Teachers called it anxiety. Firms call it a skill. You call it the part of you that never believed rooms were innocent.",
        "A boy who is definitely twenty-something and trying to look older sells umbrellas that will dissolve in an hour. You do not buy one. Wet hair is a better disguise than a gadget. You watch a Helix wellness kiosk scan a woman's palm and tell her she is 4% more fertile than yesterday, as if that were a public fact and not an assault. She thanks it. That thank-you is the city in miniature.\n\nYou could still leave. The tram back to Plate Four is two minutes out. Mia's clinic lights would be on. You could be a person who files papers and sends Sunday jokes and dies of something ordinary. The card in your pocket is already warm, which is only your hand, which is how all bad decisions begin: as temperature.",
      ],
      next: "c01_kane1",
    },

    c01_kane1: {
      chapter: "c01",
      location: "Service lift",
      speaker: "Kane",
      pages: [
        "Kane does not look like a spy. He looks like a man who bills by the quarter-hour and has never once been surprised by a bill. He smells of antiseptic mint.\n\n\"{{name}}. You're late by four minutes. That's either nerves or tradecraft. I don't care which, so long as you can tell me the difference when it matters.\"",
        "The lift does not show floors. It shows a progress bar, as if the building is embarrassed to have a body.\n\n\"Helix Dynamics is six weeks from a public wellness launch,\" Kane says. \"CHRYSALIS. Body rewrite as a subscription. We have a buyer who wants the protocol, the client list, and the kill-switch before Helix starts minting people who can't testify. You will go in as a liaison. You will not be a hero. Heroes leak.\"",
      ],
      next: "c01_why",
    },

    c01_why: {
      chapter: "c01",
      location: "Service lift",
      speaker: "Kane",
      text: "He watches your face the way a butcher watches a scale.\n\n\"You may ask why you. Everyone asks. It is not a compliment.\"",
      choices: [
        {
          text: "Why me.",
          to: "c01_whyme",
          effects: { integrity: 2 },
        },
        {
          text: "Skip the seduction. Show me the money and the leash.",
          to: "c01_leash",
          effects: { corruption: 4 },
        },
        {
          text: "Tell me what happens if I walk.",
          to: "c01_walkask",
          effects: { integrity: 4 },
        },
      ],
    },

    c01_whyme: {
      chapter: "c01",
      location: "Revelations · 41",
      speaker: "Kane",
      pages: [
        "The office is all glass and no plants. The city looks edible from here.\n\n\"You have a civilian footprint that is boring in the right places,\" Kane says. \"Night archive. No manifesto. One friend who still believes you are kind. You check doors. You have never joined a club that requires a blood type. Helix likes assets who look like they wandered in. Revelations likes assets who can be ruined in a way that photographs well.\"",
        "He sets a thin case on the table. Badge. Pistol. A vial labeled PREP in a typeface that wants to be medical.\n\n\"Also: you still flinch when someone uses your name like they own it. That flinch is the product. CHRYSALIS eats people who don't have it, and it eats people who do. The difference is how loud they are afterward.\"",
      ],
      next: "c01_case",
    },

    c01_leash: {
      chapter: "c01",
      location: "Revelations · 41",
      speaker: "Kane",
      pages: [
        "He almost smiles. It does not improve him.\n\n\"Signing bonus tonight. A legend with a salary. If you complete Helix, a second life in a country that still has trees. If you fail, we stop paying the people who currently don't know you exist. That is the leash. It is made of other people's ignorance.\"",
        "The case opens. Badge. Pistol. PREP.\n\n\"You will meet Handler Voss in the morning. She is worse than I am and she will like you better, which is not a kindness.\"",
      ],
      next: "c01_case",
    },

    c01_walkask: {
      chapter: "c01",
      location: "Revelations · 41",
      speaker: "Kane",
      pages: [
        "\"Then you go back to the archive and wait for Helix to find you anyway. They already scraped your face off a tram camera. We are not the first people to open a file. We are the ones offering you a chance to hold the pen.\"\n\nHe lets that sit until the rain on the glass starts to sound like typing.",
        "\"Walking is allowed. It is also how we learn whether you are an operative or a civilian we should stop spending on. I recommend you stay for the coffee. It is the last honest thing in the building.\"",
      ],
      next: "c01_case",
    },

    c01_case: {
      chapter: "c01",
      location: "Revelations · 41",
      speaker: "Kane",
      text: "The vial is small enough to hide in a cheek. The pistol is not.\n\n\"PREP dulls panic and makes other people easier to agree with. Also you. Take too much and you will sign things with your mouth that your hands didn't authorize. Some of our honeytrap graduates swear by it. I don't.\"",
      choices: [
        { text: "Leave PREP. I want a clear head.", to: "c01_mia", effects: { integrity: 8 } },
        {
          text: "Pocket it. I might need an edge.",
          to: "c01_mia",
          effects: { corruption: 10, flags: { prep: true } },
        },
        {
          text: "Ask who my one kind friend is. Say her name.",
          to: "c01_mia_named",
          effects: { integrity: 4, flags: { asked_mia: true } },
        },
      ],
    },

    c01_mia_named: {
      chapter: "c01",
      location: "Revelations · 41",
      speaker: "Kane",
      pages: [
        "\"Mia Renn. Pediatric night shift, Plate Four clinic. You send her a joke every Sunday and you have not told her about the card. Helix will use her if you give them a reason. So will we, if you make us.\"\n\nHe says it without pleasure. That is not the same as mercy.",
      ],
      next: "c01_mia",
    },

    c01_mia: {
      chapter: "c01",
      location: "Your rented slot",
      speaker: "",
      pages: [
        "You go home because that is what civilians do between becoming something else. The slot is seven meters by four and smells of other people's cooking. The window faces a ventilation throat. Someone has stuck a paper flower to the grate.\n\nYour phone lights. Mia: you alive or did the archive finally eat you. You could tell her. You could not.",
      ],
      choices: [
        {
          text: "Lie. Tell her you're fine. Keep her out of the blast radius.",
          to: "c01_sleep",
          effects: { cover: 6, flags: { mia_protected: true } },
        },
        {
          text: "Hint that work got strange. Don't name firms.",
          to: "c01_sleep",
          effects: { integrity: 4, heat: 4, flags: { mia_hinted: true } },
        },
        {
          text: "Don't answer. Silence is a kind of door.",
          to: "c01_sleep",
          effects: { cover: 2, integrity: -2 },
        },
      ],
    },

    c01_sleep: {
      chapter: "c01",
      location: "Your rented slot",
      speaker: "",
      pages: [
        "Sleep comes in pieces. You dream of a clinic lighting that is too kind. You dream of your own mouth saying yes in a voice you don't have yet.\n\nAt 05:10 the building's civic anthem leaks through the walls. You dress like a person who has a meeting. You put the pistol in the case and the case in a bag that looks like groceries. You do not look at the mirror long. Mirrors will become a workplace hazard.",
      ],
      next: "c01_end",
    },

    c01_end: {
      chapter: "c01",
      location: "Tram to training",
      speaker: "",
      journal: "Chapter 1 closed. Training starts.",
      pages: [
        "The tram is full of people practicing being unremarkable. You practice with them. Kane's building falls behind like a bad decision you are going to keep.\n\nHandler Voss is waiting at the far stop with a paper cup and an expression that has buried better people than you. She looks at you as if she is already subtracting the parts she won't need.",
      ],
      next: "c02_start",
    },
  });
})();
