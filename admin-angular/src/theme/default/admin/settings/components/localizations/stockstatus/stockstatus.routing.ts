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
import { StockStatusAddComponent } from './add/add.component';
import { StockStatusListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const stockStatusRoutes: Routes = [
  { path: '', component: StockStatusListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-stock-status' } },
  { path: 'add', component: StockStatusAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-stock-status' } },
  {
    path: 'edit/:id',
    component: StockStatusListComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-stock-status' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(stockStatusRoutes)],
  exports: [RouterModule]
})
export class StockStatusRoutingModule {}
