(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    warning: {
      chapter: "c00",
      hideHud: true,
      location: "Access gate",
      speaker: "Revelations",
      pages: [
        "This is an 18+ visual novel. Everyone on screen is an adult.\n\nTwenty-two chapters: blackmail, coerced sex, conversion, body modification. Helix and Revelations are run by men. They convert women — and if you file male, they will feminize you until you are a woman on the table, whether you go along or they strap you down.\n\nYou can keep some scenes to the job, or take heat forks that go further. If you file male, intake will also ask whether you want sex with men before conversion, or only after they rewrite you. If you file female, that question is skipped: you are already a woman.",
      ],
      choices: [
        { text: "I am 18+ and I will play the whole campaign.", to: "title" },
        { text: "Leave.", to: "exit" },
      ],
    },

    exit: {
      chapter: "c00",
      hideHud: true,
      location: "Access gate",
      speaker: "",
      text: "Session closed.",
    },

    title: {
      chapter: "c00",
      hideHud: true,
      location: "The Stack · from a tram window",
      art: "img/art-title.png",
      speaker: "",
      pages: [
        "The city does not have a proper name on maps anymore. People call it the Stack: residential plates over factory plates over the old river, all of it owned by firms that print their own weather.\n\nRevelations is not a government. It sells people who can become whoever a client needs. They recruit the ones who still have a self, because that is the only resource that cannot be cloned cheaply — not yet.",
        "Helix Dynamics is finishing Project CHRYSALIS: hormones, grafts, neural appetite, voice, scent, gait. They sell it as wellness. Intelligence shops sell it as a cover identity you wear until the original owner forgets to come back.\n\nYou are going to be asked to steal it. Then you are going to be asked to wear it.",
      ],
      next: "gender",
    },

    name: {
      chapter: "c00",
      hideHud: true,
      location: "Your phone · intake form",
      art: "img/art-stack-rain.png",
      speaker: "",
      text: "The card from your locker does not come with a person. It opens a form on your phone while you are still in the rain. First name only. They already have the sex marker. They bury the rest in a drawer that floods if the building dies.",
      input: "name",
      next: function (state) {
        if (state.flags && state.flags.startFemale) return "c01_start";
        return "content";
      },
    },

    gender: {
      chapter: "c00",
      hideHud: true,
      location: "Your phone · intake form",
      art: "img/art-stack-rain.png",
      speaker: "",
      text: "Assigned sex at intake. This is who you are walking in as. If you file male, Helix will still make you female — you can go along, or they will force it. You do not stay a man. Female start stays female. Either can take the talent / porn-star lock later.",
      choices: [
        {
          text: "Male. Walk in as a man. They will convert me.",
          to: "name",
          effects: { startGender: "male", gender: "male", flags: { startMale: true } },
        },
        {
          text: "Female. Walk in as a woman.",
          to: "name",
          effects: { startGender: "female", gender: "female", flags: { startFemale: true } },
        },
      ],
    },

    content: {
      chapter: "c00",
      hideHud: true,
      location: "Your phone · intake form",
      art: "img/art-stack-rain.png",
      speaker: "",
      text: "You filed male. Before the rain deck: what sex you will play while you still have a cock. Julian Crowe, Ellis, Ives, Vale's men — the first weeks can include sex with men before conversion. After conversion, those scenes are a woman with men.\n\nIf you only want opposite-sex, the House will not put you in Ellis's bed while you are still a man. Honey training waits, or you take combat or ghost instead. Crowe's first tasting will be power, clothes, and threat — not his cock — until Vale is done with you.",
      choices: [
        {
          text: "Allow sex with men while I am still male. Honey and the tape can be gay.",
          to: "c01_start",
          effects: { flags: { allow_homo: true } },
        },
        {
          text: "Opposite-sex only. No male-male. Convert me first, then the men.",
          to: "c01_start",
          effects: { flags: { hetero_only: true } },
        },
      ],
    },
  });
})();
