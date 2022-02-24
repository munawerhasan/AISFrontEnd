import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, masterServices } from 'src/environments/environment';
import { AuthService } from '../../../../core/auth/auth.service';
import { DepartmentMasterModel } from "../../../masterdataconfiguration/models/department-master/department-master";
@Injectable({
  providedIn: 'root'
})
export class DepartmentmasterService {
  schoolId = 0;
  status = 0;

  constructor(private http: HttpClient, authSerivce: AuthService) { 
    this.schoolId = authSerivce.currentUserValue.schoolId;
    this.status = 1;
  }
  getDepartmentListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterDepartmentListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  MasterDepartment() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterDepartmentListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }
  addMasterDepartment(MasterDepartmentModel: DepartmentMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterDepartmentAPI}`, MasterDepartmentModel);
  }

  getMasterDepartmentById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterDepartmentByIdAPI}${'?id=' + id}`);
  }
  updateMasterDepartment(MasterDepartmentModel: DepartmentMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.updateMasterDepartmentAPI}`, MasterDepartmentModel);
  }
  
}
