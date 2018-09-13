import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Player } from './player/player.interface';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss', '../app.component.scss']
})
export class PlayersComponent implements OnInit {
    showPlayers = false;
    players: Player[] = [];
    gameScore = 0;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.setDefaultPlayers();

        this.appService.subscribe('players', data => {
            if (data['gameStarted'] !== null) {
                this.showPlayers = data['gameStarted'];

                if (!data['gameStarted']) {
                    this.setDefaultPlayers();
                }
            }

            if (data['gameScore']) {
                this.gameScore = data['gameScore'];
            }
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

        for (let i = 1; i <= 10; i++) {
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
}
