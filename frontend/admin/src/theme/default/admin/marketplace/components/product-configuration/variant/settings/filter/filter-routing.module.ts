import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { variantFilterRoutes } from '../../../../../../../../../../add-ons/add-ons.constant';

const routes: Routes = [];

const variantFilterRoute: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  ...variantFilterRoutes
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    RouterModule.forChild(variantFilterRoute)
  ],
  exports: [RouterModule]
})
export class FilterRoutingModule { }
