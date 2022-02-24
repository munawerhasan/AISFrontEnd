import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { StudentRoutingModule } from './student-routing.module';
import { ListComponent } from './components/student-list/list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SharedModule } from '../../shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentAssignmentComponent } from './components/student-assignment/student-assignment.component';
import { StudentAssignmentResultComponent } from './components/student-assignment-result/student-assignment-result.component';
import { FieldsetModule } from 'primeng/fieldset';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [ListComponent, StudentDashboardComponent, StudentAssignmentComponent, StudentAssignmentResultComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    TableModule,
    ToolbarModule,
    TooltipModule,
    ToastModule,
    DataViewModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    SharedModule,
    TabViewModule,
    FieldsetModule,
    ScrollPanelModule,
    AccordionModule,
    DialogModule,
    FileUploadModule,
    ReactiveFormsModule
  ],

  exports: [
    StudentDashboardComponent,
  ]
})
export class StudentModule { }
