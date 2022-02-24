import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimeNgComponentComponent } from './components/prime-ng-component/prime-ng-component.component';

const routes: Routes = [
  { path: 'prime', component: PrimeNgComponentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RndRoutingModule { }
