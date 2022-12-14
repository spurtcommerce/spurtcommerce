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

// components

// Store Actions
import { EffectsModule } from '@ngrx/effects';

// Routing Module

// Shared Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../../../default.material.module';
import { PaymentsRouting } from './payments.routing';
import { PaymentsComponent } from './payments.component';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { SeoService } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-service';
import { SeoSandbox } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-sandbox';
import { SeoEffect } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-effects/seo-effect';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../../shared/components';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PaymentsRouting,
    ComponentsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    EffectsModule.forFeature([SeoEffect])
  ],
  providers: [SeoSandbox, SeoService],
  bootstrap: [],
  entryComponents: []
})
export class PaymentsModule {}
