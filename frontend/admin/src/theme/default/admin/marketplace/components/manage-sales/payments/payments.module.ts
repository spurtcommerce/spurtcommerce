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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentLayoutComponent } from './layout/layout.component';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import { ComponentsModule } from '../../../../shared/components';
import { VendorSharedModule } from '../../../marketplace.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { PaymentSandbox} from '../../../../../../../core/admin/vendor/pages/payment/payment.sandbox';
import { PaymentService} from '../../../../../../../core/admin/vendor/pages/payment/payment.service';
import { MaterialModule } from '../../../../../default.material.module';
import { EffectsModule } from '@ngrx/effects';
import { PaymentEffects } from '../../../../../../../core/admin/vendor/pages/payment/payment-effects/payment.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { PaymentsComponent } from './pages/payments/payments.component';

const vendorRoutes: Routes = [
    {
        path: '', component: PaymentLayoutComponent,
        children: [
            { path: 'list', component: PaymentListComponent, canActivate: [AuthGuard],
            data: { permission: 'list-payment',
            urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
            { title: 'breadcrumbs.Manage Sales', url: '' },
            { title: 'breadcrumbs.Payments', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
         } },
            { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
    },
];
@NgModule({
    declarations: [
        PaymentLayoutComponent,
        PaymentListComponent,
        PaymentsComponent
    ],
    imports: [
        RouterModule.forChild(vendorRoutes),
        CommonModule,
        ComponentsModule,
        MaterialModule,
        VendorSharedModule,
        FormsModule,
        NumberAcceptModule,
        SharedModule,
        ReactiveFormsModule,
        NgbModule,
        EffectsModule.forFeature([
            PaymentEffects,
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
        PaymentSandbox,
        PaymentService
    ],
    bootstrap: []
})
export class PaymentModule { }
