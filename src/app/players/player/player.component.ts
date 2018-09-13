import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from './player.interface';
import { Score } from '../score/score.interface';

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

    updatePlayerScore(score: Score) {
        console.log(score);

        for (const playerScore of this.player.scores) {
            if (playerScore.id === score.id) {
                playerScore.value = score.value;
                break;
            }
        }

    }
}
