import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, feeServices} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private http: HttpClient) { }


  getPaymentListGeneric(schoolId, userId) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPaymentListGenericAPI}${'?schoolId=' + schoolId + '&userId=' + userId}`);
  }

  getPendingFeeListGeneric(schoolId, masterClassId, masterSectionId,totalDueMin,totalDueMax) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPendingFeeListGenericAPI}${'?schoolId=' + schoolId + '&masterClassId=' + masterClassId + '&masterSectionId=' + masterSectionId+ '&totalDueMin=' + totalDueMin + '&totalDueMax=' + totalDueMax}`);
  }

  getPendingFeeByUserIdAPI(schoolId, studentUserId) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPendingFeeByUserIdAPI}${'?schoolId=' + schoolId + '&studentUserId=' + studentUserId}`);
  }

  getPendingFeeDropDown(schoolId) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPendingFeeDropDownAPI}${'?schoolId=' + schoolId}`);
  }
  getPendingFeeByGroup(schoolId) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPendingFeeByGroupAPI}${'?schoolId=' + schoolId}`);
  }
  getPaymentByGroupByDateFilter(schoolId,fromDate,toDate) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPaymentByGroupAPI}${'?schoolId=' + schoolId+ '&fromDate=' + fromDate+ '&toDate=' + toDate}`);
  }
  getPaymentByGroup(schoolId) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPaymentByGroupAPI}${'?schoolId=' + schoolId}`);
  }
  getPendingFeeListExport(schoolId) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPendingFeeListExportAPI}${'?schoolId=' + schoolId}`);
  }
  getPaymentListExport(schoolId) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPaymentListExportAPI}${'?schoolId=' + schoolId}`);
  }

}
