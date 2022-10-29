import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employeemodal } from './employee-modal';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  newEmployeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.required),
  });

  x: number = 0;
  action: string = 'save';
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  clickAddEmployee() {
    this.showAdd = true;
    this.showUpdate = false;
    this.newEmployeeForm.reset();
  }

  employeesData: any;
  postEmployee() {
    console.log('Hey');
    console.log(this.newEmployeeForm);
    if (this.newEmployeeForm.valid) {
      console.log(this.newEmployeeForm.value);
      this.api.postEmployee(this.newEmployeeForm.value).subscribe({
        next: (res) => {
          alert('Employee added successfully');
          this.newEmployeeForm.reset();
          let ref = document.getElementById('cancel');
          ref?.click();
          this.getEmployees();
        },
        error: () => {
          alert('Error while adding employee');
        },
      });
    }
  }

  getEmployees() {
    this.api.getEmployee().subscribe({
      next: (res) => {
        console.log('hi there');
        this.employeesData = res;
      },
      error: () => {
        console.log('error');
      },
    });
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe({
      next: (res) => {
        alert('employee deleted succesfully');
        this.getEmployees();
      },
      error: () => {
        console.log('error');
      },
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    console.log(row);
    this.newEmployeeForm.setValue({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
    });

    console.log(this.newEmployeeForm.value);
    this.x = row.id;
  }

  updateEmployee() {
    this.api.updateEmployee(this.newEmployeeForm.value, this.x).subscribe({
      next: (res) => {
        alert('employee updated succesfully');
        this.newEmployeeForm.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getEmployees();
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
