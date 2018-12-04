import { PlayersState } from './players/players.reducer';
import { Game } from './game/game.interface';

export interface AppState {
  players: PlayersState;
  game: Game;
}

