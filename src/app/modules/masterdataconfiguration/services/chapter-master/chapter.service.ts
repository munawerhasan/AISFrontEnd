import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment, masterServices } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(
    private http :HttpClient
  ) { }
  
  getMasterChapter(){
    return this.http.get<any>(`${environment.baseUrl}${masterServices.getMasterChapterListAPI}`)
  }
  
  getMasterChapterListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getChapterListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }

  getSubjectChapterByschoolIdAndsubjectUnitId(schoolId,status, subjectUnitId){
    return this.http.get(`${environment.baseUrl}${masterServices.getSubjectUnitByschoolIdAndsubjectUnitId}${'?schoolId=' + schoolId + '&status=' + status + '&subjectUnitId=' + subjectUnitId}`);
  }

  addMasterChapter(data:any){
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterChapterAPI}`, data);
  }
  
  getMasterChapterById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterChapterByIdAPI}${'?id=' + id}`);
  }

  updateMasterChapter(data:any) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.updateMasterChapterAPI}`, data);
  }
  
}
