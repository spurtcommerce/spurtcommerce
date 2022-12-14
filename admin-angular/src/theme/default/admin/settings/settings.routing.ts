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
import { SettingsLayoutComponent } from './components/layout/layout.component';
import { PermissionComponent } from './components/access-permission/components/permission/permission.component';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';


const settingsRoutes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '',
    component: SettingsLayoutComponent,
    children: [
      // {
      //   path: 'user',
      //   loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
      // },
      // {
      //   path: 'role',
      //   loadChildren: () => import('./components/access-permission/components/role/role.module').then(m => m.RoleModule)
      // },
      {
        path: 'access-and-permission',
        loadChildren: () => import('./components/access-permission/access-permission.module').then(m => m.AccessPermissionModule)
      },

      {
        path: 'generalsetting',
        loadChildren: () => import('./components/generalsettings/generalsettings.module').then(m => m.GeneralSettingsModule)
      },
      {
        path: 'sitesettings',
        loadChildren: () => import('./components/system/sitesettings.module').then(m => m.SiteSettingsModule)
      },
      {
        path: 'site-settings',
        loadChildren: () => import('./components/site-settings/site-settings.module').then(m => m.SiteSettingsModule)
      },
      {
        path: 'personalize',
        loadChildren: () => import('./components/personalize/personalize.module').then(m => m.PersonalizeModule)

      },
      {
        path: 'local',
        loadChildren: () => import('./components/localizations/localization.module').then(m => m.LocalizationModule)

      },
      {
        path: 'order-fullfillment',
        loadChildren: () => import('./components/order-fullfillment-status/order-fullfillment-status.module').then(m => m.OrderFullfillmentStatusModule)

      }

    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
