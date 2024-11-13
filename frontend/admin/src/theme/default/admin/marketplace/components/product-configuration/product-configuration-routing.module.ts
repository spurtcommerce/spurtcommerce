import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { BulkProductUploadComponent } from '../../../catalog/components/import/import-products/bulk-product-upload.component';
import { DataImportComponent } from '../../../catalog/components/import/data-import/data-import.component';
import { UploadFileComponent } from '../../../catalog/components/import/upload-file/upload-file.component';


const routes: Routes = [
  // <! ----------------------- categories --------------------------- !>
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'product-categories', root: 'marketplace-new' }

  },
 
  // Bulk Product Imports

  {
    path: 'import-products', component: BulkProductUploadComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Manage Imports', url: '' },
      { title: 'breadcrumbs.Bulk Products Mapping', url: '' }]
    }
  },
  // Bulk Product Mapping
  {
    path: 'data-import', component: DataImportComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Manage Imports', url: '' },
      { title: 'breadcrumbs.Bulk Import Mapping', url: '' }]
    }
  },
  {
    path: 'upload-file', component: UploadFileComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Manage Imports', url: '' },
      { title: 'breadcrumbs.Bulk Import Mapping', url: '' },
      { title: 'breadcrumbs.Upload File', url: '' }]
    }
  },
  {
    path: 'product_attribute',
    loadChildren: () => import('./attribute/attribute.module').then(m => m.AttributeModule)
  },
  {
    path: 'product_variant',
    loadChildren: () => import('./variant/variant.module').then(m => m.VariantModule)
  },

  {
    path: 'product-qr',
    loadChildren: () => import('./product-qr/product-qr.module').then(m => m.ProductQrModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'product-qr', root: 'marketplace-new' }
  },

];



// // attributes 
// routes.forEach(data => {
//   if (data) {
//     routes.push(marketplaceRouting.productAttributeRoutes[0]);
//   }
// });

// variant 
// routes.forEach(data => {
//   if (data) {
//     routes.push(marketplaceRouting.productVariantRoutes[0]);
//   }
// });

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductConfigurationRoutingModule { }
