import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, masterServices } from 'src/environments/environment';
import { AuthService } from '../../../../core/auth/auth.service';
import { SectionMasterModel } from '../../models/section-master/section-master';

@Injectable({
  providedIn: 'root'
})
export class SectionmasterService {
  schoolId = 0;
  status = 0;
  constructor(private http: HttpClient , authSerivce: AuthService) { 
    this.schoolId = authSerivce.currentUserValue.schoolId;
    this.status = 1;
  }
  getMasterSectionListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSectionListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }

  MasterSection() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSectionListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }
  addMasterSection(MasterSectionModel: SectionMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterSectionAPI}`, MasterSectionModel);
  }
  getMasterSectionById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSectionByIdAPI}${'?id=' + id}`);
  }
  updateMasterSection(MasterSectionModel: SectionMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.updateMasterSectionAPI}`, MasterSectionModel);
  }
}
