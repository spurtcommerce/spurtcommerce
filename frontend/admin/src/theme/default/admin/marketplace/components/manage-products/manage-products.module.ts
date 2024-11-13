import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductsRoutingModule } from './manage-products.routing';
import { CategoriesSandbox } from '../../../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../../../core/admin/catalog/category/categories.service';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffect } from '../../../../../../core/admin/catalog/category/effects/categories.effect';
import { ApprovedProductsComponent } from './approved-products/approved-products.component';
import { WaitingProductsComponent } from './waiting-products/waiting-products.component';
import { RejectedProductsComponent } from './rejected-products/rejected-products.component';
import { RejectsModelComponent } from './rejects-model/rejects-model.component';
import { SellerProduct } from 'src/core/admin/vendor/manage-products/sellerProduct/sellerProduct.service';
import { SellerProductEffect } from 'src/core/admin/vendor/manage-products/sellerProduct/effect/sellerProduct.effect';
import { SellerProductSandox } from 'src/core/admin/vendor/manage-products/sellerProduct/sellerProduct.sandbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { VendorSharedModule } from '../../marketplace.module';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { SellerProductsComponent } from './product/seller-products/seller-products.component';
import { ComponentsModule } from '../../../shared/components';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductAddComponent } from './product/product-detail/add.component';
import { ProductService } from '../../../../../../../src/core/admin/catalog/product/product.service';
import { ProductSandbox } from '../../../../../../../src/core/admin/catalog/product/product.sandbox';
import { ProductEffect } from '../../../../../../../src/core/admin/catalog/product/product-effect/product.effect';
import { TaxSandbox } from '../../../../../../../src/core/admin/settings/localizations/tax/tax.sandbox';
import { TaxService } from '../../../../../../../src/core/admin/settings/localizations/tax/tax.service';
import { TaxEffect } from '../../../../../../../src/core/admin/settings/localizations/tax/tax-effect/tax.effects';


@NgModule({
  declarations: [
    RejectedProductsComponent,
    ApprovedProductsComponent,
    WaitingProductsComponent,
    RejectsModelComponent,
    SellerProductsComponent,
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    ManageProductsRoutingModule,
    EffectsModule.forFeature([CategoriesEffect,SellerProductEffect,ProductEffect,TaxEffect]),
    MatTooltipModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    VendorSharedModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ComponentsModule
  ],
  providers:[
    CategoriesSandbox,
    CategoriesService,
    SellerProduct,
    SellerProductSandox,
    ProductService,
    ProductSandbox,
    TaxSandbox,
    TaxService
  ]
})
export class ManageProductsModule { }
