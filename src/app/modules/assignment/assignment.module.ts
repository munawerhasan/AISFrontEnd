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
import {PanelModule} from 'primeng/panel';
import {ListboxModule} from 'primeng/listbox';
import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { AssignmentActivityComponent } from './components/assignment-activity/assignment-activity.component';
import {DataViewModule} from 'primeng/dataview';
import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
@NgModule({
  declarations: [AssignmentListComponent, AddAssignmentComponent, AssignmentActivityComponent, ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
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
    PanelModule,
    DataViewModule,
    FieldsetModule,
    TabViewModule,
    ScrollPanelModule
  ]
})
export class AssignmentModule { }
