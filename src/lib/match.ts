export class Match {
  constructor(
    public homeTeam: string,
    public awayTeam: string,
    public homeTeamScore: number = 0,
    public awayTeamScore: number = 0,
  ) {
    if (homeTeam === undefined || awayTeam === undefined) {
      throw new Error('Match must have two teams');
    }

    if (homeTeam === awayTeam) {
      throw new Error('Home team and away team cannot be the same');
    }

    if (arguments.length > 2) {
      throw new Error('Match must have two teams');
    }
  }

  totalScore(): number {
    return this.homeTeamScore + this.awayTeamScore;
  }

  describedScore(): string {
    return `${this.homeTeam} ${this.homeTeamScore} - ${this.awayTeam} ${this.awayTeamScore}`;
  }
};
