/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DefaultRoutingModule } from './default.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultComponent } from './default.component';
import { AdminSharedModule } from './admin/admin.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as PlotlyJS from 'plotly.js-dist';
import {
  PlotlyModule,
  PlotlyViaCDNModule,
  PlotlyViaWindowModule,
} from 'angular-plotly.js';
import { NgSelectModule } from '@ng-select/ng-select';
PlotlyModule.plotlyjs = PlotlyJS;
PlotlyViaCDNModule.setPlotlyVersion('1.55.2'); // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.setPlotlyBundle('basic');
@NgModule({
  declarations: [DefaultComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DefaultRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminSharedModule.forRoot(),
    PlotlyModule,
    PlotlyViaCDNModule,
    PlotlyViaWindowModule,
    NgSelectModule
  ],
  bootstrap: [DefaultComponent]
})
export class DefaultModule {}
