import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Score } from './score.interface';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss', '../../app.component.scss']
})
export class ScoreComponent implements OnInit, OnDestroy {
  @Input() id: number;
  @Input() value: any;
  @Input() playerId: number;

  @Output() changeInput = new EventEmitter<Score>();
  @Output() focusOnNextInput = new EventEmitter<string>();

  private scoreSubject = new Subject<any>();

  @ViewChild('scoreInput') scoreInput: ElementRef;

  tabKeyListener: any;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.scoreSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(res => {
          this.changeInput.emit({
            id: this.id,
            value: this.value
          });
        })
      )
      .subscribe();

    if (this.scoreInput) {
      this.tabKeyListener = this.renderer.listen(this.scoreInput.nativeElement, 'keydown', (event) => {
        const tabKey = 9;
        if (event.keyCode === tabKey) {
          if (!this.isNumber(this.value)) {
            event.preventDefault();

            this.calculateScore();
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.tabKeyListener();
  }

  onScoreChange() {
    this.scoreSubject.next(this.value);
  }

  isNumber(n) {
    return !isNaN(Number(n)) && isFinite(n);
  }

  calculateScore() {
    if (this.value && this.value.search(/^=[0-9]+(\+|\*){1}/g) !== -1) {
      const numbers = this.value.match(/([0-9]+)/g);
      const formula = this.value.match(/(\+|\*){1}/g);

      if (numbers.length === 2 && formula.length === 1) {
        if (formula[0] === '+') {
          this.value = Number(numbers[0]) + Number(numbers[1]);

          this.changeInput.emit({
            id: this.id,
            value: this.value
          });
        } else if (formula[0] === '*') {
          this.value = Number(numbers[0]) * Number(numbers[1]);

          this.changeInput.emit({
            id: this.id,
            value: this.value
          });
        }
      }
    }
  }
}
