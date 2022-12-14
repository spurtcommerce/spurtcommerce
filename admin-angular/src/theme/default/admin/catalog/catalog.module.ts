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
import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components
import { CatalogLayoutComponent } from './components/layout/layout.component';
import { CatalogHeaderComponent } from './components/header/header.component';
// Routing Module
import { CatalogRoutingModule } from './catalog.routing';
// Shared Module
import { MaterialModule } from '../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from 'ng2-ckeditor';
// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { LayoutService } from '../../../../core/admin/catalog/layout/layout.service';
import { LayoutsSandbox } from '../../../../core/admin/catalog/layout/layout.sandbox';
import { LayoutEffects } from '../../../../core/admin/catalog/layout/effects/layout.effect';
import { CategoriesEffect } from '../../../../core/admin/catalog/category/effects/categories.effect';
import { HttpLoaderFactory } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import { CategoriesSandbox } from '../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../core/admin/catalog/category/categories.service';
import { BrandSandbox } from '../../../../core/admin/catalog/brand/brand.sandbox';
import { BrandApiClient } from '../../../../core/admin/catalog/brand/brandApiClientservice';
import { BrandEffects } from '../../../../core/admin/catalog/brand/effects/brand.effect';
import { ComponentsModule } from '../shared/components';

@NgModule({
  declarations: [CatalogLayoutComponent, CatalogHeaderComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    DefaultCommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([
      LayoutEffects,
      CategoriesEffect, BrandEffects
    ]),

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule,
    ComponentsModule,
  ],
  providers: [
    LayoutService,
    LayoutsSandbox,
    CategoriesSandbox,
    CategoriesService, BrandSandbox, BrandApiClient,
  ],
  bootstrap: [],
  entryComponents: []
})
export class CatalogModule {}
