import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { combineArrays, permissionConfigs } from "src/theme/default/admin/shared/components/services/permission.constant";
import { CommonProductStaticComponent } from "./common-product-static/common-product-static.component";

// components paths
export const vendorProductComponents = [CommonProductStaticComponent];

// route paths
export const routePath:Routes = [
  {path:'',redirectTo:"list",pathMatch:'full'},
  {
    path: 'list', component: CommonProductStaticComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-common-products',
      permissionForRoot : combineArrays(permissionConfigs['manage-product']),
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.ManageProducts', url: '' },
      { title: 'breadcrumbs.CommonProducts', url: '' }, { title: 'breadcrumbs.List', url: '' }]
    }
  },
];


