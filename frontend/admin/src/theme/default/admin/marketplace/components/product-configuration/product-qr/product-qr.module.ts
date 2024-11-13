import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductQrRoutingModule } from './product-qr-routing.module';
import { productQrComponents } from '../../../../../../../../add-ons/add-ons.constant';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../../../../add-ons/shared/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    ...productQrComponents
  ],
  imports: [
    CommonModule,
    ProductQrRoutingModule,
    FormsModule,
    SharedModule, 
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },

    }),
  ]
})
export class ProductQrModule { }
