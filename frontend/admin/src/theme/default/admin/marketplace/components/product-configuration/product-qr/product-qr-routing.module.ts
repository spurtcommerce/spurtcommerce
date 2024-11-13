import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productQrRoutes } from 'add-ons/add-ons.constant';

const routes: Routes = [
  ...productQrRoutes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductQrRoutingModule { }
