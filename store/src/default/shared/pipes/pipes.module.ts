/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterBrandsPipe } from './filter-brands.pipe';
import { BrandSearchPipe } from './brand-search.pipe';
import { CurrencySymbolPipe } from './currency-symbol.pipe';


@NgModule({
  imports: [CommonModule],
  declarations: [
    FilterByIdPipe,
    FilterBrandsPipe,
    BrandSearchPipe,
    CurrencySymbolPipe

  ],
  exports: [
    FilterByIdPipe,
    FilterBrandsPipe,
    BrandSearchPipe,
    CurrencySymbolPipe

  ]
})
export class PipesModule {}
