import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterdataconfigurationRoutingModule } from './masterdataconfiguration-routing.module';
import { SharedModule } from '../../shared/shared.module';
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
import { ClassMasterComponent } from './components/class-master/class-master.component';
import { SectionMasterComponent } from './components/section-master/section-master.component';
import { ClassSectionMappingComponent } from './components/class-section-mapping/class-section-mapping.component';
import { BatchMasterComponent } from './components/batch-master/batch-master.component';
import { SubjectMasterComponent } from './components/subject-master/subject-master.component';
import { DepartmentMasterComponent } from './components/department-master/department-master.component';
import { OccupationMasterComponent } from './components/occupation-master/occupation-master.component';
import { DocumentMasterComponent } from './components/document-master/document-master.component';
import { ClassWithSubjectComponent } from './components/ClassWithSubjectC/class-with-subject.component';
import {ListboxModule} from 'primeng/listbox';
import { SubjectWithTopicComponent } from './components/subject-with-topic/subject-with-topic.component';
import {PanelModule} from 'primeng/panel';
import { MapClassWithSubjectComponent } from './components/map-class-with-subject/map-class-with-subject.component';
import { DashboardModule } from "../dashboard/dashboard.module";
import { TopicMasterComponent } from './components/topic-master/topic-master.component';
import { ChapterMasterComponent } from './components/chapter-master/chapter-master.component';
import { UnitMasterComponent } from './components/unit-master/unit-master.component';
@NgModule({
  declarations: [ClassMasterComponent, SectionMasterComponent, ClassSectionMappingComponent, BatchMasterComponent, SubjectMasterComponent, DepartmentMasterComponent, OccupationMasterComponent, DocumentMasterComponent, ClassWithSubjectComponent, SubjectWithTopicComponent, MapClassWithSubjectComponent, TopicMasterComponent, ChapterMasterComponent, UnitMasterComponent],
  imports: [
    CommonModule,
    MasterdataconfigurationRoutingModule,
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
    SharedModule,
    PanelModule,
    DashboardModule
  ]
})
export class MasterdataconfigurationModule { }
