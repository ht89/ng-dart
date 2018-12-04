import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';
import { updateScore } from '../game/game.actions';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss', '../app.component.scss']
})
export class GameStartComponent implements OnInit {
  gameScore: number;
  game$;
  private gameScoreSubject = new Subject<any>();

  gameStarted = true;
  readonly gameStartTxt = 'Start Game';
  readonly gameResetTxt = 'Reset Game';
  btnTxt = this.gameStartTxt;

  @ViewChild('gameScoreInput') gameScoreInput: ElementRef;

  constructor(private appService: AppService,
    private store: Store<AppState>) {

    this.game$ = this.store
      .select(state => state.game);

    this.game$.subscribe(data => {
      console.log(data);
    });

  }

  ngOnInit() {
    this.gameScoreSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(res => {
          // this.appService.publish('players', { gameScore: this.gameScore });
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
      this.btnTxt = this.gameResetTxt;
      this.gameStarted = false;

      this.appService.publish('players', { gameStarted: true, gameScore: this.gameScore });
    }
  }

  handleEndedGames() {
    this.btnTxt = this.gameStartTxt;
    this.gameStarted = true;
    this.gameScore = null;

    this.gameScoreInput.nativeElement.focus();

    this.appService.publish('players', { gameStarted: false });
  }

  onGameScoreChange() {
    this.gameScoreSubject.next(this.gameScore);
  }
}
