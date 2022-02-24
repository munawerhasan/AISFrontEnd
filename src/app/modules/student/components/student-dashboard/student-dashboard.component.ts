import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../../../core/auth/auth.service";
import { FeeService } from "../../../fee/services/fee.service";
import { Table } from 'primeng/table';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  first = 0;
  rows = 10;
  currentUserName: string;
  currentUserSchoolName: string;
  @ViewChild('dt') table: Table;
  public data: any;
  public pendingFeeData: any;
  totalAmount = 0;
  totalDiscount = 0;
  totalNetAmount = 0;
  TotalPaidAmount = 0;
  TotalDueAmount = 0;
  TotalAdvance = 0;
  constructor(
    private authService: AuthService,
    private feeService: FeeService
  ) { }

  ngOnInit(): void {
    this.currentUserName = this.authService.currentUserValue.name;
    this.currentUserSchoolName = this.authService.currentUserValue.schoolName;
    this.feeService.getPaymentListGeneric(this.authService.currentUserValue.schoolId, this.authService.currentUserValue.id).subscribe((res: any) => {
      this.data = res.data;
      console.log("data", this.data)
      if (this.data) {
        this.totalAmount = this.data.reduce((sum, item) => sum + item.totalAmount, 0);
        this.totalDiscount = this.data.reduce((sum, item) => sum + item.discount, 0);
        this.totalNetAmount = this.data.reduce((sum, item) => sum + item.netAmount, 0);
        this.TotalPaidAmount = this.data.reduce((sum, item) => sum + item.paidAmount, 0);
        this.TotalDueAmount = this.data.reduce((sum, item) => sum + item.due, 0);
        this.TotalAdvance = this.data.reduce((sum, item) => sum + item.advance, 0);
      }
      else {
        this.totalAmount = 0;
        this.totalDiscount = 0;
        this.totalNetAmount = 0;
        this.TotalPaidAmount = 0;
        this.TotalDueAmount = 0;
        this.TotalAdvance = 0;
      }
    });

    this.feeService.getPendingFeeByUserIdAPI(this.authService.currentUserValue.schoolId, this.authService.currentUserValue.id).subscribe((res: any) => {
      this.pendingFeeData = res.data;
      console.log(" this.pendingFeeData",  this.pendingFeeData)
    });
  }

}


