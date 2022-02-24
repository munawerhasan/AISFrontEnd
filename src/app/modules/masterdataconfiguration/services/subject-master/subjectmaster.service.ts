import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, masterServices, subjectServices } from 'src/environments/environment';
import { subjectMasterModel } from "../../../masterdataconfiguration/models/subject-master/subject-master";



@Injectable({
  providedIn: 'root'
})
export class SubjectmasterService {

  constructor(private http: HttpClient) { }

  getMasterSubjectListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSubjectListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }

  addMasterSubject(subjecttMasterModel: subjectMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterSubjectAPI}`, subjecttMasterModel);
  }
  getMasterSubjectById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSubjectByIdAPI}${'?id=' + id}`);
  }
  getSubjectListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get<any>(`${environment.baseUrl}${subjectServices.getSubjectListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  getMasterSubjectListByClassAPI(schoolId, masterClassId, status) {
    return this.http.get<any>(`${environment.baseUrl}${masterServices.getMasterSubjectListByClassAPI}${'?schoolId=' + schoolId + '&status=' + status  + '&masterClassId=' + masterClassId}`);
  }
  updateMasterSubject(MasterSubjectModel: subjectMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.updateMasterSubjectAPI}`, MasterSubjectModel);
  }

  getSubjectTeacherMappingListGeneric(schoolId, status, teacherUserId, masterClassId, masterSectionId, masterSubjectId) {
    return this.http.get<any>(`${environment.baseUrl}${subjectServices.getSubjectTeacherMappingListGenericAPI}${'?schoolId=' + schoolId + '&status=' + status +'&teacherUserId=' + teacherUserId + '&masterClassId=' + masterClassId + '&masterSectionId=' + masterSectionId+ '&masterSubjectId=' + masterSubjectId}`);
  }
  deleteSubjectTeacherMappingAPI(id) {
    return this.http.post(`${environment.baseUrl}${subjectServices.deleteSubjectTeacherMappingAPI}`, id);
  }

  mapClassWithSubject(mappingData:any) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.mapClassWithSubject}`, mappingData);
  }

}
