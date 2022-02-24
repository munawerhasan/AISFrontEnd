import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-sylebus',
  templateUrl: './sylebus.component.html',
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
export class SylebusComponent implements OnInit {
  first = 0;
  rows = 10;
  data: any;
  @ViewChild('dt') table: Table;
  constructor() { }

  ngOnInit(): void {
  }

}
