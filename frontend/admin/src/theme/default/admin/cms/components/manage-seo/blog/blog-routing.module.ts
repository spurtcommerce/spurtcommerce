import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogSeoRoutes } from '../../../../../../../../add-ons/add-ons.constant';

const routes: Routes = [...BlogSeoRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
