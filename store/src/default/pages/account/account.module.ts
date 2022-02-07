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
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// shared modules
import {SharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../shared/components/index';
import {NumberAcceptModule} from './../../shared/validation-directives/onlyNumber.module';

// components
import {AccountComponent} from './account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {InformationComponent} from './information/information.component';
import {OrdersComponent} from './orders/orders.component';
import {OrderDetailComponent} from './orderdetail/orderdetail.component';

// store services
import {EffectsModule} from '@ngrx/effects';
import {CommonEffect} from '../../../core/common/effects/common.effect';
import {AccountEffect} from '../../../core/account/effect/account.effect';
import {CommonSandbox} from '../../../core/common/common.sandbox';
import {AccountSandbox} from '../../../core/account/account.sandbox';
import {CommonService} from '../../../core/common/common.service';
import {AccountService} from '../../../core/account/account.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



export const routes = [
    {
        path: '',
        component: AccountComponent, children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent, data: {breadcrumb: 'Dashboard'}},
        {path: 'information', component: InformationComponent, data: {breadcrumb: 'Information'}},
        {path: 'orders', component: OrdersComponent, data: {breadcrumb: 'Orders'}},
        {path: 'order-detail/:id', component: OrderDetailComponent, data: {breadcrumb: 'Order Detail'}}
    ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        ComponentsModule,
        EffectsModule.forFeature([AccountEffect, CommonEffect]),
        NumberAcceptModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        AccountComponent,
        DashboardComponent,
        InformationComponent,
        OrdersComponent,
        OrderDetailComponent
    ],
    providers: [CommonSandbox,
        AccountSandbox,
        CommonService,
        AccountService]

})
export class AccountModule {
}
