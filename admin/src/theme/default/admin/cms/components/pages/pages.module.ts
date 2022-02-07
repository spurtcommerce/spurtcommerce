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
import { HttpClient } from '@angular/common/http';
import { PagesLayoutComponent } from '../shared/pages-layout/pages-layout.component';

@NgModule({
  declarations: [PagesAddComponent, PageListComponent, PagesLayoutComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PagesRoutingModule,
    EffectsModule.forRoot([PageEffects]),
    CKEditorModule
  ],
  providers: [PagesApiclientService, PagesSandbox],
  bootstrap: [],
  entryComponents: []
})
export class PagesModule {}
