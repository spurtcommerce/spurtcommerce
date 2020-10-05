/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Component
import { SettingsLayoutComponent } from './components/layout/layout.component';

const settingsRoutes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: '',
    component: SettingsLayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: './components/user/user.module#UserModule'
      },
      {
        path: 'role',
        loadChildren: './components/role/role.module#RoleModule'
      },

      {
        path: 'generalsetting',
        loadChildren:
          './components/generalsettings/generalsettings.module#GeneralSettingsModule'
      },
      {
        path: 'sidesettings',
        loadChildren:
          './components/sitesettings/sitesettings.module#SiteSettingsModule'
      },
      {
        path: 'personalize',
        loadChildren:
          './components/personalize/personalize.module#PersonalizeModule'
      },
      {
        path: 'local',
        loadChildren:
          './components/localizations/localization.module#LocalizationModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
