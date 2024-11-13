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
import { Title } from '@angular/platform-browser';
// components
import { BannerAddComponent } from './add/add.component';
import { BannerListComponent } from './list/list.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { BannerSandbox } from '../../../../../../../core/admin/cms/banners/banner.sandbox';
import { BannerService } from '../../../../../../../core/admin/cms/banners/banner.service';
import { BannerEffect } from '../../../../../../../core/admin/cms/banners/banner-effect/banner.effect';

// Routing Module
import { BannerRoutingModule } from './banner.routing';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { BannerLayoutComponent } from '../../shared/banner-layout/banner-layout.component';
import { ComponentsModule } from '../../../../shared/components';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BannerimageviewmodalComponent } from './bannerimageviewmodal/bannerimageviewmodal.component';

@NgModule({
    declarations: [
        BannerAddComponent,
        BannerListComponent,
        BannerLayoutComponent,
        BannerimageviewmodalComponent,
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ComponentsModule,
        BannerRoutingModule,
        NumberAcceptModule,
        EffectsModule.forFeature([BannerEffect]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        CKEditorModule
    ],
    providers: [BannerService, BannerSandbox,Title ],
    bootstrap: []
})
export class BannerModule {}
