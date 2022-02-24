import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-student',
  templateUrl: './payment-student.component.html',
  styleUrls: ['./payment-student.component.scss']
})
export class PaymentStudentComponent implements OnInit {
  submitted:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
