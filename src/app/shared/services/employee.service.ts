import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/shared/interfaces/employee.interface';
import { EmployeeWithDepartment } from '../interfaces/employee-department.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Promise<Employee[]> {
    return this.http
      .get<Employee[]>('assets/mocks/employees.json')
      .toPromise()
      .then((employees: Employee[]) => {
        return employees;
      });
  }

  getEmployeesWithDepartments(): Promise<Employee[]> {
    return this.http
      .get<EmployeeWithDepartment[]>('assets/mocks/employees-with-department.json')
      .toPromise()
      .then((employees: EmployeeWithDepartment[]) => {
        return employees;
      });
  }
}
