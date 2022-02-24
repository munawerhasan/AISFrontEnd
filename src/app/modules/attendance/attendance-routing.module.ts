import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
const routes: Routes = [
  { path: 'qr-code', component: QrCodeComponent },
  { path: 'attendance', component: AttendanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
