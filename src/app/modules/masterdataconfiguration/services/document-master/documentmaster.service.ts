import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, masterServices } from 'src/environments/environment';
import { DocumentMasterModel } from "../../../masterdataconfiguration/models/document-master/document-master";
import { AuthService } from '../../../../core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DocumentmasterService {

  constructor(private http: HttpClient) { }
  getMasterDocumentListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterDocumentListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  addMasterDocument(MasterDocumentModel: DocumentMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.addMasterDocumentAPI}`, MasterDocumentModel);
  }
  getMasterDocumentById(id) {
    return this.http.get(`${environment.baseUrl}${masterServices.getMasterDocumentByIdAPI}${'?id=' + id}`);
  }
  updateMasterDocument(MasterDocumentModel: DocumentMasterModel) {
    return this.http.post<any>(`${environment.baseUrl}${masterServices.updateMasterDocumentAPI}`, MasterDocumentModel);
  }

}
