import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlayersService } from 'src/app/services/players.service';
import { ScoringService } from 'src/app/services/scoring.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit { 
  public form: FormGroup;
  public gameName: string;
  public existingGameName: string;
  public boolNewGame: boolean;
  public gameLoaded: boolean = false;
  public games;
  public players;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayersService,
  ) { 
    this.gameLoaded = this.playerService.gameName == undefined ? false : true;
    if(this.playerService.gameName != undefined) {this.getPlayers()}
  }
  ngOnInit(): void {
    this.form = this.fb.group({firstName: [''],lastName: [''],nickName: [''],age: ['']})
    this.playerService.getGames().subscribe(games => {this.games = games;})
  }
  existingGame(){
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
    this.playerService.newGame(this.gameName);
    this.gameName = '';
    this.gameLoaded = true;
    this.getPlayers();
  }
  existingGameRender() {this.boolNewGame = false;}
  newGameRender(){this.boolNewGame = true;}
  resetForm() {this.form.reset()}
}
