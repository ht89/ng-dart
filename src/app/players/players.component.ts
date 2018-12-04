import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Player } from './player/player.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { AddPlayers } from './players.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss', '../app.component.scss']
})
export class PlayersComponent implements OnInit {
  playersDisplayed = false;
  players$;
  gameScore = 0;

  constructor(private appService: AppService,
    private store: Store<AppState>) {

    this.players$ = this.store
      .select(state => state.players.entities)
      .pipe(
        map(this.toArray)
      );

    this.players$
      .subscribe(data => console.log(data));

  }

  ngOnInit() {
    this.setDefaultPlayers();

    this.appService.subscribe('players', data => {
      this.displayPlayers(data['gameStarted']);

      this.setGameScore(data['gameScore']);
    });
  }

  private setGameScore(gameScore: number) {
    if (gameScore) {
      this.gameScore = gameScore;
    }
  }

  private toArray(obj) {
    if (!obj) {
      return obj;
    }

    const keys = Object.keys(obj);
    return keys.map(key => obj[key]);
  }

  private setDefaultPlayers() {
    const players: Player[] = [];

    for (let i = 1; i <= 2; i++) {
      const player = {
        id: i,
        name: '',
        scores: []
      };

      for (let j = 1; j <= 24; j++) {
        player.scores.push({
          id: j,
          value: null
        });
      }

      players.push(player);
    }

    this.store.dispatch(new AddPlayers({ players }));
  }

  private displayPlayers(gameStarted: boolean) {
    if (gameStarted !== undefined) {
      this.playersDisplayed = gameStarted;

      if (!gameStarted) {
        this.setDefaultPlayers();
      }
    }
  }

  // addPlayer() {
  //   this.players.push({
  //     id: this.players.length + 1,
  //     name: '',
  //     scores: []
  //   });

  //   for (let i = 1; i <= 24; i++) {
  //     this.players[this.players.length - 1].scores.push({
  //       id: i,
  //       value: null
  //     });
  //   }
  // }

  // deletePlayer(playerId: number) {
  //   if (playerId) {
  //     const deletedPlayer = this.players.findIndex(player => player.id === playerId);

  //     if (deletedPlayer) {
  //       this.players.splice(deletedPlayer, 1);
  //     }
  //   }
  // }
}
