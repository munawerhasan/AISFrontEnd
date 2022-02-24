import { Component, OnInit, ViewChild } from '@angular/core';
import { FeeService } from "../../services/fee.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { MasterService } from "../../../../shared/master-service/master.service";
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-pending-fee',
  templateUrl: './pending-fee.component.html',
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss',
    '../../../../../assets/sass/layout/_loader.scss'
  ],
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
export class PendingFeeComponent implements OnInit {
  loader = true;
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  submitted: boolean;
  public dueDropDownData: any;
  data: any;
  masterClasses: any;
  masterSections: any;
  masterClassId = 0;
  masterSectionId = 0;
  minDue = 0;
  maxDue = 0;
  totalCount = 0;
  //loading = false;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  sumOfDue = 0;
  pendingFeeByGroup: any;
  totalGroupByAmount = 0;
  exportToExcelData: any;
  constructor(
    private authService: AuthService,
    private feeService: FeeService,
    private router: Router,
    private masterService: MasterService
  ) { }
  ngOnInit(): void {
    this.loader = true;
    this.feeService.getPendingFeeListGeneric(this.authService.currentUserValue.schoolId, this.masterClassId, this.masterSectionId, this.minDue, this.maxDue).subscribe((res: any) => {
      this.data = res.data;
      if (this.data) {
        this.sumOfDue = this.data.reduce((sum, item) => sum + item.totalDue, 0);
        this.totalGroupByAmount = this.sumOfDue
      }
      else {
        this.sumOfDue = 0;
      }
      this.loader = false;
    });
    this.feeService.getPendingFeeByGroup(this.authService.currentUserValue.schoolId).subscribe(res => {
      this.pendingFeeByGroup = res.data;
    })

    this.feeService.getPendingFeeDropDown(this.authService.currentUserValue.schoolId).subscribe((res: any) => {
      this.dueDropDownData = res.data;
    });

    this.masterService.MasterClass().subscribe((data: any) => {
      this.masterClasses = data.data;
    });
    this.masterService.MasterSection().subscribe((data: any) => {
      this.masterSections = data.data;

    });
  }

  onSelectClass(event) {
    this.masterClassId = event.value;
    console.log("MasterClass", this.masterClassId)
    this.loader = true;
    this.feeService.getPendingFeeListGeneric(this.authService.currentUserValue.schoolId, this.masterClassId, this.masterSectionId, this.minDue, this.maxDue).subscribe((res: any) => {
      this.data = res.data;
      if (this.data) {
        this.sumOfDue = this.data.reduce((sum, item) => sum + item.totalDue, 0);
      }
      this.loader = false;
    });
  }
  onSelectSection(event) {
    this.masterSectionId = event.target.value;
    this.loader = true;
    this.feeService.getPendingFeeListGeneric(this.authService.currentUserValue.schoolId, this.masterClassId, this.masterSectionId, this.minDue, this.maxDue).subscribe((res: any) => {
      this.data = res.data;
      if (this.data) {
        this.sumOfDue = this.data.reduce((sum, item) => sum + item.totalDue, 0);
      }
      else {
        this.sumOfDue = 0;
      }
      this.loader = false;
    });
  }
  onSelectMinDue(event) {
    this.minDue = event.target.value;
    this.loader = true;
    //this.spinner.show();
    this.feeService.getPendingFeeListGeneric(this.authService.currentUserValue.schoolId, this.masterClassId, this.masterSectionId, this.minDue, this.maxDue).subscribe((res: any) => {
      this.data = res.data;
      if (this.data) {
        this.sumOfDue = this.data.reduce((sum, item) => sum + item.totalDue, 0);
      }
      else {
        this.sumOfDue = 0;
      }
      this.loader = false;
      //this.spinner.hide();
    });
  }
  onSelectMaxDue(event) {
    this.maxDue = event.target.value;
    this.loader = true;
    //this.spinner.show();
    this.feeService.getPendingFeeListGeneric(this.authService.currentUserValue.schoolId, this.masterClassId, this.masterSectionId, this.minDue, this.maxDue).subscribe((res: any) => {
      this.data = res.data;
      if (this.data) {
        this.sumOfDue = this.data.reduce((sum, item) => sum + item.totalDue, 0);
      }
      else {
        this.sumOfDue = 0;
      }
      this.loader = false;
      //this.spinner.hide();
    });
  }

  exportToExcel() {

    let exportData: any;
    //this.spinner.show();
    this.feeService.getPendingFeeListExport(this.authService.currentUserValue.schoolId).subscribe(res => {
      exportData = res.data;

      if (exportData.length) {
        // options for csv export
        const options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: false,
          showTitle: false,
          filename: 'PendingFee' + new Date().toDateString() + new Date().toLocaleTimeString(),
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true
        };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(exportData);
      }
    })

  }
}
