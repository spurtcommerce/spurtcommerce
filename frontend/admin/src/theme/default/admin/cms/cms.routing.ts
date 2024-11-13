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
import { CMSLayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';

const cmsRoutes: Routes = [
  { path: '', redirectTo: 'manage-content', pathMatch: 'full' },
  {
    path: '',
    component: CMSLayoutComponent,
    children: [
      {
          path: 'manage-content',
          loadChildren: () => import('./components/manage-content/manage-content.module').then(m => m.ManageContentModule),
          canActivate: [AuthGuard],
          data: { permissionForHeader: 'cms-pages', root: 'cms' }
      },
      {
        path: 'manage-banners',
        loadChildren: () => import('./components/manage-banners/manage-banners.module').then(m => m.ManageBannersModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-banners', root: 'cms' }
      },
      {
        path: 'manage-blogs',
        loadChildren: () => import('./components/manage-blogs/manage-blogs.module').then(m => m.ManageBlogsModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-blogs', root: 'cms' }
      },
      {
        path: 'manage-seo',
        loadChildren: () => import('./components/manage-seo/manage-seo.routing').then(m => m.ManageSeoRoutingModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'settings-site-seo', root: 'settings' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(cmsRoutes)],
  exports: [RouterModule]
})
export class CMSRoutingModule {}
