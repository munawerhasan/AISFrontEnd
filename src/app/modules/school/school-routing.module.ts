import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { SchoolAddComponent } from './components/school-add/school-add.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  { path: "allSchool", component: SchoolListComponent },
  { path: "addSchool", component: SchoolAddComponent },
  { path: "updateSchool/:schoolId", component: SchoolAddComponent },
  { path: "userAdmin", component: UserAdminComponent },
  { path: "changePassword/:userId/:userName", component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
