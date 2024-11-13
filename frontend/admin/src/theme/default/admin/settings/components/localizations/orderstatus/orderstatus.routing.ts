/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { OrderStatusListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const orderstatusRoutes: Routes = [
  {
    path: '', component: OrderStatusListComponent, canActivate: [AuthGuard],
    data: { permission: 'list-order-status' }
  },

];

@NgModule({
  imports: [RouterModule.forChild(orderstatusRoutes)],
  exports: [RouterModule]
})
export class OrderStatusRoutingModule { }
