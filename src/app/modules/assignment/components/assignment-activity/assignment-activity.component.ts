import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { AssignmentService } from "../../services/assignment/assignment.service";
import { environment, masterUserAssignmentStatus } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-assignment-activity',
  templateUrl: './assignment-activity.component.html',
  styleUrls: ['./assignment-activity.component.scss'],
  providers: [MessageService]
})
export class AssignmentActivityComponent implements OnInit {
  submitted:boolean
  notSeenData: any;
  seenData: any;
  submittedData: any;
  reSubmittedData: any;
  completedData: any;
  assignmentId: any;
  selectedUserId: any;
  first = 0;
  rows = 10;
  baseURL = "";
  assignmentDialog: boolean;
  states: any;
  form: FormGroup;
  index: number = 0;
  constructor(
    private authService: AuthService,
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }
  ngOnInit(): void {
    this.baseURL = environment.baseUrl;
    let id = this.route.snapshot.paramMap.get('id');
    this.assignmentId = parseInt(id);
    console.log("this.assignmentId", this.assignmentId)
    this.form = this.formBuilder.group({
      rating: [0, Validators.required],
      mark: [0],
      remark: [''],
      feedback: [''],
      userAssignmentStatus: [null, Validators.required],
      createdByUserId: [parseInt(this.authService.currentUserValue.id.toString())],
      schoolId: [parseInt(this.authService.currentUserValue.schoolId.toString())],
      userId: [parseInt(this.selectedUserId)],
      assignmentId: [this.assignmentId]
    });
    this.assignmentService.getUserAssignmentListGenericAPI(this.authService.currentUserValue.schoolId, masterUserAssignmentStatus.NotSeen, id, 0, 0, 0).subscribe((res: any) => {
      this.notSeenData = res.data;
      console.log('NotSeen', this.notSeenData)
    });
    this.assignmentService.getUserAssignmentListGenericAPI(this.authService.currentUserValue.schoolId, masterUserAssignmentStatus.Seen, id, 0, 0, 0).subscribe((res: any) => {
      this.seenData = res.data;
      console.log('Seen', this.seenData)
    });
    this.assignmentService.getUserAssignmentListGenericAPI(this.authService.currentUserValue.schoolId, masterUserAssignmentStatus.Submitted, id, 0, 0, 0).subscribe((res: any) => {
      this.submittedData = res.data;
      console.log('submittedAssignment', this.submittedData)
    });
    this.assignmentService.getUserAssignmentListGenericAPI(this.authService.currentUserValue.schoolId, masterUserAssignmentStatus.ReSubmitted, id, 0, 0, 0).subscribe((res: any) => {
      this.reSubmittedData = res.data;
      console.log('reSubmittedAssignment', this.reSubmittedData)
    });
    this.assignmentService.getUserAssignmentListGenericAPI(this.authService.currentUserValue.schoolId, masterUserAssignmentStatus.AssessedAndClosed, id, 0, 0, 0).subscribe((res: any) => {
      this.completedData = res.data;
      console.log('Completed', this.completedData)
    });
    this.states = [
      { statesName: 'Completed', code: '10' },
      { statesName: 'Rejected', code: '7' },
      { statesName: 'Need To Discuss', code: '9' },
    ]
  }

  onSubmit() { 
    this.submitted = true;
    this.form.patchValue({
      userAssignmentStatus: parseInt(this.form.value.userAssignmentStatus.code),
      userId:this.selectedUserId
    })
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log("data onSubmit", this.form.value)
    this.assignmentService.addAssignmentAssessmentAPI(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.assignmentDialog = false;
            console.log(data)
            this.messageService.add({ severity: 'success', detail: 'Record successfully submitted', life: 3000 });
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
       
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }

  openAssignmentModal(userId) {
    this.selectedUserId = userId
    console.log("userId", this.selectedUserId)
    this.assignmentDialog = true;
  }
  cancelDialog() {
    this.assignmentDialog = false;
  }
}
