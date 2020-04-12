import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { ScoringService } from 'src/app/services/scoring.service';
import { CoursesService } from 'src/app/services/courses.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
  animations: [
    trigger('insertRemove', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.2s', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ScorecardComponent implements OnInit {

  public numHoles: number[] = Array(18).fill(0);
  public selectedCourse: any;
  public teeTypeIndex: number;
  public players: any[] = [];
  public modalShow: boolean = false;
  public messageShow: boolean = false;
  public message: string = '';

  constructor(
    private playersService: PlayersService,
    private scoringService: ScoringService,
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedCourse = this.coursesService.selectedCourseData;
    for (let i = 0; i < this.selectedCourse.holes[0].teeBoxes.length; i++) {
      let hole = this.selectedCourse.holes[0].teeBoxes[i];
      if (hole.teeType === this.playersService.teeType) this.teeTypeIndex = i;
    }
    this.players = this.playersService.players;
  }
  updateScore(player, hole, event) {
    let val = event.target.value;
    if (isNaN(val) || val == ' ') {
      event.target.value = '';
      return;
    }
    let activePlayer = this.players[player];
    activePlayer.scores[hole] = Number(val);
    this.players[player] = activePlayer;
    this.scoringService.saveScores(activePlayer);
    this.toggleAnimation(hole, val);
  }

  toggleAnimation(hole, val) {
    let par = this.selectedCourse.holes[hole].teeBoxes[this.teeTypeIndex].par
    let score = par - Number(val);
    switch (score) {
      case 0:
        this.message = 'Right On Par';
        break;
      case 1:
        this.message = 'Birdie! Well done';
        break;
      case 2:
        this.message = 'Eagle! Very nice!';
        break;
      case 3:
        this.message = 'Double Eagle! Spectacular!';
        break;
      case -1:
        this.message = 'Bogey! Oh no';
        break;
      case -2:
        this.message = 'Double Bogey! Try improving your swing';
        break;
      default:
        this.message = 'Wow!';
    }
    if (Number(val) === 1) {
      this.message = 'Hole in one!! Great work.';
    }
    this.messageShow = true;
    setTimeout(() => { this.messageShow = !this.messageShow }, 2000)
  }
  toggleModal() {
    this.modalShow = !this.modalShow;
  }

  classAssign(player, hole): string {
    let score = this.players[player].scores[hole];
    return Number(score) ? 'no-err' : 'err';
  }

  clearScores() {
    this.scoringService.resetScores();
    this.toggleModal();
    this.router.navigate(['/add-player']);
    setTimeout(() => { this.router.navigate(['/scorecard']) }, 200)
  }
}
