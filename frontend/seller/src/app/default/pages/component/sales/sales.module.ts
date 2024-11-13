
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { OrdersComponent } from './layout/orders.component';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffect } from '../../../../core/order/order-effects/order.effects';
import { OrderService } from '../../../../core/order/order.service';
import { OrderSandbox } from '../../../../core/order/order.sandbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateComponent } from './component/update/update.component';
import { PaymentSandbox } from '../../../../core/payment/payment.sandbox';
import { PaymentService } from '../../../../core/payment/payment.service';
import { PaymentEffect } from '../../../../core/payment/payment-effects/payment.effects';
import { DashboardSandbox } from '../../../../core/dashboard/dashboard.sandbox';
import { DashboardEffect } from '../../../../core/dashboard/effects/dashboard.effect';
import { DashboardService } from '../../../../core/dashboard/dashboard.service';
import { CancelRequestsComponent } from './component/cancel-requests/cancel-requests.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { NgSelectModule } from '@ng-select/ng-select';
import { ProductSandbox } from '../../../../core/product/product.sandbox';
import { ProductService } from '../../../../core/product/product.service';
import { ProductEffect } from '../../../../core/product/product-effects/product.effects';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AllOrdersListComponent } from './manage-orders/all-orders/all-orders-list/all-orders-list.component';
import { AllOrdersViewComponent } from './manage-orders/all-orders/all-orders-view/all-orders-view.component';
import { MakeArchieveModalComponent } from './manage-orders/all-orders/make-archieve-modal/make-archieve-modal.component';
/*Varient Inventory */
import { RecentOrderListComponent } from './manage-orders/recent-order-list/recent-order-list.component';
import { AllOrdersComponent } from './manage-orders/allorders/allorders.component';
import { ArchiveOrdersComponent } from './manage-orders/archive-orders/archive-orders.component';
import { OrderInvoiceComponent } from './manage-orders/order-invoice/order-invoice.component';
import { BackOrdersComponent } from './manage-orders/back-orders/back-orders.component';
import { FailedOrdersComponent } from  '../../component/sales/manage-orders/failed-orders-list/failed-orders.component';
import { AuthGuard } from '../../../../core/providers/guards/auth-guard';
import { PaymentComponent } from './manage-accounts/payments/payments.component';
import { EarningsComponent } from './manage-accounts/earnings/earnings.component';
import { ArchivePaymentsComponent } from './manage-accounts/archive-payments/archive-payments.component';
import { InventoryListComponent } from './manage-inventory/inventory-list/inventory-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const salesRoutes: Routes = [
    // {
    //     path: '',
    //     component: OrdersComponent,
        // children: [
            { path: '', redirectTo: 'manage-orders', pathMatch: 'full' },
            {
                path: 'manage-orders',
                loadChildren: () => import('./manage-orders/manage-orders.module').then(m => m.ManageOrdersModule),
                canActivate: [AuthGuard],
                data: { root: 'sales', permissionForHeader: 'sales-orders' }
            },
            {
                path: 'manage-accounts',
                loadChildren: () => import('./manage-accounts/manage-accounts.module').then(m => m.ManageAccountsModule),
                canActivate: [AuthGuard],
                data: { root: 'sales', permissionForHeader: 'sales-orders' }
            },
            // {
            //     path: 'manage-inventory',
            //     loadChildren: () => import('./manage-inventory/manage-inventory.module').then(m => m.ManageInventoryModule),
            //     canActivate: [AuthGuard],
            //     data: { root: 'sales', permissionForHeader: 'sales-orders' }
            // }
        // ]
    // }
  ];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(salesRoutes),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule,
        FormsModule,
        NgbModule,
        MatInputModule,
        MatStepperModule,
        MatIconModule,
        InfiniteScrollModule,
        EffectsModule.forFeature([OrderEffect, PaymentEffect, DashboardEffect, ProductEffect]),
        NgSelectModule,
        TranslateModule
    ],
    declarations: [
        OrdersComponent,
        RecentOrderListComponent,
        AllOrdersComponent,
        UpdateComponent,
        ArchiveOrdersComponent,
        CancelRequestsComponent,
        OrderInvoiceComponent,
        BackOrdersComponent,
        FailedOrdersComponent,
        AllOrdersListComponent,
        AllOrdersViewComponent,
        MakeArchieveModalComponent,
        PaymentComponent,
        EarningsComponent,
        ArchivePaymentsComponent,
        InventoryListComponent
    ],
    providers: [
        OrderService,
        OrderSandbox, PaymentSandbox, PaymentService,
        DashboardSandbox,
        DashboardService,
        ProductSandbox,
        ProductService
    ]
})
export class SalesModule {
}
