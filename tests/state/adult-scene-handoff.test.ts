import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { characters } from '../../src/content/characters';
import { adultEligibility, type Character } from '../../src/content/character-schema';
import { atOffer, day } from '../day-helpers';
import { missionStart, runMission } from '../mission-helpers';
import { nodeOf, replay } from '../../src/state/reducer';
import { deriveConsequences } from '../../src/state/consequences';
import { encodeSave, decodeSave } from '../../src/persistence/saves';
import {
  createHandoffWorkspace,
  productionOutcomes,
  hashContract,
  type HandoffWorkspace,
} from '../../src/narrative/adult-scenes/handoff';
import { validateDraft, MAX_DRAFT_BYTES } from '../../src/narrative/adult-scenes/validation';
import { createEditorialDesk } from '../../src/narrative/adult-scenes/assets';
import {
  type AdultSceneSpec,
  type OutcomeContract,
  type HandoffPolicy,
  type AdultSceneDraft,
  AgencyContextSchema,
} from '../../src/narrative/adult-scenes/schema';

// Isolated fictional production fixtures reuse stable ID types, not production characterization.
// They are never registered as a game scene or an encounter for any existing NPC.
const state = atOffer('maya');
const fixtureCanon: Character[] = characters.map((c) => ({
  ...structuredClone(c),
  displayName:
    c.id === 'player-character'
      ? 'Fixture Adult A'
      : c.id === 'daniel'
        ? 'Fixture Adult B'
        : c.displayName,
}));
function fixture() {
  const observation = state.npcs.daniel.known[0];
  const leverage = deriveConsequences(state).leverage[0];
  const agency = (characterId: 'player-character' | 'daniel', withdrawn: boolean) => ({
    characterId,
    sourceId: withdrawn ? 'agency-stop' : 'agency-start',
    willingness: 'unknown' as const,
    authorization: {
      status: withdrawn ? ('revoked' as const) : ('granted' as const),
      scope: 'The agreed fictional interaction at this beat only',
      sourceId: withdrawn ? 'agency-stop' : 'agency-start',
    },
    refusal: 'not-established' as const,
    withdrawal: withdrawn ? ('expressed' as const) : ('not-established' as const),
    participation: withdrawn ? ('none' as const) : ('compliance' as const),
    pressures: [],
    fear: 'unknown' as const,
    resistance: 'not-established' as const,
  });
  const outcome: OutcomeContract = {
    canonicalOutcomeId: 'fixture-outcome',
    outcomeVersion: 1,
    sceneId: 'fixture-private',
    sceneVariantId: 'fixture-v1',
    entryNode: nodeOf(state),
    aftermathId: 'fixture-aftermath',
    participants: [{ characterId: 'player-character' }, { characterId: 'daniel' }],
    authoredFacts: [
      {
        id: 'fixture-start',
        kind: 'agency',
        summary: 'Fixture-only authored authorization at entry; willingness remains unknown.',
      },
      {
        id: 'fixture-stop',
        kind: 'agency',
        summary: 'Fixture-only withdrawal before the final exchange.',
      },
      { id: 'fixture-intel', kind: 'disclosure', summary: 'The fictional archive opens at nine.' },
    ],
    sources: [
      { id: 'agency-start', reference: { kind: 'authored-fact', factId: 'fixture-start' } },
      { id: 'agency-stop', reference: { kind: 'authored-fact', factId: 'fixture-stop' } },
      { id: 'intel', reference: { kind: 'authored-fact', factId: 'fixture-intel' } },
      { id: 'career', reference: { kind: 'player-knowledge', key: 'adrian_career', event: 0 } },
      {
        id: 'observation',
        reference: {
          kind: 'observation',
          observation: { characterId: 'daniel', layer: 'known', ...observation },
        },
      },
      { id: 'power-01', reference: { kind: 'leverage', recordId: leverage.id } },
    ],
    entryState: ['career', 'power-01'],
    exitState: ['career', 'power-01', 'intel'],
    requiredFacts: ['intel'],
    requiredBeats: ['conversation', 'omitted-section', 'withdrawal', 'aftermath'].map((id, i) => ({
      id,
      direction: [
        'A private conversation begins.',
        'A non-graphic fade-to-black marker.',
        'The authored withdrawal is acknowledged.',
        'The stated information is delivered; end at the boundary.',
      ][i],
      classification: i >= 2 ? 'withdrawn' : 'unspecified',
      agency: [agency('player-character', i >= 2), agency('daniel', false)],
      sourceIds: [i >= 2 ? 'agency-stop' : 'agency-start'],
    })),
    informationDisclosures: [
      {
        id: 'archive-time',
        from: 'daniel',
        to: ['player-character'],
        beatId: 'omitted-section',
        factId: 'intel',
        epistemicStatus: 'attributed-claim',
      },
    ],
    presentations: ['fade_to_black', 'mature', 'explicit_external'].map((variant) => ({
      variant: variant as 'fade_to_black' | 'mature' | 'explicit_external',
      omittedBeatIds: variant === 'fade_to_black' ? ['omitted-section'] : [],
      disclosureDelivery: [
        {
          disclosureId: 'archive-time',
          via: variant === 'fade_to_black' ? 'summary' : 'scene',
          ...(variant === 'fade_to_black' ? { summaryFactId: 'intel' } : {}),
        },
      ],
    })),
  };
  const policy: HandoffPolicy = {
    specificationVersion: 1,
    writerFacts: [
      {
        id: 'intel',
        sourceId: 'intel',
        text: 'Fixture Adult B says the fictional archive opens at nine. This remains a claim.',
        visibility: 'may-reveal',
      },
    ],
    participantKnowledge: [
      { characterId: 'player-character', sourceIds: ['career'] },
      { characterId: 'daniel', sourceIds: ['observation'] },
    ],
    narrativeGrants: [],
    doNotReveal: [
      {
        category: 'leverage-source',
        directive: 'Do not reveal the private source of the staging constraint.',
        factId: 'power-01',
      },
    ],
    additionalForbiddenChanges: [],
    visiblePowerDirection: ['Keep the private conversation restrained.'],
    language: 'en',
    scenePurpose: 'A non-graphic offline contract test, not production canon.',
  };
  return { outcome, policy, catalog: structuredClone(fixtureCanon) };
}
function setup() {
  const f = fixture();
  const workspace = createHandoffWorkspace(state, f.outcome, f.policy, f.catalog);
  const spec = workspace.issue('fade_to_black');
  const draft: AdultSceneDraft = {
    sceneId: spec.sceneId,
    variantId: spec.sceneVariantId,
    specificationHash: spec.specificationHash,
    canonicalOutcomeHash: spec.outcomeHash,
    presentationVariant: 'fade_to_black',
    prose: '[Non-graphic fixture summary.] The conversation ends.',
    beatCoverage: spec.requiredBeats.map((b) => ({ beatId: b.id, assertion: 'covered' })),
    writerMetadata: { name: 'Fixture writer', source: 'Non-graphic test fixture' },
  };
  return { ...f, workspace, spec, draft };
}
const decision = {
  status: 'approved',
  reviewer: {
    name: 'Fixture editor',
    source: 'Explicit test decision, not a real editorial review',
    date: '2026-09-15',
  },
};
const metadata = { assetId: 'fixture-asset', version: 1, file: 'narrative/approved/fixture.txt' };
function approve(s: { workspace: HandoffWorkspace; spec: AdultSceneSpec; draft: AdultSceneDraft }) {
  const desk = createEditorialDesk();
  const review = desk.submitForReview(s.draft, s.spec, s.workspace);
  desk.recordDecision(review.reviewId, decision);
  const asset = desk.publish(review.reviewId, metadata, s.draft, s.spec, s.workspace);
  return { desk, asset, review };
}

describe('offline handoff boundary', () => {
  it('has no production outcomes and does not use Maya as a fixture participant', () => {
    expect(productionOutcomes).toEqual([]);
    expect(setup().spec.participants.map((p) => p.characterId)).toEqual([
      'player-character',
      'daniel',
    ]);
  });
  it.each(['unknown', 'minor', 'presented'] as const)(
    'requires canonical adulthood, rejecting %s',
    (status) => {
      const f = fixture();
      const c = f.catalog.find((c) => c.id === 'daniel')!;
      if (status === 'unknown') delete c.canon.age;
      else
        c.canon.age = {
          years: status === 'minor' ? 17 : 30,
          status: status === 'presented' ? 'presented' : 'established',
          source: 'Fixture-only age',
        };
      expect(adultEligibility(c)).not.toBe('adult');
      expect(() => createHandoffWorkspace(state, f.outcome, f.policy, f.catalog)).toThrow(
        /adulthood/,
      );
    },
  );
  it('preserves Evelynn display and rejects cover-age substitution or a fabricated persona binding', () => {
    const mission = runMission(missionStart(), {}, 'celesteReply');
    const f = fixture();
    f.outcome.entryNode = nodeOf(mission);
    f.outcome.sources = f.outcome.sources.filter((s) => s.id !== 'power-01');
    f.outcome.entryState = ['career'];
    f.outcome.exitState = ['career', 'intel'];
    f.policy.doNotReveal = [];
    // Persona presentation does not automatically export biography or NPC observations.
    f.policy.participantKnowledge = [];
    f.outcome.participants[0].personaId = 'evelyn';
    const w = createHandoffWorkspace(mission, f.outcome, f.policy, f.catalog);
    expect(w.issue('mature').participants[0]).toMatchObject({
      characterId: 'player-character',
      personaId: 'evelyn',
      displayName: 'Evelynn Vale',
    });
    expect(JSON.stringify(w.issue('mature'))).not.toMatch(
      /Adrian|adrian|privateInterpretation|mirrorChoice|historicalIdentityOwner/,
    );
    delete f.catalog.find((c) => c.id === 'player-character')!.canon.age;
    expect(() => createHandoffWorkspace(mission, f.outcome, f.policy, f.catalog)).toThrow(
      /adulthood/,
    );
    f.outcome.participants[1].personaId = 'evelyn';
    expect(() => createHandoffWorkspace(mission, f.outcome, f.policy, fixtureCanon)).toThrow(
      /persona/,
    );
  });
  it('keeps writer facts separate from sourced participant knowledge and hides raw power records', () => {
    const { spec } = setup();
    expect(spec.writerPermittedContext.facts.map((f) => f.id)).toEqual(['intel']);
    expect(spec.participantKnowledge.flatMap((p) => p.records.map((r) => r.id))).not.toContain(
      'intel',
    );
    expect(spec.participantKnowledge[1].records[0].reference).toMatchObject({
      kind: 'observation',
      observation: state.npcs.daniel.known[0],
    });
    expect(JSON.stringify(spec)).not.toContain(deriveConsequences(state).leverage[0].id);
    expect(JSON.stringify(spec)).not.toMatch(
      /maya_warning|voss_lookup|Adrian discloses|mappedChange/,
    );
  });
  it('exports private production facts only under explicit writer grants, not as participant knowledge', () => {
    const f = fixture();
    f.policy.writerFacts.push({
      id: 'power-01',
      sourceId: 'power-01',
      text: 'Fixture-only private production context.',
      visibility: 'writer-only',
    });
    const spec = createHandoffWorkspace(state, f.outcome, f.policy, f.catalog).issue('mature');
    expect(spec.writerPermittedContext.facts[1].visibility).toBe('writer-only');
    expect(spec.participantKnowledge.flatMap((p) => p.records.map((r) => r.id))).not.toContain(
      'power-01',
    );
    expect(spec.doNotReveal.some((r) => r.factId === 'power-01')).toBe(true);
    f.policy.participantKnowledge[0].sourceIds.push('power-01');
    expect(() => createHandoffWorkspace(state, f.outcome, f.policy, f.catalog)).toThrow(
      /not participant knowledge/,
    );
  });
  it('rejects fabricated, future, misattributed and unresolved sources', () => {
    for (const variant of [
      'observation',
      'future',
      'misattributed',
      'unknown-leverage',
      'unknown-reference',
    ]) {
      const f = fixture();
      if (variant === 'observation') {
        const source = f.outcome.sources.find((s) => s.id === 'observation')!;
        if (source.reference.kind === 'observation')
          source.reference.observation.source = 'Invented';
      } else if (variant === 'future')
        f.outcome.sources.find((s) => s.id === 'career')!.reference = {
          kind: 'player-knowledge',
          key: 'adrian_career',
          event: 9999,
        };
      else if (variant === 'misattributed')
        f.policy.participantKnowledge[0].sourceIds = ['observation'];
      else if (variant === 'unknown-leverage')
        f.outcome.sources.find((s) => s.id === 'power-01')!.reference = {
          kind: 'leverage',
          recordId: 'unknown',
        };
      else f.outcome.exitState.push('missing');
      expect(() => createHandoffWorkspace(state, f.outcome, f.policy, f.catalog)).toThrow();
    }
  });
  it('retains temporal withdrawal, scoped authorization and unknown willingness independently', () => {
    const { spec } = setup();
    const first = spec.agencyContext[0].participants[0];
    const later = spec.agencyContext[2].participants[0];
    expect(first).toMatchObject({
      willingness: 'unknown',
      participation: 'compliance',
      authorization: { status: 'granted' },
    });
    expect(later).toMatchObject({
      withdrawal: 'expressed',
      authorization: { status: 'revoked' },
      participation: 'none',
    });
    expect(
      AgencyContextSchema.safeParse({ ...later, authorization: first.authorization }).success,
    ).toBe(false);
    const f = fixture();
    f.outcome.requiredBeats[3].agency[0] = {
      ...f.outcome.requiredBeats[3].agency[0],
      withdrawal: 'not-established',
      authorization: { status: 'granted', scope: 'Fixture', sourceId: 'agency-stop' },
    };
    expect(() => createHandoffWorkspace(state, f.outcome, f.policy, f.catalog)).toThrow(
      /distinct authored source/,
    );
  });
  it('represents pressure without creating willingness, attraction or a permanent classification', () => {
    const f = fixture();
    f.outcome.requiredBeats[0].classification = 'pressured';
    f.outcome.requiredBeats[0].agency[0].pressures.push({
      kind: 'authority',
      sourceId: 'agency-start',
      knownTo: ['player-character'],
    });
    const spec = createHandoffWorkspace(state, f.outcome, f.policy, f.catalog).issue('mature');
    expect(spec.agencyContext[0].participants[0].willingness).toBe('unknown');
    expect(spec.agencyContext[1].classification).toBe('unspecified');
    expect(JSON.stringify(spec.agencyContext)).not.toContain('attraction');
  });
  it('binds all presentations to identical canonical boundaries, disclosures and aftermath', () => {
    const { workspace } = setup();
    const specs = ['fade_to_black', 'mature', 'explicit_external'].map((v) => workspace.issue(v));
    expect(new Set(specs.map((s) => s.outcomeHash)).size).toBe(1);
    expect(new Set(specs.map((s) => s.specificationHash)).size).toBe(3);
    for (const spec of specs) {
      expect(spec.entryState).toEqual(specs[0].entryState);
      expect(spec.exitState).toEqual(specs[0].exitState);
      expect(spec.informationDisclosures).toEqual(specs[0].informationDisclosures);
      expect(spec.aftermathId).toBe(specs[0].aftermathId);
    }
    const f = fixture();
    f.outcome.presentations[0].disclosureDelivery[0].via = 'scene';
    expect(() => createHandoffWorkspace(state, f.outcome, f.policy, f.catalog)).toThrow(
      /Omitted disclosure/,
    );
  });
  it('freezes outcomes/specs and rejects stale specifications even with a recalculated hash', () => {
    const s = setup();
    expect(Object.isFrozen(s.spec.agencyContext[0].participants)).toBe(true);
    const altered = structuredClone(s.spec);
    altered.tone = 'Changed';
    const { specificationHash: _old, ...body } = altered;
    altered.specificationHash = hashContract(body);
    expect(() => s.workspace.verify(altered)).toThrow(/Stale/);
    const next = day(state, 'offer.accept');
    expect(() => createHandoffWorkspace(next, s.outcome, s.policy, s.catalog)).toThrow(/Stale/);
  });
});

describe('external draft and editorial approval', () => {
  it.each([
    'trustDelta',
    'attractionDelta',
    'consentChanges',
    'missionChanges',
    'identityDecisions',
    'newLeverage',
    'newSecrets',
    'knowledgeMutations',
    'saveMutations',
    'statePath',
    'approvalStatus',
    'unknown',
  ])('rejects external field %s', (key) => {
    const s = setup();
    expect(() => validateDraft({ ...s.draft, [key]: 'approved' }, s.spec, s.workspace)).toThrow();
  });
  it('rejects unknown nested fields, malformed JSON, oversized and mismatched payloads', () => {
    const s = setup();
    const bad = [
      '{',
      ' '.repeat(MAX_DRAFT_BYTES + 1),
      { ...s.draft, sceneId: 'wrong' },
      { ...s.draft, variantId: 'wrong' },
      { ...s.draft, presentationVariant: 'mature' },
      { ...s.draft, writerMetadata: { ...s.draft.writerMetadata, trustDelta: 1 } },
      { ...s.draft, prose: 'é'.repeat(100000) },
      { ...s.draft, beatCoverage: [...s.draft.beatCoverage].reverse() },
      { ...s.draft, beatCoverage: s.draft.beatCoverage.slice(1) },
    ];
    for (const value of bad) expect(() => validateDraft(value, s.spec, s.workspace)).toThrow();
  });
  it('treats coverage as assertion and never auto-approves even structurally valid nonsense', () => {
    const s = setup();
    const draft = { ...s.draft, prose: 'This does not actually cover any declared beats.' };
    expect(validateDraft(draft, s.spec, s.workspace).status).toBe('draft');
    const desk = createEditorialDesk();
    const review = desk.submitForReview(draft, s.spec, s.workspace);
    expect(review.status).toBe('review');
    expect(() => desk.publish(review.reviewId, metadata, draft, s.spec, s.workspace)).toThrow(
      /approval/,
    );
    desk.recordDecision(review.reviewId, { ...decision, status: 'rejected' });
    expect(() => desk.publish(review.reviewId, metadata, draft, s.spec, s.workspace)).toThrow(
      /approval/,
    );
  });
  it('requires a trusted decision and rejects forged assets or serialized approval claims', () => {
    const s = setup();
    const { desk, asset } = approve(s);
    expect(desk.validateAsset(asset, s.draft, s.spec, s.workspace)).toEqual(asset);
    expect(() => createEditorialDesk().validateAsset(asset, s.draft, s.spec, s.workspace)).toThrow(
      /approval/,
    );
    expect(() =>
      desk.validateAsset({ ...asset, source: 'Forged' }, s.draft, s.spec, s.workspace),
    ).toThrow(/altered/);
    expect(() => desk.recordDecision('0'.repeat(64), decision)).toThrow(/pending/);
  });
  it('invalidates approval for changed prose, specification, outcome content or outcome version', () => {
    const s = setup();
    const { desk, asset, review } = approve(s);
    expect(() =>
      desk.validateAsset(
        asset,
        { ...s.draft, prose: s.draft.prose + ' changed' },
        s.spec,
        s.workspace,
      ),
    ).toThrow(/approval/);
    for (const change of ['policy', 'outcome', 'version']) {
      const f = fixture();
      if (change === 'policy') f.policy.tone = 'Different editorial direction';
      if (change === 'outcome') f.outcome.aftermathId = 'different-aftermath';
      if (change === 'version') f.outcome.outcomeVersion++;
      const w = createHandoffWorkspace(state, f.outcome, f.policy, f.catalog);
      expect(() => desk.validateAsset(asset, s.draft, s.spec, w)).toThrow();
      const spec = w.issue('fade_to_black');
      const draft = {
        ...s.draft,
        specificationHash: spec.specificationHash,
        canonicalOutcomeHash: spec.outcomeHash,
      };
      expect(() => desk.publish(review.reviewId, metadata, draft, spec, w)).toThrow(/approval/);
    }
  });
  it('does not mutate state on import, approval, publication or repeated reading', () => {
    const original = encodeSave(state);
    const s = setup();
    const { desk, asset } = approve(s);
    for (let i = 0; i < 3; i++)
      expect(desk.readApprovedText(asset, s.draft, s.spec, s.workspace)).toBe(s.draft.prose);
    expect(encodeSave(state)).toBe(original);
    expect(replay(state.ledger)).toEqual(state);
    expect(() =>
      desk.publish(
        asset.approvalId,
        { ...metadata, file: '../escape.txt' },
        s.draft,
        s.spec,
        s.workspace,
      ),
    ).toThrow();
  });
  for (const file of readdirSync('review-saves').filter((f) => /^\d.*\.json$/.test(f)))
    it(`preserves review save ${file}`, () => {
      const saved = decodeSave(readFileSync(`review-saves/${file}`, 'utf8'));
      expect(decodeSave(encodeSave(saved))).toEqual(saved);
      expect(replay(saved.ledger, saved.contentRevision ?? 11)).toEqual(saved);
    });
});
