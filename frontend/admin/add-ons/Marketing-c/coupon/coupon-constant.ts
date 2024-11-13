import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { CouponStaticComponent } from "./coupon-static/coupon-static.component";

// components paths
export const componentLists = [CouponStaticComponent]; 

// route paths
export const routePath: Routes = [ 
{path:'',redirectTo:'list',pathMatch:'full'},

{ 
  path: 'list', component: CouponStaticComponent,
  canActivate: [AuthGuard],
  data: {
  permission: 'list-coupon',
  urls: [{ title: 'breadcrumbs.Marketing', url: '' },{ title: 'breadcrumbs.Manage Promotions', url: '' },
  { title: 'breadcrumbs.Coupon', url: '' },
  { title: 'breadcrumbs.List', url: '' }]
}
},
];
