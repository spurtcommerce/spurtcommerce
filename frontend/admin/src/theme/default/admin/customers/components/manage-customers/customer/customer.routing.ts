/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { CustomerAddComponent } from './add/add.component';
import { CustomerListComponent } from './list/list.component';
import { CustomerViewComponent } from './view/view.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const customerRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: CustomerListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-buyer',
      urls: [{ title: 'breadcrumbs.Buyers', url: '' }, { title: 'breadcrumbs.ManageBuyer', url: '' },
      { title: 'breadcrumbs.BuyersList', url: '' },]
    }
  },
  {
    path: 'add', component: CustomerAddComponent, canActivate: [AuthGuard],
    data: {
      permission: 'create-buyer', urls: [{ title: 'breadcrumbs.Buyers', url: '/customers/manage-customers/customer/list' }, { title: 'breadcrumbs.ManageBuyer', url: '/customers/manage-customers/customer/list' },
      { title: 'breadcrumbs.Add Buyer', url: '' }]
    }
  },
  {
    path: 'view/:id', component: CustomerViewComponent, canActivate: [AuthGuard],
    data: {
      permission: 'update-buyer', urls: [{ title: 'Buyers', url: '/customers/manage-customers/customer/list' }, { title: 'Manage Buyer', url: '/customers/manage-customers/customer/list' },
      { title: 'Buyer Details', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: CustomerAddComponent, canActivate: [AuthGuard],
    data: {
      permission: 'update-buyer', urls: [{ title: 'breadcrumbs.Buyers', url: '/customers/manage-customers/customer/list' }, { title: 'breadcrumbs.ManageBuyer', url: '/customers/manage-customers/customer/list' },
      { title: 'breadcrumbs.Update Buyer', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
