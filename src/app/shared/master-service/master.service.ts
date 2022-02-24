import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, masterServices } from 'src/environments/environment';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  schoolId = 0;
  status = 0;
  constructor(private http: HttpClient, authSerivce: AuthService) {
    this.schoolId = authSerivce.currentUserValue.schoolId;
    this.status = 1;
  }

  Countries() {
    return this.http.get(`${environment.baseUrl}${masterServices.getCountryListAPI}`);
  }
  States() {
    return this.http.get(`${environment.baseUrl}${masterServices.getStateListAPI}`);
  }
  MasterBatch() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterBatchListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }
  MasterClass() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterClassListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }
  MasterDepartment() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterDepartmentListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }
  MasterDocument() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterDocumentListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }
  MasterEmployee() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterEmployeeListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }
 
  MasterOccupation() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterOccupationListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }
                                                   
  MasterSection() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSectionListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }

  MasterSubject() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSubjectListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }

  MasterWing() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterWingListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }

}
