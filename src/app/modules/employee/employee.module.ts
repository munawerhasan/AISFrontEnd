import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { MapClassEmployeeSubjectComponent } from './components/map-class-employee-subject/map-class-employee-subject.component';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { PanelModule } from 'primeng/panel';
import { DataViewModule } from 'primeng/dataview';
import { HttpClientModule } from "@angular/common/http";
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '../../shared/shared.module';
import {CalendarModule} from 'primeng/calendar';

import { TeacherMappingWithSubjectComponent } from './components/teacher-mapping-with-subject/teacher-mapping-with-subject.component';
@NgModule({
  declarations: [EmployeeListComponent, EmployeeAddComponent, MapClassEmployeeSubjectComponent, TeacherMappingWithSubjectComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextareaModule,
    CardModule,
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    FileUploadModule,
    ToolbarModule,
    TooltipModule,
    ToastModule,
    MultiSelectModule,
    SplitButtonModule,
    ConfirmDialogModule,
    DialogModule,
    ListboxModule,
    OrderListModule,
    PickListModule,
    PanelModule,
    DataViewModule,
    HttpClientModule,
    InputMaskModule,
    SharedModule,
    CalendarModule
  ]
})
export class EmployeeModule { }
