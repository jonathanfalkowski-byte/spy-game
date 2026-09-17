import type { GameState } from '../../../state/schema';
import { get5, julian5 } from './chapter5-model';
import { wardrobe5 } from './chapter5-continuity';

/** Ordered production specification, NOT an asset selector. Each anchor must be reached
 * before a future presenter may show its shot. Current Chapter 5 displays no scene art.
 * Call with the state BEFORE the recorded action; later state must never backfill props.
 */
export function harbourShotPlan5(before: GameState, action: string) {
  if (
    before.contentRevision !== 16 ||
    before.scene !== 'chapter5' ||
    before.phase !== 'room' ||
    get5(before, 'harbour-position') !== 'programme-table'
  )
    return [];
  const wardrobe = Object.values(wardrobe5).find((w) => w.id === get5(before, 'wardrobe'));
  if (!wardrobe || wardrobe.id === 'c05.daytime') return [];
  const presentation = get5(before, 'presentation');
  if (
    !presentation ||
    !Object.hasOwn(wardrobe5, presentation) ||
    wardrobe5[presentation as keyof typeof wardrobe5].id !== wardrobe.id
  )
    return [];
  const event = get5(before, 'event');
  if (event !== 'attend' && event !== 'decline') return [];
  const time = event === 'attend' ? '18:30–19:15' : '15:00–15:45';
  const shot = (
    id: string,
    anchor: string,
    position: string,
    physical: string[],
    props: string[] = [],
  ) => ({
    id: 'c05.s06.' + id,
    anchor,
    position,
    physical,
    wardrobe: wardrobe.id,
    event,
    time,
    props,
    // Only actual prior publication can appear in an earlier shot of a later action.
    priorProgrammePage: !!get5(before, 'event-photo'),
  });
  const table = () =>
    shot('shot13-return', 'return to the table', 'programme-table', ['evelynn', 'host']);
  if (action === 'leave-room')
    return [
      shot('shot10', 'leave Harbour', 'exit', ['evelynn']),
      {
        ...shot(
          'shot16-home',
          'put the programme and guest card on the table',
          'apartment-table',
          ['evelynn'],
          ['programme', 'guest-card'],
        ),
        time: 'After the chosen Harbour visit, same day',
      },
      {
        ...shot(
          'shot17-hung',
          'hang your selected outfit for the morning',
          'apartment-wardrobe-crop',
          [],
          ['selected-outfit-on-hanger'],
        ),
        time: 'Later the same day, before sleep',
      },
    ];
  const id = action.replace(/^attention-/, '');
  if (Number(get5(before, 'attention') ?? 0) >= 2 || get5(before, 'attention-' + id)) return [];
  if (['coffee', 'flirt'].includes(id) && !julian5(before)) return [];
  switch (id) {
    case 'network':
    case 'status':
      return [
        shot(
          'shot03-editor',
          'introduce yourself / ask for the address',
          'programme-table-editor-end',
          ['evelynn', 'editor'],
        ),
      ];
    case 'conversation':
      return [shot('shot04-host', 'follow the host', 'near-wall', ['evelynn', 'host']), table()];
    case 'observe':
      return [
        shot('shot11-observe', 'look at the works along the near wall', 'near-wall', ['evelynn']),
        table(),
      ];
    case 'photo':
      return [
        shot(
          'shot05-photo',
          'camera so you can review it',
          'programme-table',
          ['evelynn', 'host', 'photographer'],
          ['unpublished-camera-frame'],
        ),
        shot(
          'shot06-page',
          'published programme page',
          'programme-table',
          ['evelynn', 'host'],
          ['authorized-programme-page'],
        ),
      ];
    case 'coffee':
      return [
        shot(
          'shot07-message',
          'Julian · reply',
          'programme-table',
          ['evelynn', 'host'],
          ['axiom-phone'],
        ),
        shot(
          'shot14-wait',
          'wait outside the entrance',
          'outside-entrance',
          ['evelynn'],
          ['coffee'],
        ),
        shot(
          'shot12-entrance',
          'Julian arrives',
          'outside-entrance',
          ['evelynn', 'julian'],
          ['coffee'],
        ),
        shot(
          'shot15-departed',
          'says goodbye and leaves',
          'outside-entrance',
          ['evelynn'],
          ['coffee'],
        ),
        { ...table(), anchor: 'go back inside to the host' },
      ];
    case 'flirt':
      return [
        shot(
          'shot09-thread',
          'Julian · reply',
          'programme-table',
          ['evelynn', 'host'],
          ['axiom-phone'],
        ),
      ];
    default:
      return []; // enjoyment/thought/dialogue holds the current valid composition
  }
}
