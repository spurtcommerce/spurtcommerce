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
import { PaymentsComponent } from './payments.component';

const paymentsRoutes: Routes = [{ path: '', component: PaymentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(paymentsRoutes)],
  exports: [RouterModule]
})
export class PaymentsRouting {}
