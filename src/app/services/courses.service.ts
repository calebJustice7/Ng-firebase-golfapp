import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {}

  public URL: string = 'https://golf-courses-api.herokuapp.com/courses';
  public selectedCourseData: any;
  public selected: boolean = false;

  getCourses() {
    let call = this.http.get<any>(this.URL);
    return call;
  }
  getSelectedCourse(courseId) {
    this.selected = true;
    return this.http.get<any>(`${this.URL}/${courseId}`);
  }
  setSelectedCourse(course) {
    if(course == null) {
      this.selectedCourseData = undefined;
      this.selected = false;
    } else {
      this.selectedCourseData = course;
      this.selected = true;
    }
  }

}
