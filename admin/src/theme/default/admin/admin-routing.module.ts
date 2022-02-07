/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CommonLayoutComponent } from './layout/common/common.component';
import { AuthGuard } from '../../../core/admin/providers/auth.guard';
import { EditprofileComponent } from './layout/editprofile/editprofile.component';
import { AuthLayoutComponent } from './layout/auth/auth.component';
import { AuthenticationModule } from './authentication/authentication.module';

export const appRoutes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'editprofile', component: EditprofileComponent },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'catalog',
        loadChildren: './catalog/catalog.module#CatalogModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'sales',
        loadChildren: './sales/sales.module#SalesModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'customers',
        loadChildren: './customers/customers.module#CustomersModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'cms',
        loadChildren: './cms/cms.module#CMSModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'change-password',
        loadChildren:
          './layout/changepassword/changepassword.module#ChangePasswordModule'
      }
    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  },
  { path: '**', redirectTo: '/error/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class DefaultRoutingModule {}
