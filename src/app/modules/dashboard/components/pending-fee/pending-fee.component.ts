import { Component, OnInit, ViewChild } from '@angular/core';
import { FeeService } from "../../../fee/services/fee.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { MasterService } from "../../../../shared/master-service/master.service";
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { DashboardService } from "../../../dashboard/services/dashboard.service";
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-pending-fee',
  templateUrl: './pending-fee.component.html',
  styleUrls: ['./pending-fee.component.scss'],
  styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
})
export class PendingFeeComponent implements OnInit {
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  pendingFeeByGroup: any;
  barData: any;
  pieData: any;
  sessionUserData: any;
  studentStatus: any;
  toDate: any;
  paymentDataCurrentDate: any;
  constructor(
    private authService: AuthService,
    private feeService: FeeService,
    private router: Router,
    private masterService: MasterService,
    private dashboardService: DashboardService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.toDate = this.datepipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    let currentDate = new Date();
    let fd = new Date(currentDate.setDate(currentDate.getDate() - 500));
    let fromDate = this.datepipe.transform(fd, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    this.feeService.getPaymentByGroupByDateFilter(this.authService.currentUserValue.schoolId, fromDate, this.toDate).subscribe(res => {
      this.paymentDataCurrentDate = res.data.paymentByCheck;
    })
    this.feeService.getPendingFeeByGroup(this.authService.currentUserValue.schoolId).subscribe(res => {
      this.pendingFeeByGroup = res.data;
      this.dashboardService.getUserSessionDetailBySchoolId(this.authService.currentUserValue.schoolId).subscribe((data: any) => {
        this.sessionUserData = data.data
        console.log("this.sessionUserData", this.sessionUserData)
      })
    })

    this.studentStatus = [
      { class: 'I', section: 'A1', newAdmisson: 4, oldAdmisson: 30, total: 34, suspendedStudent: 10, tc: 5, migrate: 2, totalData: 51 },
      { class: 'II', section: 'A3', newAdmisson: 5, oldAdmisson: 25, total: 30, suspendedStudent: 5, tc: 0, migrate: 0, totalData: 65 },
      { class: 'III', section: 'A2', newAdmisson: 5, oldAdmisson: 25, total: 30, suspendedStudent: 5, tc: 0, migrate: 0, totalData: 65 },
      { class: 'IV', section: 'A1', newAdmisson: 5, oldAdmisson: 25, total: 30, suspendedStudent: 5, tc: 0, migrate: 0, totalData: 76 },
      { class: 'V', section: 'B2', newAdmisson: 5, oldAdmisson: 25, total: 30, suspendedStudent: 5, tc: 0, migrate: 0, totalData: 65 },
    ]

    this.barData = {
      labels: ['NUR', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
      datasets: [
        {
          label: 'A',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          data: [65, 28, 40, 55, 40, 80, 25, 10, 10, 50, 22, 54, 60]
        },
        {
          label: 'B',
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          data: [55, 40, 70, 25, 0, 10, 50, 22, 64, 50, 85, 53, 76]
        },
        {
          label: 'C',
          backgroundColor: 'rgb(54, 162, 25)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          data: [40, 35, 65, 25, 0, 10, 40, 22, 64, 40, 85, 54, 40]
        },

      ]


    };
    this.pieData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702, 421],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ]
        }]
    };

  }

}
