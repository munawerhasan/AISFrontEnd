import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, assignmentServices, subjectServices,masterServices } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  addAssignment(data) {
    return this.http.post<any>(`${environment.baseUrl}${assignmentServices.addAssignmentAPI}`, data);
  }
  addAssignmentAssessmentAPI(data) {
    return this.http.post<any>(`${environment.baseUrl}${assignmentServices.addAssignmentAssessmentAPI}`, data);
  }
  getUserAssignmentListGenericAPI(schoolId, status, assignmentId, classId, sectionId, subjectId) {
    return this.http.get<any>(`${environment.baseUrl}${assignmentServices.getUserAssignmentListGenericAPI}${'?schoolId=' + schoolId + '&status=' + status + '&assignmentId=' + assignmentId + '&classId=' + classId + '&sectionId=' + sectionId + '&subjectId=' + subjectId}`);
  }

  getAssignmentListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get<any>(`${environment.baseUrl}${assignmentServices.getAssignmentListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  getAssignmentListByPublisherAPI(userId, schoolId, status) {
    return this.http.get<any>(`${environment.baseUrl}${assignmentServices.getAssignmentByPublisherAPI}${'?publisherUserId=' + userId + '&schoolId=' + schoolId + '&status=' + status}`);
  }
  getAssignmentListByClassSectionSubjectStatusAPI(schoolId, status, classId, sectionId, subjectId) {
    return this.http.get<any>(`${environment.baseUrl}${assignmentServices.getAssignmentListByClassSectionSubjectStatusAPI}${'?schoolId=' + schoolId + '&status=' + status + '&classId=' + classId + '&sectionId=' + sectionId + '&subjectId=' + subjectId}`);
  }

  getMasterClassListByTeacher(schoolId, status, teacherUserId) {
    return this.http.get<any>(`${environment.baseUrl}${masterServices.getMasterClassListByTeacherAPI}${'?schoolId=' + schoolId + '&status=' + status +'&teacherUserId=' + teacherUserId}`);
  }
  getSubjectTeacherMappingListGeneric(schoolId, status, teacherUserId, masterClassId, masterSectionId, masterSubjectId) {
    return this.http.get<any>(`${environment.baseUrl}${subjectServices.getSubjectTeacherMappingListGenericAPI}${'?schoolId=' + schoolId + '&status=' + status +'&teacherUserId=' + teacherUserId + '&masterClassId=' + masterClassId + '&masterSectionId=' + masterSectionId+ '&masterSubjectId=' + masterSubjectId}`);
  }
}
