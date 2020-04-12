import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlayersService } from 'src/app/services/players.service';
import { CoursesService } from 'src/app/services/courses.service';
import { trigger, transition, state, style, animate } from '@angular/animations';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit { 
  public form: FormGroup;
  public gameName: string;
  public existingGameName: string;
  public boolNewGame: boolean;
  public gameLoaded: boolean = false;
  public games
  public players;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayersService,
    private courseService: CoursesService
  ) { 
    this.gameLoaded = this.playerService.gameName == undefined ? false : true;
    if(this.playerService.gameName != undefined) {this.getPlayers()}
  }
  ngOnInit(): void {
    this.form = this.fb.group({firstName: [''],lastName: [''],nickName: [''],age: ['']})
    if(this.courseService.selected == true) {
      this.playerService.getGames(this.courseService.selectedCourseData.name).subscribe(games => {
        this.games = games;
      })
    }
  }
  existingGame(){
    if(this.existingGameName == undefined) return;
    this.playerService.setGameName(this.existingGameName);
    this.gameLoaded = true;
    this.getPlayers();
  }
  getPlayers(){
    this.playerService.getPlayers().subscribe(players => {this.players = players;})
  }
  saveUser() {
    this.playerService.addPlayer(this.form.value);
    this.form.reset();
  }
  newGame(){ 
    if(this.gameName == undefined) return;
    this.playerService.newGame(this.gameName, this.courseService.selectedCourseData.name);
    this.gameName = '';
    this.gameLoaded = true;
    this.getPlayers();
  }
  existingGameRender() {
    if(this.courseService.selected == true) {
      this.boolNewGame = false;
    }
  }
  newGameRender(){
    if(this.courseService.selected == true) {
      this.boolNewGame = true;
    }
  }
  resetForm() {this.form.reset()}
}
