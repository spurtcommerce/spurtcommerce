import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSeoRoutes } from 'add-ons/add-ons.constant';


const routes: Routes = [...ProductSeoRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
