
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// components
import { SharedModule } from '../../../shared/shared.module';
import { PaymentSandbox } from '../../../../core/payment/payment.sandbox';
import { PaymentService } from '../../../../core/payment/payment.service';
import { PaymentEffect } from '../../../../core/payment/payment-effects/payment.effects';
import { EffectsModule } from '@ngrx/effects';
import { SettlementsComponent } from './settlements/settlements.component';
import { LayoutComponent } from './layout/layout.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { ArchivedPaymentsComponent } from './archived-payments/archived-payments.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EarningComponent } from './earning/earning.component';
import { EarningEffect } from '../../../../../../src/app/core/earning/effects/earning.effect';
import { EarningService } from '../../../../../../src/app/core/earning/earning.service';
import { EarningSandbox } from '../../../../../../src/app/core/earning/earning.sandbox';

export const MY_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'DD/MM/YYYY',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

@NgModule({
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        EffectsModule.forFeature([PaymentEffect,EarningEffect]),
        NgbModule,
        NgSelectModule
    ],
    declarations: [
        LayoutComponent,
        SettlementsComponent,
        ArchivedPaymentsComponent,
        EarningComponent,
    ],
    providers: [PaymentSandbox, PaymentService,EarningService,
      EarningSandbox,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]

})
export class PaymentsModule {
}
