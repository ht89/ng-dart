import { Game } from './game.interface';
import { UPDATE_SCORE, UPDATE_STATUS } from './game.constants';

const initialState: Game = {
  score: undefined,
  isStarted: false
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return { ...state, score: action.payload };
    case UPDATE_STATUS:
      return { ...state, isStarted: action.payload };
    default:
      return state;
  }
};
