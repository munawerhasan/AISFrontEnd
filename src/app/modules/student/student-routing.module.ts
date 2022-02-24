import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from "./components/student-list/list.component";
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentAssignmentComponent } from './components/student-assignment/student-assignment.component';
import { StudentAssignmentResultComponent } from './components/student-assignment-result/student-assignment-result.component';
const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'dashboard', component: StudentDashboardComponent },
  { path: 'my-assignment', component: StudentAssignmentComponent },
  { path: 'assignment-result', component: StudentAssignmentResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
