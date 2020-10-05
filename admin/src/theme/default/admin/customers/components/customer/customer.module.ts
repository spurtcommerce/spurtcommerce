/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { CustomerAddComponent } from './add/add.component';
import { CustomerListComponent } from './list/list.component';
import { CustomerViewComponent } from './view/view.component';
import { CustomerFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { CustomersApiClientService } from '../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
import { Customereffects } from '../../../../../../core/admin/Customers/customers/customer-effects/customer.effects';
import { CustomerSandbox } from '../../../../../../core/admin/Customers/customers/customer.sandbox';

// Routing Module
import { CustomerRoutingModule } from './customer.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { SelectDropDownModule } from 'ngx-select-dropdown/dist/index';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpClient } from '@angular/common/http';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';

@NgModule({
  declarations: [
    CustomerAddComponent,
    CustomerListComponent,
    CustomerViewComponent,
    CustomerFilterComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CustomerRoutingModule,
    SelectDropDownModule,
    EffectsModule.forRoot([Customereffects]),
    NumberAcceptModule
  ],
  providers: [
    CustomersApiClientService,
    CustomerSandbox,
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }
  ],
  bootstrap: [],
  entryComponents: []
})
export class CustomerModule {}
