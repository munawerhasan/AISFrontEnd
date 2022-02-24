import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UnitService } from "../../../masterdataconfiguration/services/unit-master/unit.service";
import { MasterclassService } from "../../../masterdataconfiguration/services/masterclass.service";
import { EmployeeService } from "../../../employee/services/employee/employee.service";
@Component({
  selector: 'app-unit-master',
  templateUrl: './unit-master.component.html',
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
export class UnitMasterComponent implements OnInit {
  loader = true;
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  submitted: boolean;
  masterClassId = 0;
  masterClasses: any;
  masterSubject: any;
  isAddUnit: any;
  status: any;
  data: any;
  unitDialog: boolean;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterclassService,
    private messageService: MessageService,
    private authService: AuthService,
    private unitService: UnitService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loadUnitData();
    this.status = [
      { statusName: 'Active', statusId: 1 },
      { statusName: 'InActive', statusId: 2 },
      { statusName: 'Suspended', statusId: 3 },
      { statusName: 'Deleted', statusId: 4 }
    ];

    this.masterService.MasterClass().subscribe((data: any) => {
      this.masterClasses = data.data;
    });
    // this.masterService.MasterSubject().subscribe((data: any) => {
    //   this.masterSubject = data.data;
    // });

  }
  openNew(subjectUnitId) {
    this.unitDialog = true;
    let MasterUnitId = subjectUnitId
    console.log("id", MasterUnitId)
    this.isAddUnit = !MasterUnitId;
    this.form = this.formBuilder.group({
      subjectUnitId: [0, Validators.required],
      masterClassId: [0, Validators.required],
      masterSubjectId: [0, Validators.required],
      unitTitle: ['', Validators.required],
      unitDescription: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddUnit) {
      this.unitService.getMasterUnitById(MasterUnitId).subscribe((res: any) => {
        console.log("dataById", res.data)
        this.form.patchValue({
          subjectUnitId: res.data['subjectUnitId'],
          masterClassId: res.data['masterClassId'],
          masterSubjectId: res.data['masterSubjectId'],
          unitTitle: res.data['unitTitle'],
          unitDescription: res.data['unitDescription'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.submitted = false;

  }
  cancelDialog() {
    this.form.reset();
    this.unitDialog = false;
  }
  loadUnitData() {
    this.unitService.getMasterUnitListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader = false;
    });
  }
  onSubmit() {
    this.submitted = true;
    this.form.patchValue({
      masterClassId: parseInt(this.form.value.masterClassId.masterClassId),
      masterSubjectId: parseInt(this.form.value.masterSubjectId.masterSubjectId),
      activeStatus: parseInt(this.form.value.activeStatus.statusId)
    })
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.isAddUnit) {
      this.addUnit();
    }
    else {
      this.updateUnit();
    }
  }
  public addUnit() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.unitService.addMasterUnit(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.unitDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadUnitData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },

        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  public updateUnit() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.unitService.updateMasterUnit(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.unitDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadUnitData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }


  onSelectClass(event) {
    let masterClassData = event.value;
    this.masterClassId = masterClassData.masterClassId;
    console.log("masterClassId ", this.masterClassId);

    this.masterService.getMasterSubjectByClass(this.authService.currentUserValue.schoolId,1, this.masterClassId).subscribe((data: any) => {
      this.masterSubject = data.data;
      console.log("masterSubject ", this.masterSubject)
    });
  }

}
