import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {variantsRoutes } from '../../../../../../../../../../add-ons/add-ons.constant';



const variantRoute: Routes = [
  ...variantsRoutes
];
@NgModule({
  imports: [
    RouterModule.forChild(variantRoute)
  ],
  exports: [RouterModule]
})
export class VariantsRoutingModule { }
