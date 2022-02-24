import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
import {RadioButtonModule} from 'primeng/radiobutton';
import { QRCodeModule } from 'angular2-qrcode';
@NgModule({
  declarations: [QrCodeComponent, AttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    TabViewModule,
    CardModule,
    TableModule,
    DropdownModule,
    SliderModule,InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    QRCodeModule
  ]
})
export class AttendanceModule { }
