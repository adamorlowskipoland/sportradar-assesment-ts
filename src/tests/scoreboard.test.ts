import { describe, it, expect } from 'vitest';
import { Scoreboard } from '../lib/scoreboard';

describe('Scoreboard', () => {
  it('should be able to create a scoreboard', () => {
    const scoreboard = new Scoreboard();
    expect(scoreboard).toBeDefined();
  });

  describe('addMatch', () => {
    it('should add a match to the scoreboard', () => {
      const scoreboard = new Scoreboard();
      scoreboard.addMatch('Team 1', 'Team 2');
      expect(scoreboard.matches.length).toBe(1);
    });

    it('should throw an error when adding a match with invalid arguments', () => {
      const scoreboard = new Scoreboard();
      expect(() => scoreboard.addMatch()).toThrow();
      expect(() => scoreboard.addMatch('Team 1')).toThrow();
      expect(() => scoreboard.addMatch('Team 1', 'Team 1')).toThrow();
      expect(() => scoreboard.addMatch('Team 1', 'Team 2', 'Team 3')).toThrow();
    });

    it('should throw an error when adding a duplicate match', () => {
      const scoreboard = new Scoreboard();
      scoreboard.addMatch('Team 1', 'Team 2');
      expect(() => scoreboard.addMatch('Team 1', 'Team 2')).toThrow();
    });

  });
});
