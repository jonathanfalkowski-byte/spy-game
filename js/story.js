(function () {
  window.STORY = window.STORY || {};
  Object.assign(window.STORY, {
    warning: {
      chapter: "c00",
      hideHud: true,
      location: "Access gate",
      speaker: "Revelations",
      pages: [
        "This is an 18+ visual novel. Everyone on screen is an adult.\n\nTwenty-two chapters: blackmail, coerced sex, conversion, body modification. You can keep scenes to the job, or take heat forks that go further and then rejoin the spine.\n\nYou can refuse. Refusal has a price. Going further has a different one.",
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
      location: "Revelations",
      speaker: "",
      pages: [
        "The city does not have a proper name on maps anymore. People call it the Stack: residential plates over factory plates over the old river, all of it owned by firms that print their own weather.\n\nRevelations is not a government. It sells people who can become whoever a client needs. They recruit the ones who still have a self, because that is the only resource that cannot be cloned cheaply — not yet.",
        "Helix Dynamics is finishing Project CHRYSALIS: a stack of hormones, grafts, neural appetite, voice, scent, gait. They sell it as wellness. Intelligence shops sell it as a legend you wear until the original owner forgets to come back.\n\nYou are going to be asked to steal it. Then you are going to be asked to wear it.",
      ],
      next: "name",
    },

    name: {
      chapter: "c00",
      hideHud: true,
      location: "Personnel",
      speaker: "Recruiter Kane",
      text: "First name only. We bury the rest in a drawer that floods if the building dies.",
      input: "name",
      next: "gender",
    },

    gender: {
      chapter: "c00",
      hideHud: true,
      location: "Personnel",
      speaker: "Recruiter Kane",
      text: "Assigned sex at intake. This is who you are when you walk in. Later, people will try to spend that.",
      choices: [
        {
          text: "Male. File me as {{name}}.",
          to: "c01_start",
          effects: { startGender: "male", gender: "male", flags: { startMale: true } },
        },
        {
          text: "Female. File me as {{name}}.",
          to: "c01_start",
          effects: { startGender: "female", gender: "female", flags: { startFemale: true } },
        },
      ],
    },
  });
})();
