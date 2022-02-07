/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalizeLayoutComponent } from './layout/layout.component';

const Routers: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  {
    path: '',
    component: PersonalizeLayoutComponent,
    children: [
      {
        path: 'product',
        loadChildren:
          './product/personalize-product.module#PersonalizeProductModule'
      },
      {
        path: 'order',
        loadChildren: './order/personalize-order.module#PersonalizeOrderModule'
      }
    ]
  }
];
@NgModule({
  declarations: [PersonalizeLayoutComponent],
  imports: [RouterModule.forChild(Routers)],
  providers: [],
  exports: [RouterModule]
})
export class PersonalizeModule {}
