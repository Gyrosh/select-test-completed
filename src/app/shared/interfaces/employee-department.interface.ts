import { Employee } from "./employee.interface";

export interface EmployeeWithDepartment extends Employee {
    department?: string;
}