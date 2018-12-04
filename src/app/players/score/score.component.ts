import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Score } from './score.interface';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss', '../../app.component.scss']
})
export class ScoreComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: number;
  @Input() value: any;
  @Input() playerId: number;

  @Output() changeInput = new EventEmitter<Score>();
  @Output() focusOnNextInput = new EventEmitter<string>();

  private scoreSubject = new Subject<any>();

  @ViewChild('scoreInput') scoreInput: ElementRef;
  nextScoreInputId = '';

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && changes['playerId'] && this.id && this.playerId) {
      this.nextScoreInputId = `p${this.playerId}s${this.id}`;
    }
  }

  ngOnDestroy() {
    this.tabKeyListener();
  }

  isNumber(n) {
    return !isNaN(Number(n)) && isFinite(n);
  }

  onScoreChange() {
    this.scoreSubject.next(this.value);
  }

  onScoreInputEnter() {
    if (this.isNumber(this.value)) {
      const nextInputId = `p${this.playerId}s${this.id + 1}`;
      this.focusOnNextInput.emit(nextInputId);
    } else {
      this.calculateScore();
    }
  }

  calculateScore() {
    const calculationRegex = /^=[0-9]+(\+|\*){1}/g;
    const numbersRegex = /([0-9]+)/g;
    const formulaRegex = /(\+|\*){1}/g;

    if (this.value && this.value.search(calculationRegex) !== -1) {
      const numbers = this.value.match(numbersRegex);
      const formula = this.value.match(formulaRegex);

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
