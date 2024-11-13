import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../../../../src/app/core/providers/guards/auth-guard';
import { productVariantRoutes } from '../../../../../../add-ons/add-ons.constant';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'common-products',
    loadChildren: () => import('../new-catalog/common-products/common-products.module').then(m => m.CommonProductsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'related-products',
    loadChildren: () => import('../new-catalog/related-products/related-products.module').then(m => m.RelatedProductsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'product-localizaton',
    loadChildren: () => import('../new-catalog/product-localization/product-localization.module').then(m => m.ProductLocalizationModule),
    canActivate: [AuthGuard],
  },
     {
        path: 'pricing',
        loadChildren: () => import('../../../../default/pages/component/assign-pricing/assign-pricing.module').then(m => m.AssignPricingModule),
      },

      ...productVariantRoutes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCatalogRoutingModule { }
