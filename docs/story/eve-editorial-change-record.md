# EVE editorial change record

## Reviewed package

86 approved editorial entries: 36 pilot, then 50 expanded entries. One attraction line occurs in both the sent message and spoken response. The integration validation record determines the final rendered occurrence count.

These are comparisons with authored source text. Some older passages already have UI polishing; the revision18 integration must give the new exact replacements priority while retaining historical presentation. Raw records used for replay and NPC knowledge remain authoritative.

Final player review also removed the technical “Chapter 3 continuation recorded” banner from new revision-18 runs. Its authenticated feedback value and older-version display remain unchanged. This is a display cleanup in addition to the 86 prose entries.

## Pilot review

- Axiom: kept the security progression, Benton’s actual assignment, Daniel’s news and Maya’s existing invitation/disclosure branches. Retained strong lines rather than rewriting every exchange. Canonical ages remain in character definitions.
- After Glass House: used existing apartment objects and badge-log facts; no new surveillance capability, intrusion or evidence. Confirmation and silence remain distinct.
- Julian: retained eligible/ineligible, personal/instrumental/mixed, no-sex/sex, refusal/withdrawal and fade outcomes. Shared prose does not impose desire on instrumental motives. Changes to spoken/sent language must not mutate stored mechanical knowledge.

Design review: PASS for the scoped package. This is delegated editorial review, not a claim that the owner personally reviewed each line.

## Before and after

### Pilot

**1. src/content/scenes.ts — office.daniel**

Before: Daniel Kessler is waiting beside your desk, making no effort to pretend the meeting is accidental. Thirty-two, long-limbed and permanently one button short of Axiom’s dress code, he has dark curls that resist corporate grooming and a face that usually gives away the joke before he tells it. There is no joke this morning.

After: Daniel Kessler waits beside your desk. His collar is open, his dark curls untidy; usually the joke reaches his face before he says a word. This morning he watches you approach without smiling.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**2. src/content/scenes.ts — office.daniel**

Before: Daniel has worked two desks over from me for four years. Clever, indiscreet, kinder than he wants anyone to notice. I am grateful he told me himself—and angry that I am hearing it from him instead of Benton.

After: Four years, two desks away. Daniel can never quite keep a secret. This one should have come from Benton.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**3. src/content/scenes.ts — office.benton**

Before: Benton is fifty-eight, compact and silver-haired, his charcoal suit so precisely fitted that it seems less like clothing than policy. He never hurries. He has built a career out of making everyone else adjust their pace to his.

After: Compact and silver-haired, Benton wears a charcoal suit without a crease out of place. He never hurries. He has built a career out of making everyone else adjust their pace to his.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**4. src/content/scenes.ts — office.benton**

Before: Benton has supervised me for four years. He praises precision when it protects him and calls it overthinking when it does not. He has not mentioned the promotion, and his arrival makes disappointment harden into suspicion. He almost never brings an assignment to someone’s desk himself.

After: Four years of Benton praising my precision when it protects him and calling it overthinking when it does not. He has come all the way to my desk with another assignment. Still nothing about the promotion.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**5. src/content/scenes.ts — maya.promotion**

Before: Maya Reyes crosses from the compliance wing carrying two paper cups. Thirty-three, with warm brown skin and watchful dark eyes, she wears her black hair in a loose knot and has turned back the cuffs of her navy suit. The small rebellion suits her. She sets one cup beside your terminal and keeps the other. No greeting. This is an old ritual.

After: Maya Reyes crosses from compliance with two paper cups, the cuffs of her navy suit turned back. Loose strands of black hair escape her knot. Her dark eyes find yours as she sets one cup beside the terminal and keeps the other. No greeting. You know this ritual.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**6. src/content/scenes.ts — maya.promotion love only**

Before: I know the exact moment friendship became something else. I have spent two years pretending I do not. Even now, hurt and angry, part of me is simply relieved that she came.

After: Two years of measuring what I say to her. Of knowing when to turn a look into a joke. This morning I have no joke ready. I am just glad she came.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**7. src/content/scenes.ts — maya.promotion colleague only**

Before: Maya is the colleague I trust more than anyone in this building. Trust is not intimacy, even when she keeps testing the boundary. Her arrival makes me feel less alone—and that is already more dependence than I intended.

After: Maya is the colleague I trust most in this building. I can give her the version I would never put in a report. How much beyond that is mine to decide.

Reason: Removes unchosen dependency judgment and implied romantic intent from professional branch.

**8. src/content/dialogue.ts — promotion.professional response**

Before: Daniel nods. “Sure,” he says, in a tone that means he believes none of it.

After: Daniel nods. “Sure.” He keeps his voice low. Neither of you moves on.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**9. src/content/dialogue.ts — benton.promotion response**

Before: I do not regret forcing him to say it aloud. I regret giving him one more chance to be honest with me.

After: Next quarter. Another three months of doing the work while he decides whether I deserve the title.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**10. src/content/dialogue.ts — mayaPromotion.hurt response**

Before: Maya’s expression softens. “I know. It should’ve been yours.”

After: Maya’s expression softens. “I know.” For once she leaves the silence alone. “It should’ve been yours.”

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**11. src/content/scenes.ts — ending.complete**

Before: The first part of the opening is complete. Your decisions and the information you chose to share remain on the record. Review them here, or continue Adrian’s day when you are ready.

After: Benton has your report. Maya has what you chose to tell her. Across the floor, the terminals hum on.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**12. src/content/chapter3.ts — chapter3.home**

Before: The driver waits until you have settled before asking for the residential address. He knows the route, not what happened upstairs. At the building, the restricted badge opens the lobby reader after a longer pause than it used to require.

After: The driver asks for your residential address once you are settled. At the building, you hold the restricted badge over the lobby reader. The pause before it opens is longer than you remember.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**13. src/content/chapter3.ts — chapter3.home**

Before: Inside, the tower remains visible beyond the rain. The apartment has the same narrow rooms, the same chair by the window, the same jacket that once meant a day at the office. The phone is warm in your hand. Upstairs, Marcus and Celeste spoke to this face as though it came with a history you could recall.

After: The tower is still there beyond the rain. So are the narrow rooms, the chair by the window, the jacket that once meant a day at the office. The phone warms your palm. Marcus and Celeste spoke to this face as though you ought to remember them.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**14. src/content/chapter3.ts — chapter3.surveillance**

Before: “Confirm that you are home. The access record closes the movement log; it does not tell me what you do inside.”

After: “Confirm you’re home. Your badge entry closes the movement log. It tells me nothing about what you do inside.”

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**15. src/content/chapter3.ts — chapter3.surveillance**

Before: My entry time. Down to the minute. I read it again before touching the reply field.

After: Down to the minute. I have barely put my keys down.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**16. src/content/chapter3.ts — chapter3.complete**

Before: Scene 1 ends here. Maya, Voss and the next decision remain ahead. Your reply, your silence and the evidence you carried forward are recorded for the next scene.

After: Beyond the window, the tower is lit. Your keys lie where you left them.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**17. src/content/chapter3.ts — chapter3.complete place**

Before: 20:04 · Scene 1 complete

After: 20:04 · Adrian’s apartment

Reason: Remove development marker while preserving time/location.

**18. src/content/chapter4-power.ts — handoff**

Before: At the door, Julian waits for you. The encounter has not occurred. You can still leave.

After: Julian waits at the door. Away from the working day, there is no file between you, no next question to answer. He leaves you room to decide whether to come in.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**19. src/content/chapter4-power.ts — flirt-only sent message**

Before: Conversation and flirtation only. I do not authorize physical or sexual intimacy.

After: You can flirt with me over the phone. That’s as far as tonight goes.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**20. src/content/chapter4-power.ts — flirt-only response**

Before: Conversation only. I understand.

After: Only the call. I understand.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**21. src/content/chapter4-power.ts — flirt-only aftermath**

Before: You talk briefly and end the call without making another promise.

After: His voice sounds different with no work to discuss. You let the conversation linger for a little while, then say goodnight. Nothing else is arranged.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**22. src/content/chapter4-power.ts — intimacy scope no-sex**

Before: Physical closeness only; no sex. Either person can stop.

After: I’m willing to be close to you. No sex tonight. If either of us wants to stop, we stop.

Reason: Same spoken agreement and hint; willingness preserved, no forced desire claim.

**23. src/content/chapter4-power.ts — intimacy scope sex**

Before: Voluntary sexual intimacy tonight only; either person can stop. No work or future obligation.

After: I’m saying yes to sex tonight. Either of us can stop. This changes nothing about the work, and it isn’t a promise about tomorrow.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**24. src/content/chapter4-power.ts — mutual agreement response**

Before: Yes. Those limits suit me. If either of us wants to stop, we stop.

After: Yes. Tonight, on those terms. And either of us can change our mind.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**25. src/content/chapter4-power.ts — no-sex fade**

Before: The agreed closeness remains within the no-sex boundary. The scene fades.

After: You share the closeness you agreed to, without sex. The rest of the evening stays private.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**26. src/content/chapter4-power.ts — sex fade**

Before: The private encounter remains off-page. The scene fades.

After: For a while, the working day recedes. The encounter remains private as the scene fades.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**27. src/content/chapter5-desire.ts — want-julian sent invitation**

Before: Would you welcome private time tonight? I have not decided the scope.

After: Would you like to see me tonight? I’m still deciding what I want from the evening.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**28. src/content/chapter5-desire.ts — want-julian reply**

Before: I would like to see you. Tell me what sort of evening you want. We can leave it at conversation, or leave it altogether.

After: I’d like that. We can just talk. Tell me what you decide.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**29. src/content/chapter5-desire.ts — handoff**

Before: Julian meets you at the door and waits. He stands aside, leaving the doorway clear.

After: Julian meets you at the door. For a moment you look at each other without the ease of a phone between you. Then he stands aside. The doorway is clear.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**30. src/content/chapter5-desire.ts — limited call message**

Before: Twenty minutes by phone only. No physical or sexual intimacy tonight.

After: Twenty minutes on the phone? I’m staying home tonight. Just conversation.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**31. src/content/chapter5-desire.ts — flirtatious call message**

Before: A flirtatious phone call only. No physical intimacy.

After: You can flirt with me, but only over the phone tonight.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**32. src/content/chapter5-desire.ts — flirtatious call prose**

Before: You call him. The conversation is easy enough that you notice the time reluctantly, but you end it at the boundary you set.

After: On the phone, a pause can carry as much as a sentence. You let a few of them last. When the time comes, you end the call as agreed.

Reason: Keeps flirtatious behavior without imposing reluctant desire on an instrumental motive.

**33. src/content/chapter5-desire.ts — scope no-sex**

Before: Physical closeness only; no sex. Either participant can stop.

After: I’m willing to be close to you, but no sex tonight. Either of us can stop.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**34. src/content/chapter5-desire.ts — scope sex**

Before: Voluntary sexual intimacy tonight only; either participant can stop.

After: Yes to sex tonight. Either of us can change our mind.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**35. src/content/chapter5-desire.ts — no-sex fade**

Before: The evening stays within the no-sex boundary. The scene fades.

After: The closeness stays within the limits you chose. No sex, no crossing them. The scene fades.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

**36. src/content/chapter5-desire.ts — sex fade**

Before: The private encounter remains off-page. The scene fades.

After: The messages and arrangements fall quiet. The encounter remains private as the scene fades.

Reason: Stronger voice and specificity; unchanged event and branch meaning.

### Expanded

**1. src/content/scenes.ts — ending.complete place**

Before: Opening milestone · Complete

After: 12:11 · Adrian’s desk

Reason: Editorial tightening within existing facts, blocking and choices.

**2. src/content/scenes.ts — maya.goodbye continueLabel**

Before: Finish the opening

After: Let her go

Reason: Editorial tightening within existing facts, blocking and choices.

**3. src/content/scenes.ts — helix.brief**

Before: Your task is to assess the acquisition logic. Establish what the records prove before deciding what they mean.

After: Benton wants a narrow answer. The records will decide how narrow you can honestly make it.

Reason: Editorial tightening within existing facts, blocking and choices.

**4. src/content/scenes.ts — helix.documents**

Before: Each source can establish a fact, repeat a claim or introduce uncertainty. Read at least two records before analysis. You can keep reviewing the documents while you work.

After: Read at least two records before analysis; you can return to them while you work. A claim in a document is still a claim.

Reason: Editorial tightening within existing facts, blocking and choices.

**5. src/content/scenes.ts — helix.analysis**

Before: Select two records you have read, then describe their relationship. Experimenting is free. You can retry, ask for a hint, investigate once, or review an assessment for submission.

After: Choose two records you have read and connect them. Retry or ask for a hint freely; one further investigation is available. Review your assessment when you are ready.

Reason: Editorial tightening within existing facts, blocking and choices.

**6. src/content/scenes.ts — helix.review**

Before: The morning has narrowed to the minutes left before lunch. Review your conclusion and attachments below. Submitting sends them to Benton and closes this investigation. You can still revise before committing.

After: Seven minutes until lunch. Your conclusion and attachments are ready for a final check. You can still revise; sending delivers them to Benton and closes this investigation.

Reason: Editorial tightening within existing facts, blocking and choices.

**7. src/content/day.ts — file.arrival**

Before: EV_7A_BLACKGLASS. Origin: unresolved. Owner: A. Vale. Status: present in your workspace. The ownership field is a system label, not an explanation.

After: EV_7A_BLACKGLASS. Origin: unresolved. Owner: A. Vale. Your name fills the ownership field. There is no explanation.

Reason: Editorial tightening within existing facts, blocking and choices.

**8. src/content/day.ts — security.intervention**

Before: Two officers stand behind your chair. The nearer one is a broad-shouldered woman in her forties, copper-brown hair clipped close and a matte security badge fixed precisely beneath her collarbone. Her younger partner has a narrow face, pale lashes and both hands visible at his sides. Neither reaches for a weapon. She takes your badge while he disconnects the terminal.

After: Two officers stand behind your chair. The woman’s copper-brown hair is clipped close; her partner keeps both hands visible at his sides. She takes your badge while he disconnects the terminal. Neither reaches for a weapon. They have everything they need within arm’s reach.

Reason: Editorial tightening within existing facts, blocking and choices.

**9. src/content/day.ts — sloane.intro**

Before: I have never met Sloane. Everyone in Strategic Intelligence knows her name: Director of Executive Intelligence, sealed operations, careers ended by unsigned reviews. I expected menace. Her calm is worse. I am afraid—and angry that she can probably see it.

After: Victoria Sloane. Director of Executive Intelligence. In eleven years, I have never been in a room with her. The stories about sealed operations and unsigned reviews offered no advice about where to stand.

Reason: Editorial tightening within existing facts, blocking and choices.

**10. src/content/day.ts — sloane.brief**

Before: You have her account of a planned meeting. You have not seen independent evidence for it. You may question her before asking for the assignment.

After: A planned meeting, according to Sloane. So far she has shown you nothing that confirms it. There is time to question her before asking for the assignment.

Reason: Editorial tightening within existing facts, blocking and choices.

**11. src/content/day.ts — refusal.reconsider**

Before: You do not sit this time. The phone is still in your hand; you feel its edge against your palm. Coming back has cost you some of the anger that carried you out. It has not made her terms easier to hear.

After: You do not sit this time. The phone’s edge presses into your palm. You know what waits outside this office now. Her terms sound exactly as they did before.

Reason: Avoid prescribing emotional cost of returning.

**12. src/content/day.ts — dayend.accepted**

Before: Adrian’s day ends here, before the clinic. Review the information you earned and the choices you made, or save this run for the next milestone.

After: The screen dims with the appointment still open. Seven o’clock is getting closer.

Reason: Editorial tightening within existing facts, blocking and choices.

**13. src/content/day.ts — dayend.cautious endpoint**

Before: This route ends at that decision. Your earlier evening plans remain intentions, not events that have already happened. Your findings and choices are available in the journal and history.

After: For now, the question stays unanswered. Whatever you told Maya about tonight, the evening has not happened yet.

Reason: Retains route endpoint meaning without narrating an unwritten continuation.

**14. src/content/day.ts — dayend.walkaway endpoint**

Before: This route ends with your departure. An independent path may continue later; you are not being sent back to Sloane now.

After: Maya is still there on the line. You stay outside the gates.

Reason: Editorial tightening within existing facts, blocking and choices.

**15. src/content/clinic.ts — travel**

Before: Downstairs, you join the morning transit queue. Nobody knows where your appointment is. A woman beside you balances a takeaway cup over her bag; two analysts argue softly about a meeting. You recognize the relief of having a small problem and feel briefly ashamed of envying them.

After: Downstairs, you join the morning transit queue. A woman balances a takeaway cup over her bag; two analysts argue softly about a meeting. From here, their morning looks ordinary. You keep your appointment to yourself.

Reason: Avoid omniscient assertion about strangers and imposed shame.

**16. src/content/clinic.ts — privacy**

Before: She looks tired. I want that to mean there is a conscience keeping her awake. Exhaustion can belong to anyone.

After: She looks tired. I cannot tell what kept her awake.

Reason: Editorial tightening within existing facts, blocking and choices.

**17. src/content/clinic.ts — simulation**

Before: I can look at a prediction without promising to want it. I need to remember that before someone writes down the length of my attention.

After: I keep looking for the part the model cannot predict: what it would be like to look back from there.

Reason: Question without assigning desired identity or approval.

**18. src/content/clinic.ts — complete**

Before: This milestone ends in transit. Your choices, earned information, and the limits you asserted remain available in the journal and conversation history.

After: The car moves on. The invitation’s seven-o’clock arrival time is still ahead.

Reason: Editorial tightening within existing facts, blocking and choices.

**19. src/content/clinic.ts — complete title**

Before: Sublevel 17 complete — en route to the Glass House

After: En route to the Glass House

Reason: Editorial tightening within existing facts, blocking and choices.

**20. src/content/clinic.ts — complete choice hint**

Before: End this milestone in transit, before the Glass House.

After: Continue the journey; you have not reached the Glass House yet.

Reason: Editorial tightening within existing facts, blocking and choices.

**21. src/content/mission.ts — homeContact**

Before: If you send a message, the screen will show exactly what she receives. Axiom may have access to the monitored device; that does not mean Sloane personally reads it.

After: The draft shows the words Maya would receive. The phone is still monitored; you have no receipt telling you what Sloane has read.

Reason: Editorial tightening within existing facts, blocking and choices.

**22. src/content/mission.ts — marcus**

Before: He excuses himself and crosses the room. You know his title from the Helix brief: director of strategic acquisitions. Until now it was possible to imagine him as the name at the bottom of a document.

After: He excuses himself and crosses the room. Marcus Chen, Helix’s director of strategic acquisitions. Yesterday you could close the file with his name on it. Now he is coming to speak to you.

Reason: Editorial tightening within existing facts, blocking and choices.

**23. src/content/mission.ts — cover**

Before: You have no memory to compare with hers. Her confidence may be care, performance or a test. You can offer a detail that conflicts with the place she just named, ask her to explain, turn the conversation toward the event, or use your presentation to make the interruption public and ordinary. Marcus is close enough to hear; other guests may notice the pause.

After: She has supplied a place and a shared memory. You have neither. Marcus is close enough to hear your answer; the pause is beginning to attract attention. You can question her, contradict the detail, or bring the conversation back into the room.

Reason: Editorial tightening within existing facts, blocking and choices.

**24. src/content/mission.ts — complete**

Before: This part of the story ends here. Your decisions, conversations, and the evidence you actually obtained remain available to review.

After: The reception continues above you. Down here, the driver waits for an address.

Reason: Editorial tightening within existing facts, blocking and choices.

**25. src/content/chapter3-evening.ts — nightComplete**

Before: You wake before the building becomes busy. The clothes lie where you left them. Nothing in the night has authorized more treatment or settled the questions you want to ask Voss.

After: You wake before the building becomes busy. The clothes lie where you left them. The questions you want to ask Voss have survived the night with you.

Reason: Editorial tightening within existing facts, blocking and choices.

**26. src/content/chapter3-evening.ts — nightComplete**

Before: Scene 2 ends here. The clinical follow-up and later Chapter 3 scenes remain ahead.

After: Outside, the first windows of the tower begin to light.

Reason: Editorial tightening within existing facts, blocking and choices.

**27. src/content/chapter3-evening.ts — nightComplete place**

Before: 06:15 · The following morning · Scene 2 complete

After: 06:15 · The following morning

Reason: Editorial tightening within existing facts, blocking and choices.

**28. src/content/chapter3-evening.ts — mayaFollowup**

Before: Sloane’s exchange has ended. The message to Maya is still unsent. Read the exact words before deciding.

After: Sloane’s exchange has ended. Maya’s reply field is still open. These are the words she would receive.

Reason: Editorial tightening within existing facts, blocking and choices.

**29. src/content/chapter3-next.ts — informationEnd place**

Before: 10:45 · Information sequence complete

After: 10:45 · Apartment

Reason: Editorial tightening within existing facts, blocking and choices.

**30. src/content/chapter3-next.ts — voss**

Before: Without another procedure, the changes already made remain. I can still assess symptoms and provide ordinary care. Another stage would need a separate decision.

After: If we do nothing further, these changes remain. I can treat symptoms and provide ordinary care. Another stage is a different decision.

Reason: Editorial tightening within existing facts, blocking and choices.

**31. src/content/chapter3-opportunity.ts — invitation**

Before: Axiom’s switchboard forwards a named business inquiry from Helix’s published executive-office line. The routing note says Helix asked for Evelynn Vale; no private number was supplied to Helix. The switchboard can relay a reply. Routing a message is not arranging the offer, and there is no delivery acknowledgment from Sloane.

After: Helix has asked Axiom’s switchboard for Evelynn Vale. The inquiry comes from its published executive-office line; your private number has not been supplied. You can answer through the switchboard. There is no acknowledgment from Sloane and nothing naming Axiom as the arranger.

Reason: Editorial tightening within existing facts, blocking and choices.

**32. src/content/chapter3-opportunity.ts — executive**

Before: Axiom can decide whether you enter its building. That need not make it the only place that pays for your judgment. The fee covers today. Anything after today requires another agreement.

After: Axiom isn’t the only place that can pay for your judgment. Today’s fee is settled in these terms. After today, we would have to agree again.

Reason: Avoid Julian knowing access suspension he may not have received.

**33. src/content/chapter3-opportunity.ts — opportunityEnd**

Before: You check the records this decision leaves with you before opening another message.

After: You check what you have kept from the exchange. Another message waits.

Reason: Editorial tightening within existing facts, blocking and choices.

**34. src/content/chapter3-autonomy.ts — marcusLeverage**

Before: You did agree to explore the question. I did not say you signed a contract. If you want the distinction appended, give me the words.

After: You agreed to explore it. That’s what I wrote. If you want the limits beside it, give me the sentence.

Reason: Editorial tightening within existing facts, blocking and choices.

**35. src/content/chapter3-autonomy.ts — truths**

Before: You return to the apartment with the records you actually obtained. The phone offers several reply routes. A document in your possession is not a document in anyone else’s hands.

After: Back at the apartment, you set out the records you brought home. Several reply threads wait on the phone. For the moment, these copies are still yours to withhold.

Reason: Editorial tightening within existing facts, blocking and choices.

**36. src/content/chapter4-entry.ts — resource**

Before: The registration form has a name field and a signature line. No employer’s countersignature. The pass is free; it covers a reading desk and ordinary public-file copies. Certified copies have separate terms.

After: A name. A signature. You look for the employer’s countersignature and find none. The free pass covers a desk and ordinary public-file copies; certification has separate terms.

Reason: Editorial tightening within existing facts, blocking and choices.

**37. src/content/chapter4-case.ts — interest**

Before: The report is finished. You close the working file and take a moment before speaking again.

After: You close the finished report. For the first time in the conversation, the next words need not be about the case.

Reason: Editorial tightening within existing facts, blocking and choices.

**38. src/content/chapter4-case.ts — outside**

Before: You let the formal review end before beginning another conversation.

After: The formal review is over. You take a moment before starting another conversation.

Reason: Editorial tightening within existing facts, blocking and choices.

**39. src/content/chapter4-case.ts — explicit attraction sent and spoken twice**

Before: I am attracted to you. Is this personal interest mutual?

After: I’m attracted to you, Julian. Am I reading this correctly?

Reason: Change BOTH exact occurrences: player sends and says the same explicit attraction. Existing mutual-interest effect remains.

**40. src/content/chapter4-power.ts — false-authority consequence reply**

Before: I also withdraw the personal invitation tonight. The completed work remains paid.

After: And I don’t want to see you privately tonight. The work is paid; that stays paid.

Reason: Editorial tightening within existing facts, blocking and choices.

**41. src/content/chapter4-power.ts — favor reply**

Before: There is a workroom free until five. I can book it for you. Just the room—no extra work attached.

After: There’s a room free until five. Let me book it for you. You’ve done the work; I’m not asking for more.

Reason: Editorial tightening within existing facts, blocking and choices.

**42. src/content/chapter5-reward.ts — home quiet reward**

Before: The reader card goes beside the packet. You can leave them there for a moment. Nobody is waiting for a report this morning.

After: The reader card goes beside the packet. Nobody is waiting for a report this morning. You can leave the folder open without racing to finish it.

Reason: Editorial tightening within existing facts, blocking and choices.

**43. src/content/chapter5-public.ts — presentation**

Before: You can make an entrance, keep things spare, or enjoy putting the look together without deciding what the evening should become.

After: There is time to decide how you want to enter the room. The rest of the evening can remain undecided.

Reason: Editorial tightening within existing facts, blocking and choices.

**44. src/content/chapter5-public.ts — glamorous look branch**

Before: You change into the black floor-length evening gown and wear the charcoal tailored jacket open over it, keeping the black low heels. You like the way the look holds together.

After: You change into the black floor-length evening gown and wear the charcoal tailored jacket open over it, keeping the black low heels. The jacket sharpens the softer line of the gown. You like the balance.

Reason: Editorial tightening within existing facts, blocking and choices.

**45. src/content/chapter5-public.ts — sensual look branch**

Before: You change into the black floor-length evening gown, keeping the black low heels. You leave the tailored jacket in the wardrobe; the open back is part of the look you want.

After: You change into the black floor-length evening gown, keeping the black low heels. Cool air touches your open back. You leave the tailored jacket in the wardrobe. You chose this much of yourself to show.

Reason: Editorial tightening within existing facts, blocking and choices.

**46. src/content/chapter5-public.ts — Aster proof**

Before: You finish the agreed sitting and review the proof at a small table away from the camera. The editor sets a pencil beside it. The publish button is still untouched.

After: The sitting is over. At a small table away from the camera, you study the proof while the editor sets down a pencil. The publish button waits for your decision.

Reason: Editorial tightening within existing facts, blocking and choices.

**47. src/content/chapter5-benefit.ts — service-julian**

Before: Seven days. No extra work. I would be glad to have a useful professional contact nearby, but that is my hope, not your agreement. Keep your public pass.

After: Seven days, no extra work. I’d be glad to have you nearby for work. You haven’t promised me that. Keep your public pass.

Reason: Editorial tightening within existing facts, blocking and choices.

**48. src/content/chapter5-benefit.ts — people**

Before: You make tea before opening the familiar threads. The people in them have had days of their own. You can send two deliberate messages, or leave the evening quiet.

After: You make tea, then open the familiar threads. Some names are easier to approach than others. There is time for two messages, or for an evening without sending either.

Reason: Editorial tightening within existing facts, blocking and choices.

**49. src/content/chapter5-desire.ts — return**

Before: The familiar chair and cabinet are where they were. Adrian’s old jacket is still on its hanger inside the wardrobe. There is room for a small decision without moving any of them.

After: The chair, the cabinet, the old jacket in the wardrobe: all where they were. You can leave one thing differently tonight without clearing the room of everything else.

Reason: Editorial tightening within existing facts, blocking and choices.

**50. src/content/chapter5-desire.ts — complete**

Before: You leave it that way for the night.

After: For tonight, you leave it that way.

Reason: Editorial tightening within existing facts, blocking and choices.
