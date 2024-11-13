/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { OnlyNumberDirectives } from './only-number-get.directive';

@NgModule({
  declarations: [OnlyNumberDirectives],
  exports: [OnlyNumberDirectives]
})
export class NumberAcceptgetModule {}
