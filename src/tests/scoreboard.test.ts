import { describe, it, expect } from 'vitest';
import { Scoreboard } from '../lib/scoreboard';

describe('Scoreboard', () => {
  it('should be able to create a scoreboard', () => {
    const scoreboard = new Scoreboard();
    expect(scoreboard).toBeDefined();
    expect(scoreboard.logSummary).toBeDefined();
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


  describe('matches summary sorted by total score', () => {
    it('2 games with different scores', () => {
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

    it('extended example', () => {
      const scoreboard = new Scoreboard();
      scoreboard.startMatch('Mexico', 'Canada');
      scoreboard.startMatch('Spain', 'Brazil');
      scoreboard.startMatch('Germany', 'France');
      scoreboard.startMatch('Uruguay', 'Italy');
      scoreboard.startMatch('Argentina', 'Australia');


      scoreboard.updateScore('Mexico', 'Canada', 0, 5);
      scoreboard.updateScore('Spain', 'Brazil', 10, 2);
      scoreboard.updateScore('Germany', 'France', 2, 2);
      scoreboard.updateScore('Uruguay', 'Italy', 6, 6);
      scoreboard.updateScore('Argentina', 'Australia', 3, 1);

      const summary = scoreboard.getSummary();
      expect(summary[0].describedScore()).toBe('Uruguay 6 - Italy 6');
      expect(summary[1].describedScore()).toBe('Spain 10 - Brazil 2');
      expect(summary[2].describedScore()).toBe('Mexico 0 - Canada 5');
      expect(summary[3].describedScore()).toBe('Argentina 3 - Australia 1');
      expect(summary[4].describedScore()).toBe('Germany 2 - France 2');

      scoreboard.logSummary();
    });
  });


  describe('should throw an error', () => {
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
        expect(() => scoreboard.updateScore('Team 1', 'Team 2', 1)).toThrow();
      });

      it('with invalid score', () => {
        const scoreboard = new Scoreboard();
        scoreboard.startMatch('Team 1', 'Team 2');
        expect(() => scoreboard.updateScore('Team 1', 'Team 2', '1', 2)).toThrow();
      });
    });


  });


});
