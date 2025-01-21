import { describe, it, expect } from 'vitest';
import { Match } from '../lib/match';

describe('Match', () => {
  it('should be able to create a match', () => {
    const match = new Match();
    expect(match).toBeDefined();
  });
});
