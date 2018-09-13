import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Player } from './player/player.interface';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
    showPlayers = false;
    players: Player[] = [];
    gameScore = 0;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.subscribe('players', data => {
            if (data['gameStarted']) {
                this.showPlayers = data['gameStarted'];
            }

            if (data['gameScore']) {
                this.gameScore = data['gameScore'];
            }
        });

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
    }

}
