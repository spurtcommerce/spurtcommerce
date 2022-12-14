/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
import { CustomerAddressComponent } from './address/address.component';
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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { ComponentsModule } from '../../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CustomerAddComponent,
    CustomerListComponent,
    CustomerViewComponent,
    CustomerAddressComponent,
    CustomerFilterComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    CustomerRoutingModule,
    SelectDropDownModule,
    NgbModule,
    EffectsModule.forFeature([Customereffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule
  ],
  providers: [
    CustomersApiClientService,
    CustomerSandbox,
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'check' }
  ],
  bootstrap: [],
  entryComponents: [CustomerAddressComponent]
})
export class CustomerModule {}
