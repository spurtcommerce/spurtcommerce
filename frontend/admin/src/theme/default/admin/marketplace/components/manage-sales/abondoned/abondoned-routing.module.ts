import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { abondonedRoutes } from 'add-ons/add-ons.constant';

const routes: Routes = [...abondonedRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbondonedRoutingModule { }
