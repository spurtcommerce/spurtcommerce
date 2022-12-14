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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../../shared/components';

@NgModule({
  declarations: [EmailTempAddComponent, EmailTempListComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EmailTemplateRoutingModule,
    ComponentsModule,
    EffectsModule.forFeature([EmailTempEffect]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule
  ],
  providers: [EmailTempService, EmailTempSandbox],
  bootstrap: [],
  entryComponents: []
})
export class EmailTemplateModule {}
