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
import { ChangePasswordComponent } from './changepassword.component';

const changePasswordRoutes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent, data: {
      urls: [{ title: 'Settings', url: '' },
      { title: 'Change Password', url: '' },
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(changePasswordRoutes)],
  exports: [RouterModule]
})
export class ChangePasswordRouting { }
