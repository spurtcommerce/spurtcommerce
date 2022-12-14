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
import { CustomerLayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';


const customersRoutes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      {
        path: 'customer',
        loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'customers-customer', root: 'customer' }
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
