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
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../../../../shared/components';
import { SettingSandbox } from '../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox';
import { SettingService } from '../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.service';
import { EffectsModule } from '@ngrx/effects';
import { SettingEffects } from '../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting-effects/vendor-setting.effects';
import { VendorSettingsComponent } from './list/vendor-setting-list.component';
import { VendorSettingsDetailComponent } from './detail/vendor-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberAcceptModule } from '../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { PipeModule } from '../../../../../shared/components/pipes/category-search.pipe.module';
import { MaterialModule } from '../../../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VendorSharedModule } from 'src/theme/default/admin/marketplace/marketplace.module';

const vendorRoutes: Routes = [
    {
        path: '', component: VendorSettingsComponent,
        children: [
            {
                path: 'detail/:id', component: VendorSettingsDetailComponent,
                data: {
                    urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
                    { title: 'breadcrumbs.Vendors', url: '' },
                    { title: 'breadcrumbs.Settings', url: '' },
                    { title: 'breadcrumbs.Details', url: '' }]
                 }
            },
        ]
    },
];
@NgModule({
    declarations: [
        VendorSettingsComponent,
        VendorSettingsDetailComponent
    ],
    imports: [
        RouterModule.forChild(vendorRoutes),
        CommonModule,
        ComponentsModule,
        EffectsModule.forFeature([SettingEffects]),
        NgbModule,
        NumberAcceptModule,
        InfiniteScrollModule,
        PipeModule,
        VendorSharedModule,
        FormsModule, ReactiveFormsModule, MaterialModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [SettingSandbox, SettingService],
    bootstrap: []
})
export class VendorSettingModule { }
