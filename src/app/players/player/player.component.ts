import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Player } from './player.interface';
import { Score } from '../score/score.interface';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss', '../../app.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {
  @Input() playerNumber: number;
  @Input() player: Player;
  @Input() gameScore: number;

  @Output() deletePlayer = new EventEmitter<any>();

  remainingScore = 0;

  readonly winnerTxt = 'WINNER!';
  isWinner = false;

  @ViewChild('topContainer') topContainer: ElementRef;
  @ViewChild('hiddenTopContainer') hiddenTopContainer: ElementRef;

  constructor(private appService: AppService) { }

  ngOnInit() {
    window.addEventListener('scroll', (event) => {
      this.displayPlayersInFullView();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gameScore'] && this.gameScore > 0) {
      this.remainingScore = this.gameScore;

      this.onScoreInputChange();
    }
  }

  displayPlayersInFullView() {
    const hiddenTopContainerScrollPos = this.hiddenTopContainer.nativeElement.getBoundingClientRect().y
      || this.topContainer.nativeElement.getBoundingClientRect().top;

    // when the top container is at the top of the page
    if (hiddenTopContainerScrollPos <= 0) {
      this.topContainer.nativeElement.style.position = 'fixed';
      this.topContainer.nativeElement.style.top = '0';
      this.topContainer.nativeElement.style.paddingBottom = '10px';
      this.topContainer.nativeElement.style.paddingTop = '30px';
    } else {
      this.topContainer.nativeElement.style.position = 'relative';
      this.topContainer.nativeElement.style.paddingBottom = '0';
      this.topContainer.nativeElement.style.paddingTop = '0';
    }
  }

  onScoreInputChange(score: Score = { id: 0, value: null }) {
    for (const playerScore of this.player.scores) {
      if (playerScore.id === score.id) {
        playerScore.value = score.value;
        break;
      }
    }

    this.remainingScore = this.calculateRemainingScore(this.player.scores);

    this.isWinner = this.hasWinner(this.remainingScore);

    this.player.scores = this.addMoreScoreInputs(this.player.scores);
  }

  calculateRemainingScore(scores: Score[]) {
    let totalScore = 0;

    for (const score of scores) {
      if (score.value > 0) {
        totalScore += Number(score.value);
      }
    }

    return this.gameScore - totalScore;
  }

  hasWinner(remainingScore: number) {
    if (remainingScore === 0) {
      return true;
    }
    return false;
  }

  addMoreScoreInputs(scores: Score[]) {
    if (scores.every(this.containValidScore)) {
      const startingIndex = scores.length + 1;
      const endingIndex = startingIndex + 10;

      const scoresClone = [...scores];

      for (let i = startingIndex; i <= endingIndex; i++) {
        scoresClone.push({
          id: i,
          value: null
        });
      }

      return scoresClone;
    }

    return scores;
  }

  containValidScore(score) {
    return score.value !== null && score.value !== undefined;
  }

  focusOnNextScoreInput(nextScoreId) {
    const nextScoreInput = document.querySelector(`.score__input[id=${nextScoreId}]`) as HTMLElement;
    if (nextScoreInput) {
      nextScoreInput.focus();
    }
  }
}
