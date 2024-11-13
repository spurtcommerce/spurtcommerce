import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBlogsRoutingModule } from './manage-blogs.routing';
import { categoriesComponents, postsComponents } from '../../../../../../../add-ons/add-ons.constant';
import { DefaultCommonModule } from 'src/theme/default/default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { PipeModule } from '../../../shared/components/pipes/category-search.pipe.module';
import { LayoutsSandbox } from 'src/core/admin/catalog/layout/layout.sandbox';
import { LanguagesSandbox } from 'src/core/admin/settings/localizations/languages/languages.sandbox';
import { LanguagesService } from 'src/core/admin/settings/localizations/languages/languages.service';
import { LayoutService } from 'src/core/admin/catalog/layout/layout.service';
import { CategoriesSandbox } from 'src/core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from 'src/core/admin/catalog/category/categories.service';
import { LanguagesEffect } from 'src/core/admin/settings/localizations/languages/languages-effect/languages.effect';
import { CategoriesEffect } from 'src/core/admin/catalog/category/effects/categories.effect';
import { LayoutEffects } from 'src/core/admin/catalog/layout/effects/layout.effect';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    ...postsComponents,
    ...categoriesComponents
  ],
  imports: [
    CommonModule,
    ManageBlogsRoutingModule,
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    EffectsModule.forFeature([LanguagesEffect,CategoriesEffect,LayoutEffects]),
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    CKEditorModule,
    PipeModule,   
  ],
  providers: [ LayoutsSandbox,
    LanguagesSandbox,
    LanguagesService,
    LayoutService,
    CategoriesSandbox,
    CategoriesService,]

})
export class ManageBlogsModule { }
