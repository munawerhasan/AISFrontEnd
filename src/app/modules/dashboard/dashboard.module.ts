import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ClassAndSectionStudentCountComponent } from './components/class-and-section-student-count/class-and-section-student-count.component';
import {ChartModule} from 'primeng/chart';
import {FieldsetModule} from 'primeng/fieldset';
import { TransactionComponent } from './components/transaction/transaction.component';
import { PendingFeeComponent } from './components/pending-fee/pending-fee.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PanelModule} from 'primeng/panel';
import {AccordionModule} from 'primeng/accordion';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { StudentCountingComponent } from './components/student-counting/student-counting.component';
import {TabViewModule} from 'primeng/tabview';
import { StudentModule } from "../student/student.module";
import { TeacherMappingSubjectComponent } from './components/teacher-mapping-subject/teacher-mapping-subject.component';
import {DataViewModule} from 'primeng/dataview';
import { ToolbarModule } from 'primeng/toolbar';
import { SylebusComponent } from './components/sylebus/sylebus.component';
@NgModule({
  declarations: [MainDashboardComponent, ClassAndSectionStudentCountComponent, TransactionComponent, PendingFeeComponent, AttendanceComponent, StudentCountingComponent, TeacherMappingSubjectComponent, SylebusComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TableModule,
    ButtonModule,
    ProgressBarModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ChartModule,
    FieldsetModule,
    OverlayPanelModule,
    PanelModule,
    AccordionModule,
    TabViewModule,
    StudentModule,
    DataViewModule,
    ToolbarModule
  ],

  exports:[
    PendingFeeComponent
  ]
})
export class DashboardModule { }
