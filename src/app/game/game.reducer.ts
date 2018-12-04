import { Game } from './game.interface';
import { UPDATE_SCORE } from './game.constants';

const initialState: Game = {
  score: undefined,
  isStarted: false
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return { ...state, score: action.payload };
    default:
      return state;
  }
};
