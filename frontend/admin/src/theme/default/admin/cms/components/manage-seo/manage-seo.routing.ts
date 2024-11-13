import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';

const manageSeoRoutes: Routes = [
  {
    path: '',
     redirectTo :'product' , pathMatch:'full'
   
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'settings-site-seo', root: 'settings' }
  },

  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'settings-site-seo', root: 'settings' }
  },
  {
    path: 'page',
    loadChildren: () => import('./page/page.module').then(m => m.PageModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'settings-site-seo', root: 'settings' }
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'settings-site-seo', root: 'settings' }
  },
  {
    path: 'sitemap',
    loadChildren: () => import('./site-map/site-map.module').then(m => m.SiteMapModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'settings-site-seo', root: 'settings' }
  },
];


@NgModule({
  imports: [RouterModule.forChild(manageSeoRoutes)],
  exports: [RouterModule]
})
export class ManageSeoRoutingModule { }
