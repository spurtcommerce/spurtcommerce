import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ManageSettlementRoutingModule } from './manage-settlement-routing.module';
import { SettlementHistorySandbox } from 'src/core/admin/vendor/vendor-settlements/settlement-history/settlement-history.sandbox';
import { SettlementHistoryService } from 'src/core/admin/vendor/vendor-settlements/settlement-history/settlement-history.service';
import { Title } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { SettlementOrderEffect } from 'src/core/admin/vendor/vendor-settlements/settlement-order/settlement-order-effect/settlement-order.effect';
import { PaymentSandbox } from 'src/core/admin/vendor/pages/payment/payment.sandbox';
import { PaymentService } from 'src/core/admin/vendor/pages/payment/payment.service';
import { PaymentEffects } from 'src/core/admin/vendor/pages/payment/payment-effects/payment.effects';
import { SettlementOrderSandbox } from 'src/core/admin/vendor/vendor-settlements/settlement-order/settlement-order.sandbox';
import { SettlementOrderService } from 'src/core/admin/vendor/vendor-settlements/settlement-order/settlement-order.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManageSettlementRoutingModule,
    EffectsModule.forFeature([SettlementOrderEffect, PaymentEffects, SettlementOrderEffect]),
  ],
  providers: [
    DatePipe,
    SettlementHistorySandbox,
    SettlementHistoryService,
    SettlementOrderService,
    SettlementOrderSandbox,
    Title,
    PaymentSandbox,
    PaymentService,
  ]
})
export class ManageSettlementModule { }
