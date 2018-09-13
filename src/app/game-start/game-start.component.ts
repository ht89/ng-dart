import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-game-start',
    templateUrl: './game-start.component.html',
    styleUrls: ['./game-start.component.scss', '../app.component.scss']
})
export class GameStartComponent implements OnInit {
    gamePoint: number;

    constructor(private appService: AppService) { }

    ngOnInit() {
    }

    start() {
        if (this.gamePoint > 0) {
            this.appService.publish('players', { gameStarted: true });
        }
    }
}
