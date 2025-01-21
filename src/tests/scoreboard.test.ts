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
    const matches = scoreboard.getSummary();
    expect(matches.length).toBe(1);
  });

  it('should finish a match', () => {
    const scoreboard = new Scoreboard();
    scoreboard.startMatch('Team 1', 'Team 2');
    const matches = scoreboard.getSummary();
    expect(matches.length).toBe(1);

    scoreboard.finishMatch('Team 1', 'Team 2');
    const updatedMatches = scoreboard.getSummary();
    expect(updatedMatches.length).toBe(0);
  });

  it('updates a match score', () => {
    const scoreboard = new Scoreboard();
    scoreboard.startMatch('Team 1', 'Team 2');
    scoreboard.updateScore('Team 1', 'Team 2', 1, 2);
    const matches = scoreboard.getSummary();
    expect(matches[0].homeTeamScore).toBe(1);
    expect(matches[0].awayTeamScore).toBe(2);
  });

  it('should get the summary of the matches', () => {
    const scoreboard = new Scoreboard();
    scoreboard.startMatch('Team 1', 'Team 2');
    scoreboard.finishMatch('Team 1', 'Team 2');
    expect(scoreboard.getSummary()).toBeDefined();
  });

  it('should get a summary of matches sorted by total score', () => {
    const scoreboard = new Scoreboard();
    scoreboard.startMatch('Team 1', 'Team 2');
    scoreboard.updateScore('Team 1', 'Team 2', 1, 2);

    scoreboard.startMatch('Team 3', 'Team 4');
    scoreboard.updateScore('Team 3', 'Team 4', 3, 4);

    const [game1, game2] = scoreboard.getSummary();
    expect(game1.totalScore()).toBe(7);
    expect(game2.totalScore()).toBe(3);

    expect(game1.describedScore()).toBe('Team 3 3 - Team 4 4');
    expect(game2.describedScore()).toBe('Team 1 1 - Team 2 2');
  });

  describe('should throw and error', () => {

    it('when adding a match with invalid arguments', () => {
      const scoreboard = new Scoreboard();
      expect(() => scoreboard.startMatch()).toThrow();
      expect(() => scoreboard.startMatch('Team 1')).toThrow();
      expect(() => scoreboard.startMatch('Team 1', 'Team 1')).toThrow();
      expect(() => scoreboard.startMatch(1, 1)).toThrow();
      expect(() => scoreboard.startMatch(1, 2)).toThrow();
      expect(() => scoreboard.startMatch('Team 1', 'Team 2', 'Team 3')).toThrow();
      expect(() => scoreboard.startMatch(1, 'Team 2', 1, 2, 3)).toThrow();
    });

    it('when adding a duplicate match', () => {
      const scoreboard = new Scoreboard();
      scoreboard.startMatch('Team 1', 'Team 2');
      expect(() => scoreboard.startMatch('Team 1', 'Team 2')).toThrow();
    });

    it('when adding a match with same, reverted teams', () => {
      const scoreboard = new Scoreboard();
      scoreboard.startMatch('Team 1', 'Team 2');
      expect(() => scoreboard.startMatch('Team 2', 'Team 1')).toThrow();
    });

    describe('when updating a match', () => {

      it('with invalid arguments', () => {
        const scoreboard = new Scoreboard();
        scoreboard.startMatch('Team 1', 'Team 2');
        expect(() => scoreboard.updateScore('Team 1', 'Team 2', 1, 2, 4)).toThrow();
      });

      it('with invalid score', () => {
        const scoreboard = new Scoreboard();
        scoreboard.startMatch('Team 1', 'Team 2');
        expect(() => scoreboard.updateScore('Team 1', 'Team 2', '1', 2)).toThrow();
      });

    });
  });

});
