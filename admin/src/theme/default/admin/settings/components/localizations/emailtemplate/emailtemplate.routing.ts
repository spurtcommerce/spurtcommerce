/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailTempListComponent } from './list/list.component';
import { EmailTempAddComponent } from './add/add.component';

// Component

const emailtempRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: EmailTempListComponent },
  { path: 'add', component: EmailTempAddComponent },
  {
    path: 'edit/:id',
    component: EmailTempAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(emailtempRoutes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule {}
