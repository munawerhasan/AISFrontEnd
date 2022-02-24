import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SchoolRoutingModule } from './school-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { SchoolAddComponent } from './components/school-add/school-add.component';
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
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from "@angular/common/http";
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [SchoolListComponent, SchoolAddComponent, UserAdminComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule,
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
    HttpClientModule,
    MessageModule,
    MessagesModule,
    RippleModule,
    PanelModule,
    InputMaskModule,
    SharedModule,
    CalendarModule
  ]
})
export class SchoolModule { }
