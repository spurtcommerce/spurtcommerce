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
import { OrderListComponent } from './list/list.component';
import { ViewOrdersComponent } from './vieworders/vieworders.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const orderRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: OrderListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-order', urls: [{ title: 'Sales', url: '' },
  { title: 'Orders', url: '' },
  { title: 'List', url: '' }] }},
  { path: 'vieworder', component: ViewOrdersComponent, canActivate: [AuthGuard], data: { permission: 'view-order',     urls: [{ title: 'Sales', url: '' },
  { title: 'Orders', url: '' },
  { title: 'Details', url: '' }] } },
  {
    path: 'vieworder/:orderId',
    component: ViewOrdersComponent, canActivate: [AuthGuard],
    data: { permission: 'view-order',     urls: [{ title: 'Sales', url: '' },
    { title: 'Orders', url: '' },
    { title: 'Details', url: '' }] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
