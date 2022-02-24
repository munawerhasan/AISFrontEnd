import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { FeeRoutingModule } from './fee-routing.module';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentStudentComponent } from './components/payment-student/payment-student.component';
import { PendingFeeComponent } from './components/pending-fee/pending-fee.component';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [PaymentComponent, PaymentStudentComponent, PendingFeeComponent],
  imports: [
    CommonModule,
    FeeRoutingModule,
    TabViewModule,
    TableModule,
    DropdownModule,
    SliderModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    TooltipModule
  ]
})
export class FeeModule { }
