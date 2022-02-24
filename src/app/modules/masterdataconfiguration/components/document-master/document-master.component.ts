import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentMasterModel } from '../../models/department-master/department-master';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { DocumentmasterService } from '../../services/document-master/documentmaster.service';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
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
export class DocumentMasterComponent implements OnInit {
  loader=true;
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  status: any;
  data: DepartmentMasterModel[];
  documentDialog: boolean;
  form: FormGroup;
  isAddDocument: boolean;
  submitted: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private documentMasterService: DocumentmasterService,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }
  ngOnInit(): void {
    this.loadDocumentsMaster();
    this.status = [
      { statusName: 'Active', statusId: '1' },
      { statusName: 'InActive', statusId: '2' },
      { statusName: 'Suspended', statusId: '3' },
      { statusName: 'Deleted', statusId: '4' }
    ];
  }
  openNew(masterDocumentId) {
    let MasterDocumentId = masterDocumentId
    this.isAddDocument = !MasterDocumentId;
    this.form = this.formBuilder.group({
      masterDocumentId: [0, Validators.required],
      name: ['', Validators.required],
      displayOrder: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddDocument) {
      this.documentMasterService.getMasterDocumentById(masterDocumentId).subscribe((res: any) => {
        this.form.patchValue({
          masterDocumentId: res.data['masterDocumentId'],
          name: res.data['name'],
          displayOrder: res.data['displayOrder'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.documentDialog = true;
    this.submitted = false;
  }
  cancelDialog() {
    this.form.reset();
    this.documentDialog = false;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      activeStatus: parseInt(this.form.value.activeStatus.statusId)
    })

    if (this.isAddDocument) {
      this.addMasterDocument();
    } else {
      this.updateMasterDocument();
    }
  }
  addMasterDocument() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.documentMasterService.addMasterDocument(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.documentDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadDocumentsMaster();
            this.form.reset();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }

        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  updateMasterDocument() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.documentMasterService.updateMasterDocument(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.documentDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadDocumentsMaster();
            this.form.reset();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Documents Not Updated' + error.message, life: 3000 });
        });
  }
  public loadDocumentsMaster() {
    this.documentMasterService.getMasterDocumentListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
  }
}
