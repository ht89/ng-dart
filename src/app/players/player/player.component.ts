import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
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

    @ViewChild('innerTopContainer') innerTopContainer: ElementRef;
    @ViewChild('hiddenInnerTopContainer') hiddenInnerTopContainer: ElementRef;

    constructor(private appService: AppService) { }

    ngOnInit() {
        window.addEventListener('scroll', (event) => {
            console.log(this.hiddenInnerTopContainer.nativeElement.getBoundingClientRect().y);

            const hiddenInnerTopContainerScrollPos = this.hiddenInnerTopContainer.nativeElement.getBoundingClientRect().y
                || this.innerTopContainer.nativeElement.getBoundingClientRect().top;

            // when the inner top container is at the top of the page
            if (hiddenInnerTopContainerScrollPos <= 0) {
                this.innerTopContainer.nativeElement.style.position = 'fixed';
                this.innerTopContainer.nativeElement.style.top = '0';
            } else {
                this.innerTopContainer.nativeElement.style.position = 'relative';
            }
        });
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
            const index = this.player.scores.length + 1;
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
