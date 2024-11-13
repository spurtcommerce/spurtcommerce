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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

// Third party 
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';

// components
import { CustomerAddComponent } from './add/add.component';
import { CustomerListComponent } from './list/list.component';
import { CustomerViewComponent } from './view/view.component';
import { CustomerAddressComponent } from './address/address.component';

// Store Actions
import { CustomersApiClientService } from '../../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
import { Customereffects } from '../../../../../../../core/admin/Customers/customers/customer-effects/customer.effects';
import { CustomerSandbox } from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersGroupSandbox } from '../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';
import { CustomersGroupService } from '../../../../../../../core/admin/Customers/customers-group/customers-group.service';

// Routing Module
import { CustomerRoutingModule } from './customer.routing';

// Shared Module
import { DefaultCommonModule } from '../../../../../default.common.module';
import { MaterialModule } from '../../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../../admin.module';
import { ComponentsModule } from '../../../../shared/components';
import { PasswordShowModule } from '../../../../../../../core/admin/shared/password-show.directives/passwordShow.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

@NgModule({
    declarations: [
        CustomerAddComponent,
        CustomerListComponent,
        CustomerViewComponent,
        CustomerAddressComponent,
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ComponentsModule,
        CustomerRoutingModule,
        NgbModule,
        MatNativeDateModule,
        // matDatepickerFilter,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule, 
        EffectsModule.forFeature([Customereffects]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NumberAcceptModule,
        PasswordShowModule
    ],
    providers: [
        CustomersApiClientService,
        CustomerSandbox,
        CustomersGroupSandbox,
        CustomersGroupService,
        Title,
        { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'check' }
    ],
    bootstrap: []
})
export class CustomerModule {}
