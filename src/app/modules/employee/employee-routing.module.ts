import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { MapClassEmployeeSubjectComponent } from './components/map-class-employee-subject/map-class-employee-subject.component';
import { TeacherMappingWithSubjectComponent } from './components/teacher-mapping-with-subject/teacher-mapping-with-subject.component';
const routes: Routes = [
  { path: 'list', component:  EmployeeListComponent },
  { path: 'add', component:  EmployeeAddComponent },
  { path: 'updateEmployee/:id', component:  EmployeeAddComponent },
  { path: 'mapClass', component:  MapClassEmployeeSubjectComponent },
  { path: 'teacher-mapping-subject', component:  TeacherMappingWithSubjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
