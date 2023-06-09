import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/entity/course';
//refernce service which fetches data from the server api
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: Course[] | undefined;
  course: Course = new Course();

  //add dependency on service in constructor. This component must have service available.
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  private getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(response => {
      this.courses = response;
    })
  }

  addCourse(): void {
    // Call the service, which calls the api, which saves to db
    this.courseService.addCourse(this.course).subscribe(response => {
      // refresh the list
      this.getAllCourses();
      //clear the form
      this.clearForm();
    })
  }

  selectCourse(selectedCourse : Course):void{
    this.course.id = selectedCourse.id;
    this.course.title = selectedCourse.title;
    this.course.description = selectedCourse.description;
    this.course.duration = selectedCourse.duration;
    this.course.fees = selectedCourse.fees;
  }

  updateCourse():void{
    this.courseService.updateCourse(this.course).subscribe(response => {
      this.getAllCourses();
      this.clearForm();
    })
  }

  deleteCourse(id : number){
    if(confirm("Are you sure you want to delete this course?")){
      this.courseService.deleteCourse(id).subscribe(response => {
        this.getAllCourses();
        this.clearForm();
      })
    }
  }

  //Clear form will set the value to undefined
  clearForm(): void {
    this.course.id = undefined;
    this.course.title = undefined;
    this.course.description = undefined;
    this.course.duration = undefined;
    this.course.fees = undefined;
  }

}
