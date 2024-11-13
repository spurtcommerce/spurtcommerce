import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';

const routes: Routes = [ 
{
  path: '',
  component: LayoutComponent,
  children: [

    {
        path: 'manage-seller',
          loadChildren: () => import('./manage-vendors/manage-vendors.module').then(m => m.ManageVendorsModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'sellers-data', root: 'sellers' }

    },
    
  
    // {
    //   path: 'coupon',
    //   loadChildren: () => import('./components/coupon/coupon.module').then(m => m.CouponModule),
    //   canActivate: [AuthGuard],
    //   data: { permissionForHeader: 'catalog-coupon', root: 'catalog' }

    // },
    // {
    //   path: 'brand',
    //   loadChildren: () => import('./components/brand/brand.module').then(m => m.BrandModule),
    //   canActivate: [AuthGuard],
    //   data: { permissionForHeader: 'catalog-brand', root: 'catalog' }
    // },
    // {
    //   path: 'import',
    //   loadChildren: () => import('./components/import/import.module').then(m => m.ImportModule),
    //   canActivate: [AuthGuard],
    //   data: { permissionForHeader: 'catalog-import', root: 'catalog' }
    // },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
