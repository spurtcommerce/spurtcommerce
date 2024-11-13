import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { VariantFilterStaticComponent } from "./variant-filter-static/variant-filter-static.component";


// components paths
export const componentLists = [VariantFilterStaticComponent];

// route paths
export const routePath: Routes = [

  { path: '', redirectTo: 'list', pathMatch: 'full' },

  {
    path: 'list', component: VariantFilterStaticComponent, canActivate: [AuthGuard], data: {
      permission: 'list-variant',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'Product Configuration', url: '' },
      { title: 'breadcrumbs.Variant', url: '' },
      { title: 'breadcrumbs.filters', url: '' }]
    }
  },

];
