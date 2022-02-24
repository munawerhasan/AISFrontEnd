import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { AuthService } from '../../../../core/auth/auth.service';
import { MasterclassService } from '../../services/masterclass.service';
import { MasterClassModel } from '../../../../models/master-class-model'
import { SubjectmasterService } from '../../services/subject-master/subjectmaster.service';
import { subjectMasterModel } from '../../models/subject-master/subject-master';
import { SubjectTopicService } from "../../../masterdataconfiguration/services/subject-topic/subject-topic.service";
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-subject-with-topic',
  templateUrl: './subject-with-topic.component.html',
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
export class SubjectWithTopicComponent implements OnInit {
 
  @ViewChild('dt') table: Table;
  first = 0;
  rows = 10;
  masterClassId=0;
  masterSubject:any;
  classMaster: MasterClassModel;
  subjectMaster: subjectMasterModel
  form: FormGroup
  subjectWithTopicDialog: boolean;
  submitted:boolean;
  topic = [
    { className: "X", subjectName: "Maths", unitName: "UNIT I-NUMBER SYSTEMS", chapterName: "COORDINATE GEOMETRY", topic: "Area of a triangle" },
    { className: "X", subjectName: "Maths", unitName: "UNIT II-ALGEBRA", chapterName: "POLYNOMIALS", topic: "Statement and simple problems on division algorithm for polynomials with real coefficients." },
    { className: "X", subjectName: "Maths", unitName: "UNIT II-ALGEBRA", chapterName: "PAIR OF LINEAR EQUATIONS IN TWO VARIABLES", topic: "cross multiplication method" },
    { className: "X", subjectName: "Maths", unitName: "UNIT II-ALGEBRA", chapterName: "QUADRATIC EQUATIONS", topic: "Situational problems based on equations reducible to quadratic equations" },
    { className: "X", subjectName: "Maths", unitName: "UNIT II-ALGEBRA", chapterName: "ARITHMETIC PROGRESSIONS", topic: "Application in solving daily life problems based on sum to n terms" },
    { className: "X", subjectName: "Maths", unitName: "UNIT III-COORDINATE GEOMETRY", chapterName: "COORDINATE GEOMETRY", topic: "Area of a triangle" },
    { className: "X", subjectName: "Maths", unitName: "UNIT IV-GEOMETRY", chapterName: "TRIANGLES", topic: "Proof of the following theorems are deleted" },
    { className: "X", subjectName: "Maths", unitName: "UNIT IV-GEOMETRY", chapterName: "TRIANGLES", topic: "The ratio of the areas of two similar triangles is equal to the ratio of the squares of their corresponding sides" },
    { className: "X", subjectName: "Maths", unitName: "UNIT IV-GEOMETRY", chapterName: "TRIANGLES", topic: "In a triangle, if the square on one side is equal to sumof the squares on the other two sides, the angle opposite to the first side is a right angle." },
    { className: "X", subjectName: "Maths", unitName: "UNIT IV-GEOMETRY", chapterName: "CIRCLES", topic: "No Deletion" },
    { className: "X", subjectName: "Maths", unitName: "UNIT IV-GEOMETRY", chapterName: "CONSTRUCTIONS", topic: "Construction of a triangle similar to a given triangle" },
    { className: "X", subjectName: "Maths", unitName: "UNIT IV-GEOMETRY", chapterName: "TRIANGLES", topic: "Proof of the following theorems are deleted" },
    { className: "X", subjectName: "Maths", unitName: "UNIT V- TRIGONOMETRY", chapterName: "INTRODUCTION TO TRIGONOMETRY", topic: "Motivate the ratios whichever are defined at 0o and 90o" },
    { className: "X", subjectName: "Maths", unitName: "UNIT V- TRIGONOMETRY", chapterName: "TRIGONOMETRIC IDENTITIES", topic: "Trigonometric ratios of complementary angles" },
    { className: "X", subjectName: "Maths", unitName: "UNIT V- TRIGONOMETRY", chapterName: "HEIGHTS AND DISTANCES", topic: "No deletion" },
  ]
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private masterClassService: MasterclassService,
    private subjectMasterService: SubjectmasterService,
    private subjectTopicService: SubjectTopicService,
    private messageService: MessageService,
  ) { }
  ngOnInit(): void {
  }

  openNew() {
    this.form = this.builder.group({
      masterClassId: [0, Validators.required],
      masterSubjectId: [0, Validators.required],
      unit: [''],
      chapter: [''],
      topic: [''],
    })

    this.masterClassService.getMasterClassListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.classMaster = res.data;
      console.log("this.classMaster1", this.classMaster)
    });
    this.subjectMasterService.getMasterSubjectListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 0).subscribe((res: any) => {
      this.subjectMaster = res.data;
      console.log("this.classMaster2", this.subjectMaster)
    });
    this.subjectWithTopicDialog = true;
  }

  hideDialog() {
    this.subjectWithTopicDialog = false;
  }

  onSubmit() {
    this.submitted = true;
    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      masterClassId: parseInt(this.form.value.masterClassId.masterClassId),
      masterSubjectId: parseInt(this.form.value.masterSubjectId.masterSubjectId),
    })
    console.log("AfterSet", this.form.value)
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())))
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    console.log("AfterControl", this.form.value)
    this.subjectTopicService.addSubjectWithTopic(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("data", data)
          if (data.isError === false) {
            this.subjectWithTopicDialog = false;
            this.messageService.add({ severity: 'success', detail: data.message, life: 3000 });
            //this.loadSubjectMaster();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Subject Not Save' + error.message, life: 3000 });
        });
  }

  
}
