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
import { RoleAddComponent } from './add/add.component';
import { RoleListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../../core/admin/providers/auth.guard';

const roleRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: RoleListComponent, canActivate: [AuthGuard], data: { permission: 'list-role' } },
  {
    path: 'edit/:id',
    component: RoleAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-role' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(roleRoutes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
