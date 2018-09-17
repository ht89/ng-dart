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
    @Input() value: number;

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
}
