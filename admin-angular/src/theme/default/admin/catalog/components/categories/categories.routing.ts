/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { CategoryAddComponent } from './add/add.component';
import { CategoriesListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const categoriesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: CategoriesListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-category',
      urls: [{ title: 'Catalog', url: '' }, { title: 'Categories', url: '' }, { title: 'List', url: '' }]
    }
  },
  {
    path: 'add', component: CategoryAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'create-category',
      urls: [{ title: 'Catalog', url: '' }, { title: 'Categories', url: '' }, { title: 'Add', url: '' }]
    }
  },
  {
    path: 'edit/:id', component: CategoryAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'edit-category',
      urls: [{ title: 'Catalog', url: '' }, { title: 'Categories', url: '' }, { title: 'Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(categoriesRoutes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
