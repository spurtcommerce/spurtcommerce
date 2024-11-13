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
import { PageGroupAddComponent } from './add/add.component';
import { PageGroupListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
import { PageGroupLocalizationListComponent } from './localization-list/localization-list.component';
import { PageGroupLocalizationAddComponent } from './localization-add/localization-add.component';

const pagesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: PageGroupListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'page-group-list',
      urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'CMS.ManageContent.Manage Pages', url: '' },
      { title: 'breadcrumbs.Page Group', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },
  {
    path: 'add', component: PageGroupAddComponent, canActivate: [AuthGuard],
    data: {
      permission: 'add-page-group', urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-content/page-group/list' }, { title: 'CMS.ManageContent.Manage Pages', url: '/cms/manage-content/page-group/list' },
      { title: 'breadcrumbs.Page Group', url: '/cms/manage-content/page-group/list' },
      { title: 'breadcrumbs.Add', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: PageGroupAddComponent, canActivate: [AuthGuard],
    data: {
      permission: 'Edit-page-group', urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-content/page-group/list' }, { title: 'CMS.ManageContent.Manage Pages', url: '/cms/manage-content/page-group/list' },
      { title: 'breadcrumbs.Page Group', url: '/cms/manage-content/page-group/list' },
      { title: 'breadcrumbs.Update', url: '' }]
    }
  },

  // < !--------------------------------------- Localization Routes ----------------------------------------------------! >
  {
    path: 'list-localization', component: PageGroupLocalizationListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'page-group-list',
      urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-content/page-group/list' }, { title: 'CMS.ManageContent.Manage Pages', url: '/cms/manage-content/page-group/list' },
      { title: 'breadcrumbs.Page Group', url: '/cms/manage-content/page-group/list' },
      { title: 'CMS.Pages.Localization', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },
  {
    path: 'edit-localization/:id',
    component: PageGroupLocalizationAddComponent, canActivate: [AuthGuard],
    data: {
      permission: 'Edit-page-group', urls: [{ title: 'breadcrumbs.CMS', url: '/cms/manage-content/page-group/list' }, { title: 'CMS.ManageContent.Manage Pages', url: '/cms/manage-content/page-group/list' },
      { title: 'breadcrumbs.Page Group', url: '/cms/manage-content/page-group/list' },
      { title: 'CMS.Pages.Localization', url: '/cms/manage-content/page-group/list-localization' },
      { title: 'breadcrumbs.Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PageGroupRoutingModule { }
