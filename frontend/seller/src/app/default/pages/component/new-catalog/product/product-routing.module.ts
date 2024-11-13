import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ListComponent } from './list/list.component';
import { CategoriesComponent } from './add/categories/categories.component';
import { ProductDetailsComponent } from './add/product-details/product-details.component';
import { ProductSeoRoutes, SpecificationRoutes } from '../../../../../../../add-ons/add-ons.constant';
import { PricingSetupComponent } from './add/pricing-setup/pricing-setup.component';


const routes: any = [{
  path: '',
  component: LayoutComponent,
  children: [
     {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
      path: 'list',
      component: ListComponent,
      
      data: {
        title: 'Products',
        ActiveStatus:'products-list',
        urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/catalog/manage-products/' }, { title: 'breadcrumbs.ManageProducts', url: '/catalog/manage-products/list' }, { title: 'breadcrumbs.ProductList' }]
      }
    },

    {
      path: 'successfull',
      component: ListComponent,
      data: {
        title: 'Products',
        ActiveStatus:'successfull',
        urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/catalog/manage-products/' }, { title: 'breadcrumbs.ManageProducts', url: '/catalog/manage-products/list' }, { title: 'breadcrumbs.ProductList' }]
      }
    },

    {
      path: 'failed',
      component: ListComponent,
      data: {
        title: 'Products',
        ActiveStatus:'successfull',
        urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/catalog/manage-products/' }, { title: 'breadcrumbs.ManageProducts', url: '/catalog/manage-products/list' }, { title: 'breadcrumbs.ProductList' }]
      }
    },


    {
      path: 'categories',
      component: CategoriesComponent,
      data: {
        title: 'Products',
        ActiveStatus:'categories',
        urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/new-catalog/products/' }, { title: 'Products', url: '/new-catalog/products/list' }, { title: 'Categories' }]
      }
    },
    {
      path: 'categories/:id',
      component: CategoriesComponent,
      data: {
        title: 'Products',
        ActiveStatus:'categoriesedit',
        urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/new-catalog/products/' }, { title: 'Products', url: '/new-catalog/products/list' }, { title: 'Categories' }]
      }
    },

    {
      path: 'product-details',
      component: ProductDetailsComponent,
      data: {
        title: 'Products',
        ActiveStatus:'product-details',
        urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/new-catalog/products/' }, { title: 'Products', url: '/new-catalog/products/list' }, { title: 'Categories' }]
      }
    },

    {
      path: 'product-details/:id',
      component: ProductDetailsComponent,
      data: {
        title: 'Products',
        ActiveStatus:'product-details-edit',
        urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/new-catalog/products/' }, { title: 'Products', url: '/new-catalog/products/list' }, { title: 'Categories' }]
      }
    },

    ...SpecificationRoutes,
    ...ProductSeoRoutes,
    {
      path: 'pricing-setup',
      component: PricingSetupComponent,
      data: {
        title: 'Products',
        ActiveStatus:'pricing-setup',
        urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/new-catalog/products/' }, { title: 'Products', url: '/new-catalog/products/list' }, { title: 'Categories' }]
      }
    },

    {
      path: 'pricing-setup/:id',
      component: PricingSetupComponent,
      data: {
        title: 'Products',
        ActiveStatus:'pricing-setup-edit',
        urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/new-catalog/products/' }, { title: 'Products', url: '/new-catalog/products/list' }, { title: 'Categories' }]
      }
    },
    
    // {
    //   path: 'seo/:id',
    //   component: SeoComponent,
    //   data: {
    //     title: 'Products',
    //     ActiveStatus:'pricing-setup-edit',
    //     urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/new-catalog/products/' }, { title: 'Products', url: '/new-catalog/products/list' }, { title: 'Categories' }]
    //   }
    // },
    
    // {
    //   path: 'seo',
    //   component: SeoComponent,
    //   data: {
    //     title: 'Products',
    //     ActiveStatus:'pricing-setup-edit',
    //     urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/new-catalog/products/' }, { title: 'Products', url: '/new-catalog/products/list' }, { title: 'Categories' }]
    //   }
    // },
    
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
