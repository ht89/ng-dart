import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Score } from './score.interface';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss', '../../app.component.scss']
})
export class ScoreComponent implements OnInit {
    @Input() id: number;
    @Input() score: number;

    @Output() updateScore = new EventEmitter<Score>();

    constructor() { }

    ngOnInit() {
    }

    onScoreChange(event) {
        console.log(this.score);
        this.updateScore.emit({
            id: this.id,
            score: this.score
        });
    }
}
