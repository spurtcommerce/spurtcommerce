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
import { ComponentsModule } from '../shared/components';
import { LanguagesEffect } from '../../../../core/admin/settings/localizations/languages/languages-effect/languages.effect';
import { LanguagesService } from '../../../../core/admin/settings/localizations/languages/languages.service';
import { LanguagesSandbox } from '../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
    declarations: [CatalogLayoutComponent, CatalogHeaderComponent,],
    imports: [
        CommonModule,
        CatalogRoutingModule,
        DefaultCommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([
            LayoutEffects,
            CategoriesEffect,
            LanguagesEffect
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
        CategoriesService,
        LanguagesSandbox,
        LanguagesService
    ],
    bootstrap: []
})
export class CatalogModule {}
