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
import { UserAddComponent } from './add/add.component';
import { UserListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../../core/admin/providers/auth.guard';
const userRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: UserListComponent, data: { permission: 'list-user' }, canActivate: [AuthGuard] },
  { path: 'add', component: UserAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-user' } },
  {
    path: 'edit/:id',
    component: UserAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-user' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
