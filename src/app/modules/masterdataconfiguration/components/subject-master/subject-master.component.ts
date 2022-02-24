import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectmasterService } from '../../services/subject-master/subjectmaster.service';
import { subjectMasterModel } from '../../models/subject-master/subject-master';
import { AuthService } from '../../../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-subject-master',
  templateUrl: './subject-master.component.html',
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss', '../../../../../assets/sass/layout/_loader.scss'],
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
export class SubjectMasterComponent implements OnInit {
  loader=true;
  first = 0;
  rows = 10;
  public data: subjectMasterModel[];
  @ViewChild('dt') table: Table;
  mark: any;
  subject: any;
  status: any;
  subjectDialog: boolean;
  form: FormGroup;
  submitted: boolean;
  isAddSubject: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public subjectMasterService: SubjectmasterService,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }
  ngOnInit(): void {
    // let masterSubjectId = this.route.snapshot.paramMap.get('masterSubjectId');
    // this.isAddSubject = !masterSubjectId;
    this.loadSubjectMaster();
    this.status = [
      { statusName: 'Active', statusId: '1' },
      { statusName: 'InActive', statusId: '2' },
      { statusName: 'Suspended', statusId: '3' },
      { statusName: 'Deleted', statusId: '4' }
    ];
    this.mark = [
      { marksTypes: 'Numeric', marksId: '1' },
      { marksTypes: 'Grade', marksId: '2' },
    ];
    this.subject = [
      { subjectTypes: 'Co-Scholastic', marsubjectTypeId: '1' },
      { subjectTypes: 'Scholastic', marsubjectTypeId: '2' },
    ];
  }
  openNew(masterSubjectId) {
    let MasterSubjectId = masterSubjectId
    this.isAddSubject = !MasterSubjectId;
    this.form = this.formBuilder.group({
      masterSubjectId: [0, Validators.required],
      subjectName: ['', Validators.required],
      subjectCode: ['', Validators.required],
      marksType: ['', Validators.required],
      subjectType: ['', Validators.required],
      displayOrder: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddSubject) {
      this.subjectMasterService.getMasterSubjectById(masterSubjectId).subscribe((res: any) => {
        this.form.setValue({
          masterSubjectId: res.data['masterSubjectId'],
          subjectName: res.data['subjectName'],
          subjectCode: res.data['subjectCode'],
          marksType: res.data['marksType'],
          subjectType: res.data['subjectType'],
          displayOrder: res.data['displayOrder'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.subjectDialog = true;
    this.submitted = false;
  }
  cancelDialog() {
    this.form.reset();
    this.subjectDialog = false;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      activeStatus: parseInt(this.form.value.activeStatus.statusId),
      marksType: parseInt(this.form.value.marksType.marksId),
      subjectType: parseInt(this.form.value.marksType.marsubjectTypeId)
    })
    if (this.isAddSubject) {
      this.addMasterSubject();

    } else {
      this.updateMasterSubject();
    }
  }
  addMasterSubject() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.subjectMasterService.addMasterSubject(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.subjectDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadSubjectMaster();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Subject Not Save' + error.message, life: 3000 });
        });
  }
  updateMasterSubject() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.subjectMasterService.updateMasterSubject(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.subjectDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadSubjectMaster();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  public loadSubjectMaster() {
    this.subjectMasterService.getMasterSubjectListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
  }
}
