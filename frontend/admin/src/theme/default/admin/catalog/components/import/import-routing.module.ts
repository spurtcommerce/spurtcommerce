/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { BulkProductUploadComponent } from './import-products/bulk-product-upload.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { DataImportComponent } from './data-import/data-import.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FieldMappingComponent } from './field-mapping/field-mapping.component';
import { ReviewDataComponent } from './review-data/review-data.component';
import { FinishDataComponent } from './finish-data/finish-data.component';


const couponRoutes: Routes = [
  { path: '', redirectTo: 'import-products', pathMatch: 'full' },
  {
    path: 'import-products', component: BulkProductUploadComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Manage Imports', url: '' },
      { title: 'breadcrumbs.Bulk Products Mapping', url: '' }]
    }
  },
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
      {  title: 'breadcrumbs.Bulk Import Mapping', url: '' },
      { title: 'breadcrumbs.Upload File', url: '' }]
    }
  },
  // {
  //   path: 'field-mapping', component: FieldMappingComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     urls: [{ title: 'breadcrumbs.Catalog', url: '' },
  //     { title: 'breadcrumbs.Manage Imports', url: '' },
  //     { title: 'Bulk Import Mapping', url: '' }]
  //   }
  // },
  // {
  //   path: 'review-data', component: ReviewDataComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     urls: [{ title: 'breadcrumbs.Catalog', url: '' },
  //     { title: 'breadcrumbs.Manage Imports', url: '' },
  //     { title: 'Bulk Import Mapping', url: '' }]
  //   }
  // },  
  // {
  //   path: 'finish-data', component: FinishDataComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     urls: [{ title: 'breadcrumbs.Catalog', url: '' },
  //     { title: 'breadcrumbs.Manage Imports', url: '' },
  //     { title: 'Bulk Import Mapping', url: '' }]
  //   }
  // },

];





@NgModule({
  imports: [RouterModule.forChild(couponRoutes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
