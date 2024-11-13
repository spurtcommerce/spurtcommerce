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
      {
        path: 'access-and-permission',
        loadChildren: () => import('./components/access-permission/access-permission.module').then(m => m.AccessPermissionModule),
        canActivate: [AuthGuard],
        data: {root: 'settings', permissionForHeader: 'edit-general-settings'}
      },

      {
        path: 'generalsetting',
        loadChildren: () => import('./components/generalsettings/generalsettings.module').then(m => m.GeneralSettingsModule),
        canActivate: [AuthGuard],
        data: {root: 'settings', permissionForHeader: 'edit-general-settings'}
      },
      {
        path: 'sitesettings',
        loadChildren: () => import('./components/system/sitesettings.module').then(m => m.SiteSettingsModule),
        canActivate: [AuthGuard],
        data: {root: 'settings', permissionForHeader: 'edit-general-settings'}
      },
      {
        path: 'site-settings',
        loadChildren: () => import('./components/site-settings/site-settings.module').then(m => m.SiteSettingsModule),
        canActivate: [AuthGuard],
        data: {root: 'settings', permissionForHeader: 'edit-general-settings'}
      },
      {
        path: 'personalize',
        loadChildren: () => import('./components/personalize/personalize.module').then(m => m.PersonalizeModule),
        canActivate: [AuthGuard],
        data: {root: 'settings', permissionForHeader: 'edit-general-settings'}

      },

      {
        path: 'local',
        loadChildren: () => import('./components/localizations/localization.module').then(m => m.LocalizationModule),
        canActivate: [AuthGuard],
        data: {root: 'settings', permissionForHeader: 'settings-local'}

      },
      {
        path: 'order-fullfillment',
        loadChildren: () => import('./components/order-fullfillment-status/order-fullfillment-status.module').then(m => m.OrderFullfillmentStatusModule),
        canActivate: [AuthGuard],
        data: {root: 'settings', permissionForHeader: 'edit-general-settings'}

      },
      {
        path: 'add-on',
        loadChildren: () => import('./components/addon/addon.module').then(m => m.AddonModule),
        canActivate: [AuthGuard],
        data: {root: 'settings', permissionForHeader: 'edit-general-settings'}

      },
      {
        path: 'multiple-websites',
        loadChildren: () => import('./components/multiple-websites/multiple-websites.module').then(m => m.MultipleWebsitesModule),
        canActivate: [AuthGuard],
        data: {root: 'settings', permissionForHeader: 'edit-general-settings'}

      },
      

    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
