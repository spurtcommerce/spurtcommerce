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
import { ComponentsModule } from '../../../shared/components';
// import { VendorSharedModule } from '../../vendor-shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';

import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { LayoutService } from '../../../../../../core/admin/catalog/layout/layout.service';
import { LayoutsSandbox } from '../../../../../../core/admin/catalog/layout/layout.sandbox';
import { LayoutEffects } from '../../../../../../core/admin/catalog/layout/effects/layout.effect';
import { VendorProductEffects } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product-effects/vendor-product.effects';
import { VendorProductSandbox } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
import { VendorProductService } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.service';
import { DocumentSandbox } from '../../../../../../core/admin/vendor/pages/documents/document.sandbox';
import { DocumentService } from '../../../../../../core/admin/vendor/pages/documents/document.service';
import { DocumentEffects } from '../../../../../../core/admin/vendor/pages/documents/document-effects/document.effects';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { ProductSandbox } from '../../../../../../core/admin/catalog/product/product.sandbox';
import { VendorSharedModule } from '../../../marketplace/marketplace.module';
import { PendingLayoutSandox } from '../../../../../../../src/core/admin/manageseller/pending-layouts/pending-layout.sandbox';
import { PendingLayoutService } from '../../../../../../../src/core/admin/manageseller/pending-layouts/pending-layout.service';
import { PendingLayoutEffect } from '../../../../../../../src/core/admin/manageseller/pending-layouts/effect/pending-layout.effect';
import { companyVerifySandbox } from '../../../../../../../src/core/admin/manageseller/companyverify/companyverify.sandbox';
import { CompanyVerifyService } from '../../../../../../../src/core/admin/manageseller/companyverify/companyverify.service';
import { companyVerifyEffect } from '../../../../../../../src/core/admin/manageseller/companyverify/effect/companyverify.effect';



const vendorRoutes: Routes = [
    // {
        // path: '', component: VendorLayoutComponent,
        // children: [
            { path: '', redirectTo: 'seller', pathMatch: 'full' },

            {
                path: 'seller',
                loadChildren: () => import('./pages/seller/seller.module').then(m => m.SellerModule),
                canActivate: [AuthGuard],
                data: { permissionForHeader: 'sellers-data', root: 'sellers' }
            },
            {
                path: 'settings',
                loadChildren: () => import('./pages/vendor-settings/vendor-setting.module').then(m => m.VendorSettingModule),
                canActivate: [AuthGuard],
                data: { permissionForHeader: 'vendor-settings', root: 'seller' }
            },
            {
                path: 'seller-group',
                loadChildren: () => import('./pages/vendor-group/vendor-group.module').then(m => m.VendorGroupModule),
                canActivate: [AuthGuard],
                data: { permissionForHeader: 'seller-group', root: 'sellers' }
            },
            
            {
                path: 'seller-signup',
                loadChildren: () => import('./pages/seller-signup-requests/seller-signup-requests.module').then(m => m.SellerSignupRequestsModule),
                canActivate: [AuthGuard],
                data: { permissionForHeader: 'seller-signup-request', root: 'sellers' }
            },
           
        // ]
    // },
];
@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forChild(vendorRoutes),
        CommonModule,
        ComponentsModule,
        VendorSharedModule,
        NgbModule,
        ComponentsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        EffectsModule.forFeature([
            LayoutEffects, VendorProductEffects,
             DocumentEffects,
            PendingLayoutEffect,
            companyVerifyEffect
            // AttributeGroupEffect
        ])
    ],
    providers: [
        LayoutService,
        LayoutsSandbox,
        VendorProductService, VendorProductSandbox, DocumentSandbox, DocumentService,Title,
        //  AttributeGroupService, AttributeGroupSandbox,
          ProductSandbox,
          PendingLayoutSandox,
          PendingLayoutService,
          companyVerifySandbox,
          CompanyVerifyService
    ],
    bootstrap: []
})
export class VendorsModule { }
