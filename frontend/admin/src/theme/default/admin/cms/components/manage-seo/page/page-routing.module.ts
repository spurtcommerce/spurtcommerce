import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageSeoRoutes } from 'add-ons/add-ons.constant';

const routes: Routes = [...PageSeoRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
