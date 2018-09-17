import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Score } from './score.interface';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss', '../../app.component.scss']
})
export class ScoreComponent implements OnInit {
    @Input() id: number;
    @Input() value: any;

    @Input() playerId: number;

    @Output() updateScore = new EventEmitter<Score>();

    @Output() enterScore = new EventEmitter<string>();

    private scoreSubject = new Subject<any>();

    constructor() { }

    ngOnInit() {
        this.scoreSubject
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                map(res => {
                    this.updateScore.emit({
                        id: this.id,
                        value: this.value
                    });
                })
            )
            .subscribe();
    }

    onScoreChange() {
        this.scoreSubject.next(this.value);
    }

    private isNumber(n) {
        return !isNaN(Number(n)) && isFinite(n);
    }

    calculateScore() {
        if (this.value.search(/^=[0-9]+(\+|\*){1}/g) !== -1) {
            const numbers = this.value.match(/([0-9]+)/g);
            const formula = this.value.match(/(\+|\*){1}/g);

            if (numbers.length === 2 && formula.length === 1) {
                if (formula[0] === '+') {
                    this.value = Number(numbers[0]) + Number(numbers[1]);

                    this.updateScore.emit({
                        id: this.id,
                        value: this.value
                    });
                } else if (formula[0] === '*') {
                    this.value = Number(numbers[0]) * Number(numbers[1]);

                    this.updateScore.emit({
                        id: this.id,
                        value: this.value
                    });
                }
            }
        }
    }
}
