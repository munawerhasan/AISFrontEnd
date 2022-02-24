import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from "../../services/school.service";
import { Table } from 'primeng/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss'],
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
export class SchoolListComponent implements OnInit {
  schoolList: [];
  items: MenuItem[];
  submitted: boolean;

  first = 0;
  rows = 10;

  @ViewChild('dt') table: Table;

  constructor(
    private schoolService: SchoolService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.schoolService.getSchoolList().subscribe(res => {
      this.schoolList = res.data;
      console.log("schoolList",this.schoolList);
    })

    this.items = [
      { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
      { label: 'Theming', icon: 'pi pi-bookmark', routerLink: ['/theming'] },

      {
        label: 'Edit', icon: 'pi pi-fw pi-user-edit'},

      {
        label: 'Change Password', icon: 'pi pi-fw pi-refresh'
      },
      {
        label: 'Delete', icon: 'pi pi-fw pi-trash'
      },
    ];

    
  }

  upDate(){
    let dropDowndata = event
    console.log("dropDowndata", dropDowndata);

  }
 

  openNew() {
    this.router.navigate(['/school/addSchool'])
  }

 


}
