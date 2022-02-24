import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ChapterService } from "../../../masterdataconfiguration/services/chapter-master/chapter.service";
import { MasterclassService } from "../../../masterdataconfiguration/services/masterclass.service";
import { TopicService } from "../../services/topic-master/topic.service";
import { UnitService } from "../../services/unit-master/unit.service";
@Component({
  selector: 'app-topic-master',
  templateUrl: './topic-master.component.html',
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
export class TopicMasterComponent implements OnInit {
  loader=true;
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  masterSubjectId=0;
  masterChapter:any;
  submitted: boolean;
  isAddTopic: any;
  masterClassId=0;
  subjectUnitId=0;
  status: any;
  data: any;
  chapterData: any;
  masterUnit: any;
  masterSubject: any;
  masterClass: any;
  topicDialog: boolean;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterclassService,
    private messageService: MessageService,
    private authService: AuthService,
    private chapterService: ChapterService,
    private topicService: TopicService,
    private unitService: UnitService
  ) { }

  ngOnInit(): void {
    this.loadTopicData();

    // this.unitService.getMasterUnit().subscribe((res: any) => {
    //   this.unitData = res.data;
    // });
                        
    this.masterService.MasterClass().subscribe((data: any) => {
      this.masterClass = data.data;
    });

    // this.masterService.getMasterSubjectByClass(this.masterClassId).subscribe((data: any) => {
    //   this.masterSubject = data.data;
    // });

    // this.chapterService.getMasterChapter().subscribe((res: any) => {
    //   this.chapterData = res.data;
    //   console.log(" this.chapterData", this.chapterData)
    // });



    this.status = [
      { statusName: 'Active', statusId: 1 },
      { statusName: 'InActive', statusId: 2 },
      { statusName: 'Suspended', statusId: 3 },
      { statusName: 'Deleted', statusId: 4 }
    ];



  }
  openNew(subjectTopicId) {
    this.topicDialog = true;
    let MasterTopicId = subjectTopicId
    console.log("id", MasterTopicId)
    this.isAddTopic = !MasterTopicId;
    this.form = this.formBuilder.group({
      subjectTopicId: [0],
      subjectChapterId: [0, Validators.required],
      topicTitle: ['', Validators.required],
      topicDescription: ['', Validators.required],
      activeStatus: ['', Validators.required],
    });
    if (!this.isAddTopic) {
      this.topicService.getMasterTopicById(MasterTopicId).subscribe((res: any) => {
        console.log("dataById", res.data)
        this.form.patchValue({
          subjectTopicId: res.data['subjectTopicId'],
          subjectChapterId: res.data['subjectChapterId'],
          topicTitle: res.data['topicTitle'],
          topicDescription: res.data['topicDescription'],
          activeStatus: res.data['activeStatus']
        });
      });
    }
    this.submitted = false;

  }
  cancelDialog() {
    this.form.reset();
    this.topicDialog = false;
  }
  loadTopicData() {
    this.topicService.getMasterTopicListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
  }
  onSubmit() {
    this.submitted = true;
    this.form.patchValue({
      subjectChapterId: parseInt(this.form.value.subjectChapterId.subjectChapterId),
      activeStatus: parseInt(this.form.value.activeStatus.statusId)
    })
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.isAddTopic) {
      this.addTopic();
    }
    else {
      this.updateTopic();
    }
  }
  public addTopic() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.topicService.addMasterTopic(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.topicDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadTopicData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },

        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
  }
  public updateTopic() {
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    this.topicService.updateMasterTopic(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.topicDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            this.loadTopicData();
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

  onSelectUnit(event){
    let masterUnitData = event.value;
    this.subjectUnitId = masterUnitData.subjectUnitId;
    console.log("subjectUnitId ", this.subjectUnitId);
    this.chapterService.getSubjectChapterByschoolIdAndsubjectUnitId(this.authService.currentUserValue.schoolId, 1, this.subjectUnitId).subscribe((data: any) => {
      this.masterChapter = data.data;
      console.log("masterChapter ", this.masterChapter)
    });
  }
}
