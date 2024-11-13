import { Title } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { commonProductComponentRoutes } from '../../../../../../../add-ons/add-ons.constant';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
          ...commonProductComponentRoutes
        ]
      },
    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonProductsRoutingModule { 
  title = 'Common Product';
  constructor(
    public titleService: Title,
){
  this.titleService.setTitle(this.title);
  }
}
