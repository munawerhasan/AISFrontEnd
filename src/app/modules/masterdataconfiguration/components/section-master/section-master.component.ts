import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SectionmasterService } from '../../services/section-master/sectionmaster.service';
import { SectionMasterModel } from '../../models/section-master/section-master';
import { AuthService } from '../../../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-section-master',
  templateUrl: './section-master.component.html',
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
export class SectionMasterComponent implements OnInit {
  loader=true;
  first = 0;
  rows = 10;
  public data: SectionMasterModel[];
  @ViewChild('dt') table: Table;
  status: any;
  sectionDialog: boolean;
  form: FormGroup;
  submitted: boolean;
  isAddSection: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public sectionmasterService: SectionmasterService,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // let masterSectionId = this.route.snapshot.paramMap.get('masterSectionId');
    // this.isAddSection = !masterSectionId;

    this.loadSectionData();
    this.status = [
      { statusName: 'Active', statusId: '1' },
      { statusName: 'InActive', statusId: '2' },
      { statusName: 'Suspended', statusId: '3' },
      { statusName: 'Deleted', statusId: '4' }
    ];
  }
  openNew(masterSectionId) {
    let MasterSectionId = masterSectionId
    this.isAddSection = !MasterSectionId;
    this.form = this.formBuilder.group({
      masterSectionId: [0, Validators.required],
      name: ['', Validators.required],
      displayOrder: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddSection) {
      this.sectionmasterService.getMasterSectionById(masterSectionId).subscribe((res: any) => {
        this.form.patchValue({
          masterSectionId: res.data['masterSectionId'],
          name: res.data['name'],
          displayOrder: res.data['displayOrder'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.sectionDialog = true;
    this.submitted = false;
  }
  cancelDialog() {
    this.form.reset();
    this.sectionDialog = false;
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
    if (this.isAddSection) {
      this.addMasterSection();
    } else {
      this.updateMasterSection();
    }

  }
  public addMasterSection() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.sectionmasterService.addMasterSection(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.sectionDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadSectionData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  public updateMasterSection() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.sectionmasterService.updateMasterSection(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.sectionDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadSectionData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  addMapping() {
    this.router.navigate(['/masterDataConfiguration/classSectionMapping'])
  }
  addClass() {
    this.router.navigate(['/masterDataConfiguration/classMaster'])
  }
  loadSectionData() {
    this.sectionmasterService.getMasterSectionListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
  }
}
