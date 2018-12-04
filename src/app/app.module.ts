import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { GameStartComponent } from './game-start/game-start.component';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './players/player/player.component';
import { ScoreComponent } from './players/score/score.component';
import { AppService } from './app.service';
import { playersReducer } from './players/players.reducer';
import { gameReducer } from './game/game.reducer';

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
    FormsModule,
    StoreModule.forRoot({
      players: playersReducer,
      game: gameReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // retain the last 25 states
    }),
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
