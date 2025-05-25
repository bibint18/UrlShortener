

import { nanoid } from 'nanoid';

export function generateShortId(): string {
  try {
    const short = nanoid(7);
    return short;
  } catch (error) {
    console.error('generateShortId: Error generating short ID:', error);
    throw new Error(`Failed to generate short ID: ${error instanceof Error ? error.message : String(error)}`);
  }
}