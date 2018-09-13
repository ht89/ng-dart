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

    @Output() updateScore = new EventEmitter<Score>();

    private scoreSubject = new Subject<any>();

    constructor() { }

    ngOnInit() {
        this.scoreSubject
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                map(res => {
                    console.log(res);

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
