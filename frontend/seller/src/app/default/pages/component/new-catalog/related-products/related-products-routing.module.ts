import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { relatedProductsRoutes } from '../../../../../../../add-ons/add-ons.constant';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
          ...relatedProductsRoutes
        ]
      },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatedProductsRoutingModule { }
