import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, masterServices } from 'src/environments/environment';
import { AuthService } from '../../../../core/auth/auth.service';
import { MasterBatchModel } from "../../../masterdataconfiguration/models/batch-master/batchMaster";

@Injectable({
  providedIn: 'root'
})
export class BatchmasterService {
  schoolId = 0;
  status = 0;

  constructor(private http: HttpClient, authSerivce: AuthService) {
    this.schoolId = authSerivce.currentUserValue.schoolId;
    this.status = 1;
   }

   getMasterBatchListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterBatchListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  MasterBatch() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterBatchListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }

  addMasterBatch(MasterBatchModel: MasterBatchModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterBatchAPI}`, MasterBatchModel);
  }

  getMasterBatchById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterBatchByIdAPI}${'?id=' + id}`);
  }
  updateMasterBatch(MasterBatchModel: MasterBatchModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.updateMasterBatchAPI}`, MasterBatchModel);
  }

  MasterClass() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterClassListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }

  MasterSection() {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterSectionListBySchoolIdAndStatusAPI}${'?schoolId=' + this.schoolId + '&status=' + this.status}`);
  }

  deleteMasterBatchById(id) {
    return this.http.delete(`${environment.baseUrl}${masterServices.deleteMasterBatchAPI}`, id);
  }
}
