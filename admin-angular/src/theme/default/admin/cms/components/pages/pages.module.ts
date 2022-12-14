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
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components
import { PagesAddComponent } from './add/add.component';
import { PageListComponent } from './list/list.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { PageEffects } from '../../../../../../core/admin/cms/pages/page-effects/page.effects';
import { PagesSandbox } from '../../../../../../core/admin/cms/pages/pages.sandbox';

// Routing Module
import { PagesRoutingModule } from './pages.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { PagesApiclientService } from '../../../../../../core/admin/cms/pages/pages.ApiclientService';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
// TRanslate Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [PagesAddComponent, PageListComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    PagesRoutingModule,
    EffectsModule.forFeature([PageEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule
  ],
  providers: [PagesApiclientService, PagesSandbox],
  bootstrap: [],
  entryComponents: []
})
export class PagesModule {}
