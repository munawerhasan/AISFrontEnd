import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentMasterModel } from '../../models/department-master/department-master';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { DepartmentmasterService } from '../../services/department-master/departmentmaster.service';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
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
export class DepartmentMasterComponent implements OnInit {
  loader=true;
  first = 0;
  rows = 10;
  submitted: boolean;
  @ViewChild('dt') table: Table;
  status: any;
  data: DepartmentMasterModel[];
  departmentDialog: boolean;
  form: FormGroup;
  isAddDepartmrent: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private departmentMasterService: DepartmentmasterService,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // let masterDepartmentId = this.route.snapshot.paramMap.get('masterDepartmentId');
    // this.isAddDepartmrent = !masterDepartmentId;
   
    this.loadDepartmentMaster();
    this.status = [
      { statusName: 'Active', statusId: '1' },
      { statusName: 'InActive', statusId: '2' },
      { statusName: 'Suspended', statusId: '3' },
      { statusName: 'Deleted', statusId: '4' }
    ];
  }
  openNew(masterDepartmentId) {
    let MasterDepartmentId = masterDepartmentId
    this.isAddDepartmrent = !MasterDepartmentId;
    this.form = this.formBuilder.group({
      masterDepartmentId: [0, Validators.required],
      name: ['', Validators.required],
      displayOrder: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddDepartmrent) {
      this.departmentMasterService.getMasterDepartmentById(masterDepartmentId).subscribe((res: any) => {
        this.form.patchValue({
          masterDepartmentId: res.data['masterDepartmentId'],
          name: res.data['name'],
          displayOrder: res.data['displayOrder'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.departmentDialog = true;
    this.submitted = false;
  }
  cancelDialog() {
    this.form.reset();
    this.departmentDialog = false;
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
    if (this.isAddDepartmrent) {
      this.addMasterDepartmentt();
    } 
    else {
      this.updateDepartment();
    }
  }
  addMasterDepartmentt() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.departmentMasterService.addMasterDepartment(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.departmentDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadDepartmentMaster();
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
       
          //this.form.reset();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  updateDepartment() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.departmentMasterService.updateMasterDepartment(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.departmentDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadDepartmentMaster();
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },

        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  public loadDepartmentMaster() {
    this.departmentMasterService.getDepartmentListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
  }

}
