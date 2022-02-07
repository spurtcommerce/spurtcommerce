/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBrands'
})
export class FilterBrandsPipe implements PipeTransform {
    // filter brand
    transform(brands: Array<any>, firstLetter?) {
        if (firstLetter === 'all') {
            return brands;
        } else {
            return brands.filter(brand => brand.name.charAt(0) === firstLetter.toLowerCase());
        }
    }
}
