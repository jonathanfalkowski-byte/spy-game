import type { GameState } from './schema';

export type PressureSource = 'lookup' | 'warning' | 'access';
export function pressureSource(s: GameState): PressureSource {
  const entry = s.ledger.find((e) => e.action.type === 'CONTINUE_CHAPTER3')?.sequence;
  if (!entry) return 'access';
  const actionAt = (n: number, type: string, id: string) =>
    s.ledger.some(
      (e) =>
        e.sequence === n &&
        e.action.expectedRevision === n - 1 &&
        e.action.type === type &&
        'id' in e.action &&
        e.action.id === id &&
        n < entry,
    );
  const chain = (key: string, source: string, recordKey: string, recordSource: string) => {
    const exposure = s.day.exposure.find((e) => e.key === key && e.source === source);
    const receipt = s.npcs.sloane.known.find((e) => e.key === key && e.source === source);
    const record = s.day.records.find(
      (e) => e.key === recordKey && e.layer === 'fact' && e.source === recordSource,
    );
    return exposure &&
      receipt &&
      record &&
      record.event === exposure.event &&
      exposure.event <= receipt.event &&
      actionAt(receipt.event, 'DAY_CHOOSE', 'intro.' + s.day.intro)
      ? { exposure, receipt }
      : undefined;
  };
  const lookup = chain(
    'voss_lookup',
    '12:14 personnel-directory access log: Maya queried Voss',
    'maya_lookup',
    'Displayed personnel access log',
  );
  const disclosure = s.ledger.find(
    (e) => e.action.type === 'CHOOSE_DIALOGUE' && e.action.id === 'disclosure.voss',
  );
  if (
    lookup &&
    s.choices.disclosure === 'disclosure.voss' &&
    disclosure &&
    disclosure.sequence < lookup.exposure.event &&
    lookup.exposure.event === lookup.receipt.event &&
    s.npcs.maya.known.some(
      (k) =>
        k.key === 'voss_connection' &&
        k.source === 'Adrian discloses the personnel match' &&
        k.event === disclosure.sequence,
    ) &&
    s.npcs.maya.known.some(
      (k) =>
        k.key === 'voss_directory_queried' &&
        k.source === 'Maya’s own 12:14 lookup after her promise over coffee' &&
        k.event === lookup.exposure.event,
    )
  )
    return 'lookup';
  const warning = chain(
    'warning',
    'Officers record the delivered warning and recipient in the incident log',
    'maya_warning',
    'Phone delivery receipt witnessed by officers',
  );
  if (
    warning &&
    s.day.security === 'maya' &&
    actionAt(warning.exposure.event, 'DAY_CHOOSE', 'security.maya') &&
    s.npcs.maya.known.some(
      (k) =>
        k.key === 'SECURITY HAS ME. THEY ARE TAKING ME TO EXECUTIVE INTELLIGENCE.' &&
        k.source === 'Delivered warning before phone surrender' &&
        k.event === warning.exposure.event,
    )
  )
    return 'warning';
  return 'access';
}

/** Maya has heard the post-clinic voice call itself Adrian (the Scene 2 call or the 06:45 call). She may
 * not know what changed, but she will know that voice across a counter. */
export const mayaHeardNewVoice = (s: GameState) =>
  s.npcs.maya.known.some((k) =>
    ['Evelynn’s delivered Scene 2 call on the monitored phone', 'Delivered 06:45 call'].includes(k.source),
  );

export const mayaKnowsAdaptation = (s: GameState) =>
  s.npcs.maya.known.some(
    (k) =>
      (k.source === 'Adrian’s delivered recovery message to Maya' &&
        k.key.includes('The treatment has changed my body')) ||
      ([
        'Evelynn’s delivered Scene 2 call on the monitored phone',
        'Evelynn’s delivered Scene 2 message on the monitored phone',
      ].includes(k.source) &&
        k.key === identityDisclosure),
  );
export const identityDisclosure =
  'The treatment changed my body and voice. Axiom calls the identity Evelynn Vale. I am the person you knew as Adrian. I have not authorized another stage.';
export const homeDisclosure =
  'I am back in my apartment. I cannot explain the operation on this monitored phone.';
