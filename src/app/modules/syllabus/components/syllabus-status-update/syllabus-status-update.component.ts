import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { AssignmentService } from "../../../assignment/services/assignment/assignment.service";
import { AuthService } from '../../../../core/auth/auth.service';
import { AssignmentModel } from "../../../assignment/models/assignment-model/assignment";
import { environment } from 'src/environments/environment';
import { MasterclassService } from "../../../masterdataconfiguration/services/masterclass.service";
import { identity } from 'rxjs';
@Component({
  selector: 'app-syllabus-status-update',
  templateUrl: './syllabus-status-update.component.html',
  styleUrls: ['./syllabus-status-update.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }

  @media screen and (max-width: 960px) {
      :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
          text-align: center;
      }

      :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
          display: flex;
      }
  }
`],

})
export class SyllabusStatusUpdateComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private masterService: MasterclassService,
    private assignmentService: AssignmentService
  ) { }
  public data: AssignmentModel[];
  first = 0;
  rows = 10;
  baseURL = "";
  teacherUserId = 0;
  masterClasses: any;
  masterSections: any;
  masterSubject: any;
  classData: any;
  classId = 0;
  sectionId = 0;
  subjectId = 0;
  sectionData: any;
  subjectData: any;
  selectType: any;
  status: any;
  syllabusStatus: any;
  @ViewChild('dt') table: Table;

  ngOnInit(): void {
    this.syllabusStatus = [
      { statusName: 'Rivision', statusId: 1 },
      { statusName: 'In-progress', statusId: 2 },
      { statusName: 'Completed', statusId: 3 },
    ];
    this.baseURL = environment.baseUrl;
    if (this.authService.currentUserValue.role.toString() == "Admin") {
      this.teacherUserId = 0;
    }
    else if (this.authService.currentUserValue.role.toString() == "Teacher") {
      this.teacherUserId = this.authService.currentUserValue.id;
    }
    this.assignmentService.getMasterClassListByTeacher(this.authService.currentUserValue.schoolId, 1, this.teacherUserId).subscribe(res => {
      this.masterClasses = res.data;
    })

    if (this.authService.currentUserValue.role.toString() == "Admin" || this.authService.currentUserValue.role.toString() == "Owner") {
      this.assignmentService.getAssignmentListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
        this.data = res.data;
      });
      this.masterService.MasterClass().subscribe((data: any) => {
        this.masterClasses = data.data;
      });
      this.masterService.MasterSection().subscribe((data: any) => {
        this.masterSections = data.data;
      });
      this.masterService.MasterSubject().subscribe((data: any) => {
        this.masterSubject = data.data;
      });
    }
    else {
      this.assignmentService.getAssignmentListByPublisherAPI(this.authService.currentUserValue.id, this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
        this.data = res.data;
      });
    }

  }

  onSelectClass(event) {
    let selectedMasterClassData = event.value;
    console.log("selectedUserData", selectedMasterClassData)
    this.classId = selectedMasterClassData.masterClassId
    console.log("masterClassId", this.classId)
    this.assignmentService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 1, this.teacherUserId, this.classId, 0, 0).subscribe(res => {
      this.masterSections = res.data;
    })
  }
  onSelectSection(event) {
    let selectedMasterSectionData = event.value;
    console.log("selectedMasterSectionData", selectedMasterSectionData);
    this.sectionId = selectedMasterSectionData.masterSectionId
    console.log("masterSectionId", this.sectionId)
    this.assignmentService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 1, this.teacherUserId, this.classId, this.sectionId, 0).subscribe(res => {
      this.masterSubject = res.data;
    })
  }

  // onSelectSubject(event) {
  //   let selectedMasterSubjectData = event.value;
  //   console.log("selectedMasterSectionData", selectedMasterSubjectData);
  //   this.subjectId = selectedMasterSubjectData.masterSubjectId
  //   console.log("subjectId", this.subjectId)
  //   // this.assignmentService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 1, this.teacherUserId, this.masterClassId, this.masterSectionId, 0).subscribe(res => {
  //   //   this.subjectData = res.data;
  //   // })
  // }

  onSelectStatus(event) {
    let onSelectStatusData = event.value;
    console.log("selectedMasterSectionData", onSelectStatusData);
    this.status = onSelectStatusData.statusId
    console.log("subjectId", this.status)
    // this.assignmentService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 1, this.teacherUserId, this.masterClassId, this.masterSectionId, 0).subscribe(res => {
    //   this.subjectData = res.data;
    // })
  }

  // loadFilteredAssignment() {
  //   this.assignmentService.getAssignmentListByClassSectionSubjectStatusAPI(this.authService.currentUserValue.schoolId, this.status, this.classId, this.sectionId, this.subjectId).subscribe(res => {
  //     this.data = res.data;
  //   })
  // }

  openNew() {
    this.router.navigate(['/assignment/add'])
  }
  assignmentActivity(id) {
    console.log("id", id);
    this.router.navigate(['/assignment/activity/' + id])
  }
}
