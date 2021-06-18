/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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
