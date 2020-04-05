import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {}

  public URL: string = 'https://golf-courses-api.herokuapp.com/courses';
  public selectedCourseData: any;

  getCourses() {
    return this.http.get<any>(this.URL);
  }
  getSelectedCourse(courseId) {
    return this.http.get<any>(`${this.URL}/${courseId}`);
  }
  setSelectedCourse(course) {
    if(course == null) {
      this.selectedCourseData = undefined;
    } else {
      this.selectedCourseData = course;
    }
  }

}
