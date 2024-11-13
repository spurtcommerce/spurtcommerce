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
import { PageGroupAddComponent } from './add/add.component';
import { PageGroupListComponent } from './list/list.component';
import { Title } from '@angular/platform-browser';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { PageGroupEffects } from '../../../../../../../core/admin/cms/page-group/page-group-effects/page-group.effects';
import { PageGroupService } from '../../../../../../../core/admin/cms/page-group/page-group.service';
import { PageGroupSandbox } from '../../../../../../../core/admin/cms/page-group/page-group.sandbox';
import { PagesSandbox } from '../../../../../../../core/admin/cms/pages/pages.sandbox';
import { LanguagesEffect } from '../../../../../../../core/admin/settings/localizations/languages/languages-effect/languages.effect';
import { LanguagesService } from '../../../../../../../core/admin/settings/localizations/languages/languages.service';
import { LanguagesSandbox } from '../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';

// Routing Module
import { PageGroupRoutingModule } from './page-group.routing';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';

// TRanslate Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../../shared/components';
import { PageGroupLayoutComponent } from '../../shared/pageGroup-layout/pageGroup-layout.component';
import { PageGroupLocalizationListComponent } from './localization-list/localization-list.component';
import { PageGroupLocalizationAddComponent } from './localization-add/localization-add.component';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
    declarations: [
        PageGroupAddComponent, 
        PageGroupListComponent, 
        PageGroupLayoutComponent, 
        PageGroupLocalizationListComponent, 
        PageGroupLocalizationAddComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        NumberAcceptModule,
        MaterialModule,
        ComponentsModule,
        PageGroupRoutingModule,
        EffectsModule.forFeature([PageGroupEffects, LanguagesEffect ]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        CKEditorModule
    ],
    providers: [PageGroupService, PageGroupSandbox, PagesSandbox,Title, LanguagesService, LanguagesSandbox ],
    bootstrap: []
})
export class PageGroupModule {}
