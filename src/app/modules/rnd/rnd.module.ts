import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule} from "@angular/forms";
import { RndRoutingModule } from './rnd-routing.module';
import { PrimeNgComponentComponent } from './components/prime-ng-component/prime-ng-component.component';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';
@NgModule({
  declarations: [PrimeNgComponentComponent],
  imports: [
    CommonModule,
    RndRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    MultiSelectModule,
    ListboxModule
  ]
})
export class RndModule { }
