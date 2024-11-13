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
import { CategoryAddComponent } from './add/add.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
import { CategoryLocalizationListComponent } from './localization-list/localization-list.component';
import { CategoryLocalizationAddComponent } from './localization-add/localization-add.component';
import { combineArrays, hasTrueValue, permissionConfigs } from 'src/theme/default/admin/shared/components/services/permission.constant';
const categoriesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: CategoriesListComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'list-category',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.ProductConfiguration', url: '' },
      { title: 'breadcrumbs.ProductCategories', url: '' },{ title: 'breadcrumbs.List', url: '' }]
    }
  },

  {
    path: 'add', component: CategoryAddComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'create-category',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/product-config/categories/list' }, { title: 'breadcrumbs.ProductConfiguration', url: '/vendors/product-config/categories/list' },
        { title: 'breadcrumbs.ProductCategories', url: '/vendors/product-config/categories/list' },{ title: 'breadcrumbs.Add', url: '' }]
    }
  },
  {
    path: 'edit/:id', component: CategoryAddComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'edit-category',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/product-config/categories/list' }, { title: 'breadcrumbs.ProductConfiguration', url: '/vendors/product-config/categories/list' },
        { title: 'breadcrumbs.ProductCategories', url: '/vendors/product-config/categories/list' },{ title: 'breadcrumbs.Update', url: '' }]
    }
  },
  {
    path: 'localization', component: CategoryLocalizationListComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'list-category-localization',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/product-config/categories/list' }, { title: 'breadcrumbs.ProductConfiguration', url: '/vendors/product-config/categories/list' },
        { title: 'breadcrumbs.ProductCategories', url: '/vendors/product-config/categories/list' },
      { title: 'breadcrumbs.Localization', url: '' },{ title: 'breadcrumbs.List', url: '' }]
    }
  },
  {
    path: 'addLocalization', component: CategoryLocalizationAddComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'add-category-localization',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/product-config/categories/list' }, { title: 'breadcrumbs.ProductConfiguration', url: '/vendors/product-config/categories/list' },
        { title: 'breadcrumbs.ProductCategories', url: '/vendors/product-config/categories/list' },
      { title: 'breadcrumbs.Localization', url: '/vendors/product-config/categories/localization' },{ title: 'breadcrumbs.Add', url: '' },]
    }
  },
  {
    path: 'editLocalization/:id', component: CategoryLocalizationAddComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'edit-category-localization',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/product-config/categories/list' }, { title: 'breadcrumbs.ProductConfiguration', url: '/vendors/product-config/categories/list' },
        { title: 'breadcrumbs.ProductCategories', url: '/vendors/product-config/categories/list' }, { title: 'breadcrumbs.Localization', url: '/vendors/product-config/categories/localization' },{ title: 'breadcrumbs.Update', url: '' }]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoriesRoutes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    
    {
      permission: 'list',
      isRouteAccess:combineArrays(permissionConfigs['list-category']),
      routePath: 'list',
    },

  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect].routePath;
}
