import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from './player.interface';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss', '../../app.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {
    @Input() player: Player;
    @Input() gameScore: number;

    remainingScore = 0;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['gameScore'] && this.gameScore > 0) {
            this.remainingScore = this.gameScore;
        }
    }

}
