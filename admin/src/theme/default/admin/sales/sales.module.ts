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
import {DefaultCommonModule} from '../../default.common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// components
import {SalesLayoutComponent} from './components/layout/layout.component';
import {SalesHeaderComponent} from './components/header/header.component';
// Routing Module
import {SalesRoutingModule} from './sales.routing';

// Shared Module
import {MaterialModule} from '../../default.material.module';


// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {LayoutService} from '../../../../core/admin/sales/layout/layout.service';
import {LayoutsSandbox} from '../../../../core/admin/sales/layout/layout.sandbox';
import {LayoutEffects} from '../../../../core/admin/sales/layout/effects/layout.effect';
import { ComponentsModule } from '../shared/components';

@NgModule({
    declarations: [
        SalesLayoutComponent,
        SalesHeaderComponent
    ],
    imports: [
        CommonModule,
        SalesRoutingModule,
        DefaultCommonModule,
        MaterialModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([LayoutEffects])
    ],
    providers: [
        LayoutService,
        LayoutsSandbox
    ],
    bootstrap: [],
    entryComponents: []
})

export class SalesModule {
}
