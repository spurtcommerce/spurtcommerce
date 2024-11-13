import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BackOrdersComponent } from './back-orders/back-orders.component';
import { FailedOrdersComponent } from './failed-orders/failed-orders.component';
import { FailedOrderModalComponent } from './failed-order-model/failed-order-model.component';
import { ViewFailedOrdersComponent } from './view-failed-orders/vieworders.component';
// Auth Guard
import { AuthGuard } from '../../../../../../../src/core/admin/providers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'sales', pathMatch: 'full' },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(m => m.VendorSalesModule),
    data: { root: 'marketplace-new', permissionForHeader: 'product-order' }
  },
  {
    path: 'back-orders', component: BackOrdersComponent, canActivate: [AuthGuard],
    data: {
      permission: 'product-order',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Sales', url: '' },
      { title: 'breadcrumbs.Back Orders', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    },
  },
  {
    path: 'failed-orders', component: FailedOrdersComponent, canActivate: [AuthGuard],
    data: {
      permission: 'product-order',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Sales', url: '' },
      { title: 'breadcrumbs.Falied Orders', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    },
  },
  {
    path: 'failed-orders-detail/:orderId', component: ViewFailedOrdersComponent, canActivate: [AuthGuard],
    data: {
      permission: 'failed-order-detail',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/manage-sales/failed-orders' }, { title: 'breadcrumbs.Manage Sales', url: '/vendors/manage-sales/failed-orders' },
      { title: 'breadcrumbs.Falied Orders', url: '/vendors/manage-sales/failed-orders' },
      { title: 'breadcrumbs.Details', url: '' }]
    },
  },

  {
    path: 'payment',
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentModule),
    data: { root: 'marketplace-new', permissionForHeader: 'product-payment' }
  },
 
  {
    path: 'abandoned',
    loadChildren: () => import('./abondoned/abondoned.module').then(m => m.AbondonedModule),
    data: { root: 'marketplace-new', permissionForHeader: 'product-abondoned-carts' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSalesRoutingModule { }