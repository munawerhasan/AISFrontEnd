import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment, masterServices } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private http :HttpClient
  ) { }
  
  getMasterTopic(){
    return this.http.get<any>(`${environment.baseUrl}${masterServices.getMasterTopicListAPI}`)
  }
  
  getMasterTopicListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getTopicListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }

  getSubjectTopicByschoolIdAndsubjectChapterId(schoolId, status, subjectChapterId) {
    return this.http.get(`${environment.baseUrl}${masterServices.getTopicListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status + '&subjectChapterId=' + subjectChapterId}`);
  }

  addMasterTopic(data:any){
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterTopicAPI}`, data);
  }
  getMasterTopicById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterTopicByIdAPI}${'?id=' + id}`);
  }
  updateMasterTopic(data:any) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.updateMasterTopicAPI}`, data);
  }

}
