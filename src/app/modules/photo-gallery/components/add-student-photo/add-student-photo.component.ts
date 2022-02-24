import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { StudentService } from "../../../../modules/student/services/student.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { StudentModel } from "../../../student/models/student/student";
import { MasterclassService } from "../../../masterdataconfiguration/services/masterclass.service";

@Component({
  selector: 'app-add-student-photo',
  templateUrl: './add-student-photo.component.html',
  styleUrls: ['./add-student-photo.component.scss']
})
export class AddStudentPhotoComponent implements OnInit {
  studentList: [];
  items:any;
  first = 0;
  rows = 10;
  submitted:boolean;
  public data: StudentModel[];
  masterClassId=0;
  masterSectionId=0;
  totalCount=0;
  masterClasses: any;
  masterSections: any;
  imageDialog=false;

  @ViewChild('dt') table: Table;
  constructor(private studentService:StudentService, private authService:AuthService, private masterService:MasterclassService) { }

  ngOnInit(): void {
    this.studentService.getStudentListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId, 1).subscribe((res: any) => {
      this.studentList = res.data;
      
    this.masterService.MasterClass().subscribe((data: any) => {
      this.masterClasses = data.data;
    });
    this.masterService.MasterSection().subscribe((data: any) => {
      this.masterSections = data.data;
    });
     
    });

    this.items = [
      // { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
      // { label: 'Theming', icon: 'pi pi-bookmark', routerLink: ['/theming'] },
      {
        label: 'Add Parent Photo', icon: 'pi pi-fw pi-camera',
        
      },
      
      {
        label: 'Add Student Photo', icon: 'pi pi-fw pi-camera', 
      },
      
    ];

    

  }

  uploadImage(){
    this.imageDialog=true;
  }

  onSelectClass(event){
    let masterClassData=event.value;
    
    this.masterClassId = masterClassData.masterClassId;
    console.log("On Class Select", this.masterClassId )
    this.studentService.getStudentListByMasterClassAndMasterSectionAPI(this.masterClassId,this.masterSectionId,this.authService.currentUserValue.schoolId).subscribe(res=>{
      this.studentList=res.data;
    })
  }

  onSelectSection(event) {
    let masterSectionData=event.value;
    this.masterSectionId = masterSectionData.masterSectionId;
    this.studentService.getStudentListByMasterClassAndMasterSectionAPI(this.masterClassId,this.masterSectionId,this.authService.currentUserValue.schoolId).subscribe(res=>{
      this.studentList=res.data;
      //this.totalCount=res.data?.length;
    })
  }

  // for Image Upload

  public imagePath;
  imgURL: any;
  public message: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
