/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

// shared modules
import {SharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../shared/components/index';

// components
import {CheckoutComponent} from './checkout.component';
import {CheckoutSuccessComponent} from './checkout-success/checkout-success.component';

// store
import {EffectsModule} from '@ngrx/effects';
import {ProductControlEffect} from '../../../core/product-control/effects/product-control.effect';
import {ProductControlService} from '../../../core/product-control/product-control.service';
import {ProductControlSandbox} from '../../../core/product-control/product-control.sandbox';
import {NumberAcceptModule} from '../../shared/validation-directives/onlyNumber.module';
import {AccountSandbox} from '../../../core/account/account.sandbox';
import {AccountEffect} from '../../../core/account/effect/account.effect';
import {AccountService} from '../../../core/account/account.service';
import {TruncatePipe} from '../../shared/pipe';
import {AuthSandbox} from '../../../core/auth/auth.sandbox';
import { PipesModule } from '../../../default/shared/pipes/pipes.module';

export const routes = [
    {path: '', component: CheckoutComponent, pathMatch: 'full'},
    {path: 'success/:id', component: CheckoutSuccessComponent, pathMatch: 'full', data: {
        urls: [{ title: 'Checkout', url: '' }]
      }}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        PipesModule,
        ComponentsModule,
        EffectsModule.forFeature([ProductControlEffect, AccountEffect]),
        NumberAcceptModule
    ],
    declarations: [
        CheckoutComponent,
        TruncatePipe,
        CheckoutSuccessComponent
    ],
    providers: [ProductControlSandbox, AccountSandbox, AuthSandbox, ProductControlService, AccountService]
})
export class CheckoutModule {
}
