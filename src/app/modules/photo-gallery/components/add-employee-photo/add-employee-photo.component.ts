import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../employee/services/employee/employee.service';
import { EmployeeModel } from '../../../employee/models/employee/employee';
import { AuthService } from '../../../../core/auth/auth.service';
import { DepartmentMasterModel} from '../../../masterdataconfiguration/models/department-master/department-master';
import { DepartmentmasterService } from '../../../masterdataconfiguration/services/department-master/departmentmaster.service';
@Component({
  selector: 'app-add-employee-photo',
  templateUrl: './add-employee-photo.component.html',
  styleUrls: ['./add-employee-photo.component.scss']
})
export class AddEmployeePhotoComponent implements OnInit {
  public employeeList: EmployeeModel[];
  data:DepartmentMasterModel[];
  constructor(
    public employeeService: EmployeeService,
    private authService: AuthService, 
    private departmentMasterService: DepartmentmasterService,
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId,0).subscribe((res: any) => {
      this.employeeList = res.data;
    });
    this.departmentMasterService.getDepartmentListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId,0).subscribe((res: any) => {
      this.data = res.data;
    });
  }

  onSelectMasterdepartment(event){

  }

}
