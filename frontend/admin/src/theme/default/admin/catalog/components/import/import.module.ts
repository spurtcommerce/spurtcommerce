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
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportRoutingModule } from './import-routing.module';
import { BulkProductUploadComponent } from './import-products/bulk-product-upload.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// state management

import { ImportEffects } from '../../../../../../core/admin/catalog/import/effects/import.effect';
import { ImportService } from '../../../../../../core/admin/catalog/import/import.service';
import { ImportSandbox } from '../../../../../../core/admin/catalog/import/import.sandbox';
import { EffectsModule } from '@ngrx/effects';

// Shared Module

import { MaterialModule } from '../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';

// Translate Module

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../shared/components';
import { DataImportComponent } from './data-import/data-import.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FieldMappingComponent } from './field-mapping/field-mapping.component';
import { ReviewDataComponent } from './review-data/review-data.component';
import { UserSandbox } from '../../../../../../core/admin/settings/user/user.sandbox';
import { UserEffect } from '../../../../../../core/admin/settings/user/user-effect/user.effect';
import { UserService } from '../../../../../../core/admin/settings/user/user.service';
import { OrdersService } from '../../../../../../core/admin/sales/orders/orders.service';
import { OrdersSandbox } from '../../../../../../core/admin/sales/orders/orders-sandbox';
import { OrdersEffects } from '../../../../../../core/admin/sales/orders/orders-effects/orders.effects';
import { ProductService } from '../../../../../../core/admin/catalog/product/product.service';
import { ProductSandbox } from '../../../../../../core/admin/catalog/product/product.sandbox';
import { ProductEffect } from '../../../../../../core/admin/catalog/product/product-effect/product.effect';
import { CategoriesEffect } from '../../../../../../core/admin/catalog/category/effects/categories.effect';
import { CategoriesSandbox } from '../../../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../../../core/admin/catalog/category/categories.service';
import { ArchivePaymentService } from '../../../../../../core/admin/sales/archive-payments/archive-payments.service';
import { ArchivePaymentSandbox } from '../../../../../../core/admin/sales/archive-payments/archive-payments.sandbox';
import { ArchivePaymentEffects } from '../../../../../../core/admin/sales/archive-payments/effects/archive-payments.effects';
import { CustomerSandbox } from '../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersApiClientService } from '../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
import { Customereffects } from '../../../../../../core/admin/Customers/customers/customer-effects/customer.effects';
import { ValidationModalComponent } from './validation-modal/validation-modal.component';

@NgModule({
    declarations: [
        BulkProductUploadComponent,
        DataImportComponent,
        UploadFileComponent,
        FieldMappingComponent,
        ReviewDataComponent,
        ValidationModalComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgSelectModule,
        NgbModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NumberAcceptModule,
        ComponentsModule,
        ImportRoutingModule,
        EffectsModule.forFeature([ImportEffects, UserEffect, OrdersEffects, ProductEffect, CategoriesEffect, ArchivePaymentEffects, Customereffects])
    ],
    providers: [
        ImportService,
        ImportSandbox,
        UserSandbox,
        UserService,
        OrdersService,
        OrdersSandbox,
        ProductService,
        ProductSandbox,
        CategoriesSandbox,
        CategoriesService,
        ArchivePaymentSandbox,
        ArchivePaymentService,
        CustomersApiClientService,
        CustomerSandbox
    ],
    bootstrap: []
})
export class ImportModule {}
