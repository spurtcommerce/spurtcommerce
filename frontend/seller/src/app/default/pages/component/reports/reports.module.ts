import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SalesReportListComponent } from './sales-report-list/sales-report-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffect } from '../../../../core/order/order-effects/order.effects';
import { ProductEffect } from '../../../../core/product/product-effects/product.effects';
import { OrderSandbox } from '../../../../core/order/order.sandbox';
import { OrderService } from '../../../../core/order/order.service';
import { ProductSandbox } from '../../../../core/product/product.sandbox';
import { ProductService } from '../../../../core/product/product.service';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './layout/layout.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'sales-report-list', pathMatch: 'full' },
      {
        path: 'sales-report-list',
        component: SalesReportListComponent,
        data: {
          title: 'sales-report-list',
          urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Reports', url: '/reports/sales-report-list' }]
        }
      },
    ]
  }

  // {
  //  path: '', redirectTo:"sales-report-list" ,pathMatch:"full",

  // },
  // {
  //   path:"sales-report-list",
  //   component: SalesReportListComponent,
  // }
]

@NgModule({
  declarations: [
    SalesReportListComponent,
    LayoutComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([OrderEffect, ProductEffect]),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    NgbModule
  ],
  providers: [
    OrderSandbox,
    OrderService,
    ProductSandbox,
    ProductService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // This sets the locale to British, which uses dd/MM/yyyy format
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ReportsModule { }
