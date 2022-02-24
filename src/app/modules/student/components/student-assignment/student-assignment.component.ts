import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../../../core/auth/auth.service";
import { StudentService } from "../../../student/services/student.service";
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { AssignmentModel } from "../../../../modules/assignment/models/assignment-model/assignment";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss',
  '../../../../../assets/sass/layout/_splash.scss'
],
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
export class StudentAssignmentComponent implements OnInit {
  activeState: boolean[] = [true, false, false];

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }
  public data: AssignmentModel[];
  baseURL = "";
  first = 0;
  rows = 10;
  assignmentDialog = false;
  form: FormGroup;
  selectedAssignement = 0;
  selectedUserAssignement = 0;
  uploadedFiles: any[] = [];
  submitted = false;
  states: any;
  @ViewChild('dt') table: Table;
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.baseURL = environment.baseUrl;
    this.form = this.formBuilder.group({
      feedback: [''],
      assignmentStatus: [null, Validators.required],
      files: [null]
    });
   this.getAssignmentListByStudent()
    this.states = [
      { statesName: 'Completed', code: '1' },
      { statesName: 'Not Completed', code: '2' },
      { statesName: 'Need To Discuss', code: '3' },
      { statesName: 'Other', code: '4' },
    ]
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      assignmentStatus: parseInt(this.form.value.assignmentStatus.code)
    })
    console.log("afterPatchValue", this.form.value)
    var formData: any = new FormData();
    formData.append("userAssignmentId", this.selectedUserAssignement);
    formData.append("AssignmentId", this.selectedAssignement);
    formData.append("AssignmentStatus", this.form.get('assignmentStatus').value);
    formData.append("Feedback", this.form.get('feedback').value);
    formData.append("UserId", parseInt(this.authService.currentUserValue.id.toString()));
    formData.append("SchoolId", parseInt(this.authService.currentUserValue.schoolId.toString()));
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('Files', this.uploadedFiles[i]);
    }
    console.log(JSON.stringify(formData));
    this.studentService.updateUserAssignment(formData)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            console.log("data", data)
            this.assignmentDialog = false
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Assignment successfully sent.', life: 3000 })
            //this.addToast({title:'Successfully Added', msg:'Your Assignment Successfully Submitted', timeout: 5000, theme:'default', position:'top-center', type:'success'})
            this.form.reset();
            this.uploadedFiles = null;
            this.getAssignmentListByStudent()
          }
          else {
            //this.addToast({title:'Error', msg:data.message, timeout: 5000, theme:'default', position:'top-center', type:'error'})
          }

        },
        error => {
          //this.addToast({title:'Error', msg:'Some Error Occured', timeout: 5000, theme:'default', position:'top-center', type:'error'})
        });
  }

  getAssignmentListByStudent(){
    this.studentService.getAssignmentListByStudentAPI(this.authService.currentUserValue.id, this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      console.log("AssignmentList", this.data)
    });

  }

openAssignmentModal(assignmentId, userAssignmentId) {
  this.submitted = false;
  this.assignmentDialog = true
  this.selectedAssignement = assignmentId;
  console.log("this.selectedAssignement", this.selectedAssignement)
  this.selectedUserAssignement = userAssignmentId;
  console.log("this.selectedUserAssignement", this.selectedUserAssignement )
  this.submitted = false;
}

cancelDialog() {
  this.form.reset();
  this.assignmentDialog = false;
}

onUpload(event) {
  console.log("event2", event.files);
  for (const file of event.files) {
    this.uploadedFiles.push(file);
  }
}


}
