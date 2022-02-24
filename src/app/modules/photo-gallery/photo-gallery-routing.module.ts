import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentPhotoComponent } from './components/add-student-photo/add-student-photo.component';
import { AddEmployeePhotoComponent } from './components/add-employee-photo/add-employee-photo.component';
import { GalleryComponent } from './components/gallery/gallery.component';

const routes: Routes = [
  { path: 'student-photo', component: AddStudentPhotoComponent },
  { path: 'employee-photo', component: AddEmployeePhotoComponent },
  { path: 'gallery', component: GalleryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoGalleryRoutingModule { }
