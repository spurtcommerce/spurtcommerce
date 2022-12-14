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
import { CustomerAddComponent } from './add/add.component';
import { CustomerListComponent } from './list/list.component';
import { CustomerViewComponent } from './view/view.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const customerRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: CustomerListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-customer',
      urls: [{ title: 'Customers', url: '' },
      { title: 'Customers', url: '' },
      { title: 'List', url: '' }]
    }
  },
  {
    path: 'add', component: CustomerAddComponent, canActivate: [AuthGuard],
    data: {
      permission: 'create-customer', urls: [{ title: 'Customers', url: '' },
      { title: 'Customers', url: '' },
      { title: 'Add', url: '' }]
    }
  },
  {
    path: 'view/:id', component: CustomerViewComponent, canActivate: [AuthGuard],
    data: {
      permission: 'view-customer', urls: [{ title: 'Customers', url: '' },
      { title: 'Customers', url: '' },
      { title: 'Details', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: CustomerAddComponent, canActivate: [AuthGuard],
    data: {
      permission: 'edit-customer', urls: [{ title: 'Customers', url: '' },
      { title: 'Customers', url: '' },
      { title: 'Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
