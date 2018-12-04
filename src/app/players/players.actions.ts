import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Player } from './player/player.interface';

export enum PlayerActionTypes {
  LoadPlayers = '[Player] Load Players',
  AddPlayer = '[Player] Add Player',
  UpsertPlayer = '[Player] Upsert Player',
  AddPlayers = '[Player] Add Players',
  UpsertPlayers = '[Player] Upsert Players',
  UpdatePlayer = '[Player] Update Player',
  UpdatePlayers = '[Player] Update Players',
  DeletePlayer = '[Player] Delete Player',
  DeletePlayers = '[Player] Delete Players',
  ClearPlayers = '[Player] Clear Players'
}

export class LoadPlayers implements Action {
  readonly type = PlayerActionTypes.LoadPlayers;

  constructor(public payload: { players: Player[] }) {}
}

export class AddPlayer implements Action {
  readonly type = PlayerActionTypes.AddPlayer;

  constructor(public payload: { player: Player }) {}
}

export class UpsertPlayer implements Action {
  readonly type = PlayerActionTypes.UpsertPlayer;

  constructor(public payload: { player: Player }) {}
}

export class AddPlayers implements Action {
  readonly type = PlayerActionTypes.AddPlayers;

  constructor(public payload: { players: Player[] }) {}
}

export class UpsertPlayers implements Action {
  readonly type = PlayerActionTypes.UpsertPlayers;

  constructor(public payload: { players: Player[] }) {}
}

export class UpdatePlayer implements Action {
  readonly type = PlayerActionTypes.UpdatePlayer;

  constructor(public payload: { player: Update<Player> }) {}
}

export class UpdatePlayers implements Action {
  readonly type = PlayerActionTypes.UpdatePlayers;

  constructor(public payload: { players: Update<Player>[] }) {}
}

export class DeletePlayer implements Action {
  readonly type = PlayerActionTypes.DeletePlayer;

  constructor(public payload: { id: string }) {}
}

export class DeletePlayers implements Action {
  readonly type = PlayerActionTypes.DeletePlayers;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearPlayers implements Action {
  readonly type = PlayerActionTypes.ClearPlayers;
}

export type PlayerActions =
 LoadPlayers
 | AddPlayer
 | UpsertPlayer
 | AddPlayers
 | UpsertPlayers
 | UpdatePlayer
 | UpdatePlayers
 | DeletePlayer
 | DeletePlayers
 | ClearPlayers;
