/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { CategoryAddComponent } from './add/add.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';

// Routing Module
import { CategoriesRoutingModule } from './categories.routing';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';

// Translate Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../../shared/components';
import { CategoryLocalizationListComponent } from './localization-list/localization-list.component';
import { CategoryLocalizationAddComponent } from './localization-add/localization-add.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../../../../core/admin/catalog/category/categories.service';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffect } from '../../../../../../../core/admin/catalog/category/effects/categories.effect';

@NgModule({
    declarations: [
        CategoryAddComponent,
        CategoriesListComponent,
        CategoryLocalizationListComponent,
        CategoryLocalizationAddComponent,
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
        EffectsModule.forFeature(CategoriesEffect),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NumberAcceptModule
    ],
    providers: [CategoriesSandbox,
        CategoriesService,],
    bootstrap: []
})
export class CategoriesModule {}
