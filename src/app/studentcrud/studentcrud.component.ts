import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.css'],
})
export class StudentcrudComponent implements OnInit {
  studentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  stname: string = '';
  course: string = '';
  fee: string = '';
  currentStudentId = '';

  constructor(private http: HttpClient) {
    this.getAllStudent();
  }

  ngOnInit(): void {}

  getAllStudent() {
    console.log('test');
    this.http
      .get('http://localhost:8080/api/student/')
      .subscribe((resultData: any) => {
        console.log('resultData', resultData);
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.studentArray = resultData.data;
      });
  }

  register() {
    let bodyData = {
      stname: this.stname,
      course: this.course,
      fee: this.fee,
    };

    this.http
      .post('http://localhost:8080/api/student/add', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('employee registered successfully');
        this.getAllStudent();
      });
  }

  setUpdate(data: any) {
    this.stname = data.stname;
    this.course = data.course;
    this.fee = data.fee;
  }

  updateRecords() {
    let bodyData = {
      stname: this.stname,
      course: this.course,
      fee: this.fee,
    };
    this.http
      .post(
        'http://localhost:8080/api/student/update' +
          '/' +
          this.currentStudentId,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('employee registered ');
        this.getAllStudent();
      });
  }

  save() {
    if (this.currentStudentId == '') {
      this.register();
    } else {
      this.updateRecords;
    }
  }

  setDelete(data: any) {
    console.log('data', data)
    this.http.delete("http://localhost:8080/api/student/delete/" + data).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student deleted successfully");
      this.getAllStudent();
    });
  }
}
