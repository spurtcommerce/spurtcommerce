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
import { BannerAddComponent } from './add/add.component';
import { BannerListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
const bannerRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BannerListComponent,
  canActivate: [AuthGuard],
  data: {
  permission: 'list-banners',
  urls: [{ title: 'CMS', url: '' },
  { title: 'Banners', url: '' },
  { title: 'List', url: '' }]
 }
 },
  { path: 'add', component: BannerAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-banners',
  urls: [{ title: 'CMS', url: '' },
  { title: 'Banners', url: '' },
  { title: 'Add', url: '' }]
 } },
  {
    path: 'edit/:id',
    component: BannerAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-banners',
    urls: [{ title: 'CMS', url: '' },
    { title: 'Banners', url: '' },
    { title: 'Update', url: '' }]
   }
  }
];

@NgModule({
  imports: [RouterModule.forChild(bannerRoutes)],
  exports: [RouterModule]
})
export class BannerRoutingModule {}
