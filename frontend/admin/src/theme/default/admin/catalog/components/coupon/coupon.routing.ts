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
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

// Component
import { CouponAddComponent } from './add/add.component';
import { CouponListComponent } from './list/list.component';

const couponRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: CouponListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-coupon',
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Coupon', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },
  {
    path: 'add', component: CouponAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'create-coupon',
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Coupon', url: '' },
      { title: 'breadcrumbs.Add', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: CouponAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'edit-coupon',
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Coupon', url: '' },
      { title: 'breadcrumbs.Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(couponRoutes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
