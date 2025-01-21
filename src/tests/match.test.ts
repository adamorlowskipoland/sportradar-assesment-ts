import { describe, it, expect, beforeEach } from 'vitest';
import { Match } from '../lib/match';

describe('Match', () => {
  let match: Match;

  beforeEach(() => {
    match = new Match();
  });

  describe('when creating a match', () => {

    it('should be able to create a match with two teams', () => {
      const match = new Match('Team 1', 'Team 2');
      expect(match.homeTeam).toBe('Team 1');
      expect(match.awayTeam).toBe('Team 2');
    });

    describe('with invalid arguments', () => {
      it('should not be able to create a match with no teams', () => {
        expect(() => new Match()).toThrow();
      });

      it('should not be able to create a match with one team', () => {
        expect(() => new Match('Team 1')).toThrow();
      });

      it('should not be able to create a match with more than two teams', () => {
        expect(() => new Match('Team 1', 'Team 2', 'Team 3')).toThrow();
      });
    });

  });

  it('returns total score', () => {
    const match = new Match('Team 1', 'Team 2');
    expect(match.totalScore()).toBe(0);
  });

  it('returns described score', () => {
    const match = new Match('Team 1', 'Team 2');
    expect(match.describedScore()).toBe('Team 1 0 - Team 2 0');
  });

});
