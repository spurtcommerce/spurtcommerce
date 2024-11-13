/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// component 
import { LocalizationLayoutComponent } from './layout/layout.component';
// modules from third parties 
import { ComponentsModule } from '../../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../../admin.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
// custom modules 
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';


const Routers: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
  {
    path: '',
    component: LocalizationLayoutComponent,
    children: [
      {
        path: 'language',
        loadChildren: () => import('./languages/languages.module').then(m => m.LanguagesModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'list-language', root: 'settingsLocal' }
      },

      {
        path: 'order-status',
        loadChildren: () => import('./orderstatus/orderstatus.module').then(m => m.OrderStatusModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'list-order-status', root: 'settingsLocal' }
      },
      {
        path: 'countries',
        loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'list-country', root: 'settingsLocal' }
      },
      {
        path: 'zone',
        loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'list-zone', root: 'settingsLocal' }
      },
      {
        path: 'currency',
        loadChildren: () => import('./currencies/currency.module').then(m => m.CurrencyModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'list-currency', root: 'settingsLocal' }
      },
      {
        path: 'tax',
        loadChildren: () => import('./tax/tax.module').then(m => m.TaxModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'list-tax', root: 'settingsLocal' }
      }, 
    ]
  }
];
@NgModule({
  declarations: [LocalizationLayoutComponent],
  imports: [RouterModule.forChild(Routers), ComponentsModule, CommonModule, NgbModule, TranslateModule.forChild({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }), ],
  providers: [],
  exports: [RouterModule]
})
export class LocalizationModule { }
