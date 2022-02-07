/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../shared/components/index';
// component
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { ShareButtonModule } from '@ngx-share/button';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

export const routes = [
  {
    path: '',
    component: ProductsComponent,
    pathMatch: 'full',
    data: {
      urls: [{ title: 'All Products'}]
    }
  },
  {
    path: 'products',
    component: ProductsComponent,
    pathMatch: 'full',
    data: {
      urls: [{ title: 'All Products'}]
    }
  },
  {
    path: 'productdetails/:id',
    component: ProductComponent,
    pathMatch: 'full',
    data: {
      urls: [
        { title: 'Products', url: '/products' },
        { title: 'Product detail', url: '' }
      ]
    }
  }
];
const icons = [
  // ... other icons
  faFacebookSquare,
  faTwitter
];

library.add(...icons);

const shareProp = {
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    JwSocialButtonsModule,
    ShareButtonModule.withConfig({ prop: shareProp }),
    // ShareButtonModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    NgbModule
  ],
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductZoomComponent,
    ProductFilterComponent
  ],
  entryComponents: [ProductZoomComponent],
  providers: []
})
export class ProductsModule {}
