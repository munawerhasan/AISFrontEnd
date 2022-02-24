import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OccupationMasterModel } from '../../models/occupation-master/occupation-master';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { OccpationmasterService } from '../../services/occupation-master/occpationmaster.service';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-occupation-master',
  templateUrl: './occupation-master.component.html',
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
export class OccupationMasterComponent implements OnInit {
  loader=true;
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  status: any;
  data: OccupationMasterModel[];
  occupationDialog: boolean;
  form: FormGroup;
  submitted: boolean;
  isAddOccupation: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private occpationMasterService: OccpationmasterService,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // let masterOccupationId = this.route.snapshot.paramMap.get('masterOccupationId');
    // this.isAddOccupation = !masterOccupationId;
    this.loadOccupationMaster();
    this.status = [
      { statusName: 'Active', statusId: '1' },
      { statusName: 'InActive', statusId: '2' },
      { statusName: 'Suspended', statusId: '3' },
      { statusName: 'Deleted', statusId: '4' }
    ];
  }
  openNew(masterOccupationId) {
    let MasterOccupationId = masterOccupationId
    this.isAddOccupation = !MasterOccupationId;
    this.form = this.formBuilder.group({
      masterOccupationId: [0, Validators.required],
      name: ['', Validators.required],
      displayOrder: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddOccupation) {
      this.occpationMasterService.getMasterOccupationById(masterOccupationId).subscribe((res: any) => {
        this.form.patchValue({
          masterOccupationId: res.data['masterOccupationId'],
          name: res.data['name'],
          displayOrder: res.data['displayOrder'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.occupationDialog = true;
    this.submitted = false;
  }
  cancelDialog() {
    this.form.reset();
    this.occupationDialog = false;
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
    if (this.isAddOccupation) {
      this.addMasterSubject();

    } else {
      this.updateMasterSubject();
    }

  }
  addMasterSubject() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.occpationMasterService.addMasterOccupation(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.occupationDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadOccupationMaster();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Occupation Not Save' + error.message, life: 3000 });
        });
  }
  updateMasterSubject() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.occpationMasterService.updateMasterOccupation(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.occupationDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadOccupationMaster();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail:  error.message, life: 3000 });
      });
  }
  public loadOccupationMaster() {
    this.occpationMasterService.getMasterOccupationListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
  }

}
