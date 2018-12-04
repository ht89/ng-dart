import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';
import { updateScore, updateStatus } from '../game/game.actions';
import { Game } from '../game/game.interface';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss', '../app.component.scss']
})
export class GameStartComponent implements OnInit {
  gameScore: number;
  gameStarted = true;
  private gameScoreSubject = new Subject<any>();

  readonly gameStartTxt = 'Start Game';
  readonly gameResetTxt = 'Reset Game';
  btnTxt = this.gameStartTxt;

  @ViewChild('gameScoreInput') gameScoreInput: ElementRef;

  constructor(private appService: AppService,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.gameScoreSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(res => {
          this.store.dispatch(updateScore(this.gameScore));
        })
      )
      .subscribe();
  }

  init() {
    if (this.gameStarted) {
      this.handleStartedGames();
    } else {
      this.handleEndedGames();
    }
  }

  handleStartedGames() {
    if (this.gameScore > 0) {
      this.store.dispatch(updateStatus(this.gameStarted));

      this.btnTxt = this.gameResetTxt;
      this.gameStarted = false;
    }
  }

  handleEndedGames() {
    this.store.dispatch(updateStatus(this.gameStarted));

    this.btnTxt = this.gameStartTxt;
    this.gameStarted = true;
    this.gameScore = null;

    this.gameScoreInput.nativeElement.focus();
  }

  onGameScoreChange() {
    this.gameScoreSubject.next(this.gameScore);
  }
}
