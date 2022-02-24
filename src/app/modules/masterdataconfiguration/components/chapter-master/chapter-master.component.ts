import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChapterService } from "../../../masterdataconfiguration/services/chapter-master/chapter.service";
import { MasterclassService } from "../../../masterdataconfiguration/services/masterclass.service";
import { UnitService } from "../../services/unit-master/unit.service";
@Component({
  selector: 'app-chapter-master',
  templateUrl: './chapter-master.component.html',
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
export class ChapterMasterComponent implements OnInit {
  loader = true;
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  submitted: boolean;
  isAddChapter: any;
  masterClass:any;
  masterSubject:any;
  status: any;
  data: any;
  masterClassId=0;
  masterUnit:any;
  chapterDialog: boolean;
  form: FormGroup;
  masterSubjectId=0;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterclassService,
    private messageService: MessageService,
    private authService: AuthService,
    private chapterService: ChapterService,
    private unitService:UnitService
  ) { }

  ngOnInit(): void {
    this.loadChapterData();
    // this.unitService.getMasterUnit().subscribe((res:any)=>{
    // this.unitData= res.data;
    // });
    this.masterService.MasterClass().subscribe((data: any) => {
      this.masterClass = data.data;
    });
    // this.masterService.MasterSubject().subscribe((data: any) => {
    //   this.masterSubject = data.data;
    // });
    this.status = [
      { statusName: 'Active', statusId: 1 },
      { statusName: 'InActive', statusId: 2 },
      { statusName: 'Suspended', statusId: 3 },
      { statusName: 'Deleted', statusId: 4 }
    ];

   

  }
  openNew(subjectChapterId) {
    this.chapterDialog = true;
    let MasterChapterId = subjectChapterId
    console.log("id", MasterChapterId)
    this.isAddChapter = !MasterChapterId;
    this.form = this.formBuilder.group({
      subjectChapterId: [0, Validators.required],
      subjectUnitId: [0, Validators.required],
      chapterTitle: ['', Validators.required],
      chapterDescription: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddChapter) {
      this.chapterService.getMasterChapterById(MasterChapterId).subscribe((res:any)=>{
        console.log("dataById",res.data)
        this.form.patchValue({
          subjectChapterId: res.data['subjectChapterId'],
          subjectUnitId: res.data['subjectUnitId'],
          chapterTitle: res.data['chapterTitle'],
          chapterDescription: res.data['chapterDescription'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.submitted = false;
  
  }
  cancelDialog() {
    this.form.reset();
    this.chapterDialog = false;
  }
  loadChapterData() {
    this.chapterService.getMasterChapterListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
  }
  onSubmit() {
    this.submitted = true;
    this.form.patchValue({
      subjectUnitId: parseInt(this.form.value.subjectUnitId.subjectUnitId),
      activeStatus: parseInt(this.form.value.activeStatus.statusId)
    })
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.isAddChapter) {
      this.addChapter();
    }
    else {
      this.updateChapter();
    }
  }
  public addChapter() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.chapterService.addMasterChapter(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.chapterDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadChapterData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },

        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail:error.message, life: 3000 });
        });
  }
  public updateChapter() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.chapterService.updateMasterChapter(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.chapterDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadChapterData();
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

  onSelectSubject(event) {
    let masterSubjectData = event.value;
    this.masterSubjectId = masterSubjectData.masterSubjectId;
    console.log("masterSubjectId ", this.masterSubjectId);
    this.unitService.getMasterUnitListBymasterClassIdAndmasterSubjectId(this.authService.currentUserValue.schoolId,1, this.masterClassId, this.masterSubjectId).subscribe((data: any) => {
      this.masterUnit = data.data;
      console.log("masterUnit ", this.masterUnit)
    });
  }

}
