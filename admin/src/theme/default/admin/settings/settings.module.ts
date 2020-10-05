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
import { SettingsLayoutComponent } from './components/layout/layout.component';
// Routing Module
import { SettingsRoutingModule } from './settings.routing';

// Services and Sandbox
import { CountryService } from '../../../../core/admin/settings/localizations/country/country.service';

import { ZoneService } from '../../../../core/admin/settings/localizations/zone/zone.service';
import { ZoneSandbox } from '../../../../core/admin/settings/localizations/zone/zone.sandbox';
// Shared Module
import { MaterialModule } from '../../default.material.module';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffect } from '../../../../core/admin/settings/localizations/country/country-effect/country.effect';
import { ZoneEffect } from '../../../../core/admin/settings/localizations/zone/zone-effect/zone.effect';
import { CountrySandbox } from '../../../../core/admin/settings/localizations/country/country.sandbox';

@NgModule({
  declarations: [SettingsLayoutComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    DefaultCommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([
      CountryEffect,
      ZoneEffect
    ])
    ],
  providers: [
    CountryService,
    CountrySandbox,
    ZoneService,
    ZoneSandbox
  ],
  bootstrap: [],
  entryComponents: []
})
export class SettingsModule {}
