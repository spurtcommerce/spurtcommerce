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

// Component
import { OrderStatusAddComponent } from './add/add.component';
import { OrderStatusListComponent } from './list/list.component';

const orderstatusRoutes: Routes = [
  // { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '', component: OrderStatusListComponent },
  { path: 'add', component: OrderStatusAddComponent },
  {
    path: 'edit/:id',
    component: OrderStatusAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(orderstatusRoutes)],
  exports: [RouterModule]
})
export class OrderStatusRoutingModule {}
