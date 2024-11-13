import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { MarketingLayoutComponent } from './components/layout/layout.component';

const marketingRoutes: Routes = [
  { path: '', redirectTo: 'manage-promotions', pathMatch: 'full' },
  {
    path: '',
    component: MarketingLayoutComponent,
    children: [
      {
        path: 'manage-promotions',
        loadChildren: () => import('./components/manage-promotions/manage-promotions.module').then(m => m.ManagePromotionsModule),
        canActivate: [AuthGuard],
        data: {root: 'Marketing', permissionForHeader: 'catalog-coupon'}
      },
      {
        path: 'manage-cross-selling',
        loadChildren: () => import('./components/manage-cross-selling/manage-cross-selling.module').then(m => m.ManageCrossSellingModule),
        canActivate: [AuthGuard],
        data: {root: 'Marketing', permissionForHeader: 'catalog-related-products'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(marketingRoutes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
