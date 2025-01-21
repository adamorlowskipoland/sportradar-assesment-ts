import { describe, it, expect } from 'vitest';
import { Scoreboard } from '../lib/scoreboard';

describe('Scoreboard', () => {
  it('should be able to create a scoreboard', () => {
    const scoreboard = new Scoreboard();
    expect(scoreboard).toBeDefined();
  });

  it('should add a match to the scoreboard', () => {
    const scoreboard = new Scoreboard();
    scoreboard.startMatch('Team 1', 'Team 2');
    expect(scoreboard.matches.length).toBe(1);
  });

  it('should finish a match', () => {
    const scoreboard = new Scoreboard();
    scoreboard.startMatch('Team 1', 'Team 2');
    expect(scoreboard.matches.length).toBe(1);

    scoreboard.finishMatch('Team 1', 'Team 2');
    expect(scoreboard.matches.length).toBe(0);
  });

  describe('should throw and error', () => {

    it('when adding a match with invalid arguments', () => {
      const scoreboard = new Scoreboard();
      expect(() => scoreboard.startMatch()).toThrow();
      expect(() => scoreboard.startMatch('Team 1')).toThrow();
      expect(() => scoreboard.startMatch('Team 1', 'Team 1')).toThrow();
      expect(() => scoreboard.startMatch('Team 1', 'Team 2', 'Team 3')).toThrow();
    });

    it('when adding a duplicate match', () => {
      const scoreboard = new Scoreboard();
      scoreboard.startMatch('Team 1', 'Team 2');
      expect(() => scoreboard.startMatch('Team 1', 'Team 2')).toThrow();
    });

  });

});
