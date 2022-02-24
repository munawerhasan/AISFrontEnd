import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, masterServices } from 'src/environments/environment';
import { OccupationMasterModel } from "../../../masterdataconfiguration/models/occupation-master/occupation-master";

@Injectable({
  providedIn: 'root'
})
export class OccpationmasterService {

  constructor(private http: HttpClient) { }

  getMasterOccupationListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterOccupationListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  addMasterOccupation(MasterOccupationModel: OccupationMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterOccupationAPI}`, MasterOccupationModel);
  }
  getMasterOccupationById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterOccupationByIdAPI}${'?id=' + id}`);
  }

  updateMasterOccupation(MasterOccupationModel: OccupationMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.updateMasterOccupationAPI}`, MasterOccupationModel);
  }
}
