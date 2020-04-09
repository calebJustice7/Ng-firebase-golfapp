import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public courseService: CoursesService,
    public playerService: PlayersService
  ) { }

  ngOnInit(): void {

  }

}
