import { Game } from './game.interface';
import { UPDATE_GAME } from './game.constants';

const initialState: Game = {
  score: undefined,
  isStarted: false
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAME:
      return { ...state, score: action.payload.score, isStarted: action.payload.isStarted };
    default:
      return state;
  }
};
