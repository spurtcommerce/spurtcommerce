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
import { CountriesAddComponent } from './add/add.component';
import { CountriesListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const userRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CountriesListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-country' } },
  { path: 'add', component: CountriesAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-country' } },
  {
    path: 'edit/:id',
    component: CountriesAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-country' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {}
