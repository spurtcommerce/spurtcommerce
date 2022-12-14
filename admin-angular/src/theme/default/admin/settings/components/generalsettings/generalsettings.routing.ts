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
import { GeneralSettingComponent } from './generalsettings/generalsettings.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const roleRoutes: Routes = [{
  path: '', component: GeneralSettingComponent,
  canActivate: [AuthGuard],
  // data: { permission: 'edit-general-settings' }
  data:
  {
    permission: 'edit-general-settings',
    urls: [{ title: 'Settings', url: '' },
      { title: 'General', url: '' },
      { title: 'Basic information', url: '' },
    ]
  }
}];

@NgModule({
  imports: [RouterModule.forChild(roleRoutes)],
  exports: [RouterModule]
})
export class GenaeralSettingsRoutingModule { }
