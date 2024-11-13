import { VendorProductService } from 'src/core/admin/vendor/pages/vendor-product/vendor-product.service';
import { VendorSharedModule } from '../../../marketplace.module';
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VendorProductListComponent } from './list/vendor-product-list.component';
import { VendorProductAddComponent } from './add/vendor-product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../../../default.material.module';
// Store Actions
import { CategoriesService } from '../../../../../../../core/admin/catalog/category/categories.service';
import { DatePipe } from '@angular/common';
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { NumberAcceptModule } from '../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { PipeModule } from '../../../../shared/components/pipes/category-search.pipe.module';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
import { ComponentsModule } from '../../../../shared/components';
import { ProductSandbox } from 'src/core/admin/catalog/product/product.sandbox';
import { ProductService } from 'src/core/admin/catalog/product/product.service';
import { LayoutsSandbox } from 'src/core/admin/sales/layout/layout.sandbox';
import { LayoutsService } from 'src/core/admin/layout/layout.service';
import { EffectsModule } from '@ngrx/effects';
import { VendorHeaderComponent } from '../../header/header.component';
import { VendorProductEffects } from 'src/core/admin/vendor/pages/vendor-product/vendor-product-effects/vendor-product.effects';
import { GoliveComponent } from '../../../../catalog/components/manage-products/golive/golive.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const productRoutes: Routes = [
    {
        path: '', redirectTo: 'GoliveComponent'
    },
    {
        path: 'GoliveComponent', component: GoliveComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'list-market-place-product',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Products', url: '' },
            { title: 'breadcrumbs.Vendor Products', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
        }
    },
];
@NgModule({
    declarations: [
        VendorProductListComponent,
        VendorProductAddComponent
    ],
    imports: [
        RouterModule.forChild(productRoutes),
        CommonModule,
        NgbModule, VendorSharedModule,
        MaterialModule,
        CKEditorModule,
        ComponentsModule,
        PipeModule,
        EffectsModule.forFeature([VendorProductEffects]),
        FormsModule, ReactiveFormsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NumberAcceptModule
    ],
    providers: [
        DatePipe,
        CategoriesSandbox,
        CategoriesService,
        ProductSandbox,
        ProductService, VendorProductService, Title
    ],
    bootstrap: []
})
export class VendorProductModule { }
