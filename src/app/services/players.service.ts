import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter } from 'minimatch';
import { Game } from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  constructor(private db: AngularFirestore) { }
  
  public players: any[] = [];
  public teeType: any;
  public gameName: any = undefined;
  public selectedTeeType: boolean = false;
  public games: any = [];

  setGameName(name) {this.gameName = name;}
  setTeeType(type) {this.teeType = type; this.selectedTeeType = true;}

  getGames(course: string) {
    return this.db.collection<Game>('games', ref => ref.where('course', '==', course)).valueChanges();
  }

  newGame(name, courseName){
    this.gameName = name; 
    this.db.collection<Game>('games').doc(name).set({gameName: name, course: courseName});
  }
  getPlayers(){
    if(this.gameName != undefined) {
      this.db.collection<Game>('games').doc(this.gameName).collection<Player>('users').valueChanges().subscribe(players => {
        this.players = players;
      })
      return this.db.collection<Game>('games').doc(this.gameName).collection<Player>('users').valueChanges();
    }
  }
  addPlayer(info) {
    if(this.players.length === 4) return;
    else {
      this.players.push(new Player(
        info.firstName, info.lastName, info.nickName, info.age
      ));
      this.db.collection('games').doc(this.gameName).collection('users').doc(info.firstName).set({
        firstName: info.firstName,
        lastName: info.lastName,
        nickName: info.nickName,
        age: info.age,
        scores: this.players[this.players.length -1].scores
      });
    }
  }
}
