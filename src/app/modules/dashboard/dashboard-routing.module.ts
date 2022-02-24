import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { ClassAndSectionStudentCountComponent } from './components/class-and-section-student-count/class-and-section-student-count.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { PendingFeeComponent } from './components/pending-fee/pending-fee.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { StudentCountingComponent } from './components/student-counting/student-counting.component';
import { SylebusComponent } from './components/sylebus/sylebus.component';

const routes: Routes = [
  { path: 'dashboard', component: MainDashboardComponent },
  { path: 'classAndSectionStudentCount', component: ClassAndSectionStudentCountComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'pending-fee', component: PendingFeeComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'counting', component: StudentCountingComponent },
  { path: 'sylebus', component: SylebusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
