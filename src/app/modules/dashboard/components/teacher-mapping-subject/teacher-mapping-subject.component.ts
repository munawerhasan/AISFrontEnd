import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectmasterService } from "../../../masterdataconfiguration/services/subject-master/subjectmaster.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { Table } from 'primeng/table';
import { Role } from "../../../../models/role";
import { EmployeeService } from "../../../employee/services/employee/employee.service";
@Component({
  selector: 'app-teacher-mapping-subject',
  templateUrl: './teacher-mapping-subject.component.html',
  styleUrls: ['./teacher-mapping-subject.component.scss']
})
export class TeacherMappingSubjectComponent implements OnInit {
  first = 0;
  rows = 10;
  selectedUserId = 0;
  employeeData:any;
  totalCount:0;
  conditionExpression:string;
  data: any; @ViewChild('dt') table: Table;
  constructor(
    private subjectService: SubjectmasterService,
    private authService: AuthService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.conditionExpression= this.authService.currentUserValue.role;
    this.employeeService.getEmployeeListGeneric(this.authService.currentUserValue.schoolId, 1, 0, 0).subscribe((res: any) => {
      this.employeeData = res.data;
    });

    if(Role.Teacher.indexOf(this.authService.currentUserValue.role) !== -1){
      this.getSubjectData(this.authService.currentUserValue.id)
    }
    
    else{
      this.subjectService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 0, 0, 0, 0, 0).subscribe(res => {
        this.data = res.data;
        console.log("Mapping Teacher", this.data)
      })
    }


  }



  getSubjectData(employeeId){
    this.employeeService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 0, employeeId, 0, 0, 0).subscribe(res => {
      this.data = res.data;
      console.log("OnSelectTeacher", this.data)
      this.totalCount = res.data?.length;
    });
  }

  onSelectTeacher(event) {
    let selectedUserData = event.value;
    console.log("selectedUserId", selectedUserData)
    this.selectedUserId = selectedUserData.userId;
    console.log("selectedUserId", this.selectedUserId)
    this.getSubjectData(this.selectedUserId)
    // this.employeeService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 0, this.selectedUserId, 0, 0, 0).subscribe(res => {
    //   this.data = res.data;
    //   console.log("OnSelectTeacher", this.data)
    //   this.totalCount = res.data?.length;
    // });
  }

}
