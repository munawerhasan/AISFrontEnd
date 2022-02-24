import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, identityServices, employeeServices, personalDetailServices, subjectServices, masterServices } from 'src/environments/environment';
import { EmployeeModel } from "../../../employee/models/employee/employee";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getEmployeeListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get(`${environment.baseUrl}${employeeServices.getEmployeeListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  getEmployeeListGeneric(schoolId, status, masterEmployee, masterDepartment) {
    return this.http.get<any>(`${environment.baseUrl}${employeeServices.getEmployeeListGenericAPI}${'?schoolId=' + schoolId + '&status=' + status + '&masterEmployee=' + masterEmployee + '&masterDepartment=' + masterDepartment}`);
  }
  addEmployee(employeeData: any) {
    return this.http.post<any>(`${environment.baseUrl}${employeeServices.addEmployeeAPI}`, employeeData);
  }
  getEmployeeById(id) {
    return this.http.get<any>(`${environment.baseUrl}${employeeServices.getEmployeeByIdAPI}${'?id=' + id}`);
  }
  updateEmployee(EmployeeModel: EmployeeModel) {
    return this.http.post<any>(`${environment.baseUrl}${employeeServices.updateEmployeeAPI}`, EmployeeModel);
  }

  getSubjectTeacherMappingListGeneric(schoolId, status, teacherUserId, masterClassId, masterSectionId, masterSubjectId) {
    return this.http.get<any>(`${environment.baseUrl}${subjectServices.getSubjectTeacherMappingListGenericAPI}${'?schoolId=' + schoolId + '&status=' + status +'&teacherUserId=' + teacherUserId + '&masterClassId=' + masterClassId + '&masterSectionId=' + masterSectionId+ '&masterSubjectId=' + masterSubjectId}`);
  }
  getMasterClassListBySchoolIdAndStatus(schoolId, status) {
    return this.http.get<any>(`${environment.baseUrl}${masterServices.getMasterClassListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  getMasterSectionListByMasterClass(schoolId, status, masterClassId) {
    return this.http.get<any>(`${environment.baseUrl}${masterServices.getMasterSectionListByMasterClassAPI}${'?schoolId=' + schoolId + '&status=' + status + '&masterClassId=' + masterClassId}`);
  }
  getMasterSubjectListByMasterClassAndSection(schoolId, status, masterClassId, masterSectionId) {
    return this.http.get<any>(`${environment.baseUrl}${masterServices.getMasterSubjectListByMasterClassAndSectionAPI}${'?schoolId=' + schoolId + '&status=' + status + '&masterClassId=' + masterClassId + '&masterSectionId=' + masterSectionId}`);
  }
  addSubjectTeacherMapping(mappingData: any) {
    return this.http.post<any>(`${environment.baseUrl}${subjectServices.addSubjectTeacherMappingAPI}`, mappingData);
  }

}
