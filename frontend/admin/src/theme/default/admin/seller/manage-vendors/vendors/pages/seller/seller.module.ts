import { VendorSharedModule } from 'src/theme/default/admin/marketplace/marketplace.module';
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// Angular Imports 
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Third Party Imports
import { ImageCropperModule } from 'ngx-image-cropper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';

// Module
import { MaterialModule } from '../../../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { ScrollToModule } from '../../../../../../../../core/admin/vendor/pages/shared/validation-directives/error.module';
import { HttpLoaderFactory } from '../../../../../../../../../src/theme/default/admin/admin.module';
import { PipeModule } from '../../../../../../../../../src/theme/default/admin/shared/components/pipes/category-search.pipe.module';
import { PasswordShowModule } from '../../../../../../../../core/admin/shared/password-show.directives/passwordShow.module';
import { ComponentsModule } from '../../../../../../../default/admin/shared/components';

// Components 
import { SellerListComponent } from './list/seller-list.component';
import { SellerAddComponent } from './add/seller-add.component';
import { ViewVendorComponent } from './viewvendor/viewvendor.component';
import { ImagecropComponent } from './imagecrop/imagecrop.component';
import { BannerimagecropComponent } from './bannerimagecrop/bannerimagecrop.component';
import { SellerdetailsComponent } from './sellerdetails/sellerdetails.component';
import { SellervideomodalComponent } from './sellervideomodal/sellervideomodal.component';
import { SellerdetailimageComponent } from './sellerdetailimage/sellerdetailimage.component';
import { ViewVendorModalComponent } from './view-vendor-modal/view-vendor-modal.component';
import { AssignCategoryComponent } from './assign-category/assign-category.component';
import { SetCommissionComponent } from './set-commission/set-commission.component';

// sandbox
import { SettingSandbox } from '../../../../../../../../../src/core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox';
import { SellerSandbox } from '../../../../../../../../core/admin/vendor/pages/seller/seller.sandbox';
import { VendorGroupSandbox } from '../../../../../../../../../src/core/admin/vendor/pages/vendor-group/vendor-group.sandbox';
import { LayoutSandbox } from '../../../../../../../../../src/core/admin/layout/layout.sandbox';

// Service 
import { VendorGroupService } from '../../../../../../../../../src/core/admin/vendor/pages/vendor-group/vendor-group.service';
import { SellerService } from '../../../../../../../../../src/core/admin/vendor/pages/seller/seller.service';
import { SettingService } from '../../../../../../../../../src/core/admin/vendor/pages/vendor-setting/vendor-setting.service';
import { LayoutsService } from '../../../../../../../../../src/core/admin/layout/layout.service';

// Effects
import { SellerEffects } from '../../../../../../../../core/admin/vendor/pages/seller/seller-effects/seller.effects';
import { SettingEffects } from '../../../../../../../../../src/core/admin/vendor/pages/vendor-setting/vendor-setting-effects/vendor-setting.effects';
import { vendorGroupEffects } from '../../../../../../../../../src/core/admin/vendor/pages/vendor-group/vendor-group-effects/vendor-group.effects';
import { LayoutEffect } from '../../../../../../../../../src/core/admin/layout/effects/layout.effects';

// AuthGurd
import { AuthGuard } from '../../../../../../../../core/admin/providers/auth.guard';
import { AlertMessageSellerComponent } from './alert-message-seller/alert-message-seller.component';

// Routing
const sellerRoutes: Routes = [
    {
        path: '', component: SellerListComponent,
        data: {
            permission: 'list-vendor',
            urls: [{ title: 'Sellers', url: '' }, { title: 'Manage Sellers', url: '' },
            { title: 'Sellers List', url: '' }]
        }
    },
    
    {
        path: 'add', component: SellerAddComponent, canActivate: [AuthGuard],
        data: {
           
            urls: [{ title: 'Sellers', url: '/seller/manage-seller/seller/seller' }, { title: 'Manage Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'Add new seller', url: '' }]
        }
    },
    {
        path: 'view/:id', component: ViewVendorComponent, canActivate: [AuthGuard],
        data: {
            permission: 'view-vendor',
            urls: [{ title: 'Sellers', url: '/seller/manage-seller/seller/seller' }, { title: 'Manage Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'breadcrumbs.Details', url: '' }]
        }
    },
    {
        path: 'edit/:id',
        component: SellerAddComponent, canActivate: [AuthGuard],
        data: {
            permission: 'edit-vendor',
            urls: [{ title: 'Sellers', url: '/seller/manage-seller/seller/seller' }, { title: 'Manage Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'Update Seller', url: '' }]
        }
    },

    {
        path: 'view-detail/:id',
        component: SellerAddComponent, canActivate: [AuthGuard],
        data: {
            permission: 'edit-vendor',
            urls: [{ title: 'Sellers', url: '/seller/manage-seller/seller/seller' }, { title: 'Manage Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'View Details', url: '/seller/manage-seller/seller/seller' }],
            name:'view-details'
        }
    },
    {
        path: 'assigncategory/:id', component: AssignCategoryComponent, canActivate: [AuthGuard],
        data: {
            permission: 'create-vendor',
            urls: [{ title: 'Sellers', url: '/seller/manage-seller/seller/seller' }, { title: 'Manage Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'breadcrumbs.Assign Category', url: '' }]
        }
    },
    {
        path: 'set-commission/:id', component: SetCommissionComponent, canActivate: [AuthGuard],
        data: {
            permission: 'create-vendor',
            urls: [{ title: 'Sellers', url: '/seller/manage-seller/seller/seller' }, { title: 'Manage Sellers', url: '/seller/manage-seller/seller/seller' },
            { title: 'Sellers', url: '' },
            { title: 'breadcrumbs.Set Commission', url: '/seller/manage-seller/seller/seller' }]
        }
    }
];
@NgModule({
    declarations: [
        SellerListComponent,
        SellerAddComponent,
        ViewVendorComponent,
        ViewVendorModalComponent,
        AssignCategoryComponent,
        SetCommissionComponent,
        ImagecropComponent,
        BannerimagecropComponent,
        SellerdetailsComponent,
        SellervideomodalComponent,
        SellerdetailimageComponent,
        AlertMessageSellerComponent
    ],
    imports: [
        ImageCropperModule,
        RouterModule.forChild(sellerRoutes),
        CommonModule,
        NgbModule,
        MaterialModule,
        PipeModule,
        NumberAcceptModule,
        ScrollToModule,
        CKEditorModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        VendorSharedModule,
        NumberAcceptModule,
        PasswordShowModule,
        EffectsModule.forFeature([
            SellerEffects,
            SettingEffects,
            vendorGroupEffects,
            LayoutEffect
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
        Title, 
        SettingSandbox, 
        VendorGroupSandbox, 
        SellerSandbox, 
        LayoutSandbox,
        SettingService, 
        VendorGroupService, 
        SellerService, 
        LayoutsService
    ],
    bootstrap: []
})
export class SellerModule { }
