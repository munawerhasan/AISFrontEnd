import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { BatchmasterService } from '../../services/batch-master/batchmaster.service';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-batch-master',
  templateUrl: './batch-master.component.html',
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
export class BatchMasterComponent implements OnInit {
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  status: any;
  loader = true;
  data: any
  batchDialog: boolean;
  isAddBatch: boolean
  form: FormGroup;
  submitted: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private batchMasterService: BatchmasterService,
    private messageService: MessageService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.loadBatchData();
    this.status = [
      { statusName: 'Active', statusId: 1 },
      { statusName: 'InActive', statusId: 2 },
      { statusName: 'Suspended', statusId: 3 },
      { statusName: 'Deleted', statusId: 4 }
    ];
    
  }
  openNew(masterBatchId) {
    let MasterBatchId = masterBatchId
    this.isAddBatch = !MasterBatchId;
    this.form = this.formBuilder.group({
      masterBatchId: [0, Validators.required],
      name: ['', Validators.required],
      displayOrder: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddBatch) {
      this.batchMasterService.getMasterBatchById(masterBatchId).subscribe((res: any) => {
        this.form.patchValue({
          masterBatchId: res.data['masterBatchId'],
          name: res.data['name'],
          displayOrder: res.data['displayOrder'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.submitted = false;
    this.batchDialog = true;
  }
  cancelDialog() {
    this.form.reset();
    this.batchDialog = false;
  }
  loadBatchData() {
    this.batchMasterService.getMasterBatchListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
  }
  onSubmit() { 
    this.submitted = true;
    this.form.patchValue({
      activeStatus: parseInt(this.form.value.activeStatus.statusId)
    })
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.isAddBatch) {
      this.addBatch();
    }
    else {
      this.updateBatch();
    }
  }
  public addBatch() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.batchMasterService.addMasterBatch(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.batchDialog = false;
            console.log(data)
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadBatchData();
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
       
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Details Not Save' + error.message, life: 3000 });
        });
  }
  public updateBatch() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.batchMasterService.updateMasterBatch(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.batchDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadBatchData();
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }

  deleteRecord(id: any) {
    console.log("Id", id)
    this.batchMasterService.deleteMasterBatchById(id)
      .subscribe(res => {
        console.log(res);
        this.loadBatchData();
        //this.router.navigate(['/master/batchMaster']);
      }, (err) => {
        console.log(err);
       // this.loading = false;
      }
      );
  }
}
