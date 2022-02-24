import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { AssignmentService } from "../../services/assignment/assignment.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { UnitService } from "../../../masterdataconfiguration/services/unit-master/unit.service";
import { ChapterService } from "../../../masterdataconfiguration/services/chapter-master/chapter.service";
import { TopicService } from "../../../masterdataconfiguration/services/topic-master/topic.service";
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss'],
  providers: [MessageService]
})
export class AddAssignmentComponent implements OnInit {
  form: FormGroup;
  fileUpload: any;
  masterUnit: any;
  masterChapter: any;
  masterTopic: any;
  submitted: boolean;
  uploadedFiles: any[] = [];
  teacherUserId = 0;
  masterSubjectId = 0;
  subjectUnitId = 0;
  subjectChapterId = 0;
  masterClassId = 0;
  masterSectionId = 0;
  classData: any;
  sectionData: any;
  subjectData: any;
  selectType: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private assignmentService: AssignmentService,
    private messageService: MessageService,
    private chapterService: ChapterService,
    private topicService: TopicService,
    private unitService: UnitService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      ToBeSubmittedDate: [null, Validators.required],
      AssignmentType: [null, Validators.required],
      ClassId: [null, Validators.required],
      SectionId: [null, Validators.required],
      SubjectId: [null],
      SubjectUnitId: [null],
      SubjectChapterId: [null],
      SubjectTopicId: [null],
      Remark: ['Remark'],
      Description: [''],
      Files: [null]
    });
    console.log("FormValue", this.form.value)
    if (this.authService.currentUserValue.role.toString() == "Admin") {
      this.teacherUserId = 0;
    }
    else if (this.authService.currentUserValue.role.toString() == "Teacher") {
      this.teacherUserId = this.authService.currentUserValue.id;
    }
    this.assignmentService.getMasterClassListByTeacher(this.authService.currentUserValue.schoolId, 1, this.teacherUserId).subscribe(res => {
      this.classData = res.data;
    })
    this.selectType = [
      { name: 'Academic', code: '1' },
      { name: 'Sport', code: '2' },
      { name: 'Other', code: '3' }
    ]
  }
  onSelectClass(event) {
    let selectedMasterClassData = event.value;
    console.log("selectedUserData", selectedMasterClassData)
    this.masterClassId = selectedMasterClassData.masterClassId
    console.log("masterClassId", this.masterClassId)
    this.assignmentService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 1, this.teacherUserId, this.masterClassId, 0, 0).subscribe(res => {
      this.sectionData = res.data;
    })
  }
  onSelectSection(event) {
    let selectedMasterSectionData = event.value;
    console.log("selectedMasterSectionData", selectedMasterSectionData);
    this.masterSectionId = selectedMasterSectionData.masterSectionId
    console.log("masterSectionId", this.masterSectionId)
    this.assignmentService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 1, this.teacherUserId, this.masterClassId, this.masterSectionId, 0).subscribe(res => {
      this.subjectData = res.data;
    })
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log("FormValueONSubmit", this.form.value)
    this.form.patchValue({
      ClassId: parseInt(this.form.value.ClassId.masterClassId),
      SectionId: parseInt(this.form.value.SectionId.masterSectionId),
      SubjectId: parseInt(this.form.value.SubjectId.masterSubjectId),
      SubjectUnitId: parseInt(this.form.value.SubjectUnitId.subjectUnitId),
      SubjectChapterId: parseInt(this.form.value.SubjectChapterId.subjectChapterId),
      SubjectTopicId: parseInt(this.form.value.SubjectTopicId.subjectTopicId),
      AssignmentType: parseInt(this.form.value.AssignmentType.code),
    })
    var formData: any = new FormData();
    formData.append("Name", this.form.get('Name').value);
    formData.append("ToBeSubmittedDate", this.form.get('ToBeSubmittedDate').value);
    formData.append("AssignmentType", this.form.get('AssignmentType').value);
    formData.append("ClassId", this.form.get('ClassId').value);
    formData.append("SectionId", this.form.get('SectionId').value);
    formData.append("SubjectId", this.form.get('SubjectId').value);
    formData.append("SubjectUnitId", this.form.get('SubjectUnitId').value);
    formData.append("SubjectChapterId", this.form.get('SubjectChapterId').value);
    formData.append("SubjectTopicId", this.form.get('SubjectTopicId').value);
    formData.append("Remark", this.form.get('Remark').value);
    formData.append("Description", this.form.get('Description').value);
    formData.append("CreatedByUserId", parseInt(this.authService.currentUserValue.id.toString()));
    formData.append("PublishByUserId", parseInt(this.authService.currentUserValue.id.toString()));
    formData.append("SchoolId", parseInt(this.authService.currentUserValue.schoolId.toString()));
    console.log(this.uploadedFiles);
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('Files', this.uploadedFiles[i]);
    }
    this.assignmentService.addAssignment(formData)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            console.log("data", data)
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Assignment successfully sent.', life: 3000 })
            this.form.reset();
            this.submitted = false;
            this.router.navigate(['/assignment/list'])
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          console.log(JSON.stringify(error))
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        });
    console.log("FormData", formData)
    console.log("FormValueAfterPatchValue", this.form.value)
    console.log("Files", this.uploadedFiles);
  }
  onUpload(event) {
    console.log("event2", event.files);
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
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

  onSelectUnit(event) {
    let masterUnitData = event.value;
    this.subjectUnitId = masterUnitData.subjectUnitId;
    console.log("subjectUnitId ", this.subjectUnitId);
    this.chapterService.getSubjectChapterByschoolIdAndsubjectUnitId(this.authService.currentUserValue.schoolId,1, this.subjectUnitId).subscribe((data: any) => {
      this.masterChapter = data.data;
      console.log("masterChapter ", this.masterChapter)
    });
  }

  onSelectChapter(event) {
    let masterChapterData = event.value;
    this.subjectChapterId = masterChapterData.subjectChapterId;
    console.log("subjectChapterId", this.subjectChapterId);
    this.topicService.getSubjectTopicByschoolIdAndsubjectChapterId(this.authService.currentUserValue.schoolId,1, this.subjectChapterId).subscribe((data: any) => {
      this.masterTopic = data.data;
      console.log("masterTopic ", this.masterTopic)
    });
  }

  goToAssignment() {
    this.router.navigate(['/assignment/list'])
  }
}
