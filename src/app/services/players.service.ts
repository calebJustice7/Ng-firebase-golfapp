import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  constructor(private db: AngularFirestore) { }
  
  public players: any[] = [];
  public teeType: any;
  public gameName: any = undefined;
  public selectedTeeType: boolean = false;

  setGameName(name) {this.gameName = name;}
  setTeeType(type) {this.teeType = type; this.selectedTeeType = true;}
  getGames() {return this.db.collection('games').valueChanges();}

  newGame(name){
    this.gameName = name; 
    this.db.collection('games').doc(name).set({gameName: name});
  }
  getPlayers(){
    if(this.gameName != undefined) {
      this.db.collection('games').doc(this.gameName).collection('users').valueChanges().subscribe(players => {
        this.players = players;
      })
      return this.db.collection('games').doc(this.gameName).collection('users').valueChanges();
    }
  }
  addPlayer(info) {
    if(this.players.length === 4) return;
    else {
      this.players.push(new Player(
        info.firstName, info.lastName, info.nickName, info.age
      ));
      this.db.collection('games').doc(this.gameName).collection('users').add({
        firstName: info.firstName,
        lastName: info.lastName,
        nickName: info.nickName,
        age: info.age,
        scores: this.players[this.players.length -1].scores
      });
    }
  }
}
