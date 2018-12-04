import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PlayerActions, PlayerActionTypes } from './players.actions';
import { Player } from './player/player.interface';

export interface PlayersState extends EntityState<Player> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialState: PlayersState = adapter.getInitialState({
  // additional entity state properties
});

export function playersReducer(
  state = initialState,
  action: PlayerActions
): PlayersState {
  switch (action.type) {
    case PlayerActionTypes.AddPlayer: {
      return adapter.addOne(action.payload.player, state);
    }

    case PlayerActionTypes.UpsertPlayer: {
      return adapter.upsertOne(action.payload.player, state);
    }

    case PlayerActionTypes.AddPlayers: {
      return adapter.addMany(action.payload.players, state);
    }

    case PlayerActionTypes.UpsertPlayers: {
      return adapter.upsertMany(action.payload.players, state);
    }

    case PlayerActionTypes.UpdatePlayer: {
      return adapter.updateOne(action.payload.player, state);
    }

    case PlayerActionTypes.UpdatePlayers: {
      return adapter.updateMany(action.payload.players, state);
    }

    case PlayerActionTypes.DeletePlayer: {
      return adapter.removeOne(action.payload.id, state);
    }

    case PlayerActionTypes.DeletePlayers: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case PlayerActionTypes.LoadPlayers: {
      return adapter.addAll(action.payload.players, state);
    }

    case PlayerActionTypes.ClearPlayers: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
