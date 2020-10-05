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
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components

// Store Actions
import { EffectsModule } from '@ngrx/effects';

// Routing Module

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { PersonalizeOrderComponent } from './personalize-order.component';
import { PersonalizeOrderRouting } from './personalize-order.routing';
import { PerSonalizeOrderService } from '../../../../../../../core/admin/settings/personalize/order/order-service';
import { PersonalizeOrderSandbox } from '../../../../../../../core/admin/settings/personalize/order/order-sandbox';
import { PersonalizeOrderEffect } from '../../../../../../../core/admin/settings/personalize/order/order-effects/order-effect';

@NgModule({
  declarations: [PersonalizeOrderComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PersonalizeOrderRouting,
    EffectsModule.forRoot([PersonalizeOrderEffect])
  ],
  providers: [PersonalizeOrderSandbox, PerSonalizeOrderService],
  bootstrap: [],
  entryComponents: []
})
export class PersonalizeOrderModule {}
