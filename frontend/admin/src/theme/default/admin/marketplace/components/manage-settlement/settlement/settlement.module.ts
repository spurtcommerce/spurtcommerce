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
import { ComponentsModule } from '../../../../shared/components';
import { VendorSharedModule } from '../../../marketplace.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { PaymentSandbox} from '../../../../../../../core/admin/vendor/pages/payment/payment.sandbox';
import { PaymentService} from '../../../../../../../core/admin/vendor/pages/payment/payment.service';
import { PaymentEffects } from '../../../../../../../core/admin/vendor/pages/payment/payment-effects/payment.effects';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
import { SettlementOrderSandbox } from 'src/core/admin/vendor/vendor-settlements/settlement-order/settlement-order.sandbox';
import { SettlementHistoryListComponent } from './pages/settlement-history/list/settlement-history-list.component';
import { SettlementOrderListComponent } from './pages/settlement-order-list/list/settlement-order-list.component';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';

const vendorRoutes: Routes = [
    // {
        // path: '', component: VendorLayoutComponent,
        // children: [
            { path: '', redirectTo: 'settlement-order', pathMatch: 'full' },
            { path: 'settlement-order',
              loadChildren: () => import('./pages/settlement-order-list/settlement-order-list.module').then(m => m.SettlementOrderListModule),
              canActivate: [AuthGuard],
              data: { permission: 'settlement-product' }

           },
            { path: 'settlement-history',
              loadChildren: () => import('./pages/settlement-history/settlement-history.module').then(m => m.SettlementHistoryModule),
              canActivate: [AuthGuard],
              data: { permission: 'settlement-product-history' }
          },
            
        // ]
    // },


  { path: '', redirectTo: 'settlement-order', pathMatch: 'full' },
 
  {
    path: 'settlement-order', component: SettlementOrderListComponent,
    data: {
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
       { title: 'Manage Settlements', url: '' },
      { title: 'breadcrumbs.Settlement Orders', url: '' }]
    }
  },
];
@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forChild(vendorRoutes),
        CommonModule,
        ComponentsModule,
        VendorSharedModule,
        NgbModule,
        MaterialModule,
        NumberAcceptModule,
        ComponentsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        EffectsModule.forFeature([PaymentEffects])
    ],
    providers: [
        SettlementOrderSandbox,
        PaymentSandbox,
        PaymentService,
    ],
    bootstrap: []
})
export class SettlementModule { }
