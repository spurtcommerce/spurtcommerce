import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './default/common/layout/layout.component';
import { AuthGuard } from './core/providers/guards/auth-guard';
import { chatConversationComponentRoutes } from '../../add-ons/add-ons.constant';
import { StaticPageComponent } from './default/pages/component/dashboard/static-page/static-page.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./default/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'static',
    component: StaticPageComponent,
    data: {
      title: 'static',
      urls: [{ title: 'breadcrumbs.Dashboard' }]
    }
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./default/pages/component/dashboard/dashboard.module').then(m => m.DashboardModule),
      },

   
      {
        path: 'catalog',
        loadChildren: () => import('./default/pages/component/catalog/catalog.module').then(m => m.CatalogModule),
      },

      {
        path: 'new-catalog',
        loadChildren: () => import('./default/pages/component/new-catalog/new-catalog.module').then(m => m.NewCatalogModule),
      },


      {
        path: 'crm',
        loadChildren: () => import('./default/pages/component/crm/crm.module').then(m => m.CrmModule),
      },

      {
        path: 'sales',
        loadChildren: () => import('./default/pages/component/sales/sales.module').then(m => m.SalesModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./default/pages/component/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'payments',
        loadChildren: () => import('./default/pages/component/payments/payments.module').then(m => m.PaymentsModule),
      },

      {
        path: 'marketing',
        loadChildren: () => import('./default/pages/component/marketing/marketing.module').then(m => m.MarketingModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('./default/pages/component/reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: 'support',
        loadChildren: () => import('./default/pages/component/support/support/support.module').then(m => m.SupportModule),
      },

      {
        path: 'my-profile',
        loadChildren: () => import('./default/pages/component/my-profile/my-profile.module').then(m => m.MyProfileModule),
      },
      {
        path: 'seller-onboarding',
        loadChildren: () => import('./default/pages/component/seller-onboarding/seller-onboarding.module').then(m => m.SellerOnboardingModule),
      },
      {
        path: 'my-account',
        loadChildren: () => import('./default/pages/component/my-account/my-account.module').then(m => m.MyAccountModule),
      },
      {
        path: 'supplier-management',
        loadChildren: () => import('./default/pages/component/supplier-management/supplier-management.module').then(m => m.SupplierManagementModule),
      },

      // add-ons seperation
      ...chatConversationComponentRoutes


    ],
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
