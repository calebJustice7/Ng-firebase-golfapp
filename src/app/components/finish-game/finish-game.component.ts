import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnInit {

  public players: Player[];
  public scores: number[] = [];

  constructor(
    public playersService: PlayersService
  ) { }

  ngOnInit(): void {
    this.playersService.getPlayers().subscribe(players => {
      this.players = players;
      this.getScores();
    })
  }

  getScores(){
    let scoreArr = Array(this.players.length).fill(0);
    this.players.forEach((player, idx) => {
      for(let i = 0; i < player.scores.length; i++) {
        scoreArr[idx] += player.scores[i];
      }
    })
    this.scores = scoreArr;
  }

}
