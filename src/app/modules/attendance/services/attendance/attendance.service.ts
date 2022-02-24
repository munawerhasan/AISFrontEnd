import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, identityServices, studentServices, personalDetailServices, parentDetailServices,feeServices, dashboardServices } from 'src/environments/environment';
//import { StudentModel } from '../../../models/student-model';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http:HttpClient) { }

 getStudentListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${studentServices.getStudentListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  getStudentListByMasterClassAndMasterSectionAPI(masterClassId, masterSectionId, schoolId) {
    return this.http.get<any>(`${environment.baseUrl}${studentServices.getStudentListByMasterClassAndMasterSectionAPI}${'?masterClassId=' + masterClassId + '&masterSectionId=' + masterSectionId + '&schoolId=' + schoolId}`);
  }
}
