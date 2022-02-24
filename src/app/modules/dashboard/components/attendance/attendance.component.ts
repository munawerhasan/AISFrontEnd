import { Component, OnInit, ViewChild } from '@angular/core';
import {Table} from 'primeng/table';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  barData:any;
  first = 0;
  rows = 10;
  attendenceData:any
  @ViewChild('dt') table: Table;
  constructor() { }

  ngOnInit(): void {
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
    this.attendenceData=[
      {className:'NUR', section:'A', present:'35', absent:'34', lecture:44},
      {className:'NUR', section:'B', present:'65', absent:'43', lecture:40},
      {className:'NUR', section:'C', present:'50', absent:'34', lecture:42},
      {className:'UKG', section:'A', present:'44', absent:'65', lecture:66},
      {className:'UKG', section:'B', present:'65', absent:'66', lecture:33},
      {className:'UKG', section:'C', present:'34', absent:'55', lecture:55},
      {className:'LKG', section:'A', present:'35', absent:'34', lecture:44},
      {className:'LKG', section:'B', present:'65', absent:'43', lecture:40},
      {className:'LKG', section:'C', present:'50', absent:'34', lecture:42},
      {className:'I', section:'A', present:'44', absent:'65', lecture:66},
      {className:'I', section:'B', present:'65', absent:'66', lecture:33},
      {className:'I', section:'C', present:'34', absent:'55', lecture:55},
    ]

  }

}
