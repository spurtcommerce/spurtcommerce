/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular impors 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
} from '@angular/common/http';

// import { ToastrModule } from 'ng6-toastr-notifications';
import { EffectsModule } from '@ngrx/effects';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';

// Components
import { TaxAddComponent } from './add/add.component';
import { TaxListComponent } from './list/list.component';

// Service
import { TaxSandbox } from '../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { TaxService } from '../../../../../../../core/admin/settings/localizations/tax/tax.service';

// Transalate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// thirt party module 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpLoaderFactory } from '../../../../admin.module';
import { TaxRoutingModule } from './tax.routing';
// components 
import { ComponentsModule } from '../../../../../../default/admin/shared/components';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [TaxAddComponent, TaxListComponent],
    imports: [
        TaxRoutingModule,
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
    providers: [TaxSandbox, TaxService]
})
export class TaxModule { }
