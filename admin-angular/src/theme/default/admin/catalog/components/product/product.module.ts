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
import { ProductAddComponent } from './add/add.component';
import { ProductListComponent } from './list/list.component';
import { ProductFilterComponent } from './filter/filter.component';
import { QuestionComponent } from './question/question.component';
import { QuestionDetailsComponent } from './modals/question-details/question-details.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProductEffect } from '../../../../../../core/admin/catalog/product/product-effect/product.effect';
import { ProductService } from '../../../../../../core/admin/catalog/product/product.service';
import { ProductSandbox } from '../../../../../../core/admin/catalog/product/product.sandbox';
// Routing Module
import { ProductRoutingModule } from './product.routing';

// Shared Modules

import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';

// ENTRY COMPONENTS
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../../shared/components';
import { PipeModule } from '../../../shared/components/pipes/category-search.pipe.module';

@NgModule({
  declarations: [
    ProductAddComponent,
    ProductListComponent,
    ProductFilterComponent,
    QuestionComponent,
    QuestionDetailsComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    MaterialModule,
    PipeModule,
    EffectsModule.forFeature([
      ProductEffect,

    ]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule,
    NumberAcceptModule,
    NgbModule
  ],
  providers: [
    DatePipe,
    ProductService,
    ProductSandbox,
  ],
  bootstrap: [],
  entryComponents: [QuestionDetailsComponent]
})
export class ProductModule {}
