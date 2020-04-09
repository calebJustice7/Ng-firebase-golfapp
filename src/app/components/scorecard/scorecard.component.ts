import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { ScoringService } from 'src/app/services/scoring.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {

  public numHoles: number[] = Array(18).fill(0);
  public selectedCourse: any;
  public teeTypeIndex: number;
  public players: any[] = [];

  constructor(
    private playersService: PlayersService,
    private scoringService: ScoringService,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.selectedCourse = this.coursesService.selectedCourseData;
    for(let i = 0; i < this.selectedCourse.holes[0].teeBoxes.length; i++) {
      let hole = this.selectedCourse.holes[0].teeBoxes[i];
      if(hole.teeType === this.playersService.teeType) this.teeTypeIndex = i;
    }
    this.players = this.playersService.players;
  }
  updateScore(player, hole, event) {
    let val = event.target.value;
    if(isNaN(Number(val)) || val == ' ') {
      event.target.value = '';
      return;
    }
    let activePlayer = this.players[player];
    activePlayer.scores[hole] = Number(val);
    this.players[player] = activePlayer;
  }

  classAssign(player, hole): string {
    let score = this.players[player].scores[hole];
    return Number(score) ? 'no-err' : 'err';
  }
}
