import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameStartComponent } from './game-start/game-start.component';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './players/player/player.component';
import { ScoreComponent } from './players/score/score.component';

@NgModule({
    declarations: [
        AppComponent,
        GameStartComponent,
        PlayersComponent,
        PlayerComponent,
        ScoreComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
