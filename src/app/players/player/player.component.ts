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
    @Input() num: number;
    @Input() player: Player;
    @Input() gameScore: number;

    remainingScore = 0;

    readonly winnerTxt = 'WINNER!';
    isWinner = false;

    constructor(private appService: AppService) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['gameScore'] && this.gameScore > 0) {
            this.remainingScore = this.gameScore;
        }
    }

    updatePlayerScore(score: Score) {
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

        this.remainingScore = this.gameScore - totalScore;

        if (this.remainingScore === 0) {
            this.isWinner = true;
        } else {
            this.isWinner = false;
        }

        if (this.player.scores.every(this.containScore)) {
            const index = score.id + 1;
            for (let i = index; i <= index + 10; i++) {
                this.player.scores.push({
                    id: i,
                    value: null
                });
            }
        }
    }

    containScore(score) {
        return score.value !== null && score.value !== undefined;
    }

    deletePlayer() {
        this.appService.publish('players', { playerDeleted: this.player.id });
    }
}
