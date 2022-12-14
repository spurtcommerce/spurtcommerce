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
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { OrderListComponent } from './list/list.component';
import { OrderFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { OrdersSandbox } from '../../../../../../core/admin/sales/orders/orders-sandbox';
import { OrdersService } from '../../../../../../core/admin/sales/orders/orders.service';
import { OrdersEffects } from '../../../../../../core/admin/sales/orders/orders-effects/orders.effects';

// Routing Module
import { OrderRoutingModule } from './orders.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ViewOrdersComponent } from './vieworders/vieworders.component';
import { OrderstatusSandbox } from '../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../shared/components';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderFilterComponent,
    ViewOrdersComponent,
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OrderRoutingModule,
    EffectsModule.forFeature([OrdersEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule
  ],
  providers: [OrdersService, OrdersSandbox, OrderstatusSandbox],
  bootstrap: [],
  entryComponents: []
})
export class OrdersModule {}
