import { z } from 'zod';
import {
  DocumentSchema,
  SearchSchema,
  AssessmentSchema,
  type DocId,
  type Relation,
} from './schema';

export const documents = DocumentSchema.array().parse([
  {
    id: 'email',
    type: 'Internal email',
    title: 'Acquisition request',
    source: 'Director Benton',
    reliability: 'Authenticated message; motive is a claim',
    body: 'Vale — Helix is acquiring Novagen Bio for its adaptive-cell patents. I need a risk note before lunch. Keep this narrow. Patent position, regulatory exposure, acquisition logic. No fishing expeditions.',
    layer: 'claim',
    summary: 'Benton claims Helix wants Novagen for its patents.',
    limits:
      'Authenticates what Benton said, not that he believes it or that the rationale is true.',
  },
  {
    id: 'finance',
    type: 'Financial filing',
    title: 'Helix divestiture 8-K',
    source: 'Helix Investor Relations',
    reliability: 'Authenticated filing',
    body: 'Six months ago Helix transferred its complete adaptive-cell patent portfolio to Orias Therapeutics for C$418 million. The agreement includes a five-year restriction on reacquiring substantially similar patents.',
    layer: 'fact',
    summary:
      'Helix sold comparable patents six months ago and accepted a five-year reacquisition restriction.',
    limits: 'Establishes the transaction and restriction, not Helix’s present acquisition motive.',
  },
  {
    id: 'news',
    type: 'Trade report',
    title: 'Novagen seeks strategic buyer',
    source: 'BioMarket Wire',
    reliability: 'Unverified reporting; attributed opinion',
    body: 'Novagen Bio has struggled to commercialize its platform. Analysts value the company primarily for its 41-person research group and a small set of clinical relationships.',
    layer: 'claim',
    summary: 'Outside analysts value Novagen mainly for personnel and clinical relationships.',
    limits: 'An outside valuation is not direct evidence of Helix’s intent.',
  },
  {
    id: 'intel',
    type: 'Intelligence note',
    title: 'Helix talent activity',
    source: 'Axiom Strategic Intelligence',
    reliability: 'Internal assessment',
    body: 'Helix recruiters contacted eleven Novagen employees during the past quarter. Five work outside the adaptive-cell patent group. Contact volume is unusual but does not establish acquisition intent.',
    layer: 'fact',
    summary:
      'The intelligence note records Helix contacting Novagen personnel before the announcement.',
    limits:
      'Recruiting activity is documented; its relationship to the acquisition remains an inference.',
  },
]);
export const searches = z
  .array(
    z
      .object({
        id: SearchSchema,
        title: z.string(),
        action: z.string(),
        result: z.string(),
        limits: z.string(),
        thought: z.string(),
        knowledge: z.string(),
      })
      .strict(),
  )
  .parse([
    {
      id: 'personnel',
      title: 'Cross-reference Novagen personnel',
      action:
        'Adrian compares Novagen employees against Axiom divisions and restricted-project indexes.',
      result:
        'DR LENA VOSS — former Novagen research director. Current division: Axiom Adaptive Medicine. Her personnel record is cross-linked to an EV-class restricted project.',
      limits:
        'The record establishes a personnel connection. It does not reveal the project’s purpose or Helix’s motive.',
      thought:
        'Voss moved from the company Helix is buying into Axiom—and somebody buried the connection behind a medical clearance. That is not an answer. It is a better question.',
      knowledge: 'voss_connection',
    },
    {
      id: 'patents',
      title: 'Trace the patent ownership chain',
      action:
        'Adrian verifies the recorded sale, current ownership chain and reacquisition restriction.',
      result:
        'The divestiture is genuine. The five-year restriction was agreed six months ago and remains in force. No hidden option returns the patents to Helix.',
      limits:
        'The search corroborates the restriction. It does not establish what Helix wants instead.',
      thought:
        'The contradiction is real, but tracing the ownership does not tell me what Helix is buying instead.',
      knowledge: 'patent_chain',
    },
    {
      id: 'payments',
      title: 'Audit the payment structure',
      action:
        'Adrian reconciles the purchase price, lenders and beneficial owners against the disclosed transaction.',
      result:
        'No shell-company transfers or unexplained side payments appear in the accessible records.',
      limits:
        'A clean search covers only accessible records; it cannot prove that no concealed financing exists.',
      thought:
        'A clean search is still information. If this operation is hiding something, it is not hiding in the purchase money I can see.',
      knowledge: 'payment_search',
    },
  ]);
export const assessments = z
  .array(z.object({ id: AssessmentSchema, label: z.string(), text: z.string() }).strict())
  .parse([
    {
      id: 'bounded',
      label: 'Challenge the patent rationale; leave the motive open.',
      text: 'The recorded divestiture and reacquisition restriction conflict with Benton’s patent rationale. The records do not establish Helix’s actual motive.',
    },
    {
      id: 'personnel',
      label: 'Helix wants Novagen personnel.',
      text: 'Helix wants Novagen personnel.',
    },
    {
      id: 'data',
      label: 'Helix wants customer or clinical data.',
      text: 'Helix wants Novagen customer or clinical data.',
    },
    {
      id: 'fraud',
      label: 'The acquisition is financial fraud.',
      text: 'The acquisition is financial fraud.',
    },
    {
      id: 'insufficient',
      label: 'The evidence does not support one conclusion.',
      text: 'The available evidence does not yet support one conclusion.',
    },
  ]);
export const relationLabels: Record<Relation, string> = {
  conflict: 'They conflict',
  support: 'They support the same conclusion',
  unrelated: 'They are unrelated',
  uncertain: 'The relationship is uncertain',
};
export const pairs: Record<
  string,
  {
    relation: 'support' | 'conflict' | 'uncertain';
    text: string;
    limits: string;
    knowledge?: string;
  }
> = {
  'email|finance': {
    relation: 'conflict',
    text: 'The filing challenges Benton’s stated patent rationale: Helix disposed of comparable patents and restricted reacquisition.',
    limits: 'This does not prove Helix’s actual motive, Benton’s beliefs, or wrongdoing.',
    knowledge: 'patent_conflict',
  },
  'email|intel': {
    relation: 'uncertain',
    text: 'Recruiting suggests another possible interest, but Helix could want both patents and personnel.',
    limits: 'These records do not directly contradict each other or establish a shared motive.',
  },
  'email|news': {
    relation: 'uncertain',
    text: 'The outside valuation challenges Benton’s emphasis, but an analyst’s opinion does not make the patent claim impossible.',
    limits: 'Two different descriptions of value do not establish Helix’s intent.',
  },
  'finance|intel': {
    relation: 'support',
    text: 'Selling patents while recruiting staff supports considering a personnel explanation.',
    limits:
      'The activities can coexist. They suggest a hypothesis without proving the acquisition targets staff.',
  },
  'finance|news': {
    relation: 'support',
    text: 'The patent disposal and outside valuation support looking beyond the stated patent rationale.',
    limits: 'The valuation remains an outside claim and the purchase motive remains unknown.',
  },
  'intel|news': {
    relation: 'support',
    text: 'The reported value of Novagen’s people and Helix’s recruiting activity support a personnel hypothesis.',
    limits: 'A supported hypothesis is still not proof of acquisition intent.',
    knowledge: 'personnel_hypothesis',
  },
};
export function evaluateRelation(selected: DocId[], relation: Relation) {
  const pair = [...selected].sort().join('|');
  const rule = pairs[pair];
  if (!rule) throw new Error('Two different case records are required.');
  const result =
    relation === 'uncertain' ? 'uncertain' : relation === rule.relation ? 'supported' : 'rejected';
  const prefix =
    result === 'supported'
      ? 'Connection supported. '
      : result === 'uncertain'
        ? 'Uncertainty recorded. '
        : 'This relationship is not supported. ';
  return {
    pair,
    relation,
    result,
    text: prefix + rule.text + ' ' + rule.limits,
    knowledge: result === 'supported' ? rule.knowledge : undefined,
  } as const;
}
