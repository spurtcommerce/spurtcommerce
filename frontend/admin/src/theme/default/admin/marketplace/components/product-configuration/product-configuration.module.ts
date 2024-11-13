import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductConfigurationRoutingModule } from './product-configuration-routing.module';
import { CategoriesService } from '../../../../../../core/admin/catalog/category/categories.service';
import { CategoriesSandbox } from '../../../../../../core/admin/catalog/category/categories.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffect } from '../../../../../../core/admin/catalog/category/effects/categories.effect';
import { LayoutsSandbox } from '../../../../../../core/admin/catalog/layout/layout.sandbox';
import { LayoutsService } from '../../../../../../core/admin/layout/layout.service';
import { LayoutEffect } from '../../../../../../core/admin/layout/effects/layout.effects';
import { LanguagesSandbox } from '../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { LanguagesService } from '../../../../../../core/admin/settings/localizations/languages/languages.service';
import { LanguagesEffect } from '../../../../../../core/admin/settings/localizations/languages/languages-effect/languages.effect';
import { ImportEffects } from 'src/core/admin/catalog/import/effects/import.effect';
import { ImportService } from 'src/core/admin/catalog/import/import.service';
import { ImportSandbox } from 'src/core/admin/catalog/import/import.sandbox';
import { UserEffect } from 'src/core/admin/settings/user/user-effect/user.effect';
import { UserSandbox } from 'src/core/admin/settings/user/user.sandbox';
import { UserService } from 'src/core/admin/settings/user/user.service';
import { OrdersEffects } from 'src/core/admin/sales/orders/orders-effects/orders.effects';
import { OrdersService } from 'src/core/admin/sales/orders/orders.service';
import { OrdersSandbox } from 'src/core/admin/sales/orders/orders-sandbox';
import { ProductEffect } from 'src/core/admin/catalog/product/product-effect/product.effect';
import { ProductService } from 'src/core/admin/catalog/product/product.service';
import { ProductSandbox } from 'src/core/admin/catalog/product/product.sandbox';
import { ArchivePaymentEffects } from 'src/core/admin/sales/archive-payments/effects/archive-payments.effects';
import { ArchivePaymentSandbox } from 'src/core/admin/sales/archive-payments/archive-payments.sandbox';
import { ArchivePaymentService } from 'src/core/admin/sales/archive-payments/archive-payments.service';
import { CustomersApiClientService } from 'src/core/admin/Customers/customers/customer.ApiClient.service';
import { CustomerSandbox } from 'src/core/admin/Customers/customers/customer.sandbox';
import { Customereffects } from 'src/core/admin/Customers/customers/customer-effects/customer.effects';


@NgModule({
  declarations: [
   
 
  ],

  imports: [
    CommonModule,
    ProductConfigurationRoutingModule,
    EffectsModule.forFeature([
      CategoriesEffect,
      LayoutEffect,
      LanguagesEffect,
      ImportEffects,
      UserEffect, 
      OrdersEffects, 
      ProductEffect, 
      ArchivePaymentEffects, 
      Customereffects
    ])
  ],
  providers: [
    CategoriesService,
    CategoriesSandbox,
    LayoutsSandbox,
    LayoutsService,
    LanguagesSandbox,
    LanguagesService,
    ImportService,
    ImportSandbox,
    UserSandbox,
    UserService,
    OrdersService,
    OrdersSandbox,
    ProductService,
    ProductSandbox,
    ArchivePaymentSandbox,
    ArchivePaymentService,
    CustomersApiClientService,
    CustomerSandbox
  ]
})
export class ProductConfigurationModule { }
