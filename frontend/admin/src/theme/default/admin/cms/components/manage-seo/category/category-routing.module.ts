import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorySeoRoutes } from 'add-ons/add-ons.constant';

const routes: Routes = [...CategorySeoRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
