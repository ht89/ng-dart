import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss', '../../app.component.scss']
})
export class PlayerComponent implements OnInit {
    @Input() playerNum: number;

    remainingScore = 0;

    constructor() { }

    ngOnInit() {
    }

}
