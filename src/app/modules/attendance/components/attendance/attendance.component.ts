import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentModel } from "../../../student/models/student/student";
import { AuthService } from '../../../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from "../../../attendance/services/attendance/attendance.service";
import { MasterService } from "../../../../shared/master-service/master.service";
import { Table } from 'primeng/table';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss'],
  styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
})
export class AttendanceComponent implements OnInit {
  studentList: [];
  public data: StudentModel[];
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  submitted: boolean;
  form: FormGroup;
  set: any;
  masterClasses:any;
  masterSections:any;
  masterClassId=0;
  masterSectionId=0;
  constructor(private attendanceService: AttendanceService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private masterService: MasterService) {
       this.set = [
      { name: 'Present', ngValue: '1', inactive: true },
      { name: 'Absent', ngValue: '1', inactive: true },
      { name: 'Leave', ngValue: '1', inactive: true },
      { name: 'Holidays', ngValue: '1', inactive: true },
    ];

    }

  ngOnInit(): void {
    this.attendanceService.getStudentListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 1).subscribe((res: any) => {
      this.studentList = res.data;
      console.log("naushadList", this.studentList);
    });
    this.masterService.MasterClass().subscribe((data: any) => {
      this.masterClasses = data.data;
      // console.log("MasterClassData",this.masterClasses);
      
    });
    this.masterService.MasterSection().subscribe((data: any) => {
      this.masterSections = data.data;
      console.log("ahmed",this.masterSections  );
    });
    this.form = this.formBuilder.group({
      dob: [null, Validators.required],
      selectClass: [null, Validators.required],
      section: [null, Validators.required],
      attendance: [null, Validators.required],
    });


  }
    onSelectClass(event){
      let masterClassData=event.value;
      console.log("arsh", masterClassData);
      
      this.masterClassId = masterClassData.masterClassId;
      console.log("On Class Select", this.masterClassId )
      this.attendanceService.getStudentListByMasterClassAndMasterSectionAPI(this.masterClassId,this.masterSectionId,this.authService.currentUserValue.schoolId).subscribe(res=>{
        this.studentList=res.data;
      })
    }

  
  onSelectSection(event) {
    let masterSectionData=event.value;
    this.masterSectionId = masterSectionData.masterSectionId;
    this.attendanceService.getStudentListByMasterClassAndMasterSectionAPI(this.masterClassId,this.masterSectionId,this.authService.currentUserValue.schoolId).subscribe(res=>{
      this.studentList=res.data;
      //this.totalCount=res.data?.length;
    })
  } 
  

}
