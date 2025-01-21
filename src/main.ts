import { Scoreboard } from './lib/scoreboard';

const scoreboard = new Scoreboard();
(document as Document & { scoreboard: Scoreboard }).scoreboard = scoreboard;

console.log(scoreboard);
