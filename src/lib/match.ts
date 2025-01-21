export class Match {
  constructor(
    public homeTeam: string,
    public awayTeam: string,
    public homeTeamScore: number = 0,
    public awayTeamScore: number = 0,
    public createdAt: Date = new Date(),
  ) {
    if (arguments.length !== 2) {
      throw new Error('Match must have two teams');
    }

    if (typeof homeTeam !== 'string' || typeof awayTeam !== 'string') {
      throw new Error('Teams must be strings');
    }

    if (homeTeam === awayTeam) {
      throw new Error('Home team and away team cannot be the same');
    }
  }

  totalScore(): number {
    return this.homeTeamScore + this.awayTeamScore;
  }

  describedScore(): string {
    return `${this.homeTeam} ${this.homeTeamScore} - ${this.awayTeam} ${this.awayTeamScore}`;
  }

  // README.md: This is not needed,
  // I added it, in case you want to check the lib in a browser console
  logSummary(): void {
    console.table([{
      homeTeam: this.homeTeam,
      awayTeam: this.awayTeam,
      homeTeamScore: this.homeTeamScore,
      awayTeamScore: this.awayTeamScore,
      createdAt: this.createdAt,
    }]);
  }
};