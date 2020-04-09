import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public courses: Course[] = [];
  public loaded: boolean = false;
  public courseSelected: boolean;
  public selectedCourse: any;
  public teeType: any = null;

  constructor(
    public courseService: CoursesService,
    public playersService: PlayersService
  ) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(course => {
      this.courses = course.courses;
      this.loaded = true;
    })
  }
  handleChange() {
    this.playersService.setTeeType(this.teeType);
  }
  selectCourse(course) {
    this.courseSelected = false;
    let id = course.id;
    this.courseService.getSelectedCourse(id).subscribe(course => {
      this.courseSelected = true;
      this.selectedCourse = course.data;
      this.courseService.setSelectedCourse(course.data);
    })
  }
  deSelectCourse() {
    setTimeout(() => {
      this.courseSelected = false;
      let deActivate = null;
      this.courseService.setSelectedCourse(deActivate);
    }, 100)
  }
}
