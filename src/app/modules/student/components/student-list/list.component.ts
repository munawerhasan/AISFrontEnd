import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from "../../services/student.service";
import { Table } from 'primeng/table';
import { MasterclassService } from "../../../masterdataconfiguration/services/masterclass.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { StudentModel } from "../../models/student/student";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', '../../../../../assets/sass/layout/_loader.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private studenService: StudentService,
    private masterService: MasterclassService,
    private authService: AuthService

  ) { }
  loader=true;
  public data: StudentModel[];
  first = 0;
  rows = 10;
  submitted: boolean;
  masterClasses: any;
  masterSections: any;
  masterClassId = 0;
  masterSectionId = 0;
  totalCount = 0;

  @ViewChild('dt') table: Table;

  ngOnInit(): void {
    this.studenService.getStudentList().subscribe(res => {
      this.data = res.data;
      console.log("StudentList", this.data)
      this.loader=false;
    })

    this.masterService.MasterClass().subscribe((data: any) => {
      this.masterClasses = data.data;
    });
    this.masterService.MasterSection().subscribe((data: any) => {
      this.masterSections = data.data;
    });

  }

  onSelectClass(event) {
    this.loader=true;
    let masterClassData = event.value;
    this.masterClassId = masterClassData.masterClassId
    console.log("masterId", this.masterClassId)
    this.studenService.getStudentListByMasterClassAndMasterSectionAPI(this.masterClassId, this.masterSectionId, this.authService.currentUserValue.schoolId).subscribe(res => {
      this.data = res.data;
      this.loader=false;
      console.log("ClassData", this.data)
      this.totalCount = res.data?.length;
      console.log("ClassCount",this.totalCount)
    })
  }

  
  onSelectSection(event) {
    this.loader=true;
    let masterSectionData = event.value;
    this.masterSectionId = masterSectionData.masterSectionId
    console.log("sectionId",this.masterSectionId )
    this.studenService.getStudentListByMasterClassAndMasterSectionAPI(this.masterClassId, this.masterSectionId, this.authService.currentUserValue.schoolId).subscribe(res => {
      this.data = res.data;
      this.loader=false;
      console.log("Data", this.data)
      this.totalCount = res.data?.length;
      console.log("ClassCount",this.totalCount)
    })
  }



}
