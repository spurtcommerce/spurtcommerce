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
import { LocalizationLayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../../admin.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';


const Routers: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
  {
    path: '',
    component: LocalizationLayoutComponent,
    children: [
      {
        path: 'stock-status',
        loadChildren: () => import('./stockstatus/stockstatus.module').then(m => m.StockStatusModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'list-stock-status', root: 'settingsLocal' }
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
