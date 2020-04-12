import { Pipe, PipeTransform } from '@angular/core';
import { PlayersService } from '../services/players.service';

@Pipe({
  name: 'duplicateNames'
})
export class DuplicateNamesPipe implements PipeTransform {

  constructor(private playerService: PlayersService) {}
  transform(value: string, ...args: unknown[]): any {
    let returnVal: string;
    let indexCount: number = 0;
    for(let i = 0; i < this.playerService.players.length; i++) {
      if(this.playerService.players[i].firstName === value) {
        indexCount++;
      }
    }
    if(indexCount > 1) {
      returnVal = value + '(duplicate)';
    } else {
      returnVal = value;
    }
    console.log(value + 'times: ' + indexCount);
    return returnVal;
  }

}
