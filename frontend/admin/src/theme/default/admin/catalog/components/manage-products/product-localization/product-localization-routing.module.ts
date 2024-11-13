import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductLocalizationListComponent } from './product-localization-list/product-localization-list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
import { ProductLocalizationAddComponent } from './product-localization-add/product-localization-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: ProductLocalizationListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-product-localization',
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },{ title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'Product Localization', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },
  {
    path: 'add', component: ProductLocalizationAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'create-product-localization',
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },{ title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'Product Localization', url: '' },
      { title: 'breadcrumbs.Add', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: ProductLocalizationAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'edit-product-localization',
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },{ title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'Product Localization', url: '' },
      { title: 'breadcrumbs.Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductLocalizationRoutingModule { }
