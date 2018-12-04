import { UPDATE_GAME } from './game.constants';

export const updateGame = game => ({
  type: UPDATE_GAME,
  payload: game
});
