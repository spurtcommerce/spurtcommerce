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
import { CMSLayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';


const cmsRoutes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: '',
    component: CMSLayoutComponent,
    children: [
      {
        path: 'banners',
        loadChildren: () => import('./components/banner/banner.module').then(m => m.BannerModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-banners', root: 'cms' }
      },
      {
        path: 'pages',
        loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-pages', root: 'cms' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(cmsRoutes)],
  exports: [RouterModule]
})
export class CMSRoutingModule {}
