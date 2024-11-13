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
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { OrdersService } from '../../../../../../../../../core/admin/vendor/vendor-sales/orders/orders.service';
import { OrdersEffects } from '../../../../../../../../../core/admin/vendor/vendor-sales/orders/orders-effects/orders.effects';
import { OrdersSandbox } from '../../../../../../../../../core/admin/vendor/vendor-sales/orders/orders.sandbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { ScrollToModule } from '../../../../../../../../../core/admin/vendor/pages/shared/validation-directives/error.module';
import { AuthGuard } from '../../../../../../../../../core/admin/providers/auth.guard';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DefaultCommonModule } from 'src/theme/default/default.common.module';
import { ComponentsModule } from 'src/theme/default/admin/shared/components';
// import { SwiperModule } from 'ngx-swiper-wrapper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { SwiperModule } from "swiper/angular";
const orderRoutes: Routes = [
    {
        path: '', component: OrdersComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'list-order',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Sales', url: '' },
            { title: 'breadcrumbs.Orders', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
        },

    },
    {
        path: 'order-detail/:id', component: OrdersDetailComponent, canActivate: [AuthGuard],
        data: {
            permission: 'edit-order-status',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/manage-sales/sales/order' }, { title: 'breadcrumbs.Manage Sales', url: '/vendors/manage-sales/sales/order' },
            { title: 'breadcrumbs.Orders', url: '/vendors/manage-sales/sales/order' },
            { title: 'breadcrumbs.Details', url: '' }]
        },
    }


];
@NgModule({
    declarations: [
        OrdersComponent,
        OrdersDetailComponent,
    ],
    imports: [
        RouterModule.forChild(orderRoutes),
        CommonModule,
        DefaultCommonModule,
        MatDatepickerModule,
        ComponentsModule,
        NgbModule,
        MaterialModule,
        NumberAcceptModule,
        ScrollToModule,
        FormsModule,
        CKEditorModule,
        // SwiperModule,
        InfiniteScrollModule,
        ReactiveFormsModule,

        EffectsModule.forFeature([
            OrdersEffects
        ]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        OrdersService,
        OrdersSandbox,
    ],
    bootstrap: []
})

export class SalesOrderModule { }
