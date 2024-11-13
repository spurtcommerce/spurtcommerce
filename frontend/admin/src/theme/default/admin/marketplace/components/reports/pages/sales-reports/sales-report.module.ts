/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesReportRoutingModule } from './sales-report.routing';
import { SalesReportListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// STATE MANAGEMENT MODULES

import { EffectsModule } from '@ngrx/effects';
import { SalesReportEffect } from 'src/core/admin/reports/sales-report/effects/sales-report.effect';
import { SalesReportSandbox } from 'src/core/admin/reports/sales-report/sales-report.sandbox';
import { SalesReportService } from 'src/core/admin/reports/sales-report/sales-report.service';
import { ComponentsModule } from 'src/theme/default/admin/shared/components';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';



@NgModule({
  declarations: [SalesReportListComponent],
  imports: [
    CommonModule,
    SalesReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    EffectsModule.forFeature([
      SalesReportEffect
    ])
  ],
  providers: [
    SalesReportSandbox,
    SalesReportService
  ]
})
export class SalesReportModule { }
