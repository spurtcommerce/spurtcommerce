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
import { PagesAddComponent } from './add/add.component';
import { PageListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
import { PagesLocalizationListComponent } from './localization-list/localization-list.component';
import { PagesLocalizationAddComponent } from './localization-add/localization-add.component';

const pagesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: PageListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-pages',
      urls: [{ title: 'breadcrumbs.CMS', url: '' },{ title: 'CMS.ManageContent.Manage Pages', url: '' },
      { title: 'breadcrumbs.Pages', url: '' },{ title: 'breadcrumbs.List', url: '' }]
    }
  },
  {
    path: 'add', component: PagesAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'create-pages',
      urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-content/pages/list' },{ title: 'CMS.ManageContent.Manage Pages', url: '/cms/manage-content/pages/list' },
      { title: 'breadcrumbs.Pages', url: '/cms/manage-content/pages/list' },{ title: 'breadcrumbs.Add', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: PagesAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'edit-pages',
      urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-content/pages/list' },{ title: 'CMS.ManageContent.Manage Pages', url: '/cms/manage-content/pages/list' },
      { title: 'breadcrumbs.Pages ', url: '/cms/manage-content/pages/list' },{ title: 'breadcrumbs.Update', url: '' }]
    }
  },
  // < !----------------------------------------------- LOCALIZATION ROUTES -------------------------------------------- !>
  {
    path: 'list-localization', component: PagesLocalizationListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-pages',
      urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-content/pages/list' }, { title: 'CMS.ManageContent.Manage Pages', url: '/cms/manage-content/pages/list' },
      { title: 'breadcrumbs.Pages', url: '/cms/manage-content/pages/list' }, { title: 'CMS.Pages.Localization', url: '' },{ title: 'breadcrumbs.List', url: '' }
      ]
    }
  },

  {
    path: 'edit-localization/:id',
    component: PagesLocalizationAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'edit-pages',
      urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-content/pages/list' }, { title: 'CMS.ManageContent.Manage Pages', url: '/cms/manage-content/pages/list' },
      { title: 'breadcrumbs.Pages', url: '/cms/manage-content/pages/list' }, { title: 'CMS.Pages.Localization', url: '/cms/manage-content/pages/list-localization' },
      { title: 'breadcrumbs.Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
