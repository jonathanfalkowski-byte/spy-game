# Chapter 7 (Celebrity route): sample deepened scene, "The Interview"

**Tone sample for owner review (2026-09-24).** This is the first scene written under the
**heat and danger pass** ([../BEAT_MAP.md](../BEAT_MAP.md),
[../CONTENT_DIRECTION.md](../CONTENT_DIRECTION.md)): every chapter carries a charged moment,
a danger moment, a revelation and a choice with a real cost. It replaces the three-paragraph
`pursue-audience` beat in Chapter 7 with a full scene. Once the tone is approved, the other
Chapter 7–9 scenes are written the same way and EVE Code (or Design) implements them.

Gate: `c5.published` (she has a public image and an audience). Sets the same Chapter 7 piece
(`own.piece.audience = adjacent`) and exposure the current beat sets, plus the new choice's
flags noted below.

---

**Scene:** *The Woman Nobody Can Place* · `EVENING · A STUDIO ON THE RIVER`

> p: The car Aster sends is black and silent and smells of someone else's perfume. By the time
> it slides into the loading bay behind the studio your phone has lit up eleven times: the
> producer, the stylist, two numbers you don't know, and your editor, who has written only
> *wear the dark one*.
>
> p: You wear the dark one. It is cut to be looked at: high at the throat, and nothing at all
> across the back. The stylist is a small, fierce woman with pins in her mouth. She circles you
> twice, lifts one strand of your hair and lets it fall exactly where it was.
>
> q(Stylist): Don't let them light you flat. You're better in shadow.
>
> t: Everyone is better in shadow. That's the whole job.
>
> p: The studio is a black box with one bright island in the middle: two low chairs, a table, a
> glass of water nobody will drink. The host rises to meet you. Theo Marr, handsome in the way
> television likes, forty and pretending otherwise, famous for making guests say one thing more
> than they meant to. He takes your hand in both of his and holds it a beat too long.
>
> q(Theo Marr): I've wanted you in that chair since the Aster pictures. Everyone has. Do you know
> what they call you upstairs? *The woman nobody can place.*
>
> p: He means it as a compliment. He has no idea how close he is. You smile the Glass House smile,
> the one that gives a man the feeling he has been let in, and you feel the room lean toward you:
> the floor manager, the camera operator, the boy holding the cables. Forty strangers wanting
> something from you, and you could spend it however you liked.
>
> t: Adrian never had a room lean toward him in his life. You are going to have to be careful how
> much you enjoy this.
>
> p: The red light comes on. Theo is good. He starts warm, with the pictures, the dress, whether
> the famous back of the Aster print was your idea (it was), and walks you slowly toward the
> things you haven't said anywhere. Where you grew up. Why nobody had heard of you a year ago. He
> leans in when he asks, close enough that the question feels private, with half the city
> watching.
>
> q(Theo Marr): You came out of nowhere. That's the rumour. A woman with a face like that doesn't
> come out of nowhere.
>
> p: This is the opening. You came here to put one question into the public air, a question that
> will mean nothing to almost everyone watching and everything to the few who know what Project
> Eve is. How you ask it decides who hears it, and who hears *you*.

**Choice: how to plant the question**

- **plant-subtle** · *Ask it as a feeling* · Only someone who already knows will hear it.
  > p: You look past him, into the lens, and let your voice drop. "Sometimes I think a life can
  > outlast the woman who lived it. Someone keeps it on a shelf. Someone decides who gets to
  > wear it next." You laugh, lightly, as if it were a line from a song. Theo laughs with you.
  > Forty people in this room hear a mood. Somewhere, one or two people hear a confession.
  >
  > Sets `c7.audience-mode = subtle`. Exposure stays `yes` (the current rule).

- **plant-bold** · *Say it straight to camera* · More people will answer. More of the wrong
  people will hear.
  > p: "Here's what I'd like to know," you say, and you don't smile. "When someone's whole life
  > gets reused, who signs for it? Somebody signs. I'd like to know their name." The floor
  > manager looks up from her tablet. Theo, for the first time all evening, doesn't have the next
  > line.
  >
  > Sets `c7.audience-mode = bold`; `own.exposed = yes-deep`. (Chapter 8 reads the deeper
  > exposure: Sloane's notice arrives sooner and colder.)

- **plant-theo** · *Make Theo ask it for you* · Tradecraft. The question is his, not yours,
  and now he's curious about you.
  > p: You don't answer. You let the silence sit until he fills it, and you steer him with
  > your eyes and a half-finished sentence about borrowed names, until he is the one leaning
  > forward, delighted with himself: "Are you telling me somebody *gave* you a life? Who hands
  > out lives, Evelynn?" It goes out under his name. Clever. It's also the first time Theo Marr
  > has looked at you as a story instead of a guest, and a man like that doesn't stop pulling a
  > thread once he's found it.
  >
  > Sets `c7.audience-mode = theo`; exposure stays `yes`; adds `npcs.theo = curious` (a thread
  > Act III can pull: the press as ally or threat).

**Danger: the way out**

> p: The green room is empty except for a man in a grey suit who isn't on any call sheet. He
> doesn't stand. He looks at you the way the clinic's mirror did, measuring the fit.
>
> q(Man in grey): You stand like someone taught you to stand quite recently. It's very good.
> Nearly perfect.
>
> p: Then he's gone, through a door you didn't see, and your hands are cold. When you reach the
> loading bay, the car Aster sent has left. Another car idles in its place with its lights off
> and nobody getting out.

**Choice: getting home**

- **exit-crowd** · *Go out the front, into the fans* · Your face is the problem. Use it as the
  answer.
  > p: There are twenty of them behind the rope, phones up, and they scream your name, the
  > name you're wearing, as you step into the rain. You sign three programmes, take a
  > photograph with a girl who is shaking, and let the crowd fold around you all the way to
  > the corner, where a taxi can't refuse a woman with twenty witnesses. Behind you, the dark
  > car pulls out and doesn't follow. Fame is a cage. Tonight, for ten minutes, it was a
  > bodyguard.
  >
  > Sets `c7.exit = crowd` (more visible; safe).

- **exit-river** · *Walk the river path in the rain* · Alone and quiet. You'll know if they
  follow.
  > p: You take the long way, along the embankment, heels in your hand once the stones get
  > slick. At the second bridge you see him in the reflection of a shop window: grey suit, no
  > umbrella, thirty yards back. At the third you cut through a hotel lobby, out through the
  > kitchens, and come up on the other side of the road in time to watch him stand at the
  > river rail, looking the wrong way. You have never been so frightened. You have never felt
  > so awake.
  >
  > Sets `c7.exit = river` (a sighting of the man in grey recorded; Act III can name him).

**Revelation: the answer arrives**

> p: At home, still in the dark dress, you check your phone. Among the hundreds of messages is
> one from an account that will delete itself within the hour, from somebody who was adjacent to
> Project Eve and is frightened: *You're asking the right question about the wrong person. She
> didn't authorize it. Stop looking where they want you to.*
>
> p: And somewhere in Sloane's directorate, someone writes a note: the independent one is asking,
> in public, who authorized the reuse.

*(The existing piece and exposure effects apply as today; the new flags are additive.)*

---

## What this sample shows (for the review)

- **Heat:** the dress and the stylist; a room leaning toward her; a host who flirts; her own
  enjoyment of being wanted, and the risk of enjoying it too much. Nothing sexual; all charge.
- **Danger:** the man in grey who knows how new her walk is; the missing car; the tail.
- **Choice with cost:** three ways to plant the question, each changing exposure and who is now
  interested in her; two ways home (seen and safe, or alone and awake).
- **Revelation:** the same canonical warning the chapter already delivers.
- **Length:** about 1,300 words on one path, against three paragraphs today. Chapter 7 reaches
  its budget when the other hub options (the records office at night, drinks with Maya, the
  Rook dead drop) and one optional evening with Julian or Sebastian are written this way.
