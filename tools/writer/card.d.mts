// Types for card.mjs so strict typecheck accepts imports from tests.
export interface Card {
  id: string;
  prompt: string;
  speakers: string[];
  required: string[];
  forbidden: string[];
  words: { min: number; max: number };
}

export const ROOT: string;
export const CARDS: string;
export const OUT: string;
export function checkId(id: string): string;
export function loadCard(id: string, dir?: string): Card;
export function narration(text: string): string;
export function screen(
  text: string,
  card: Pick<Card, 'required' | 'forbidden' | 'words'>,
): { words: number; issues: string[] };
export function toBlocks(text: string, speakers: string[]): string;
