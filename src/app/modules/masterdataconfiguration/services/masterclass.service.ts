import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, masterServices } from 'src/environments/environment';
import { AuthService } from '../../../core/auth/auth.service';
import { MasterClassModel} from "../../../models/master-class-model";

@Injectable({
  providedIn: 'root'
})
export class MasterclassService {
  schoolId = 0;
  status = 0;
  constructor(private http: HttpClient, authSerivce: AuthService) {
    this.schoolId = authSerivce.currentUserValue.schoolId;
    this.status = 1;
   }

  getMasterClassListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterClassListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  MasterClass() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterClassListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }
  addMasterClass(MasterClassModel: MasterClassModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterClassAPI}`, MasterClassModel);
  }

  getMasterSubjectByClass(schoolId, status, masterClassId) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSubjectListByClassAPI}${'?schoolId=' +schoolId + '&status=' +status + '&masterClassId=' +masterClassId}`);
  }

  getMasterClassById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterClassByIdAPI}${'?id=' + id}`);
  }

  updateMasterClass(MasterClassModel: MasterClassModel) {
    return this.http.post(`${environment.baseUrl}${masterServices.updateMasterClassAPI}`, MasterClassModel);
  }
  
  MasterSubject() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSubjectListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }

  MasterSection() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSectionListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }

}
