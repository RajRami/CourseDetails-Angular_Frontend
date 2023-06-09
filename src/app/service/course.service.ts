import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// needed to make HTTP calls to the server api
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../entity/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // read api url from environment file
  private serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  //get all course
  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.serverUrl}/api/courses`);
  }

  addCourse(course:Course): Observable<Object>{
    return this.http.post(`${this.serverUrl}/api/courses`,course);
  }

  updateCourse(course: Course){
    return this.http.put(`${this.serverUrl}/api/courses/${course.id}`, course);
  }

  deleteCourse(id : number){
    return this.http.delete(`${this.serverUrl}/api/courses/${id}`);
  }
}
