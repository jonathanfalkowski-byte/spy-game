import { initialState } from '../src/state/reducer';
import { advance, apply, choice, connect, toAnalysis } from './helpers';

/** Genuine reached states, including each transient commute reader position. */
export function openingVisualFixtures() {
  const bond = initialState();
  const reply = choice(bond, 'bond.friend');
  const departure = choice(reply, 'morning.yes');
  const commute = advance(departure);
  const daniel = advance(commute);
  const benton = choice(daniel, 'promotion.professional');
  const file = choice(benton, 'benton.obey');
  const brief = advance(file);
  const documents = advance(brief);
  const analysis = toAnalysis();
  const review = apply(connect(analysis), { type: 'REVIEW_ASSESSMENT', id: 'bounded' });
  const submitted = apply(review, { type: 'SUBMIT_ASSESSMENT' });
  const promotion = advance(submitted);
  const invitation = choice(promotion, 'mayaPromotion.hurt');
  const mayaCase = choice(invitation, 'invitation.yes');
  const goodbye = choice(mayaCase, 'disclosure.private');
  const ending = advance(goodbye);
  return [bond, reply, departure, commute, commute, commute, commute,
    daniel, benton, file, brief, documents, analysis, review, submitted,
    promotion, invitation, mayaCase, goodbye, ending].map((state, index) => ({
      state, position: index >= 3 && index <= 6 ? index - 3 : 0,
    }));
}
