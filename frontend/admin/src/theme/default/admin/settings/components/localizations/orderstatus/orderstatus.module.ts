/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angualar imports 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { OrderStatusAddComponent } from './add/add.component';
import { OrderStatusListComponent } from './list/list.component';

// Routing Module
import { OrderStatusRoutingModule } from './orderstatus.routing';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { NumberAcceptModule } from '../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { ComponentsModule } from '../../../../../../default/admin/shared/components';

@NgModule({
    declarations: [OrderStatusAddComponent, OrderStatusListComponent],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        OrderStatusRoutingModule,
        NumberAcceptModule,
        ComponentsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ColorPickerModule
    ],
    providers: [],
    bootstrap: []
})
export class OrderStatusModule { }
