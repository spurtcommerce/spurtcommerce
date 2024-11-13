import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from '../layout/orders.component';
import { RecentOrderListComponent } from './recent-order-list/recent-order-list.component';
import { AllOrdersListComponent } from './all-orders/all-orders-list/all-orders-list.component';
import { ArchiveOrdersComponent } from './archive-orders/archive-orders.component';
import { CancelRequestsComponent } from '../component/cancel-requests/cancel-requests.component';
import { UpdateComponent } from '../component/update/update.component';
import { BackOrdersComponent } from './back-orders/back-orders.component';

import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import { AllOrdersViewComponent } from './all-orders/all-orders-view/all-orders-view.component';
import { AllOrdersComponent } from './allorders/allorders.component';
import { MakeArchieveModalComponent } from './all-orders/make-archieve-modal/make-archieve-modal.component';
import { ArchieveOrdersViewComponent } from './archieve-orders-view/archieve-orders-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { EarningsComponent } from '../manage-accounts/earnings/earnings.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FailedOrdersComponent } from './failed-orders-list/failed-orders.component';
import { OrderstatushistoryComponent } from './all-orders/orderstatushistory/orderstatushistory.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangepaymentstatusmodalComponent } from './all-orders/changepaymentstatusmodal/changepaymentstatusmodal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuotationComponentRoutes, QuotationComponents, VariantInventories, VariantInventoriesRoutes } from '../../../../../../../add-ons/add-ons.constant';
import { InventoryListComponent } from '../manage-inventory/inventory-list/inventory-list.component';
import { UniformListComponent } from './uniform-list/uniform-list.component';
import { BackOrderDetailComponent } from './back-orders/back-order-detail/back-order-detail.component';
import { AuthGuard } from '../../../../../../../src/app/core/providers/guards/auth-guard';
import { BackOrderListNewComponent } from './back-orders/back-order-list-new/back-order-list-new.component';
import { NumberAcceptModule } from '../../../../../../../src/app/default/shared/validation-directives/onlyNumber.module';
import { ManagetagsmodalComponent } from './all-orders/managetagsmodal/managetagsmodal.component';
import { FullfillmentmodalComponent } from './all-orders/fullfillmentmodal/fullfillmentmodal.component';
import { StaticPageComponent } from '../../dashboard/static-page/static-page.component';

export const routes: Routes = [
    {
        path: '',
        component: OrdersComponent,
        children: [
            { path: '', redirectTo: 'all-orders', pathMatch: 'full' },

            {
                path: 'all-orders',
                component: AllOrdersListComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'All Orders',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.AllOrders' }]
                }
            },

            {
                path: 'static',
                component: StaticPageComponent,
                data: {
                  title: 'static',
                  urls: [{ title: 'breadcrumbs.Dashboard' }]
                }
              },
            {
                path: 'list',
                component: RecentOrderListComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'RecentOrders',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.RecentOrders' }]
                }
            },
            {
                path: 'archive-orders',
                component: ArchiveOrdersComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Archived Orders',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ArchivedOrders' }]
                }
            },
            {
                path: 'archive-orders/archive-orders-detail/:id',
                component: ArchieveOrdersViewComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'ArchivedOrders',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ViewArchiveOrders' }]
                }
            },
            {
                path: 'cancel-orders',
                component: CancelRequestsComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Cancel Orders',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.CancelRequests' }]
                }
            },
            {
                path: 'update',
                component: UpdateComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Update Orders',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.UpdateOrder' }]
                }
            },

            {
                path: 'back-orders-list',
                component: BackOrderListNewComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Back Orders',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.BackOrders' }]
                }
            },




            {
                path: 'failed-orders-list',
                component: FailedOrdersComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Failed Orders',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.FailedOrders' }]
                }
            },
            {
                path: 'failed-orders-list/failed-orders-detail/:id',
                component: AllOrdersViewComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'FailOrderDetails',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.FailedOrders' }]
                }
            },
            {
                path: 'order-invoice',
                component: OrderInvoiceComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Order Invoice List',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.OrderInvoiceList' }]
                }
            },
            {
                path: 'all-orders/view-orders/:id',
                component: AllOrdersViewComponent,
                data: {
                    title: 'OrderDetails',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ViewOrders' }]
                }
            },
            ...QuotationComponentRoutes,

            ...VariantInventoriesRoutes,
            {
                path: 'inventory-lists',
                component: InventoryListComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Manage Inventory',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/list' }, { title: 'breadcrumbs.Manageinventory', url: '/sales/manage-inventory/inventory-lists' }, { title: 'breadcrumbs.StocksUpdate' }]
                }
            },
            {
                path: 'uniform-list',
                component: UniformListComponent,
                canActivate: [AuthGuard],
            },
            // {
            //     path: '',
            //     redirectTo: 'list',
            //     pathMatch: 'full'
            // },
            {
                path: 'back-orders-list/back-orders-detail/:id',
                component: AllOrdersViewComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'BackOrdersDetail',
                    urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.sales', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.ManageOrders', url: '/sales/manage-orders/all-orders' }, { title: 'breadcrumbs.BackOrders' }, { title: 'Back Order Detail' }]
                }
            },




        ]
    }
]


@NgModule({
    declarations: [
        ...VariantInventories,
        OrderstatushistoryComponent,
        ArchieveOrdersViewComponent,
        ChangepaymentstatusmodalComponent,
        ...QuotationComponents,
        UniformListComponent,
        BackOrderDetailComponent,
        BackOrderListNewComponent,
        ManagetagsmodalComponent,
        FullfillmentmodalComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        SharedModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        NumberAcceptModule,
        ReactiveFormsModule
    ]
})
export class ManageOrdersModule { }
