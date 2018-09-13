import { Component, OnInit, Input } from '@angular/core';
import { Player } from './player.interface';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss', '../../app.component.scss']
})
export class PlayerComponent implements OnInit {
    @Input() player: Player;

    remainingScore = 0;

    constructor() { }

    ngOnInit() {
    }

}
