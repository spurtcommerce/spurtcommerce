/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultCommonModule} from '../../../../default.common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// components
import {BrandAddComponent} from './add/add.component';
import {BrandListComponent} from './list/list.component';

// Routing Module
import {BrandRoutingModule} from './brand.routing';

// Shared Module
import {MaterialModule} from '../../../../default.material.module';
import {NumberAcceptModule} from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import {HttpClient} from '@angular/common/http';
import {BrandFilterComponent} from './filter/filter.component';
import {ProductSandbox} from '../../../../../../core/admin/catalog/product/product.sandbox';


@NgModule({
    declarations: [
        BrandAddComponent,
        BrandListComponent,
        BrandFilterComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrandRoutingModule,
        NumberAcceptModule
    ],
    providers: [ProductSandbox],
    bootstrap: [],
    entryComponents: []
})

export class BrandModule {
}
