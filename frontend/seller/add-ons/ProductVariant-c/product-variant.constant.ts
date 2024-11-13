import { LayoutComponent } from "../../src/app/default/pages/component/new-catalog/layout/layout.component";
import { AuthGuard } from "../../src/app/core/providers/guards/auth-guard";

import { Routes } from "@angular/router";
import { ProductVariantStaticComponent } from "./product-variant-static/product-variant-static.component";

// components paths
export const componentLists = [ProductVariantStaticComponent];

// route paths
export const routePath: Routes = [
  { path: "", redirectTo: 'varient', pathMatch: "full" },
  {
    path: 'varient',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ProductVariantStaticComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Products',
          ActiveStatus: 'products-list',
          urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/catalog/manage-products/' }, { title: 'breadcrumbs.ManageProducts', url: '/catalog/manage-products/list' }, { title: 'breadcrumbs.ProductList' }]
        }
      },

    ]
  },


];