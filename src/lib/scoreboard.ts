import { Match } from './match';

const isSameMatch = (match: Match, homeTeam: string, awayTeam: string): boolean => {
  return match.homeTeam === homeTeam && match.awayTeam === awayTeam;
};

export class Scoreboard {
  private matches: Match[] = [];

  private isGameInProgress(homeTeam: string, awayTeam: string): boolean {
    return this.matches.some(match => isSameMatch(match, homeTeam, awayTeam) || isSameMatch(match, awayTeam, homeTeam));
  }

  private findMatch(homeTeam: string, awayTeam: string): Match | undefined {
    const match = this.matches.find(match => isSameMatch(match, homeTeam, awayTeam));
    if (!match) {
      throw new Error('Match not found');
    }
    return match;
  }

  startMatch(homeTeam: string, awayTeam: string): void {
    if (this.isGameInProgress(homeTeam, awayTeam)) {
      throw new Error('Match already exists');
    }

    if (arguments.length !== 2) {
      throw new Error('Match must have two teams');
    }

    this.matches.push(new Match(homeTeam, awayTeam));
  }

  finishMatch(homeTeam: string, awayTeam: string): void {
    this.matches = this.matches.filter(match => !isSameMatch(match, homeTeam, awayTeam));
  }

  getSummary(): Match[] {
    return this.matches
      .slice()
      .sort((a, b) => {
        const scoreDiff = b.totalScore() - a.totalScore();
        return scoreDiff === 0 ? b.createdAt.getTime() - a.createdAt.getTime() : scoreDiff;
      });
  }
};
