(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    c01_start: {
      chapter: "c01",
      location: "The Stack · rain deck",
      art: "img/art-voss-rain.png",
      speaker: "",
      journal: "Revelations opened a file on {{name}}.",
      pages: [
        "The weather grid over Plate Nine is set to rain three nights a week. Focus groups like how neon looks wet. The droplets hit the decking in a too-even rhythm, more procurement than weather.\n\nYou stand under a leaking ad for a pill that promises more productive sleep. The model's smile looks edited. Your coat has a good collar and a cheap lining. There is a folded card in the pocket. Your phone has been quiet for eleven days. In this city that means you are either free, or already sold and the paperwork is catching up.",
        "You came because a woman in a grey coat left a card in your locker at the night archive, where you still pretend to be a civilian. The archive is a basement of other people's secrets with a coffee machine that burns everything it touches. You catalogued marriage licenses, sealed settlements, and one shipping ledger that was not boring if you knew how to count containers that never arrived. The card said REVELATIONS and a time and nothing else. You told yourself you would throw it away. You did not.\n\nBelow the deck, trains move slowly. Someone laughs too loudly two platforms over, the laugh of a person pretending to be fine. You check the exits out of habit. You have always checked exits. Teachers called it anxiety. Firms call it a skill. You never believed rooms were safe.",
        "A young man who is trying to look older sells umbrellas that will dissolve in an hour. You do not buy one. Wet hair is a better disguise than a gadget. You watch a Helix wellness kiosk scan a woman's palm and tell her she is 4% more fertile than yesterday, as if that were a public fact. She thanks it. That thank-you is how this city works: people thank the thing that just used them.\n\nYou could still leave. The tram back to Plate Four is two minutes out. Mia's clinic lights would be on. You could file papers and send Sunday jokes and die of something ordinary. The card in your pocket is warm from your hand. That is how this started: a card, a time, and you showing up anyway.",
      ],
      next: "c01_meet",
    },

    c01_meet: {
      chapter: "c01",
      location: "The Stack · rain deck",
      art: "img/art-voss-rain.png",
      speaker: "",
      pages: [
        "The time on the card was now. You wait under the leaking ad until a man in a dry coat walks the length of the deck like he owns it.\n\nThis is Kane. Recruiter. He looks like someone who bills by the quarter-hour and has never been surprised by a bill. He smells of antiseptic mint. No umbrella. He stops two meters from you and checks a slate instead of your face.",
        "\"{{name}}. You're late by four minutes. That's either nerves or tradecraft. I don't care which, so long as you can tell me the difference when it matters.\"\n\nHe nods at the black high-rise behind the rain, the one with a single lit floor. \"We are not talking out here. Helix scrapes tram cameras. We go up. Forty-one. If you wanted to walk, you would have walked already.\"",
      ],
      next: "c01_kane1",
    },

    c01_kane1: {
      chapter: "c01",
      location: "Revelations · service lift",
      art: "img/art-lift.png",
      speaker: "Kane",
      pages: [
        "The service lift is behind a door that does not exist on the public panel. Kane badges it. You both step in. Wet footprints on black metal. No floor numbers. A progress bar crawls up the wall.\n\nHe does not brief you yet. He watches the bar. You watch the doors. The rain is gone. The mint is not.",
        "\"When we sit down, you may ask the usual questions,\" he says. \"Why you. What if you walk. How much. Until then, keep your mouth for the office. Lifts have ears we did not install.\"\n\nThe bar completes. The doors open on glass, night city, and a room with no plants. You are not on the deck anymore. You are in Revelations.",
      ],
      next: "c01_arrive",
    },

    c01_arrive: {
      chapter: "c01",
      location: "Revelations · 41",
      art: "img/art-revelations.png",
      speaker: "Kane",
      pages: [
        "Floor forty-one is a conference room with floor-to-ceiling glass. A thin case is already on the table. Kane hangs his coat and yours as if you have agreed to stay.\n\n\"Helix Dynamics is six weeks from a public wellness launch,\" he says, sitting. You sit because standing feels like you are about to be arrested. \"CHRYSALIS. Body rewrite as a subscription. We have a buyer who wants the protocol, the client list, and the kill-switch before Helix starts making people who can't testify. You will go in as a liaison. You will not be a hero. Heroes leak.\"",
      ],
      next: "c01_why",
    },

    c01_why: {
      chapter: "c01",
      location: "Revelations · 41",
      art: "img/art-revelations.png",
      speaker: "Kane",
      text: "He watches your face closely, waiting to see what you do with it. City lights smear behind him. You are in his office now. This is the conversation the rain deck was not for.\n\n\"You may ask why you. Everyone asks. It is not a compliment.\"",
      choices: [
        {
          text: "Why me.",
          to: "c01_whyme",
          effects: { integrity: 2 },
        },
        {
          text: "Skip the pitch. Show me the money and the leash.",
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
        "You are still in the glass office. Kane has not moved except to put his hands on the case.\n\n\"You have a civilian footprint that is boring in the right places,\" he says. \"Night archive. No manifesto. One friend who still believes you are kind. You check doors. You have never joined a club that requires a blood type. Helix likes assets who look like they wandered in. Revelations likes assets who can be ruined in a way that photographs well.\"",
        "He sets a thin case on the table. Badge. Pistol. A vial labeled PREP in a typeface that wants to look medical.\n\n\"Also: you still flinch when someone uses your name like they own it. That flinch is what we are buying. CHRYSALIS eats people who don't have it, and it eats people who do. The difference is how loud they are afterward.\"",
      ],
      next: "c01_case",
    },

    c01_leash: {
      chapter: "c01",
      location: "Revelations · 41",
      speaker: "Kane",
      pages: [
        "He almost smiles. It does not make him kinder.\n\n\"Signing bonus tonight. A cover identity with a salary. If you complete Helix, a second life in a country that still has trees. If you fail, we stop paying the people who currently don't know you exist. That is the leash. It is made of other people's ignorance.\"",
        "The case opens. Badge. Pistol. PREP.\n\n\"You will meet Handler Voss in the morning. She is worse than I am and she will like you better, which is not a kindness.\"",
      ],
      next: "c01_case",
    },

    c01_walkask: {
      chapter: "c01",
      location: "Revelations · 41",
      speaker: "Kane",
      pages: [
        "\"Then you go back to the archive and wait for Helix to find you anyway. They already scraped your face off a tram camera. We are not the first people to open a file. We are the ones offering you a chance to hold the pen.\"\n\nHe lets that sit. Rain ticks on the glass.",
        "\"Walking is allowed. It is also how we learn whether you are an operative or a civilian we should stop spending on. I recommend you stay for the coffee. It is the last honest thing in the building.\"",
      ],
      next: "c01_case",
    },

    c01_case: {
      chapter: "c01",
      location: "Revelations · 41",
      speaker: "Kane",
      text: "The vial is small enough to hide in a cheek. The pistol is not.\n\n\"PREP dulls panic and makes other people easier to agree with. Also you. Take too much and you will say yes with your mouth to things your hands didn't authorize. Some of our honeytrap graduates swear by it. I don't.\"",
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
      art: "img/art-slot.png",
      speaker: "",
      pages: [
        "Kane dismisses you the way he hung the coats: as a finished task. You take the same service lift down. The progress bar runs in reverse. The rain deck is still set to rain. Home is a tram, then a slot seven meters by four that smells of other people's cooking. The window faces a ventilation shaft. Someone has stuck a paper flower to the grate.\n\nYour phone lights. Mia: you alive or did the archive finally eat you. You could tell her. You could not.",
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
          text: "Don't answer. Leave her out of it.",
          to: "c01_sleep",
          effects: { cover: 2, integrity: -2 },
        },
      ],
    },

    c01_sleep: {
      chapter: "c01",
      location: "Your rented slot",
      art: "img/art-slot.png",
      pages: [
        "Sleep comes in pieces. You dream of clinic lighting that is too kind. You dream of your own mouth saying yes in a voice you don't have yet.\n\nAt 05:10 the building's civic anthem leaks through the walls. You dress like a person who has a meeting. You put the pistol in the case and the case in a bag that looks like groceries. You do not look at the mirror long. You do not want to watch your face start changing yet.",
      ],
      next: "c01_end",
    },

    c01_end: {
      chapter: "c01",
      location: "Tram toward an unmarked stop",
      art: "img/art-stack-rain.png",
      speaker: "",
      journal: "Chapter 1 closed. Morning: find Voss at the unmarked far stop.",
      pages: [
        "Morning. You do not go back to forty-one. Kane's building falls behind the tram. You are going to keep this job anyway. The bag that looks like groceries holds the case. The city practices looking ordinary. You practice with it.\n\nThe card named a stop that is not on civilian maps: the far end of Plate Nine. Handler Voss. Paper cup. You have not met her yet. You will, when the doors open.",
      ],
      next: "c02_start",
    },
  });
})();
