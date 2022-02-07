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
import { OrderAddComponent } from './add/add.component';
import { OrderListComponent } from './list/list.component';
import { ViewOrdersComponent } from './vieworders/vieworders.component';

const orderRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: OrderListComponent },
  { path: 'add', component: OrderAddComponent },
  { path: 'vieworder', component: ViewOrdersComponent },
  {
    path: 'vieworder/:orderId',
    component: ViewOrdersComponent
  },
  {
    path: 'edit/:id',
    component: OrderAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
