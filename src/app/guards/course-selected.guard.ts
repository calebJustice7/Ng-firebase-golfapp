import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayersService } from '../services/players.service';

@Injectable({
  providedIn: 'root'
})
export class CourseSelectedGuard implements CanActivate {
  constructor(private playerService: PlayersService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.playerService.gameName == undefined) {
      return false;
    } else if(this.playerService.gameName != undefined){
      return true;
    }
  }
  
}
