import { Component, OnInit, ViewChild } from '@angular/core';
import {Table} from 'primeng/table';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import { EmployeeModel } from '../../models/employee/employee';
import { AuthService } from '../../../../core/auth/auth.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss', './employee-list.component.scss', '../../../../../assets/sass/layout/_loader.scss'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }
    `],
})
export class EmployeeListComponent implements OnInit {
  loader = true;
  public employeeList: EmployeeModel[];
  first = 0;
  rows = 10;
  submitted:boolean;
  showEmployeeTable=false;
  @ViewChild('dt') table: Table;
  constructor(
    public employeeService: EmployeeService,
    private router: Router,
    private authService: AuthService, 
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId,0).subscribe((res: any) => {
      this.employeeList = res.data;
      this.loader=false;
    });
  }

  addNewEmployee(){
    this.router.navigate(['/employee/add'])
  }
  employeeTable(){
    this.showEmployeeTable=true;
  }


}
