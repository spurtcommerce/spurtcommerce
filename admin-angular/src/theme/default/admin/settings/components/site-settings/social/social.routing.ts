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
import { SocialComponent } from './social.components';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

// Component

const socialRoutes: Routes = [{ path: '', component: SocialComponent,
canActivate: [AuthGuard],
  data: {permission: 'edit-social-url'} }];

@NgModule({
  imports: [RouterModule.forChild(socialRoutes)],
  exports: [RouterModule]
})
export class SocialRouting {}
