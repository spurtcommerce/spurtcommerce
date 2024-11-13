/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { TaxListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
const taxRoutes: Routes = [
  { path: '', component: TaxListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-tax' } },

];

@NgModule({
  imports: [RouterModule.forChild(taxRoutes)],
  exports: [RouterModule]
})
export class TaxRoutingModule {}
