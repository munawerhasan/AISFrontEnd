import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassMasterComponent } from './components/class-master/class-master.component';
import { SectionMasterComponent } from './components/section-master/section-master.component';
import { ClassSectionMappingComponent } from './components/class-section-mapping/class-section-mapping.component';
import { BatchMasterComponent } from './components/batch-master/batch-master.component';
import { SubjectMasterComponent } from './components/subject-master/subject-master.component';
import { DepartmentMasterComponent } from './components/department-master/department-master.component';
import { OccupationMasterComponent } from './components/occupation-master/occupation-master.component';
import { DocumentMasterComponent } from './components/document-master/document-master.component';
import { ClassWithSubjectComponent } from './components/ClassWithSubjectC/class-with-subject.component';
import { SubjectWithTopicComponent } from './components/subject-with-topic/subject-with-topic.component';
import { MapClassWithSubjectComponent } from './components/map-class-with-subject/map-class-with-subject.component';
import { TopicMasterComponent } from './components/topic-master/topic-master.component';
import { ChapterMasterComponent } from './components/chapter-master/chapter-master.component';
import { UnitMasterComponent } from './components/unit-master/unit-master.component';
const routes: Routes = [
  { path: 'batchMaster', component: BatchMasterComponent },
  { path: 'subjectMaster', component: SubjectMasterComponent },
  { path: 'classWithsubjectMapping', component: ClassWithSubjectComponent },
  { path: 'classMaster', component: ClassMasterComponent },
  { path: 'departmentMaster', component: DepartmentMasterComponent },
  { path: 'occupationMaster', component: OccupationMasterComponent },
  { path: 'documentMaster', component: DocumentMasterComponent },
  { path: 'sectionMaster', component: SectionMasterComponent },
  { path: 'classSectionMapping', component: ClassSectionMappingComponent },
  { path: 'subject-topic', component: SubjectWithTopicComponent },
  { path: 'mapClassWithSubject', component: MapClassWithSubjectComponent },
  { path: 'unit', component: UnitMasterComponent },
  { path: 'chapter', component: ChapterMasterComponent },
  { path: 'topic', component: TopicMasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterdataconfigurationRoutingModule { }
