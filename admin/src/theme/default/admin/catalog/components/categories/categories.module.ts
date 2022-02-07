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
import { CategoryAddComponent } from './add/add.component';
import { CategoriesListComponent } from './list/list.component';
import { CategoriesFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { CategoriesSandbox } from '../../../../../../core/admin/catalog/category/categories.sandbox';
// Routing Module
import { CategoriesRoutingModule } from './categories.routing';
// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    CategoryAddComponent,
    CategoriesListComponent,
    CategoriesFilterComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    MaterialModule,
    EffectsModule.forRoot([]),
    NumberAcceptModule
  ],
  providers: [CategoriesSandbox],
  bootstrap: [],
  entryComponents: []
})
export class CategoriesModule {}
