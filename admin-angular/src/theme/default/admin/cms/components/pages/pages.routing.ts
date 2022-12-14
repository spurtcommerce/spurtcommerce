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
import { PagesAddComponent } from './add/add.component';
import { PageListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const pagesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: PageListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-pages',
      urls: [{ title: 'CMS', url: '' },
      { title: 'Pages', url: '' },
      { title: 'List', url: '' }]
    }
  },
  {
    path: 'add', component: PagesAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'create-pages',
      urls: [{ title: 'CMS', url: '' },
      { title: 'Pages', url: '' },
      { title: 'Add', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: PagesAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'edit-pages',
      urls: [{ title: 'CMS', url: '' },
      { title: 'Pages', url: '' },
      { title: 'Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
