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

  saveScores(player) {
    let gameName = this.playersService.gameName;
    this.db.collection('games').doc(gameName)
      .collection('users').doc(player.firstName)
      .update({scores: player.scores});
  }
  resetScores() {
    this.playersService.players.forEach(player => {
      this.db.collection('games').doc(this.playersService.gameName)
        .collection('users').doc(player.firstName)
        .update({scores: Array(18).fill(0)})
    })
  }
}
