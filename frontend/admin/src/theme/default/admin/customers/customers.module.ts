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
import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components
import { CustomerLayoutComponent } from './components/layout/layout.component';
import { CustomerHeaderComponent } from './components/header/header.component';
// Routing Module
import { CustomersRoutingModule } from './customers.routing';

// Shared Module
import { MaterialModule } from '../../default.material.module';
import { TranslateModule } from '@ngx-translate/core';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { LayoutService } from '../../../../core/admin/Customers/layout/layout.service';
import { LayoutSandbox } from '../../../../core/admin/Customers/layout/layout.sandbox';
import { LayoutEffects } from '../../../../core/admin/Customers/layout/effects/layout.effect';
import { CustomersGroupEffects } from '../../../../core/admin/Customers/customers-group/customers-group-effects/customers-group.effects';
import { CustomersGroupService } from '../../../../core/admin/Customers/customers-group/customers-group.service';
import {ComponentsModule} from '../shared/components';


@NgModule({
    declarations: [
        CustomerLayoutComponent,
        CustomerHeaderComponent,
    ],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        DefaultCommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([LayoutEffects, CustomersGroupEffects]),
        TranslateModule.forChild(),
        ComponentsModule
    ],
    providers: [LayoutService, LayoutSandbox, CustomersGroupService],
    bootstrap: []
})
export class CustomersModule {}
