(function () {
  const S = window.STORY;
  if (!S) return;

  function prepend(id, page) {
    const n = S[id];
    if (!n) return;
    if (Array.isArray(n.pages)) {
      if (n.pages[0] && n.pages[0].indexOf(page.slice(0, 40)) === 0) return;
      n.pages.unshift(page);
      return;
    }
    if (typeof n.text === "string") {
      n.pages = [page, n.text];
      delete n.text;
    }
  }

  prepend(
    "c02_start",
    "You get off the tram Kane put you on. This is not forty-one. This is not the rain deck where he met you. This is the unmarked far stop on Plate Nine. You have not met Handler Voss yet. You will, on this platform, in this rain."
  );
  prepend(
    "c03_start",
    "You did not stay on the tram all night. Morning returns you to the House of Knives. You walk the loading dock, the corridor, into the kitchen. Voss is already there. The Rivers folder is open. Legend work starts here, not at Helix."
  );
  prepend(
    "c04_start",
    "The tram to Helix lets you off at their private weather. You walk from the stop onto the campus approach. Glass, lawn, fountain. This is the first time the building looks at you as Rivers. You are not in Crowe's office. You are still outside."
  );
  prepend(
    "c05_start",
    "Radek told you Crowe wanted the throat. That was this morning in the lobby. You did not go up to Five then. You are on the plate tram after hours now, because a calendar ghost named him. You are going to Special Projects. You are not in his office yet."
  );
  prepend(
    "c06_start",
    "You are not in Crowe's office. Morning. A wet-iron stair Revelations uses for dead drops. Voss is here with the paper cup. You left Helix last night. This is the debrief before you steal the memo. You have not photographed a cabinet yet."
  );
  prepend(
    "c07_start",
    "Night on fifty-one. The tasting is over. This is the tape hour: no bottle, a screen, Crowe waiting. You close the door when he tells you."
  );
  prepend(
    "c08_start",
    "The tram doors open on Plate Six. Continuity Wellness: spa glass, a moth in the door, after-hours dark. You get off here. Vale is inside. You are not on the table yet."
  );
  prepend(
    "c09_start",
    "You left Continuity. You took the night tram home. This is your rented slot in the morning. The body they wrote is the first thing you have to live in. Voss is later. The mirror is now."
  );
  prepend(
    "c10_start",
    "The tram doors open on Plate Nine. Rain deck three is the same melancholy as the night Kane collected you, but Kane is not here. You step off into Voss's weather. This is the debrief in the rain."
  );
  prepend(
    "c11_start",
    "Voss sent you toward the gala. First you go to Plate Four. The tram smells of wet wool. Mia's clinic is the stop after this one. You are not at Helix. You are going to see whether she still knows your name."
  );
  prepend(
    "c12_start",
    "The tram doors open on the Helix annex. Sixteen hundred. Not the lobby from week one. Not Mia's clinic. You step down onto stone washed for donors. Wardrobe, then the glass ballroom. The gala has not started on the floor yet."
  );
  prepend(
    "c13_start",
    "You are still on nineteen's antechamber side of an ajar door. You have not gone in. The suite is whiskey light and a man who has taken his jacket off. Pushing is this chapter. The ballroom is behind you."
  );
  prepend(
    "c14_start",
    "You did not go home. Morning is still the senator's suite — or you came back to it before the clinic. Whiskey, citrus soap, codes on a palm. The gala is over. Vale's colonnade is later today."
  );
  prepend(
    "c15_start",
    "You are already under the Helix clinic colonnade. Pale stone. Nurses in pairs. This is the second pass, not last night's bed. Vale's wing is through those doors. You have not gone in yet."
  );
  prepend(
    "c16_start",
    "You left the slot before dawn because the calendar said Annex 2. Not Continuity. Not Vale's table. A low building behind the clinic spine. Marek Pell. You walk the wet approach first."
  );
  prepend(
    "c17_start",
    "You left Annex 2 on a tram. You did not walk into Theater B. Orderlies collect you for a different corridor: filtered air, a door that might as well say ZERO. Vale is ahead. You have not met Subject Zero until this hallway ends."
  );
  prepend(
    "c18_start",
    "You are still at Plate Nine's street mouth. The conversion wing is behind you. The war of firms starts in the street, not in a clinic chair. A shutter that will not close. Cars. Rain."
  );
  prepend(
    "c19_start",
    "You are still on the taped mark in demonstration suite B. The inner doors have not opened. When they do, the live test begins. The war is outside. This room is the play."
  );
  prepend(
    "c20_start",
    "You did not enter the cage. The live test is over. You left Helix for Plate Seven: funeral weather, a hearing that never happened. The orchard and the kill switch are below this rain deck, not yet. Forty-one minutes."
  );
  prepend(
    "c21_start",
    "You are still in the rented dark. You did not just leave Plate Seven; the orchard already sent you home. The civic anthem is not playing. This is the last personal hour before the heading. Whoever you call will come to this room."
  );
  prepend(
    "c22_start",
    "You are still in the glass with no plants. You did not leave through the handle. The corridor person is Kane, or his shape. The last night is spent. This is the heading. He is here to watch you sign it."
  );
})();
