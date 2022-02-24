import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, schoolServices, identityServices, resetPasswordByAdminServices } from 'src/environments/environment';
import { UserAdminModel } from '../../school/models/user-admin';
import { ResetPasswordByAdmin } from "../../school/models/resetPasswordByAdmin";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getSchoolList() {
    return this.http.get<any>(`${environment.baseUrl}${schoolServices.getSchoolListAPI}`);
  }

  getSchoolById(id) {
    return this.http.get(`${environment.baseUrl}${schoolServices.getSchoolByIdAPI}${'?id=' + id}`);
  } 

  deleteSchoolById(id) {
    return this.http.post(`${environment.baseUrl}${schoolServices.deleteSchoolAPI}`, id);
  }

  addSchool(schoolModel) {
    return this.http.post(`${environment.baseUrl}${schoolServices.addSchoolAPI}`, schoolModel);
  }

  updateSchool(schoolModel) {
    return this.http.post(`${environment.baseUrl}${schoolServices.updateSchoolAPI}`, schoolModel);
  }



  // Admin Service
  getUserList(roleId) {
    return this.http.get(`${environment.baseUrl}${identityServices.getUsersAPI}${'?roleId=' + roleId}`);
  }

  addAccount(accountDetailModel: UserAdminModel) {
    return this.http.post<any>(`${environment.baseUrl}${identityServices.addAccountAPI}`, accountDetailModel);
  }

  resetPasswordByAdmin(resettPasswordByAdmin:ResetPasswordByAdmin) {
    return this.http.post<any>(`${environment.baseUrl}${resetPasswordByAdminServices.updatePasswordAPI}`, resettPasswordByAdmin);
    //return this.http.post<any>('http://111.223.2.137:1002/ResetPasswordByAdmin', resettPasswordByAdmin);
  }

 

}

