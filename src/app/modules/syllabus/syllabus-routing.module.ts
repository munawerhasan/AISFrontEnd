import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SyllabusStatusUpdateComponent } from './components/syllabus-status-update/syllabus-status-update.component';
import { SyllabusUpdateComponent } from './components/syllabus-update/syllabus-update.component';
const routes: Routes = [
  { path: 'syllabusStatus', component: SyllabusStatusUpdateComponent },
  { path: 'syllabusUpdate', component: SyllabusUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyllabusRoutingModule { }
