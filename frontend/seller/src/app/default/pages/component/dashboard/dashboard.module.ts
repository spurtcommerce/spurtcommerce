import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardSandbox } from '../../../../core/dashboard/dashboard.sandbox';
import { DashboardService } from '../../../../core/dashboard/dashboard.service';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffect } from '../../../../core/dashboard/effects/dashboard.effect';
import { OrderSandbox } from '../../../../core/order/order.sandbox';
import { OrderService } from '../../../../core/order/order.service';
import { OrderEffect } from '../../../../core/order/order-effects/order.effects';
import { PaymentService } from '../../../../core/payment/payment.service';
import { PaymentSandbox } from '../../../../core/payment/payment.sandbox';
import { PaymentEffect } from '../../../../core/payment/payment-effects/payment.effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from '../../../../core/providers/interceptor/request.interceptor';
import { LayoutComponent } from './layout/layout.component';
import { CommonSandbox } from '../../../../../../src/app/core/common/common.sandbox';
import { CommonService } from '../../../../../../src/app/core/common/common.service';
import { StaticPageComponent } from './static-page/static-page.component';


export const routes = [
  {
      path: '',
      component: DashboardComponent,
      data: {
        title: 'Dashboard',
        urls:[{title:'breadcrumbs.Dashboard'}]
    }    
  },

//   {
//     path: 'chat',
//     component: ChatconversationComponent,
//     data: {
//         title: 'ChatconversationComponent',
//         urls: { title: 'breadcrumbs.Home', url: '/dashboard' }
//   }
// }

  
];
@NgModule({
    declarations: [DashboardComponent, LayoutComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        HttpClientModule,
        EffectsModule.forFeature([DashboardEffect, OrderEffect, PaymentEffect]),
        NgSelectModule,
        TranslateModule,
        FormsModule,
        BaseChartDirective
    ],
    exports: [],
    providers: [provideCharts(withDefaultRegisterables()),DashboardSandbox, CommonSandbox, CommonService, DashboardService, OrderSandbox, OrderService, PaymentSandbox, CurrencyPipe, PaymentService, { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },]
})
export class DashboardModule { }
