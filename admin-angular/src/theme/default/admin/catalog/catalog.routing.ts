/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Component
import { CatalogLayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';


const catalogRoutes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full', canActivate: [AuthGuard]},
  {
    path: '',
    component: CatalogLayoutComponent,
    children: [

      {
        path: 'product',
        loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'catalog-product', root: 'catalog' }
      },
      {
        path: 'categories',
        loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'catalog-category', root: 'catalog' }

      },
      {
        path: 'brand',
        loadChildren: () => import('./components/brand/brand.module').then(m => m.BrandModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'catalog-brand', root: 'catalog' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(catalogRoutes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {}
