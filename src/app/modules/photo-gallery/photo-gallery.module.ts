import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { AddStudentPhotoComponent } from './components/add-student-photo/add-student-photo.component';
import {DataViewModule} from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { AddEmployeePhotoComponent } from './components/add-employee-photo/add-employee-photo.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { GalleryComponent } from './components/gallery/gallery.component';
import {GalleriaModule} from 'primeng/galleria';
@NgModule({
  declarations: [AddStudentPhotoComponent, AddEmployeePhotoComponent, GalleryComponent],
  imports: [
    CommonModule,
    PhotoGalleryRoutingModule,
    DataViewModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    SplitButtonModule,
    DialogModule,
    GalleriaModule
    
  ]
})
export class PhotoGalleryModule { }
