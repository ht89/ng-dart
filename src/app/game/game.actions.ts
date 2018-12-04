import { UPDATE_SCORE } from './game.constants';

export const updateScore = score => ({
  type: UPDATE_SCORE,
  payload: score
});
