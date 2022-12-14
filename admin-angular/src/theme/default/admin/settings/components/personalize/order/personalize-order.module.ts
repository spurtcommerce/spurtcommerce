/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Store Actions
import { EffectsModule } from '@ngrx/effects';

// Shared Module
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../../../default.material.module';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { PersonalizeOrderComponent } from './personalize-order.component';
import { PersonalizeOrderRouting } from './personalize-order.routing';
import { PerSonalizeOrderService } from '../../../../../../../core/admin/settings/personalize/order/order-service';
import { PersonalizeOrderSandbox } from '../../../../../../../core/admin/settings/personalize/order/order-sandbox';
import { PersonalizeOrderEffect } from '../../../../../../../core/admin/settings/personalize/order/order-effects/order-effect';
import { ComponentsModule } from '../../../../../../default/admin/shared/components';

@NgModule({
  declarations: [PersonalizeOrderComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PersonalizeOrderRouting,
    TranslateModule.forChild(),
    ComponentsModule,
    EffectsModule.forFeature([PersonalizeOrderEffect])
  ],
  providers: [PersonalizeOrderSandbox, PerSonalizeOrderService],
  bootstrap: [],
  entryComponents: []
})
export class PersonalizeOrderModule {}
