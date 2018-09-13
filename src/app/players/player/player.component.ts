import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from './player.interface';
import { Score } from '../score/score.interface';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss', '../../app.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {
    @Input() player: Player;
    @Input() gameScore: number;

    remainingScore = '0';
    readonly winnerTxt = 'WINNER!';

    constructor(private appService: AppService) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['gameScore'] && this.gameScore > 0) {
            this.remainingScore = String(this.gameScore);
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

        let totalScore = 0;
        for (const playerScore of this.player.scores) {
            if (playerScore.value > 0) {
                totalScore += Number(playerScore.value);
            }
        }

        this.remainingScore = String(this.gameScore - totalScore);

        if (this.remainingScore === '0') {
            this.remainingScore = this.winnerTxt;

            this.appService.publish('gameStart', { winnerFound: true });
        }
    }
}
