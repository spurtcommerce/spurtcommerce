/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular common Table 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
} from '@angular/common/http';

// Store Actions
// import { ToastrModule } from 'ng6-toastr-notifications';
import { EffectsModule } from '@ngrx/effects';

// Routing Module
import { CurrencyRoutingModule } from './currency.routing';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';

// Components
import { CurrencyAddComponent } from './add/add.component';
import { CurrencyListComponent } from './list/list.component';

// Service
import { CurrencySandbox } from '../../../../../../../core/admin/settings/localizations/currency/currency.sandbox';
import { CurrencyService } from '../../../../../../../core/admin/settings/localizations/currency/currency.service';

// Transalate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpLoaderFactory } from '../../../../admin.module';
import { ComponentsModule } from '../../../../../../default/admin/shared/components';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [CurrencyAddComponent, CurrencyListComponent],
    imports: [
        CurrencyRoutingModule,
        EffectsModule,
        ToastrModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ComponentsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgbModule
    ],
    providers: [CurrencySandbox, CurrencyService]
})
export class CurrencyModule { }
