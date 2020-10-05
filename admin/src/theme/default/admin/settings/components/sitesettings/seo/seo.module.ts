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
import { SeoRouting } from './seo.routing';
import { SeoComponent } from './seo.component';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { SeoService } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-service';
import { SeoSandbox } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-sandbox';
import { SeoEffect } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-effects/seo-effect';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [SeoComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SeoRouting,
    EffectsModule.forRoot([SeoEffect])
  ],
  providers: [SeoSandbox, SeoService],
  bootstrap: [],
  entryComponents: []
})
export class SeoModule {}
