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
import { VendorLayoutComponent } from './components/layout/vendor-layout.component';
import { ComponentsModule } from '../shared/components';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';


const routes: Routes = [
  {
    path: '',
    component: HeaderLayoutComponent,
    children: [
      { path: '', redirectTo: 'manage-products', pathMatch: 'full' },
      // {
      //   path: 'manage-seller',
      //   loadChildren: () => import('./components/manage-seller/manage-seller.module').then(m => m.ManageSellerModule)
      // },

      {
        path: 'manage-products',
        loadChildren: () => import('./components/manage-products/manage-products.module').then(m => m.ManageProductsModule),
        data: { permissionForHeader: 'approved-product', root: 'marketplace-new' }
      },
      {
        path: 'product-config',
        loadChildren: () => import('./components/product-configuration/product-configuration.module').then(m => m.ProductConfigurationModule),
        data: { permissionForHeader: 'product-categories', root: 'marketplace-new' }
      },
      {
        path: 'manage-sales',
        loadChildren: () => import('./components/manage-sales/manage-sales.module').then(m => m.ManageSalesModule),
        data: { permissionForHeader: 'product-order', root: 'marketplace-new' }
      },
      {
        path: 'manage-settlement',
        loadChildren: () => import('./components/manage-settlement/manage-settlement.module').then(m => m.ManageSettlementModule),
        data: { permissionForHeader: 'settlement-product', root: 'marketplace-new' }
      },
      {
        path: 'reports',
        loadChildren: () => import('./components/reports/reports.module').then(m => m.ReportsModule),
        data: { permissionForHeader: 'product-sales-report', root: 'marketplace-new' }
      }
     
      // {
      //   path: 'sales',
      //   loadChildren: () => import('./components/sales/sales.module').then(m => m.VendorSalesModule)
      // },
      // {
      //   path: 'payments',
      //   loadChildren: () => import('./components/payments/payments.module').then(m => m.PaymentModule),
      //   canActivate: [AuthGuard],
      //   data: {root: 'marketplace', permissionForHeader: 'marketplace-payments'}
      // },
      // {
      //   path: 'settlement',
      //   loadChildren: () => import('./components/settlement/settlement.module').then(m => m.SettlementModule)
      // },
      // {
      //   path: 'reports',
      //   loadChildren: () => import('./components/reports/reports.module').then(m => m.ReportsModule),
      //   canActivate: [AuthGuard],
      //   data: {root: 'marketplace', permissionForHeader: 'marketplace-reports'}
      // }
    ]
  },
];
@NgModule({
    declarations: [
        VendorLayoutComponent
    ],
    imports: [RouterModule.forChild(routes), CommonModule, NgbModule, ComponentsModule],
    providers: [],
    bootstrap: []
})
export class VendorModule {}
