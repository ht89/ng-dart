import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-game-start',
    templateUrl: './game-start.component.html',
    styleUrls: ['./game-start.component.scss', '../app.component.scss']
})
export class GameStartComponent implements OnInit {
    gameScore: number;

    startGame = true;
    readonly gameStartTxt = 'Start Game';
    readonly gameResetTxt = 'Reset Game';
    btnTxt = this.gameStartTxt;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.subscribe('gameStart', data => {
            if (data['winnerFound']) {
                this.startGame = false;
                this.btnTxt = this.gameResetTxt;

            }
        });
    }

    init() {
        if (this.startGame) {
            this.btnTxt = this.gameResetTxt;
            this.startGame = false;

            if (this.gameScore > 0) {
                this.appService.publish('players', { gameStarted: true, gameScore: this.gameScore });
            }
        } else {
            this.btnTxt = this.gameStartTxt;
            this.startGame = true;

            this.appService.publish('players', { gameStarted: false });
        }
    }
}
