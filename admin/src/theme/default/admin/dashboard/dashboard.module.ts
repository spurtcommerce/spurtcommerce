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
import { DashboardComponent } from './dashboard.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { DashboardService } from '../../../../core/admin/dashboard/dashboard.service';
import { DashboardSandbox } from '../../../../core/admin/dashboard/dashboard.sandbox';
import { DashboardEffects } from '../../../../core/admin/dashboard/effects/dashboard.effect';

// Routing Module
import { DashboardRoutingModule } from './dashboard.routing';
import { PersonalizeProductEffect } from '../../../../core/admin/settings/personalize/product/product-effects/product-effect';
import { PerSonalizeProductService } from '../../../../core/admin/settings/personalize/product/product-service';
import { PersonalizeProductSandbox } from '../../../../core/admin/settings/personalize/product/product-sandbox';

// Shared Module
import { MaterialModule } from '../../default.material.module';
import { HttpClient } from '@angular/common/http';
import { TruncatePipe } from '../../../../core/admin/shared/pipes/stringLengthCompress';
import { ComponentsModule } from '../shared/components';

@NgModule({
  declarations: [DashboardComponent, TruncatePipe],
  imports: [
    CommonModule,
    ComponentsModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DashboardRoutingModule,
    EffectsModule.forRoot([DashboardEffects])
  ],
  providers: [DashboardService, DashboardSandbox],
  bootstrap: [],
  entryComponents: []
})
export class DashboardModule {}
