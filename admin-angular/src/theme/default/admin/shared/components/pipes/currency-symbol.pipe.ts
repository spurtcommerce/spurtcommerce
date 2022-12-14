/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencysymbol' })
export class CurrencySymbolPipe implements PipeTransform {
  currentSymbol: any;
  constructor() {
  }
  transform(value: string, obj: any): string {
    this.currentSymbol = obj;
    if (this.currentSymbol) {
      if (this.currentSymbol.position === 'right') {
        return Number((+value).toFixed(1)).toLocaleString() + ' ' + this.currentSymbol.symbol;
      } else if (this.currentSymbol.position === 'left') {
        return this.currentSymbol.symbol + ' ' + Number((+value).toFixed(1)).toLocaleString();
      } else {
        return Number((+value).toFixed(1)).toLocaleString();
      }
    } else {
      return Number((+value).toFixed(1)).toLocaleString();
    }
  }
}
