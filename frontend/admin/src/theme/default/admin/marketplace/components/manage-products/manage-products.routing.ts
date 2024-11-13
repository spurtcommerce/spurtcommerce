// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { ApprovedProductsComponent } from './approved-products/approved-products.component';
import { RejectedProductsComponent } from './rejected-products/rejected-products.component';
import { WaitingProductsComponent } from './waiting-products/waiting-products.component';
import { SellerProductsComponent } from './product/seller-products/seller-products.component';
// AuthGuard
import { AuthGuard } from '../../../../../../../src/core/admin/providers/auth.guard';
import { ProductAddComponent } from './product/product-detail/add.component';

const manageProductsRoute: Routes = [
  { path: '', redirectTo: 'seller-products', pathMatch: 'full' },

  {
    path: 'seller-products', component: SellerProductsComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-approved-products',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'marketplace.common.AllProducts', url: '' },{ title: 'breadcrumbs.List', url: '' },
      ]
    }
  },
  {
    path: 'common-vendor-products',
    loadChildren: () => import('./common-vendor-product/common-vendor-product.module').then(m => m.CommonVendorProductModule),
    data: {
      permission: 'list-common-products',
    }
  },
  {
    path: 'approval', component: ApprovedProductsComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-approved-products',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'breadcrumbs.ApprovedProducts', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },

  {
    path: 'Waiting', component: WaitingProductsComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-waiting-for-approval',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'marketplace.common.WaitingForApprovals', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },

  {
    path: 'reject', component: RejectedProductsComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-rejected-products',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'breadcrumbs.RejectedProducts', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },

  {
    path: 'product-detail/:id', component: ProductAddComponent,
    canActivate: [AuthGuard],
    data: {

      permission: 'list-rejected-products',

      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/manage-products/' }, { title: 'breadcrumbs.Manage Products', url: '/vendors/manage-products' },
      { title: 'breadcrumbs.Products', url: '/vendors/manage-products' },
      { title: 'breadcrumbs.Details', url: '' }]
    }
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(manageProductsRoute)],
  exports: [RouterModule]
})
export class ManageProductsRoutingModule { }
