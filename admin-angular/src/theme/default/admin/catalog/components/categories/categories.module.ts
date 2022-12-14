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
import { CategoryAddComponent } from './add/add.component';
import { CategoriesListComponent } from './list/list.component';
import { CategoriesFilterComponent } from './filter/filter.component';

// Routing Module
import { CategoriesRoutingModule } from './categories.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';

// Translate Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../shared/components';
import { CKEditorModule } from 'ng2-ckeditor';

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
    ComponentsModule,
    CategoriesRoutingModule,
    MaterialModule,
    CKEditorModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule
  ],
  providers: [
  ],
  bootstrap: [],
  entryComponents: []
})
export class CategoriesModule {}
