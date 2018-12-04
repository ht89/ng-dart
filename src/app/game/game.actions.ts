import { UPDATE_SCORE, UPDATE_GAME_STATUS } from './game.constants';

export const updateScore = score => ({
  type: UPDATE_SCORE,
  payload: score
});

export const updateGameStatus = status => ({
  type: UPDATE_GAME_STATUS,
  payload: status
});
