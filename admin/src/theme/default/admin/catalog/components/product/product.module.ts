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
import { ProductAddComponent } from './add/add.component';
import { ProductListComponent } from './list/list.component';
import { ProductFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../../../default.material.module';
import { ProductEffect } from '../../../../../../core/admin/catalog/product/product-effect/product.effect';
import { CategoriesSandbox } from '../../../../../../core/admin/catalog/category/categories.sandbox';
import { ProductService } from '../../../../../../core/admin/catalog/product/product.service';
import { ProductSandbox } from '../../../../../../core/admin/catalog/product/product.sandbox';
import { CategoriesService } from '../../../../../../core/admin/catalog/category/categories.service';
import { BrandApiClient } from '../../../../../../core/admin/catalog/brand/brandApiClientservice';
import { BrandSandbox } from '../../../../../../core/admin/catalog/brand/brand.sandbox';
import { MediaEffects } from '../../../../../../core/admin/catalog/media/effects/media.effect';
import { MediaService } from '../../../../../../core/admin/catalog/media/media.service';
import { MediaSandbox } from '../../../../../../core/admin/catalog/media/media.sandbox';
// Routing Module
import { ProductRoutingModule } from './product.routing';

// Shared Modules

import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';

// ENTRY COMPONENTS
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../../shared/components';
import { PipeModule } from '../../../../../../core/admin/shared/pipes/category-search.pipe.module';

@NgModule({
  declarations: [
    ProductAddComponent,
    ProductListComponent,
    ProductFilterComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    MaterialModule,
    EffectsModule.forRoot([MediaEffects]),
    CKEditorModule,
    NumberAcceptModule,
    NgbModule,
    PipeModule
  ],
  providers: [
    DatePipe,
    ProductService,
    ProductSandbox,
    CategoriesSandbox,
    CategoriesService,
    BrandApiClient,
    BrandSandbox,
    MediaSandbox,
    MediaService
  ],
  bootstrap: [],
  entryComponents: []
})
export class ProductModule {}
