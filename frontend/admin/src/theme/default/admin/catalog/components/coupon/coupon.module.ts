/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { CouponAddComponent } from './add/add.component';
import { CouponListComponent } from './list/list.component';
import { CouponFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';

// Routing Module
import { CouponRoutingModule } from './coupon.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';

// Translate Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../../../../core/admin/catalog/product/product.service';
import { ProductSandbox } from '../../../../../../core/admin/catalog/product/product.sandbox';
import { CouponEffect } from '../../../../../../core/admin/catalog/coupon/effects/coupon.effect';
import { CouponService } from '../../../../../../core/admin/catalog/coupon/coupon.service';
import { CouponSandbox } from '../../../../../../core/admin/catalog/coupon/coupon.sandbox';
import { ComponentsModule } from '../../../shared/components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
    declarations: [
        CouponAddComponent,
        CouponListComponent,
        CouponFilterComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        CouponRoutingModule,
        MaterialModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        EffectsModule.forFeature([CouponEffect]),
        NumberAcceptModule,
        ComponentsModule,
        InfiniteScrollModule
    ],
    providers: [
        CouponSandbox, CouponService,
        ProductService, ProductSandbox, DatePipe
    ],
    bootstrap: []
})
export class CouponModule { }
