import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  newEmployeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.required),
  });
  editData: any;
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http.post<any>('http://localhost:8080/employee/add', data);
  }

  getEmployee() {
    console.log('Hello');
    return this.http.get<any>('http://localhost:8080/employee/all');
  }

  updateEmployee(data: any, id: number) {
    return this.http.put<any>(
      'http://localhost:8080/employee/update/' + id,
      data
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>('http://localhost:8080/employee/delete/' + id);
  }
}
