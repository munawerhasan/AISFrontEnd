import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterclassService } from "../../services/masterclass.service";
import { MasterClassModel } from '../../../../models/master-class-model'
import { AuthService } from '../../../../core/auth/auth.service';
import { SubjectmasterService } from '../../services/subject-master/subjectmaster.service';
import { subjectMasterModel } from '../../models/subject-master/subject-master';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-map-class-with-subject',
  templateUrl: './map-class-with-subject.component.html',
  styleUrls: [ 
  '../../../../../assets/scss/_tableStyle.scss',
  '../../../../../assets/sass/layout/_loader.scss'],
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
export class MapClassWithSubjectComponent implements OnInit {
  loader = true;
  subjectList: any;
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  form: FormGroup;
  masterClassId=0;
  submitted: boolean;
  public classMaster: MasterClassModel[];
  public subjectMaster: subjectMasterModel[];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private masterClassService: MasterclassService,
    private authService: AuthService,
    public subjectMasterService: SubjectmasterService,
  ) { }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      masterClassId: [null, Validators.required],
      masterSubjectId: [null, Validators.required],
    });
    this.masterClassService.getMasterClassListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.classMaster = res.data;
      this.loader = false;
    });
    this.subjectMasterService.getMasterSubjectListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.subjectMaster = res.data;
    });
  }


  masterSubjectID: any[];
  MyArrayType: MasterSubjectId[] = [];
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.masterSubjectID = this.form.controls["masterSubjectId"].value.map(a => a.masterSubjectId);
    console.log("masterSubjectID", this.masterSubjectID)
    this.masterSubjectID.forEach((item, index) => {
      this.MyArrayType.push({
        schoolId: parseInt(this.authService.currentUserValue.schoolId.toString()),
        createdByUserId: parseInt(this.authService.currentUserValue.id.toString()),
        activeStatus: 1,
        masterClassId: parseInt(this.form.value.masterClassId.masterClassId),
        masterSubjectId: item
      })
    });
    console.log("Array1", this.MyArrayType);
    this.subjectMasterService.mapClassWithSubject(this.MyArrayType)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            console.log("afterSubmit", data)
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            //this.loadBatchData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },

        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }

  onSelectClass(event){
    let masterClassData = event.option.value;
    this.masterClassId = masterClassData.masterClassId;
    console.log("masterClassIdd", this.masterClassId)
    this.subjectMasterService.getMasterSubjectListByClassAPI(this.authService.currentUserValue.schoolId, this.masterClassId, 0).subscribe(res => {
      this.subjectList = res.data;
      console.log("this.subjectList", this.subjectList)
    })
    
  }

  mappingList() {
    this.router.navigate(['/masterDataConfiguration/classWithsubjectMapping'])
  }

}

export class MasterSubjectId {

  schoolId: number;
  masterSubjectId: number;
  masterClassId: number
  createdByUserId: number;
  activeStatus: number;

}
