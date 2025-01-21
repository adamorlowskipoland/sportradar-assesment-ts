import { describe, it, expect } from 'vitest';
import { Scoreboard } from '../lib/scoreboard';

describe('Scoreboard', () => {
  it('should be able to create a scoreboard', () => {
    const scoreboard = new Scoreboard();
    expect(scoreboard).toBeDefined();
  });
});
