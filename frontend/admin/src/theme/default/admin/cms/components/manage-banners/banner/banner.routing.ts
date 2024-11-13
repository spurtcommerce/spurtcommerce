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
import { BannerAddComponent } from './add/add.component';
import { BannerListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
const bannerRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BannerListComponent,
  canActivate: [AuthGuard],
  data: {
  permission: 'list-banners',
  urls: [{ title: 'breadcrumbs.CMS', url: '' },{ title: 'breadcrumbs.Manage Banners', url: '' },
  { title: 'breadcrumbs.Banners', url: '' },
  { title: 'breadcrumbs.List', url: '' }]
 }
 },
  { path: 'add', component: BannerAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-banners',
  urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-banners/banners/list' },{ title: 'breadcrumbs.Manage Banners', url: '/cms/manage-banners/banners/list' },
  { title: 'breadcrumbs.Banners', url: '/cms/manage-banners/banners/list' },
  { title: 'breadcrumbs.Add', url: '' }]
 } },
  {
    path: 'edit/:id',
    component: BannerAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-banners',
    urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-banners/banners/list' },{ title: 'breadcrumbs.Manage Banners', url: '/cms/manage-banners/banners/list' },
    { title: 'breadcrumbs.Banners', url: '/cms/manage-banners/banners/list' },
    { title: 'breadcrumbs.Edit', url: '' }]
   }
  }
];

@NgModule({
  imports: [RouterModule.forChild(bannerRoutes)],
  exports: [RouterModule]
})
export class BannerRoutingModule {}
