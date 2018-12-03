import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Player } from './player/player.interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss', '../app.component.scss']
})
export class PlayersComponent implements OnInit {
  playersDisplayed = false;
  players: Player[] = [];
  gameScore = 0;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.setDefaultPlayers();

    this.appService.subscribe('players', data => {
      this.displayPlayers(data['gameStarted']);

      this.setGameScore(data['gameScore']);

      this.deletePlayer(data['playerDeleted']);
    });
  }

  private setDefaultPlayers() {
    this.players = [
      {
        id: 1,
        name: '',
        scores: []
      },
      {
        id: 2,
        name: '',
        scores: []
      }
    ];

    for (let i = 1; i <= 24; i++) {
      this.players[0].scores.push({
        id: i,
        value: null
      });
      this.players[1].scores.push({
        id: i,
        value: null
      });
    }
  }

  private displayPlayers(gameStarted: boolean) {
    if (gameStarted !== undefined) {
      this.playersDisplayed = gameStarted;

      if (!gameStarted) {
        this.setDefaultPlayers();
      }
    }
  }

  addPlayer() {
    this.players.push({
      id: this.players.length + 1,
      name: '',
      scores: []
    });

    for (let i = 1; i <= 24; i++) {
      this.players[this.players.length - 1].scores.push({
        id: i,
        value: null
      });
    }
  }

  deletePlayer(playerId: number) {
    if (playerId) {
      const deletedPlayer = this.players.findIndex(player => player.id === playerId);

      if (deletedPlayer) {
        this.players.splice(deletedPlayer, 1);
      }
    }
  }

  private setGameScore(gameScore: number) {
    if (gameScore) {
      this.gameScore = gameScore;
    }
  }
}
