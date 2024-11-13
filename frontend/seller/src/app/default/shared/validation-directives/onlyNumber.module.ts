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
import { AlphabetOnlyDirective, OnlyNumberDirective,NoSpecialCharsDirective } from './only-number.directive';
import { NoNegativeAndZeroDirective } from './no-negative-and-zero.directive';
import { NoSpecialCharDirective } from './no-special-char.directive';

@NgModule({
  declarations: [OnlyNumberDirective, AlphabetOnlyDirective,NoSpecialCharsDirective,NoNegativeAndZeroDirective,NoSpecialCharDirective],
  exports: [OnlyNumberDirective, AlphabetOnlyDirective,NoSpecialCharsDirective,NoNegativeAndZeroDirective,NoSpecialCharDirective]
})
export class NumberAcceptModule {}
