import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentStudentComponent } from './components/payment-student/payment-student.component';
import { PendingFeeComponent } from './components/pending-fee/pending-fee.component';

const routes: Routes = [
  { path: 'allPayment', component: PaymentComponent },
  { path: 'payment-student', component: PaymentStudentComponent },
  { path: 'pending-fee', component: PendingFeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
