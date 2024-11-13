/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AuditLogRoutingModule } from './audit-log.routing';
import { AuditLogComponent } from './audit-log.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../admin.module';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { ComponentsModule } from '../../../../shared/components';


// STATE MANAGEMENT MODULES

import { EffectsModule } from '@ngrx/effects';
import { AuditLogEffects } from '../../../../../../../core/admin/reports/audit-log/effects/audit-log.effect';
import { AuditLogSandbox } from '../../../../../../../core/admin/reports/audit-log/audit-log.sandbox';
import { AuditLogService } from '../../../../../../../core/admin/reports/audit-log/audit-log.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AuditLogComponent],
  imports: [
    CommonModule,
    AuditLogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    NgbModule,
    EffectsModule.forFeature([AuditLogEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    AuditLogSandbox,
    AuditLogService,
    DatePipe
  ]
})
export class AuditLogModule { }
