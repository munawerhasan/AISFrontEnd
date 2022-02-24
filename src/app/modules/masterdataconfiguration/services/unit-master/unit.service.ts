import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment, masterServices } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(
    private http :HttpClient
  ) { }

  getMasterUnit(){
    return this.http.get<any>(`${environment.baseUrl}${masterServices.getMasterUnitListAPI}`)
  }
  
  getMasterUnitListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getUnitListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }

  getMasterUnitListBymasterClassIdAndmasterSubjectId(schoolId, status, masterClassId, masterSubjectId) {
    return this.http.get(`${environment.baseUrl}${masterServices.getSubjectUnitBymasterClassIdAndMasterSubjectId}${'?schoolId=' + schoolId + '&status=' + status + '&masterClassId=' + masterClassId +'&masterSubjectId= '+masterSubjectId}`);
  }

  addMasterUnit(data:any){
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterUnitAPI}`, data);
  }
  getMasterUnitById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterUnitByIdAPI}${'?id=' + id}`);
  }
  updateMasterUnit(data:any) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.updateMasterUnitAPI}`, data);
  }
}


