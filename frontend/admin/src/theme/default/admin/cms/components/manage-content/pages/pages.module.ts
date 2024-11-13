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
import { PagesAddComponent } from './add/add.component';
import { PageListComponent } from './list/list.component';
import { Title } from '@angular/platform-browser';
import { PagesLocalizationListComponent  } from './localization-list/localization-list.component';
import { PagesLocalizationAddComponent } from './localization-add/localization-add.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { PageEffects } from '../../../../../../../core/admin/cms/pages/page-effects/page.effects';
import { PagesSandbox } from '../../../../../../../core/admin/cms/pages/pages.sandbox';
import { LanguagesSandbox } from '../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { LanguagesService } from '../../../../../../../core/admin/settings/localizations/languages/languages.service';
import { LanguagesEffect } from '../../../../../../../core/admin/settings/localizations/languages/languages-effect/languages.effect';

// Routing Module
import { PagesRoutingModule } from './pages.routing';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { PagesApiclientService } from '../../../../../../../core/admin/cms/pages/pages.ApiclientService';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
// TRanslate Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../../shared/components';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';

@NgModule({
    declarations: [PagesAddComponent, PageListComponent, PagesLocalizationListComponent, PagesLocalizationAddComponent],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        NumberAcceptModule,
        MaterialModule,
        ComponentsModule,
        PagesRoutingModule,
        EffectsModule.forFeature([PageEffects, LanguagesEffect]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        CKEditorModule
    ],
    providers: [PagesApiclientService, PagesSandbox,Title, LanguagesSandbox, LanguagesService ],
    bootstrap: []
})
export class PagesModule {}
