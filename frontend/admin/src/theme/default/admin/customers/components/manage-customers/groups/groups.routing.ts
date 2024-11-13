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
import { GroupsAddComponent } from './add/add.component';
import { GroupsListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const groupsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: GroupsListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-customer-group',
      urls: [{ title: 'Buyers', url: '' },{ title: 'Manage Buyer', url: '' },
      { title: 'Buyer Groups List', url: '' }]
    }
  },

  {
    path: 'add', component: GroupsAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'create-customer-group', urls: [{ title: 'Buyers', url: '' },{ title: 'Manage Buyer', url: '' },
      { title: 'Buyer Groups Add', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: GroupsAddComponent, canActivate: [AuthGuard],
    data: {
      permission: 'edit-customer-group',
      urls: [{ title: 'Buyers', url: '' },{ title: 'Manage Buyer', url: '' },
      { title: 'Buyer Groups Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(groupsRoutes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
