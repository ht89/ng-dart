import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
    showPlayers = false;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.appService.subscribe('players', data => {
            if (data['gameStarted']) {
                this.showPlayers = data['gameStarted'];
            }
        });
    }

}
