import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-game-start',
    templateUrl: './game-start.component.html',
    styleUrls: ['./game-start.component.scss', '../app.component.scss']
})
export class GameStartComponent implements OnInit {
    gameScore: number;

    constructor(private appService: AppService) { }

    ngOnInit() {
    }

    start() {
        if (this.gameScore > 0) {
            this.appService.publish('players', { gameStarted: true, gameScore: this.gameScore });
        }
    }
}
