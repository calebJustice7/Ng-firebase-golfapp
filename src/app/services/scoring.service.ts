import { Injectable } from '@angular/core';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  constructor(
    private playersService: PlayersService
  ) {}
}
