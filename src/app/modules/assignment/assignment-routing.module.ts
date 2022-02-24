import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { AssignmentActivityComponent } from './components/assignment-activity/assignment-activity.component';

const routes: Routes = [
  { path: 'list', component: AssignmentListComponent },
  { path: 'add', component: AddAssignmentComponent },
  { path: 'activity/:id', component: AssignmentActivityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }
