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
import { ProductListComponent } from './list/list.component';
import { ProductAddComponent } from './add/add.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { QuestionComponent } from './question/question.component';


const productRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: ProductListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-product',
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Products', url: '' },
      { title: 'List', url: '' }]
    }
  },
  {
    path: 'add', component: ProductAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'create-product',
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Products', url: '' },
      { title: 'Add', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: ProductAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'edit-product',
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Products', url: '' },
      { title: 'Update', url: '' }]
    }
  },
  {
    path: 'question', component: QuestionComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Products', url: '' },
      { title: 'Questions', url: '' }]
    }
  },
  {
    path: 'question/:id', component: QuestionComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'product-question-list',
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Products', url: '' },
      { title: 'Questions', url: '' }]
    }
  },


];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
