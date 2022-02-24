import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, identityServices, studentServices, assignmentServices, personalDetailServices, parentDetailServices,feeServices, dashboardServices } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  addAccount(accountDetailModel) {
    return this.http.post<any>(`${environment.baseUrl}${identityServices.addAccountAPI}`, accountDetailModel);
  }

  getStudentList() {
    return this.http.get<any>(`${environment.baseUrl}${studentServices.getStudentListAPI}`);
  }

  getStudentListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${studentServices.getStudentListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  getAssignmentListByStudentAPI(userId, schoolId, status) {
    return this.http.get<any>(`${environment.baseUrl}${assignmentServices.getAssignmentByStudentAPI}${'?studentUserId=' + userId + '&schoolId=' + schoolId + '&status=' + status}`);
  }

  updateUserAssignment(data) {
    return this.http.post<any>(`${environment.baseUrl}${assignmentServices.updateUserAssignmentAPI}`, data);
  }


  getStudentListByMasterClassAndMasterSectionAPI(masterClassId, masterSectionId, schoolId) {
    return this.http.get<any>(`${environment.baseUrl}${studentServices.getStudentListByMasterClassAndMasterSectionAPI}${'?masterClassId=' + masterClassId + '&masterSectionId=' + masterSectionId + '&schoolId=' + schoolId}`);
  }

  getStudentById(id) {
    return this.http.get<any>(`${environment.baseUrl}${studentServices.getStudentByIdAPI}${'?id=' + id}`);
  }

  getStudentByUserId(id) {
    return this.http.get<any>(`${environment.baseUrl}${studentServices.getStudentByUserIdAPI}${'?id=' + id}`);
  }

  deleteStudentById(id) {
    return this.http.post<any>(`${environment.baseUrl}${studentServices.deleteStudentAPI}`, id);
  }

  addStudent(StudentModel) {
    return this.http.post<any>(`${environment.baseUrl}${studentServices.addStudentAPI}`, StudentModel);
  }

  updateStudent(StudentModel) {
    return this.http.post<any>(`${environment.baseUrl}${studentServices.updateStudentAPI}`, StudentModel);
  }


  getPersonalDetailList() {
    return this.http.get(`${environment.baseUrl}${personalDetailServices.getPersonalDetailListAPI}`);
  }

  getPersonalDetailById(id) {
    return this.http.get(`${environment.baseUrl}${personalDetailServices.getPersonalDetailByIdAPI}${'?id=' + id}`);
  }

  deletePersonalDetailById(id) {
    return this.http.post<any>(`${environment.baseUrl}${personalDetailServices.deletePersonalDetailAPI}`, id);
  }

  addPersonalDetail(PersonalDetailModel) {
    return this.http.post<any>(`${environment.baseUrl}${personalDetailServices.addPersonalDetailAPI}`, PersonalDetailModel);
  }

  updatePersonalDetail(PersonalDetailModel) {
    return this.http.post<any>(`${environment.baseUrl}${personalDetailServices.updatePersonalDetailAPI}`, PersonalDetailModel);
  }


  getParentDetailList() {
    return this.http.get(`${environment.baseUrl}${parentDetailServices.getParentDetailListAPI}`);
  }

  getParentDetailById(id) {
    return this.http.get<any>(`${environment.baseUrl}${parentDetailServices.getParentDetailByIdAPI}${'?id=' + id}`);
  }

  deleteParentDetailById(id) {
    return this.http.post<any>(`${environment.baseUrl}${parentDetailServices.deleteParentDetailAPI}`, id);
  }

  addParentDetail(ParentDetailModel) {
    return this.http.post<any>(`${environment.baseUrl}${parentDetailServices.addParentDetailAPI}`, ParentDetailModel);
  }

  updateParentDetail(ParentDetailModel) {
    return this.http.post<any>(`${environment.baseUrl}${parentDetailServices.updateParentDetailAPI}`, ParentDetailModel);
  }

  getStudentDashboard(schoolId, studentUserId) {
    return this.http.get<any>(`${environment.baseUrl}${dashboardServices.getStudentDashboardAPI}${'?schoolId=' + schoolId + '&studentUserId=' + studentUserId}`);
  }

  getPendingFeeByUserIdAPI(schoolId, studentUserId) {
    return this.http.get<any>(`${environment.baseUrl}${feeServices.getPendingFeeByUserIdAPI}${'?schoolId=' + schoolId + '&studentUserId=' + studentUserId}`);
  }

}

