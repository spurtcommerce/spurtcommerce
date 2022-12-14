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
import { SalesLayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';


const salesRoutes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  {
    path: '',
    component: SalesLayoutComponent,
    children: [
      {
        path: 'orders',
        loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule),
        canActivate: [AuthGuard],
        data: {root: 'sales', permissionForHeader: 'sales-orders'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(salesRoutes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
