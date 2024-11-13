/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CommonLayoutComponent } from './layout/common/common.component';
import { AuthGuard } from '../../../core/admin/providers/auth.guard';
import { EditprofileComponent } from './layout/editprofile/editprofile.component';
import { AuthLayoutComponent } from './layout/auth/auth.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { SetPasswordComponent } from './authentication/set-password/set-password.component';
import { TokenExpireComponent } from './authentication/token-expire/token-expire.component';
import { TokenInvalidComponent } from './authentication/token-invalid/token-invalid.component';
import { chatConversationComponentRoutes } from '../../../../add-ons/add-ons.constant';

export const appRoutes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      {
        path: 'editprofile', component: EditprofileComponent, data: {
          urls: [{ title: 'breadcrumbs.Settings', url: '' },
          { title: 'breadcrumbs.Edit Profile', url: '' },
          ]
        }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'seller',
        loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),

        canActivate: [AuthGuard]
      },
      {
        path: 'cms',
        loadChildren: () => import('./cms/cms.module').then(m => m.CMSModule),

        canActivate: [AuthGuard]
      },
      {
        path: 'marketing',
        loadChildren: () => import('./marketing/marketing.module').then(m => m.MarketingModule),

        canActivate: [AuthGuard]
      },
      {
        path: 'change-password',
        loadChildren: () => import('./layout/changepassword/changepassword.module').then(m => m.ChangePasswordModule),
      },
      {
        path: 'vendors',
        loadChildren: () => import('./marketplace/marketplace.routing').then(m => m.VendorModule),
      },
     
      {
        path: 'support',
        loadChildren: () => import('./support/support.module').then(m => m.SupportModule),
        canActivate: [AuthGuard]
      },
      // add-ons seperation
      ...chatConversationComponentRoutes
    
    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: 'set-password',
    component: SetPasswordComponent,
  },
  {
    path: 'token-expired',
    component: TokenExpireComponent
  },
  {
    path: 'invalid-token',
    component: TokenInvalidComponent
  },
  {
    path: 'error',
    loadChildren: () => import(`./error/error.module`).then(m => m.ErrorModule)

  },
  
  { path: '**', redirectTo: '/error/404' }
];



//chat add-ons push
// appRoutes[0].children?.push(chatRoutes[0])

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
