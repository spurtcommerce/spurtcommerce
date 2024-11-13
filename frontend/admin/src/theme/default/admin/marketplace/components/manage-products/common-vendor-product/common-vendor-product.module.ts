import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonVendorProductRoutingModule } from './common-vendor-product-routing.module';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { commonVendorProductsComponents } from '../../../../../../../../add-ons/add-ons.constant';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [...commonVendorProductsComponents],
  imports: [
    CommonModule,
    CommonVendorProductRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule
    .forChild(),
  ]
})
export class CommonVendorProductModule { }
