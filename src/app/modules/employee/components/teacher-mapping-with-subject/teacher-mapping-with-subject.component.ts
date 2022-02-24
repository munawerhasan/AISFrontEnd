import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SubjectmasterService } from '../../../masterdataconfiguration/services/subject-master/subjectmaster.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { AuthService } from "../../../../core/auth/auth.service";
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-teacher-mapping-with-subject',
  templateUrl: './teacher-mapping-with-subject.component.html', 
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss'],
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
  providers: [MessageService]
})
export class TeacherMappingWithSubjectComponent implements OnInit {
  first = 0;
  rows = 10;
  submitted: boolean;
  mapDialog: boolean;
  @ViewChild('dt') table: Table;
  employeeData: any;
  data: any;
  classData: any; 
  masterClassId = 0;
  masterSectionId = 0;
  selectedUserId = 0;
  masterSubjectId = 0;
  sectionData: any;        //[{name:'A', code:'IV'},{name:'B', code:'III'},{name:'D', code:'IX'},{name:'C', code:'II'}]
  subjectData: any;        //[{name:'Hindi', code:'IV'},{name:'Eng', code:'III'},{name:'Maths', code:'IX'},{name:'Science', code:'II'}]
  subjectMaster: any;      //[{name:'Hindi', code:'IV'},{name:'Eng', code:'III'},{name:'Maths', code:'IX'},{name:'Science', code:'II'}]
  form: FormGroup;
  teacherName:any;
  

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private subjectmasterService: SubjectmasterService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      masterClassId: [null, Validators.required],
      masterSectionId: [null, Validators.required],
      masterSubjectId: [null, Validators.required],
      teacherUserId: [null, Validators.required],
      schoolId: [this.authService.currentUserValue.schoolId],
      createdByUserId: [this.authService.currentUserValue.id]
    });
    this.employeeService.getEmployeeListGeneric(this.authService.currentUserValue.schoolId, 1, 0, 0).subscribe((res: any) => {
      this.employeeData = res.data;
    });
    this.employeeService.getMasterClassListBySchoolIdAndStatus(this.authService.currentUserValue.schoolId, 1).subscribe(res => {
      this.classData = res.data;
    });
    this.subjectmasterService.getMasterSubjectListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.subjectMaster = res.data;
    });
  }

  onSelectTeacher(event) {
    let selectedUserData = event.option.value;
    this.teacherName = selectedUserData.name
    console.log("TeacherName",  this.teacherName)
    console.log("selectedUserId", selectedUserData)
    this.selectedUserId = selectedUserData.userId;
    console.log("selectedUserId", this.selectedUserId)
    this.employeeService.getMasterSectionListByMasterClass(this.authService.currentUserValue.schoolId, 1, this.masterClassId).subscribe(res => {
      this.sectionData = res.data;
      console.log("SelectedId", this.selectedUserId)
      this.employeeService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 0, this.selectedUserId, 0, 0, 0).subscribe(res => {
        this.data = res.data;
        console.log("OnSelectTeacher", this.data)
      });
    })
  }
  onSelectClass(event) {
    let masterClassData = event.value;
    this.masterClassId = masterClassData.masterClassId;
    console.log("masterClassId", this.masterClassId)
    this.employeeService.getMasterSectionListByMasterClass(this.authService.currentUserValue.schoolId, 1, this.masterClassId).subscribe(res => {
      this.sectionData = res.data;
    })
  }
  onSelectSection(event) {
    let masterSectionData = event.value;
    this.masterSectionId = masterSectionData.masterSectionId;
    console.log("masterSectionId ", this.masterSectionId)
    this.employeeService.getMasterSubjectListByMasterClassAndSection(this.authService.currentUserValue.schoolId, 1, this.masterClassId, this.masterSectionId).subscribe(res => {
      this.subjectMaster = res.data;
    })
  }
  onSelectSubject(event) {
    let masterSubjectData = event.option.value;
    this.masterSubjectId = masterSubjectData.masterSubjectId;
    console.log("masterSubjectId", this.masterSubjectId)
  }

  onSubmit() {
    this.submitted=true;
    console.log("SelectedId", this.selectedUserId)
    console.log("FormValue2", this.form.value)
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      masterClassId: parseInt(this.form.value.masterClassId.masterClassId),
      masterSectionId: parseInt(this.form.value.masterSectionId.masterSectionId),
      masterSubjectId: parseInt(this.form.value.masterSubjectId.masterSubjectId),
    })
    this.form.controls['teacherUserId'].setValue(this.selectedUserId);
    this.form.controls['schoolId'].setValue(parseInt(this.form.get('schoolId').value));
    this.form.controls['createdByUserId'].setValue(parseInt(this.form.get('createdByUserId').value));
    console.log("FormValue3", this.form.value)
    this.employeeService.addSubjectTeacherMapping(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: "Mapping successfully submitted", life: 3000 });
            this.employeeService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 0, this.selectedUserId, 0, 0, 0).subscribe(res => {
              this.data = res.data;
              console.log("After submiiting", this.data)
            })
            this.form.reset({
              'createdByUserId': parseInt(this.authService.currentUserValue.id.toString()),
              'schoolId': parseInt(this.authService.currentUserValue.schoolId.toString())
            });
            this.submitted = false;
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          console.log(JSON.stringify(error))
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  mappingList(){
    this.router.navigate(['/employee/mapClass'])
  }
} 
