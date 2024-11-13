import { VendorSharedModule } from 'src/theme/default/admin/marketplace/marketplace.module';
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { vendorGroupListComponent } from './list/vendor-group-list.component';
import { vendorGroupAddComponent } from './add/vendor-group-add.component';
// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { SellerEffects } from '../../../../../../../../core/admin/vendor/pages/seller/seller-effects/seller.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { ScrollToModule } from '../../../../../../../../core/admin/vendor/pages/shared/validation-directives/error.module';
import { AuthGuard } from '../../../../../../../../core/admin/providers/auth.guard';
import { ComponentsModule } from '../../../../../shared/components';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { PipeModule } from 'src/theme/default/admin/shared/components/pipes/category-search.pipe.module';
import { PasswordShowModule } from '../../../../../../../../core/admin/shared/password-show.directives/passwordShow.module';
import { VendorGroupSandbox } from 'src/core/admin/vendor/pages/vendor-group/vendor-group.sandbox';
import { VendorGroupService } from 'src/core/admin/vendor/pages/vendor-group/vendor-group.service';
import { vendorGroupEffects } from 'src/core/admin/vendor/pages/vendor-group/vendor-group-effects/vendor-group.effects';
import { SettingSandbox } from 'src/core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox';
import { SettingService } from 'src/core/admin/vendor/pages/vendor-setting/vendor-setting.service';
import { SettingEffects } from 'src/core/admin/vendor/pages/vendor-setting/vendor-setting-effects/vendor-setting.effects';
import { SellerService } from 'src/core/admin/vendor/pages/seller/seller.service';
import { SellerSandbox } from 'src/core/admin/vendor/pages/seller/seller.sandbox';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


const sellerRoutes: Routes = [
    {
        path: '', component: vendorGroupListComponent,
        data: {
            permission: 'list-vendor',
            urls: [{ title: 'Sellers', url: '/seller/manage-seller/seller/seller-group' }, { title: 'Manage Sellers', url: '/seller/manage-seller/seller/seller-group' },
            { title: 'Seller Group List', url: '' }]
        }
    },
    {
        path: 'add', component: vendorGroupAddComponent, canActivate: [AuthGuard],
        data: {
            permission: 'create-vendor',
            urls: [{ title: 'Sellers', url: '/seller/manage-seller/seller/seller-group' }, { title: 'Manage Sellers', url: '/seller/manage-seller/seller/seller-group' },{ title: 'Seller Group List', url: '/seller/manage-seller/seller/seller-group' },
            { title: 'Add Seller Group ', url: '' }]
        }
    },
    {
        path: 'edit/:id',
        component: vendorGroupAddComponent, canActivate: [AuthGuard],
        data: {
            permission: 'edit-vendor',
            urls: [{ title: 'Sellers', url: '/seller/manage-seller/seller/seller-group' }, { title: 'Manage Sellers', url: '/seller/manage-seller/seller/seller-group' },
            { title: 'Seller Group Update', url: '' }]
        }
    },
];
@NgModule({
    declarations: [
        vendorGroupListComponent,
        vendorGroupAddComponent
    ],
    imports: [
        RouterModule.forChild(sellerRoutes),
        CommonModule,
        NgbModule,
        MaterialModule, VendorSharedModule,
        PipeModule,
        NumberAcceptModule,
        ScrollToModule,
        FormsModule,
        CKEditorModule,
        ComponentsModule,
        ReactiveFormsModule,
        PasswordShowModule,
        EffectsModule.forFeature([
            vendorGroupEffects,
            SettingEffects,
            SellerEffects
        ]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        VendorGroupSandbox, VendorGroupService, SettingSandbox, SettingService, SellerService, SellerSandbox, Title
    ],
    bootstrap: []
})
export class VendorGroupModule { }
