/** Chapter 11 (Outside route, lane id `outside`) · Unclaimed:
 * layout → lobby → shelf → stairs → river → dawn → complete.
 * Design: docs/story/OUTSIDE_CHAPTER_11_UNCLAIMED_DESIGN.md (owner-approved 2026-10-01, all eight decisions as recommended);
 * script: docs/story/scripts/OUTSIDE_CHAPTER_11_SCRIPT.md. The shared "The Asset" Vesper night in Outside framing. Before it,
 * on the 02:40 phone, the sender's price: what a courier knows of the Vesper's layout (the river-side service door, the
 * kitchen stair, the reading room, the lectern) for a photograph of one catalogue page he has never seen, the first Evelyn's,
 * because she never allowed a photograph of herself (photograph it / learn it by heart / refuse; the skeptic is never
 * punished). The Vesper's first Thursday: Celeste receives her alone ("I did say bring your source"), the clients talking
 * availability, Iris Moreau, ending (warn / open / quiet). The book: her own page, E. V. (II) · REISSUED · UNCLAIMED ·
 * AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF NEXT MONTH (never moved as a punishment); Iris's page; and E. V. (I) ·
 * FOUR YEARS · RETIRED · SINGAPORE, a face that could have been hers (photograph / by heart / turn the page). Celeste's second
 * order on the stairs: a page in her own hand for the sender (pass it unread / read it first / burn it; the refusal cost falls
 * on the source, never on her body). The 02:40 call after (everything / the face only / nothing yet). A chosen night (a
 * partner from before with the consent flow; Maya; alone). Neither the sender's name nor Nell's is given. Entered from an
 * Outside `chapter10.complete`; hands on to the Ch14 bridge. Keys `out.*`, `c11.o-*`; ids carry `o11-`. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { eveningPartners7 } from './chapter7-own';

type C11Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
const get11 = (s: GameState, k: string) => s.choices['c11.' + k];
const set11 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c11.' + k] = v;
};
const key = (s: GameState, k: string) => s.choices[k];
const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
const offer = (id: string, label: string, hint: string, next: string, apply?: C11Choice['apply']): C11Choice => ({ id: 'chapter11.' + id, label, hint, next, apply });
function note(s: GameState, k: string, text: string, source: string) {
  if (get11(s, 'rec.' + k) !== undefined) return;
  set11(s, 'rec.' + k, String(s.history.length));
  set11(s, 'event.' + k, String(s.revision));
  set11(s, 'layer.' + k, 'fact');
  s.history.push({ node: `${s.scene}.${s.phase}` as NodeId, blocks: [{ kind: 'notice', text }, { kind: 'notice', text: 'Source: ' + source }] });
  s.facts.push('c11.' + k);
  s.knowledge.push('c11.' + k);
}
const SENDER = 'Unknown sender';

export const OUTSIDE_PHASES11 = ['layout', 'lobby', 'shelf', 'stairs', 'river', 'dawn'] as const;
export const isOutside11 = (s: GameState) => key(s, 'route.lane') === 'outside';
export const outsidePhase11 = (s: GameState) => isOutside11(s) && ((OUTSIDE_PHASES11 as readonly string[]).includes(s.phase) || s.phase === 'complete');

const price = (s: GameState) => key(s, 'out.price11') as 'photo' | 'heart' | 'refuse' | undefined;
const photo = (s: GameState) => key(s, 'out.photo11') as 'photo' | 'heart' | 'turned' | undefined;
const slip = (s: GameState) => key(s, 'out.slip11') as 'passed' | 'read' | 'burned' | undefined;
const give10 = (s: GameState) => key(s, 'out.give10') as 'gave' | 'doctored' | 'refused' | undefined;
type Partner = 'julian' | 'sebastian';
const partners = (s: GameState): Partner[] => eveningPartners7(s).filter((x): x is Partner => x === 'julian' || x === 'sebastian');
const partnerName: Record<Partner, string> = { julian: 'Julian Mercer', sebastian: 'Sebastian' };

export function placeOutside11(s: GameState): string | undefined {
  if (s.phase === 'layout') return '02:40 · The room over the water';
  if (s.phase === 'river') return '02:40 · The Embankment';
  const open = get11(s, 'o-night-open');
  if (s.phase === 'dawn' && open) return open.startsWith('julian') ? 'Late · Julian’s apartment' : open === 'maya' ? 'Late · Maya’s kitchen' : 'Late · A hotel round the corner from the Harbour';
}

// ── The entry ──

export function beginOutside11(): C11Choice {
  return offer('begin-outside', 'Wednesday, 02:40', 'The night before the first Thursday.', 'layout');
}

// ── The layout ──

function layoutBlocks(): Block[] {
  return [
    p('Wednesday, 02:40, the room over the water, the lamp low. The first Thursday is tomorrow, and the invitation says do bring your source, and you have nobody to bring, which is the point of a source.'),
    q(SENDER, 'She’s asked you to bring me. Don’t. You couldn’t if you tried, and I’d like you never to learn what it costs to try.'),
    q(SENDER, 'But you’re going, and I have never been past the cloakroom. So here is what a courier knows about the Vesper. The service door on the river side, which is never locked because the florists come at five. The stair behind the kitchens. The reading room, two floors up, behind a panelled door that looks like a wall. The lectern, and the book.'),
    q(SENDER, 'And I want something for it. There’s a page in that book I have never seen. The first one’s. The one before you. She never let anybody photograph her; she said a photograph is the first thing they take. I have not a single picture of her. They’ll have one.'),
    t('He says it very evenly. Too evenly, the way you say a thing you have rehearsed so that it will not break in your mouth. The first one. Not a name. A page, and a face.'),
  ];
}

function layoutChoices(): C11Choice[] {
  const l = (id: 'photo' | 'heart' | 'refuse', label: string, hint: string, body: Block[]) =>
    offer('o11-price-' + id, label, hint, 'lobby', (x) => {
      setKey(x, 'out.price11', id);
      if (id !== 'refuse') setKey(x, 'out.layout11');
      note(x, 'o-price', id === 'refuse' ? 'Evelynn refused the sender’s price (a photograph of the first Evelyn’s catalogue page) and went into the Vesper without his layout.' : 'The sender gave Evelynn what a courier knows of the Vesper’s layout in exchange for a look at the first Evelyn’s catalogue page.', 'The 02:40 phone, the night before the first Thursday');
      return body;
    });
  return [
    l('photo', 'Agree: photograph it', 'The cheap phone, hidden where a velvet bag can’t reach.', [
      q('You', 'I’ll photograph it. If I can.'),
      q(SENDER, 'They bag phones at the door. Leave the black one; they’ll expect it. Keep this one where a velvet bag can’t reach. And Evelynn, you don’t have to.'),
      p('He tells you the rest, the florists, the kitchen stair, the panelled door, in the voice of a man reciting the stations of a line he has run in his sleep for ten years. You write nothing down. You do not need to.'),
    ]),
    l('heart', 'Agree: look, and learn it by heart', 'No copy. What you see, you tell him.', [
      q('You', 'I won’t copy it. I’ll look, and I’ll tell you what I saw, all of it. It’s the only way I’ll be able to stand behind it.'),
      q(SENDER, 'That’s the rule talking.'),
      q('You', 'It’s me talking. The rule is just where I keep it.'),
      p('He gives you the layout, quietly, and when he has finished there is a pause in which you can hear him decide that this is better, and be unable to say so.'),
    ]),
    l('refuse', 'Refuse the price', 'That page is hers. You’ll go in blind.', [
      q('You', 'No. That page is hers. I won’t take it for you. You can keep your layout.'),
      q(SENDER, 'Fair. It’s your rule, and I wrote half of why you have it. You’ll go in blind.'),
      p('There is no anger in it. There is something that might be relief, and might be grief, and you cannot tell which, and you have stopped pretending that you can.'),
    ]),
  ];
}

// ── The lobby ──

function lobbyBlocks(s: GameState): Block[] {
  const g = give10(s);
  return [
    p('The Vesper on the Embankment, the first Thursday: the black glass front with no name on it, the doorman who says “Good evening, madam,” as if he has said it every night of your life, and a girl in grey who takes your black phone and puts it in a velvet bag with a number on it, and does not so much as glance at your shoes.'),
    p('The long room beyond, the frames on the walls empty and lit as if they held something. Celeste receives you at the top of it, in cream, with both hands, and then, over your shoulder, looks at the door, and the corner of her mouth moves.'),
    q('Celeste Laurent', 'Alone, darling. I did say bring your source. I should have known you’d come with only yourself. It’s the most expensive thing you own.'),
    ...(g === 'gave'
      ? [q('Celeste Laurent', 'Thank you for the other Friday. He was very careful to be somewhere else. I do wonder who told him.')]
      : g === 'doctored'
        ? [q('Celeste Laurent', 'Pier Nine, darling. My man stood there from three until six. He’s sent me a quite remarkable postcard. I’m delighted. I do so like a girl with a sense of humour.')]
        : [q('Celeste Laurent', 'You wouldn’t give him up. I find I admire that, and I shall make you pay for it, in good time, and in the way that suits us both.')]),
    p('And then the clients, in their black ties and their good jewellery, talking pleasantly over your head about placements and seasons and availability, about “the Unclaimed piece”, as though you were a lot in a sale, which you are, and as though nobody had yet thought to buy.'),
    p('At a quarter past nine, in the powder room, a woman at the next mirror in grey silk, perhaps thirty-five, very still, meets your eyes in the glass.'),
    q('Iris Moreau', 'They put you on the list too. Though I notice yours has no name on it. That’s either the best thing in this house or the most dangerous.'),
    p('Iris Moreau. Halvorsen’s chief of staff, four years. She says it the way you would say a rank. And she looks at you in the mirror, and you look at her, and neither of you says the other word, the one underneath.'),
  ];
}

function lobbyChoices(): C11Choice[] {
  const i = (id: 'warned' | 'open' | 'quiet', label: string, hint: string, body: Block[]) =>
    offer('o11-iris-' + id, label, hint, 'shelf', (x) => {
      set11(x, 'o-iris', id);
      setKey(x, 'out.iris11', id);
      return body;
    });
  return [
    i('warned', '“Your page says ending.”', 'She should hear it first.', [q('You', 'I haven’t seen the book yet. But I think your page says ending. You should hear it from somebody first.'), p('She closes her eyes for a count of three, and opens them, and finishes her lipstick with a hand that does not shake.'), q('Iris Moreau', 'Thank you. Nobody ever tells you first.')]),
    i('open', '“I’m off the books.”', 'Nobody’s name on you. Say so.', [q('You', 'I’m off every book I was ever on. Nobody’s name on me but my own. It’s lonely, and it’s the only page I’ve got that isn’t a sentence.'), q('Iris Moreau', 'Then you’re the first woman in this house who’s ever told me anything true. Don’t let her hear that you did.')]),
    i('quiet', 'Say nothing', 'Let the mirror say it.', [p('You say nothing. She says nothing. In the mirror you are two women in good dresses, and the mirror says the rest.')]),
  ];
}

// ── The shelf: the book ──

function shelfBlocks(s: GameState): Block[] {
  const layout = key(s, 'out.layout11');
  return [
    p(layout ? 'You go up by the kitchen stair, as he told you, past a florist’s van and a girl with an armful of white lilies who does not look up, and find the panelled door that looks like a wall, and it is not locked, because nobody has ever tried it who did not belong.' : 'You find it the slow way: a corridor, a door that is a door, a second that is a wall until you put your hand flat on the panelling and it gives. It takes you eleven minutes and two wrong turns. Nobody stops you. In this house nobody would think to.'),
    p('The reading room. It smells of beeswax and old paper. There is a chair nobody sits in, a window over the river with the curtains open, and a lectern under one lamp like an altar, with one book on it, bound in grey cloth: The Autumn Collection. Pages of photographs and neat type, the way a gallery catalogues a sale.'),
    p('Iris’s page: I. M. · HALVORSEN · FOUR YEARS · ENDING. And yours, three pages on, the photograph from a file you never saw, and under it, in the same neat type as everybody else’s:'),
    q('The page', 'E. V. (II) · REISSUED · UNCLAIMED · AVAILABLE FOR PLACEMENT FROM THE FIRST THURSDAY OF NEXT MONTH.'),
    p('And behind yours, one leaf back, where it is easy to miss and impossible to forget once you have not: a page with a photograph, and a face.'),
    p('A woman of about thirty with short dark hair, looking straight into the lens as if she knew exactly what it was for and had decided to let it have her anyway. Not your face. A face you could have grown into if the clinic had been kinder to the cheekbones. Under it, in neat type:'),
    q('The page', 'E. V. (I) · FOUR YEARS · RETIRED · SINGAPORE.'),
    t('Four years. That is how long they last, in the book. Iris is at four. She is the one before me, and I am the one after her, and there is a woman between us in this house whose face I have never seen until a minute ago, and whom the man on the phone has not seen at all.'),
  ];
}

function shelfChoices(s: GameState): C11Choice[] {
  const ph = (id: 'photo' | 'heart' | 'turned', label: string, hint: string, body: Block[]) =>
    offer('o11-page-' + id, label, hint, 'stairs', (x) => {
      set11(x, 'o-page', id);
      setKey(x, 'out.photo11', id);
      return body;
    });
  return [
    ph('photo', 'Photograph the page', price(s) === 'photo' ? 'Your word to him. The cheap phone, from your shoe.' : 'The cheap phone, from your shoe. It’s a gamble.', [
      p('You take the cheap phone out of your shoe with the lamp behind you and your back to the door, and photograph the page, twice, the way Adrian photographed documents he had no right to, with the shutter turned down to a whisper and the flash held under your thumb. The face is on the little screen, small and clear.'),
      p('You put the phone back in your shoe, and straighten, and look at her once more, with your own eyes, and do not take the book’s word for her. You will take her face. It is hers, and it is the only one anybody has.'),
    ]),
    ph('heart', 'Learn it by heart', 'No copy. The face, the type, the hand of the printer.', [p('You do not touch the phone. You stand at the lectern for as long as you dare, the length of three breaths, and learn her: the line of the jaw, the left eyebrow a fraction higher than the right, the way the lamp finds one side of her face. You will be able to draw it. You will be able to say it. You will not be able to prove it, and that is, you decide, the point.')]),
    ph('turned', 'Turn the page', 'That face is hers. Not yours to take.', [p('You turn the page, gently, back to your own, as if the other had been a mistake, and stand with your hand flat on the grey cloth until your pulse comes down. You saw her. It will have to be enough. A woman is not a lead.')]),
  ];
}

// ── The stairs: the second order ──

function stairsBlocks(): Block[] {
  return [
    p('On the way down, on the first-floor landing, under the long window that looks over the river, Celeste is waiting. Not as if she had followed you. As if the stair were hers and you had come to stand in it.'),
    q('Celeste Laurent', 'A small thing, darling.'),
    p('She holds out a cream envelope, sealed, no name on the front, a single line of green ink where the flap meets the paper.'),
    q('Celeste Laurent', 'A page, in my own hand, for your friend. Slip it into the next thing you send him. He reads everything written to him, you’ll find. It’s the thing about lonely men.'),
    t('She has done this before. She knows exactly what he reads. She does not know his name, or she would not need me for the post.'),
  ];
}

function stairsChoices(): C11Choice[] {
  const o = (id: 'passed' | 'read' | 'burned', label: string, hint: string, body: Block[]) =>
    offer('o11-slip-' + id, label, hint, 'river', (x) => {
      setKey(x, 'out.slip11', id);
      note(x, 'o-slip', 'Celeste Laurent gave Evelynn a sealed page in her own hand to pass on to the sender.', 'The Vesper, the first-floor landing');
      return body;
    });
  return [
    o('passed', 'Take it, unopened', 'Hand it on as she asked. Don’t read his post.', [p('You take it, and put it inside your coat, and do not look at it, because you do not read other people’s post, and because you have decided to let him decide what a thing from her weighs.'), q('Celeste Laurent', 'Good girl. He’ll read it twice.')]),
    o('read', 'Take it, open it on the stairs, then tell him', 'She’ll see. It’s your rule: nothing you haven’t checked.', [
      p('You take it, and slit the flap with a thumbnail in front of her, and she lets you, with a small, interested smile, as if you had finally done the thing she hired you for. One line, in the looping green hand:'),
      q('The page', 'You were never going to be on the ferry. I’m sorry about that. — C.'),
      t('A ferry. I have no idea what ferry. The page says she is sorry, and Celeste has never been sorry in her life, which is how I know the page is a hook, and who it is baited for.'),
      p('You fold it back along its creases, and put it away, and she watches you do it with open pleasure.'),
    ]),
    o('burned', 'Burn it', 'Refuse the errand. The cost is his.', [
      p('You take the envelope, and carry it to the little brass ashtray by the lift, and set a match to the corner of it, and watch the green ink curl, and say nothing at all. Celeste watches too.'),
      q('Celeste Laurent', 'Then I shall find another way, darling. I’m not nearly so gentle in the other ways. You’ll want to tell him that.'),
    ]),
  ];
}

// ── The river: the 02:40 call ──

function riverBlocks(s: GameState): Block[] {
  const ph = photo(s);
  const sl = slip(s);
  return [
    p('Two hours later, the Embankment, a bench under a sodium lamp, the river doing its slow black work below. You have not gone home. At 02:40, as it always does, the cheap phone rings.'),
    q(SENDER, 'You’re out. Good. Tell me.'),
    ...(ph === 'photo'
      ? [t('The photograph is in my shoe. Two frames, small and clear. A woman looking straight into a lens. I could send it with a thumb.')]
      : ph === 'heart'
        ? [t('I have her by heart, every line. I could say it down the phone in a minute. I could not prove a word.')]
        : [t('I saw her, and I turned the page. Whatever he wants from me, he does not get a woman by the pound.')]),
    ...(sl === 'read' ? [t('And the line. You were never going to be on the ferry. I don’t know what it means. I think he will.')] : sl === 'burned' ? [t('And the ashes of a page I didn’t let him read. Whether that was a kindness or a theft, I will be arguing with myself for weeks.')] : [t('And a sealed page in my coat, from her, for him, which I am carrying like a hot coal in a glove.')]),
  ];
}

function riverChoices(s: GameState): C11Choice[] {
  const ph = photo(s);
  const sl = slip(s);
  const r = (id: 'all' | 'face' | 'nothing', label: string, hint: string, body: Block[]) =>
    offer('o11-river-' + id, label, hint, 'dawn', (x) => {
      set11(x, 'o-river', id);
      if (id === 'all') setKey(x, 'out.told11');
      if (id !== 'nothing') note(x, 'o-face', 'Evelynn saw the first Evelyn’s catalogue page and told the sender what was on it. He had never seen a photograph of her.', 'The 02:40 call, the Embankment');
      return body;
    });
  const faceBody: Block[] =
    ph === 'photo'
      ? [p('You send it, from the bench, with your thumb, and wait. There is a long, long silence on the line, in which you can hear a man who has not breathed properly for some time begin to.'), q(SENDER, 'That’s her.'), p('Then, much lower, not to you:'), q(SENDER, 'She’s laughing at something. Just before. She always did, just before they took it, to give them nothing. That’s — thank you. I’ll never ask you for anything again. That’s a lie. But I’ll never ask for the same thing.')]
      : ph === 'heart'
        ? [p('You tell him: the short dark hair, the left eyebrow a fraction higher than the right, the way she looked straight into the lens as if she knew exactly what it was for. You say it slowly, and he does not interrupt, and at the end there is a sound on the line that is not a word.'), q(SENDER, 'The eyebrow. Yes. That’s — yes. You couldn’t have made that up. Thank you.')]
        : [p('You tell him that you saw her, and that you turned the page, and that you are sorry, and that you will not take a face that is not yours to take.'), q(SENDER, 'Don’t be sorry. I asked too much. Thank you for seeing her. Somebody should have.')];
  const pageBody: Block[] =
    sl === 'read'
      ? [q('You', 'She gave me a page, for you. I read it. “You were never going to be on the ferry. I’m sorry about that. C.”'), p('The line is silent for so long that you take the phone from your ear to be sure it has not gone dead.'), q(SENDER, 'Read it to me again.'), q('You', 'You were never going to be on the ferry.'), q(SENDER, 'She knew. She knew about the — burn it. No. Keep it. I want it somewhere I can’t send anybody to fetch it. Thank you. Don’t carry anything of hers to me again.')]
      : sl === 'burned'
        ? [q('You', 'She gave me a page for you. I burned it. She says she’ll find another way.'), q(SENDER, 'She will. I’d have read it. I’d have walked straight into it, I think. Thank you for not letting me. Nobody has ever stood between me and a page of hers before.')]
        : [q('You', 'She gave me a sealed page for you. I haven’t read it.'), q(SENDER, 'Leave it on the third step. I’ll read it where she can’t see me read it. And Evelynn — you didn’t have to tell me you’d got it.')];
  return [
    r('all', 'Give him everything', ph === 'photo' ? 'The face, and her page.' : 'What you saw, and her page.', [...faceBody, ...pageBody]),
    r('face', 'Give him the face', 'Only that. Keep her page to yourself for now.', faceBody),
    r('nothing', 'Tell him nothing yet', 'It’s been a night. Hold it all.', [p('You tell him it went well enough, and that you are tired, and that you will tell him tomorrow. The line is quiet for a moment, and then he says “Tomorrow,” in the tone of a man who is going to wait up for it.')]),
  ];
}

// ── The dawn: the night ──

function dawnChoices(s: GameState): C11Choice[] {
  const open = get11(s, 'o-night-open');
  const done = (id: string, label: string, hint: string, body: Block[]) =>
    offer('o11-night-' + id, label, hint, 'complete', (x) => {
      set11(x, 'o-night', id);
      return body;
    });
  if (open && !open.endsWith('-room') && open !== 'maya') {
    const pt = open as Partner;
    const sc = (id: 'no-sex' | 'sex', label: string, hint: string) =>
      offer('o11-' + pt + '-' + id, label, hint, 'dawn', (x) => {
        set11(x, 'o-night-open', pt + '-room');
        set11(x, 'o-night-scope', id);
        note(x, 'o-evening-consent', `Evelynn chose the evening’s scope (${id}); ${partnerName[pt]} agreed to the same scope. Either may stop at any time.`, 'Evelynn’s stated choice and his explicit agreement');
        return [q(partnerName[pt], id === 'sex' ? 'Yes. And you say stop, it stops. The same for me.' : 'Then that’s tonight. You set the edge, and I stay on my side of it.')];
      });
    return [
      sc('no-sex', 'Stay, but not sex tonight', 'Kissing, touch, and stopping where you choose.'),
      sc('sex', 'Stay the night with him', 'Your stated choice. Either of you can stop at any time. The scene fades.'),
      offer('o11-leave', 'Say goodnight', 'Leaving is complete and respected.', 'complete', (x) => {
        delete x.choices['c11.o-night-open'];
        set11(x, 'o-night-outcome', 'declined');
        return [p('You say goodnight at his door and mean it, and he lets you go without a question.')];
      }),
    ];
  }
  if (open === 'maya')
    return [
      offer('o11-maya-stay', 'Stay and talk it through', 'Half the truth, and a bottle.', 'complete', (x) => {
        set11(x, 'o-night-outcome', 'maya');
        delete x.choices['c11.o-night-open'];
        return [p('You tell her the half you can, and she pours, and nobody writes anything down. At four she falls asleep on the sofa under the cat, and you cover her with your coat, and sit up, and watch the window grey.')];
      }),
    ];
  if (open && open.endsWith('-room')) {
    const pt = open.replace('-room', '') as Partner;
    const scp = get11(s, 'o-night-scope') as 'no-sex' | 'sex';
    return [
      offer('o11-stop', 'Stop here', 'Honoured immediately, without argument.', 'complete', (x) => {
        delete x.choices['c11.o-night-open'];
        set11(x, 'o-night-outcome', 'withdrawn');
        return [p('You put a hand flat on his chest and he stops at once, and says “Of course,” and holds you instead.')];
      }),
      offer('o11-stay', 'Stay', 'Continue within what you chose.', 'complete', (x) => {
        delete x.choices['c11.o-night-open'];
        set11(x, 'o-night-outcome', 'intimate-' + scp);
        return scp === 'sex'
          ? [p(pt === 'julian' ? 'He kisses you against the window and the night goes off you like a coat, and he asks once more, his mouth at your shoulder, and you answer by drawing him toward the bedroom.' : 'He kisses you, and then not only that. When he asks once more, low, whether you are sure, you answer by drawing him down with you.'), p('What happens next is yours and his, in a room that nobody has catalogued. The scene fades.')]
          : [p('He kisses you by the window and stops exactly where you said, and holds you there, and in your shoe, on the floor by the chair, the cheap phone is silent, and you let it be.')];
      }),
    ];
  }
  return [
    ...partners(s).map((pt) =>
      offer('o11-night-' + pt, pt === 'julian' ? 'Julian' : 'Sebastian', 'His place. Off the grid.', 'dawn', (x) => {
        set11(x, 'o-night', pt);
        set11(x, 'o-night-open', pt);
        return [q(partnerName[pt], 'I saw the papers, and I know where you were. Come in. Tell me what you want tonight, and that’s what happens.')];
      }),
    ),
    ...(key(s, 'c6.maya') === 'restored'
      ? [offer('o11-night-maya', 'Maya', 'She’ll see it in your face.', 'dawn', (x) => {
          set11(x, 'o-night', 'maya');
          set11(x, 'o-night-open', 'maya');
          return [p('Maya’s kitchen at four, a bottle, the cat on the tax return.'), q('Maya', 'You’ve been somewhere with a lot of mirrors. Sit. Tell me the half you can.')];
        })]
      : []),
    done('alone', 'Alone', 'The river, and a face by heart.', [p('You sit up alone in the room over the water with the lamp off and the window grey, and you draw her, from memory, on the back of an envelope: the jaw, the eyebrow, the straight look. It is not good. It is the only likeness of her you will ever make. You pin it to the wall, under the three pencilled stones, without a name.')]),
  ];
}

// ── The card ──

function completeBlocks(s: GameState): Block[] {
  const ph = photo(s);
  const sl = slip(s);
  return [
    ...(get11(s, 'o-night-outcome')?.startsWith('intimate') ? [p('You get back to the room over the water at dawn. The cheap phone has one message on it, from the one contact: a single word, THANK YOU. You do not answer it. You do not delete it.')] : []),
    p('The wall over the table. A new card, beside CELESTE LAURENT, in capitals:'),
    q('The card', 'THE VESPER. UNCLAIMED. AVAILABLE FROM THE FIRST THURSDAY.'),
    p(ph === 'photo' ? 'Under it, pinned: a small print, from the cheap phone, a woman laughing at something just off the lens: E. V. (I). FOUR YEARS. RETIRED.' : ph === 'heart' ? 'Under it: E. V. (I). FOUR YEARS. RETIRED. And, in pencil, small, for nobody’s eyes: I HAVE HER BY HEART.' : 'Under it: E. V. (I). FOUR YEARS. RETIRED. And, in pencil: I TURNED THE PAGE.'),
    p(sl === 'passed' ? 'And beside it: PASSED. UNOPENED.' : sl === 'read' ? 'And beside it: YOU WERE NEVER GOING TO BE ON THE FERRY.' : 'And beside it: BURNED.'),
    ...(key(s, 'out.told11') ? [p('And under that, in pencil: HE KNOWS.')] : []),
    t('Four years is what they last, in the book. Iris at four. The one before me at four. I am wearing the third name on the page, and I have no client, and no handler, and the only thing Celeste Laurent cannot put a price on is a woman nobody has claimed.'),
  ];
}

export function outsideBlocks11(s: GameState): Block[] {
  if (s.phase === 'layout') return layoutBlocks();
  if (s.phase === 'lobby') return lobbyBlocks(s);
  if (s.phase === 'shelf') return shelfBlocks(s);
  if (s.phase === 'stairs') return stairsBlocks();
  if (s.phase === 'river') return riverBlocks(s);
  if (s.phase === 'dawn') return [p('Before dawn.')];
  if (s.phase === 'complete') return completeBlocks(s);
  return [];
}

export function outsideChoices11(s: GameState): C11Choice[] {
  if (s.phase === 'layout') return layoutChoices();
  if (s.phase === 'lobby') return lobbyChoices();
  if (s.phase === 'shelf') return shelfChoices(s);
  if (s.phase === 'stairs') return stairsChoices();
  if (s.phase === 'river') return riverChoices(s);
  if (s.phase === 'dawn') return dawnChoices(s);
  return [];
}
