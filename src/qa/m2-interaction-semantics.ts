import { z } from 'zod';

/**
 * QA-only semantics for interaction verbs whose names are narrower than their
 * runtime effects. The reducer remains authoritative; this registry explains
 * the verified meaning that M2 reviewers must use when making causal claims.
 */
export const InteractionSemanticSchema = z
  .object({
    actionType: z.string().min(1).max(80),
    purpose: z.string().min(1).max(500),
    stateMeaning: z.string().min(1).max(700),
    doesNotMean: z.array(z.string().min(1).max(300)).min(1).max(12),
    downstreamEffects: z.array(z.string().min(1).max(400)).max(12),
  })
  .strict();

export type InteractionSemantic = z.infer<typeof InteractionSemanticSchema>;
export const InteractionSemanticsSchema = z.record(z.string().max(80), InteractionSemanticSchema);

const definitions: readonly InteractionSemantic[] = [
  {
    actionType: 'READ_DOCUMENT',
    purpose: 'Read/add a source record to the reviewed case file.',
    stateMeaning: 'Adds the document id to state.documents and updates the runtime-derived fact, claim, and knowledge state.',
    doesNotMean: [
      'selected for analytical comparison',
      'selected for submission manually',
      'proven true',
      'endorsed by the player',
    ],
    downstreamEffects: [
      'The document is eligible for later relationship testing only after it is selected.',
      'SUBMIT_ASSESSMENT later copies all state.documents into report.documents.',
    ],
  },
  {
    actionType: 'TOGGLE_EVIDENCE',
    purpose: 'Choose or deselect one already-read record for relationship testing.',
    stateMeaning: 'Adds or removes a read document id in state.selected; at most two records may be selected.',
    doesNotMean: [
      'attach this document to the report',
      'exclude unselected documents from the report',
      'mark the document as more reliable',
      'endorse the document claim',
    ],
    downstreamEffects: [
      'CONNECT_EVIDENCE evaluates the currently selected pair.',
      'SUBMIT_ASSESSMENT ignores state.selected when building report.documents.',
    ],
  },
  {
    actionType: 'CONNECT_EVIDENCE',
    purpose: 'Record an analytical relationship between the currently selected pair.',
    stateMeaning: 'Adds an inference/connection for the selected pair and may add derived knowledge from relation evaluation.',
    doesNotMean: [
      'prove the acquisition motive',
      'change which documents are attached',
      'make the player theory objectively true',
    ],
    downstreamEffects: [
      'The accumulated inferences are copied into report.connections at submission.',
    ],
  },
  {
    actionType: 'REVIEW_ASSESSMENT',
    purpose: 'Choose a draft conclusion for review before submission.',
    stateMeaning: 'Sets state.draft and enters helix.review when the assessment is available.',
    doesNotMean: [
      'submit immediately',
      'lock the draft permanently',
      'assert objective truth',
    ],
    downstreamEffects: [
      'SUBMIT_ASSESSMENT is a separate action that sends the reviewed conclusion to Benton.',
    ],
  },
  {
    actionType: 'SUBMIT_ASSESSMENT',
    purpose: 'Send the reviewed conclusion to Benton and close the current investigation.',
    stateMeaning: 'Creates the report, copies all reviewed documents and accumulated connections, records Benton observations, and enters helix.submitted.',
    doesNotMean: [
      'the player manually selected a subset of documents for attachment',
      'state.selected controls report attachment',
      'the submitted conclusion is objectively true',
    ],
    downstreamEffects: [
      'All documents in state.documents are copied to report.documents.',
      'All accumulated inferences are copied to report.connections.',
      'The current runtime has no separate per-document attachment-selection control.',
    ],
  },
];

export const M2_INTERACTION_SEMANTICS: Readonly<Record<string, InteractionSemantic>> = Object.freeze(
  Object.fromEntries(definitions.map((definition) => [definition.actionType, definition])),
);

/** Return only definitions for action types represented by the supplied route. */
export function interactionSemanticsForActionTypes(actionTypes: Iterable<string>): Record<string, InteractionSemantic> {
  const used = new Set(actionTypes);
  return Object.fromEntries(
    Object.keys(M2_INTERACTION_SEMANTICS)
      .filter((actionType) => used.has(actionType))
      .sort()
      .map((actionType) => [actionType, M2_INTERACTION_SEMANTICS[actionType]]),
  );
}

export const M2_SEMANTIC_MISINTERPRETATION = 'SEMANTIC_MISINTERPRETATION' as const;

/**
 * Detect the bounded fixture claim used to ensure a reviewer cannot turn an
 * evidence-selection action into an attachment-selection mechanic.
 */
export function classifySemanticMisinterpretation(finding: string, semantics: Record<string, InteractionSemantic>) {
  const normalized = finding.toLowerCase();
  const claimsSelectedControlsAttachments = normalized.includes('only selected evidence') && normalized.includes('attach');
  const toggle = semantics.TOGGLE_EVIDENCE;
  if (claimsSelectedControlsAttachments && toggle?.doesNotMean.includes('attach this document to the report')) {
    return M2_SEMANTIC_MISINTERPRETATION;
  }
  return undefined;
}
