/** Object-focused production derivatives. No generic environment fallback. */
export const openingCaseworkShots: Record<string, {
  assetId: string;
  location: string;
  nodes: readonly string[];
  alt: string;
}> = {
  'opening.office.shot03-file': {
    assetId: 'axiom-opening-office-shot03-file-v3-transparent-production',
    location: 'axiom-strategic-intelligence', nodes: ['office.departure'],
    alt: 'A black slate rests on the desk evidence surface beside the terminal after Benton leaves; its screen is unreadable.',
  },
  'opening.helix.shot01-brief': {
    assetId: 'axiom-casework-brief-v2-lift-production',
    location: 'axiom-casework', nodes: ['helix.brief'],
    alt: 'Close view of the slate on the same evidence surface; the brief is presented in the reading panel.',
  },
  'opening.helix.shot02-documents': {
    assetId: 'axiom-casework-documents-v2-production',
    location: 'axiom-casework', nodes: ['helix.documents', 'helix.analysis'],
    alt: 'The slate and terminal share the casework desk; source records and analysis remain in the workspace below.',
  },
  'opening.helix.shot03-review': {
    assetId: 'axiom-casework-review-v2-production',
    location: 'axiom-casework', nodes: ['helix.review'],
    alt: 'A closer desk view during assessment review; the unreadable devices make no submission or conclusion claim.',
  },
  'opening.helix.shot04-submitted': {
    assetId: 'axiom-casework-submitted-v2-lift-production',
    location: 'axiom-casework', nodes: ['helix.submitted'],
    alt: 'The view cuts to the terminal after submission; the authored record carries the report details.',
  },
};
