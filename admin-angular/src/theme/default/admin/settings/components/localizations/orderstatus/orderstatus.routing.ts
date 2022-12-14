/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { OrderStatusAddComponent } from './add/add.component';
import { OrderStatusListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const orderstatusRoutes: Routes = [
  { path: '', component: OrderStatusListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-order-status' } },
  { path: 'add', component: OrderStatusAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-order-status' } },
  {
    path: 'edit/:id',
    component: OrderStatusAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-order-status' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(orderstatusRoutes)],
  exports: [RouterModule]
})
export class OrderStatusRoutingModule {}
