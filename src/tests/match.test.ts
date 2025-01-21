import { describe, it, expect } from 'vitest';
import { Match } from '../lib/match';

describe('Match', () => {
  describe('when creating a match', () => {

    it('should be able to create a match with two teams', () => {
      const match = new Match('Team 1', 'Team 2');
      expect(match.homeTeam).toBe('Team 1');
      expect(match.awayTeam).toBe('Team 2');
      expect(match.homeTeamScore).toBe(0);
      expect(match.awayTeamScore).toBe(0);
    });

    describe('with invalid arguments', () => {
      it('should throw an error when no teams are provided', () => {
        expect(() => new Match()).toThrow();
      });

      it('should throw an error when one team is provided', () => {
        expect(() => new Match('Team 1')).toThrow();
      });

      it('should throw an error when more than two teams are provided', () => {
        expect(() => new Match('Team 1', 'Team 2', 'Team 3')).toThrow();
      });

      it('should throw an error when the home team and away team are the same', () => {
        expect(() => new Match('Team 1', 'Team 1')).toThrow();
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
