import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from "primeng/api";
import { Router } from '@angular/router';
import { SubjectMappingModel } from '../../models/subject-map-with-class/subjectMapWithClass';
import { AuthService } from '../../../../core/auth/auth.service';
import { SubjectmasterService } from "../../services/subject-master/subjectmaster.service";
interface Country {
  name: string,
  code: string
}

@Component({
  selector: 'app-class-with-subject',
  templateUrl: './class-with-subject.component.html',
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
})
export class ClassWithSubjectComponent {
  loader=true;
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  public data: SubjectMappingModel[];
  submitted:boolean;
  classWithSubjectMappingDilog: boolean;
  selectedCategory: any = null;
  countries: any[];
  selectedCountries: any[];
  categories: any[] = [
    { className: 'LKG', classCode: 'l', subjectName: 'hin', subjectCode: 'h001' },
    { className: 'NUR', classCode: '3', subjectName: 'math', subjectCode: 'moo2' },
    { className: 'FIRST', classCode: '4', subjectName: 'Science', subjectCode: 's001' },
    { className: 'UKG', classCode: 'Deleted', subjectName: 'ENG', subjectCode: 'e005' }
  ];
  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private authService:AuthService,
    private subjectService:SubjectmasterService
    ) {
    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
  ];
  }
  ngOnInit(): void {
    this.subjectService.getSubjectListBySchoolIdAndStatusAPI(this.authService.currentUserValue.schoolId,0).subscribe((res: any) => {
      this.data = res.data;
      this.loader=false;
    });
    // this.classWithSubjectdata = [
    //   { className: 'LKG', classCode: 'l', subjectName: 'hin', subjectCode: 'h001' },
    //   { className: 'NUR', classCode: '3', subjectName: 'math', subjectCode: 'moo2' },
    //   { className: 'FIRST', classCode: '4', subjectName: 'Science', subjectCode: 's001' },
    //   { className: 'UKG', classCode: 'Deleted', subjectName: 'ENG', subjectCode: 'e005' }
    // ];
    this.selectedCategory = this.categories[1];
    this.primengConfig.ripple = true;
  }
  openNew() {
    this.router.navigate(['/masterDataConfiguration/mapClassWithSubject'])
  }

}
