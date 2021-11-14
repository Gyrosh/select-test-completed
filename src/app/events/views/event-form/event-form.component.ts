import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseSelectGroupComponent } from 'src/app/shared/components/base-select-group/base-select-group.component';
import { AUTH_GROUP_TYPE, FIELD_GROUP_TYPE } from 'src/app/shared/components/base-select-group/select-types';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { EmployeeWithDepartment } from 'src/app/shared/interfaces/employee-department.interface';
import { Employee } from 'src/app/shared/interfaces/employee.interface';
import { SelectComponentConfig } from 'src/app/shared/interfaces/select-component-config.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormComponent implements OnInit  {
  form!: FormGroup;
  categories?: Category[];
  employees?: Employee[];
  employeesWithDep?: EmployeeWithDepartment[];
  currentUser?: Employee;
  submitted?: boolean;
  
  categorySelectConfig: SelectComponentConfig<Category>;
  employeesSelectConfig: SelectComponentConfig<Employee>;
  employeesWithDepSelectConfig: SelectComponentConfig<EmployeeWithDepartment>;

  @ViewChild('categorySelect') categorySelect: BaseSelectGroupComponent<Category>;
  @ViewChild('employeeSelect') employeeSelect: BaseSelectGroupComponent<Employee>;
  @ViewChild('employeeWithDepartmentSelect') employeeWithDepartmentSelect: BaseSelectGroupComponent<EmployeeWithDepartment>;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private categoryService: CategoryService,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getCategories();
    await this.getEmployeesWithDepartment();
    await this.getEmployees();
    this.initCurrentUser();
    this.initForm();
    this.initSelectConfig();
    this.changeDetector.detectChanges();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      coordinatorDepId: ['', Validators.required],
      coordinatorId: [this.currentUser?.id ?? '', Validators.required],
      coordinatorPhone: ['', Validators.required]
    });
  }

  initSelectConfig () {
    this.categorySelectConfig = {
      fieldPlaceholder: "Select category (skills, interests, location)",
      valueDataKey: "id",
      displayDataKeys: ["name"]
    };

    this.employeesSelectConfig = {
      fieldPlaceholder: "Please choose a coordinator",
      valueDataKey: "id",
      displayDataKeys: ["name", "lastname"],
      groupByType: {
        type: AUTH_GROUP_TYPE,
        fieldData: this.currentUser
      }
    }

    this.employeesWithDepSelectConfig = {
      fieldPlaceholder: "Please choose a coordinatorDep",
      valueDataKey: "id",
      displayDataKeys: ["name", "lastname"],
      groupByType: {
        type: FIELD_GROUP_TYPE,
        fieldData: "department"
      }
    }
  }

  async getCategories(): Promise<void> {
    this.categories = await this.categoryService.getCategories();
  }

  async getEmployees(): Promise<void> {
    this.employees = await this.employeeService.getEmployees();
  }

  async getEmployeesWithDepartment(): Promise<void> {
    this.employeesWithDep = await this.employeeService.getEmployeesWithDepartments();
  }

  initCurrentUser(): void {
    this.currentUser = this.employees?.[0];
  }

  submit(): void {
    this.submitted = true;
    console.log(this.submitted, this.form);
    if (this.form.valid) {
      console.log(this.form.value);
      this.router.navigate(['success']);
    }
    this.changeDetector.detectChanges();
  }
}
