/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components
import { EmailTempAddComponent } from './add/add.component';
import { EmailTempListComponent } from './list/list.component';
// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { EmailTempService } from '../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.service';
import { EmailTempSandbox } from '../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.sandbox';
import { EmailTempEffect } from '../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp-effect/emailtemp.effect';
// Routing Module
import { EmailTemplateRoutingModule } from './emailtemplate.routing';
// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [EmailTempAddComponent, EmailTempListComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EmailTemplateRoutingModule,
    EffectsModule.forRoot([EmailTempEffect]),
    CKEditorModule
  ],
  providers: [EmailTempService, EmailTempSandbox],
  bootstrap: [],
  entryComponents: []
})
export class EmailTemplateModule {}
