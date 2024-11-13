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
import { Title } from '@angular/platform-browser';
// Store Actions
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { ScrollToModule } from '../../../../../../../../../core/admin/vendor/pages/shared/validation-directives/error.module';
import { ComponentsModule } from '../../../../../../shared/components';

// ngrx state
import { EffectsModule } from '@ngrx/effects';
import { SettlementOrderSandbox } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-order/settlement-order.sandbox';
import { SettlementOrderService } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-order/settlement-order.service';
import { SettlementOrderEffect } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-order/settlement-order-effect/settlement-order.effect';


// components

import { SettlementOrderListComponent } from './list/settlement-order-list.component';
import { SettlementOrderModalComponent } from './modals/settlement-modal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { VendorSharedModule } from 'src/theme/default/admin/marketplace/marketplace.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const sellerRoutes: Routes = [
    {
        path: '', component: SettlementOrderListComponent,
        data: {
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' },{ title: 'Manage Settlements', url: '' },
            { title: 'breadcrumbs.Settlement Orders', url: '' },
            ]
        }
    },
];
@NgModule({
    declarations: [
        SettlementOrderListComponent,
        SettlementOrderModalComponent
    ],
    imports: [
        RouterModule.forChild(sellerRoutes),
        CommonModule,
        NgbModule,
        MaterialModule,
        NumberAcceptModule,
        ScrollToModule,
        FormsModule,VendorSharedModule,
        CKEditorModule,
        ComponentsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([SettlementOrderEffect]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        SettlementOrderService,
        SettlementOrderSandbox,Title
    ],
    bootstrap: []
})
export class SettlementOrderListModule { }
