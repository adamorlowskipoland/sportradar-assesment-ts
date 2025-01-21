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
    return this.matches.find(match => isSameMatch(match, homeTeam, awayTeam));
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
};
