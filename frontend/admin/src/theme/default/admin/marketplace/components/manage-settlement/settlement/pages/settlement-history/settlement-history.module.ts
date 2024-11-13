import { VendorSharedModule } from './../../../../../marketplace.module';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../../../../../default.material.module';
import { Title } from '@angular/platform-browser';
// shared modules

import { DatePipe } from '@angular/common';
import { NumberAcceptModule } from '../../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { PipeModule } from '../../../../../../shared/components/pipes/category-search.pipe.module';
import { ComponentsModule } from '../../../../../../shared/components';

// components

import { SettlementHistoryListComponent } from './list/settlement-history-list.component';
import { SettlementHistoryModalComponent } from './modals/settlement-history-modal.component';
// ngrx state

import { EffectsModule } from '@ngrx/effects';
import { SettlementHistorySandbox } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history.sandbox';
import { SettlementHistoryService } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history.service';
import { SettlementHistoryEffect } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history-effect/settlement-history.effect';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



const settlementRoutes: Routes = [
    {
        path: '', component: SettlementHistoryListComponent,
        data: {
            permission: 'settlement-history-list',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
            { title: 'Manage Settlements', url: '' },
            { title: 'breadcrumbs.Settlement History', url: '' },
            ]
        }
    },

];
@NgModule({
    declarations: [
        SettlementHistoryListComponent,
        SettlementHistoryModalComponent
    ],
    imports: [

        RouterModule.forChild(settlementRoutes),
        CommonModule,
        NgbModule,
        MaterialModule,
        NumberAcceptModule,
        FormsModule,VendorSharedModule,
        CKEditorModule,
        ComponentsModule,
        ReactiveFormsModule,
        PipeModule,
        EffectsModule.forFeature([SettlementHistoryEffect]),
        NumberAcceptModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        DatePipe,
        SettlementHistorySandbox,
        SettlementHistoryService,Title
    ],
    bootstrap: []
})
export class SettlementHistoryModule { }
