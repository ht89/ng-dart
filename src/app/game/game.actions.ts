import { UPDATE_SCORE, UPDATE_STATUS } from './game.constants';

export const updateScore = score => ({
  type: UPDATE_SCORE,
  payload: score
});

export const updateStatus = status => ({
  type: UPDATE_STATUS,
  payload: status
});
