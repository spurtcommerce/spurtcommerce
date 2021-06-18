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
import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components
import { CustomerLayoutComponent } from './components/layout/layout.component';
import { CustomerHeaderComponent } from './components/header/header.component';
// Routing Module
import { CustomersRoutingModule } from './customers.routing';

// Shared Module
import { MaterialModule } from '../../default.material.module';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { LayoutService } from '../../../../core/admin/Customers/layout/layout.service';
import { LayoutSandbox } from '../../../../core/admin/Customers/layout/layout.sandbox';
import { LayoutEffects } from '../../../../core/admin/Customers/layout/effects/layout.effect';
@NgModule({
  declarations: [CustomerLayoutComponent, CustomerHeaderComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    DefaultCommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([LayoutEffects]),
  ],
  providers: [LayoutService, LayoutSandbox],
  bootstrap: [],
  entryComponents: []
})
export class CustomersModule {}
