/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports module 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { CurrencyListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const currencyRoutes: Routes = [
  { path: '', component: CurrencyListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-currency' } },
];

@NgModule({
  imports: [RouterModule.forChild(currencyRoutes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule {}
