import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss', '../../app.component.scss']
})
export class ScoreComponent implements OnInit {
    @Input() id: number;
    @Input() score: number;

    constructor() { }

    ngOnInit() {
    }

}
