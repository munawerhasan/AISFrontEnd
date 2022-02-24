import { Component, OnInit , ViewChild} from '@angular/core';
import { ProductService } from '../../../../demo/service/productservice';
import { AuthService } from "../../../../core/auth/auth.service";
@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
})
export class MainDashboardComponent implements OnInit {
  currentUserName: string;
  currentUserSchoolName: string;
  selectedDropdownItem:any
  conditionExpression:string;
  countData: any;
  
  attendenceData:any
  constructor(
    private productService: ProductService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.currentUserName = this.authService.currentUserValue.name;
    this.currentUserSchoolName = this.authService.currentUserValue.schoolName;
    this.conditionExpression= this.authService.currentUserValue.role;
  }
}
