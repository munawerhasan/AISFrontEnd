import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClassWithSectionModel } from '../../models/map-class-section/mapClassSection';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClasssectionmappingService } from '../../services/class-section-mapping/classsectionmapping.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { BatchmasterService } from '../../services/batch-master/batchmaster.service';
import { SectionmasterService } from "../../services/section-master/sectionmaster.service";
import { MasterclassService } from "../../services/masterclass.service";
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-class-section-mapping',
  templateUrl: './class-section-mapping.component.html',
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
export class ClassSectionMappingComponent implements OnInit {
  loader = true;
  first = 0;
  rows = 10;
  form: FormGroup;
  public data: ClassWithSectionModel[];
  @ViewChild('dt') table: Table;
  classSectionMappingDialog: boolean;
  assessmentModeDropdown: any;
  status: any;
  selectedMultiBatch: string[] = [];
  selectedMultiClass: string[] = [];
  selectedMultiSection: string[] = [];
  batches: any;
  sectionMaster: any;
  masterClasses: any
  submitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public classsectionmappingService: ClasssectionmappingService,
    private router: Router,
    private batchMasterService: BatchmasterService,
    private sectionMasterService: SectionmasterService,
    private masterclassService: MasterclassService,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      financialYear: ['', Validators.required],
      masterBatchId: [null, Validators.required],
      masterClassId: [null, Validators.required],
      masterSectionId: [null, Validators.required],
      assessmentMode: [null],
      startDate: [null],
      endDate: [null],
      stength: [0],
      displayOrder: [0],
      activeStatus: [null, Validators.required],
    });
    this.ClassListBySchoolIdAndStatus()
    this.batchMasterService.MasterBatch().subscribe((data: any) => {
      this.batches = data.data;
    });
    this.masterclassService.MasterClass().subscribe((data: any) => {
      this.masterClasses = data.data;
    });
    this.sectionMasterService.MasterSection().subscribe((data: any) => {
      this.sectionMaster = data.data;
    });
    this.status = [
      { statusName: 'Active', statusId: '1' },
      { statusName: 'InActive', statusId: '2' },
      { statusName: 'Suspended', statusId: '3' },
      { statusName: 'Deleted', statusId: '4' }
    ];
    this.assessmentModeDropdown = [
      { Name: 'Assess - 1', Id: '1' },
      { Name: 'Assess - 2', Id: '2' },
    ]
  }
  openNew() {
    this.form.reset({
      masterBatchId:null,
      masterClassId:null,
      masterSectionId:null
    })
    this.classSectionMappingDialog = true;
    this.submitted = false;
  }
  cancelDialog() {
    this.form.reset();
    this.classSectionMappingDialog = false;
  }
  addClass() {
    this.router.navigate(['/masterDataConfiguration/classMaster'])
  }
  addSection() {
    this.router.navigate(['/masterDataConfiguration/sectionMaster'])
  }
  resetForm() {
    this.form.reset();
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    let formData = new ClassSectionMappingModel();
    formData.financialYear = this.form.controls["financialYear"].value;
    formData.schoolId = parseInt(this.authService.currentUserValue.schoolId.toString());
    formData.batches = this.form.controls["masterBatchId"].value.map(a => a.masterBatchId);
    formData.classes = this.form.controls["masterClassId"].value.map(a => a.masterClassId);
    formData.sections = this.form.controls["masterSectionId"].value.map(a => a.masterSectionId);
    formData.assessmentModel = parseInt(this.form.controls["assessmentMode"].value.Id);
    formData.strength = parseInt(this.form.controls["stength"].value);
    formData.displayOrder = parseInt(this.form.controls["displayOrder"].value);
    formData.status = parseInt(this.form.controls["activeStatus"].value.statusId);
    formData.createdByUserId = parseInt(this.authService.currentUserValue.id.toString());
    console.log(formData)
    this.classsectionmappingService.MapClassClassSectionBatch(formData)
      .subscribe(
        data => {
          if (data.isError === false) {
            this.classSectionMappingDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.ClassListBySchoolIdAndStatus()
            this.resetForm()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });

          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }

  ClassListBySchoolIdAndStatus() {
    this.classsectionmappingService.getClassListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader = false;
    });
  }

}
export class ClassSectionMappingModel {
  schoolId: number;
  financialYear: string;
  classes: [];
  sections: [];
  batches: [];
  assessmentModel: number;
  strength: number;
  displayOrder: number;
  status: number;
  createdByUserId: number;
}