import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { commonVendorProductsRoutes } from '../../../../../../../../add-ons/add-ons.constant';
const routes: Routes = [...commonVendorProductsRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonVendorProductRoutingModule { }
