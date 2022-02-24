import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MasterclassService } from '../../services/masterclass.service';
import { MasterClassModel } from '../../../../models/master-class-model'
import { AuthService } from '../../../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-class-master',
  templateUrl: './class-master.component.html',
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
export class ClassMasterComponent implements OnInit {
  loader=true;
  first = 0;
  rows = 10;
  public data: MasterClassModel[];
  @ViewChild('dt') table: Table;
  status: any;
  productDialog: boolean;
  form: FormGroup;
  submitted: boolean;
  isAddClass: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private masterClassService: MasterclassService,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }
  ngOnInit(): void {
    // let masterClassId = this.route.snapshot.paramMap.get('masterClassId');
    // this.isAddClass = !masterClassId;
   
    this.loadMasterClassData();
    this.status = [
      { statusName: 'Active', statusId: 1 },
      { statusName: 'InActive', statusId: 2 },
      { statusName: 'Suspended', statusId: 3 },
      { statusName: 'Deleted', statusId: 4 }
    ];
  }
  openNew(masterClassId) {
    let MasterClassId = masterClassId
    this.isAddClass = !MasterClassId;
    this.form = this.formBuilder.group({
      masterClassId: [0, Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      displayOrder: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddClass) {
      this.masterClassService.getMasterClassById(masterClassId).subscribe((res: any) => {
        this.form.patchValue({
          masterClassId: res.data['masterClassId'],
          name: res.data['name'],
          code: res.data['code'],
          displayOrder: res.data['displayOrder'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.productDialog = true;
    this.submitted = false;
  }
  cancelDialog() {
    this.form.reset();
    this.productDialog = false;
  }

  addMapping() {
    this.router.navigate(['/masterDataConfiguration/classSectionMapping'])
  }
  addSection() {
    this.router.navigate(['/masterDataConfiguration/sectionMaster'])
  }

  loadMasterClassData() {
    this.masterClassService.getMasterClassListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
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
    if (this.isAddClass) {
      this.addMasterClass();
      this.form.reset();

    } else {
      this.updateClass();
    }
  }
  public addMasterClass() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    console.log(JSON.stringify(this.form.value))
    this.masterClassService.addMasterClass(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
          this.productDialog = false;
          this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
          this.loadMasterClassData();
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  public updateClass() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    console.log(JSON.stringify(this.form.value))
    this.masterClassService.updateMasterClass(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.productDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: "Class Updated Successfully", life: 3000 });
          this.loadMasterClassData();
          //this.form.reset();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Details Not Updated' + error.message, life: 3000 });
        });
  }
}
