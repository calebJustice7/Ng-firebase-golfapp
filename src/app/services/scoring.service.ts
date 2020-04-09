import { Injectable } from '@angular/core';
import { PlayersService } from './players.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  constructor(
    private playersService: PlayersService,
    private db: AngularFirestore
  ) {}

  saveScores(playerIdx, holeIdx) {
    let players = this.playersService.players;
    let selectedPlayer = players[playerIdx];
    let gameName = this.playersService.gameName;
    this.db.collection('games').doc(gameName)
      .collection('users').doc(selectedPlayer.firstName)
      .update({scores:selectedPlayer.scores});
  }
}
