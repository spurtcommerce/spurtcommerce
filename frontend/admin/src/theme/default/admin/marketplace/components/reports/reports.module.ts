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
import { VendorSharedModule } from '../../marketplace.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../../default.material.module';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { Title } from '@angular/platform-browser';

// components

import { SalesReportsComponent } from './pages/total-sales-report/sales-reports.component';
import { SettlementReportsComponent } from './pages/settlement-reports/settlement-reports.component';
import { VendorReportsComponent } from './pages/seller-reports/vendor-reports.component';


// ngrx state

import { ReportsSandbox } from '../../../../../../core/admin/vendor/reports/reports.sandbox';
import { ReportsService } from '../../../../../../core/admin/vendor/reports/reports.service';
import { ReportsEffect } from '../../../../../../core/admin/vendor/reports/reports-effect/reports.effect';
import { AdvanceQueryBuilderComponent } from './pages/advance-query-builder/advance-query-builder.component';
import { SalesReportSandbox } from 'src/core/admin/reports/sales-report/sales-report.sandbox';
import { SalesReportService } from 'src/core/admin/reports/sales-report/sales-report.service';
import { SalesReportEffect } from 'src/core/admin/reports/sales-report/effects/sales-report.effect';
import { SalesReportListComponent } from './pages/sales-reports/list/list.component';


const vendorRoutes: Routes = [
    { path: '', redirectTo: 'vendor-report', pathMatch: 'full' },
    {
        path: 'sales-report', component: SalesReportsComponent, canActivate: [AuthGuard],
        data: {
            permission: 'product-total-report',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
            { title: 'breadcrumbs.Reports', url: '' },
            { title: 'breadcrumbs.Total Sales Report', url: '' }]
        }
    },
    {
        path: 'settlement-report', component: SettlementReportsComponent, canActivate: [AuthGuard],
        data: {
            permission: 'list-settlement-report',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
            { title: 'breadcrumbs.Reports', url: '' },
            { title: 'breadcrumbs.Settlement', url: '' }]
        }
    },
    {
        path: 'vendor-report', component: VendorReportsComponent, canActivate: [AuthGuard],
        data: {
            permission: 'product-sales-by-seller-report',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
            { title: 'breadcrumbs.Reports', url: '' },
            { title: 'breadcrumbs.Sales by Vendor', url: '' }]
        }
    },
    {
        path: 'reports', component: SalesReportListComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'product-sales-report',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Report', url: '' },
            { title: 'breadcrumbs.Sales Report', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
        }
    },
    {
        path: 'query-builder', component: AdvanceQueryBuilderComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'sales-report-list',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Report', url: '' },
            { title: 'Advance Query Builder', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
        }
    },
    {
        path: 'sales-report',
        loadChildren: () => import('./pages/sales-reports/sales-report.module').then(m => m.SalesReportModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'sales-report', root: 'reports' }
    },
];
@NgModule({
    declarations: [
        SalesReportsComponent,
        SettlementReportsComponent,
        VendorReportsComponent,
        AdvanceQueryBuilderComponent
    ],
    imports: [
        RouterModule.forChild(vendorRoutes),
        CommonModule,
        ComponentsModule,
        MaterialModule,
        VendorSharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NumberAcceptModule,
        EffectsModule.forFeature([ReportsEffect, SalesReportEffect]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        ReportsSandbox,
        ReportsService,
        Title,
        SalesReportSandbox,
        SalesReportService
    ],
    bootstrap: []
})
export class ReportsModule { }
