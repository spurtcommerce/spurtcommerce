import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencysymbol'
})
export class CurrencySymbolPipe implements PipeTransform {
  constructor() {}

  transform(value: number, objs:any,defaultSymbolPosition: string = 'left'): string {
    const obj: any = JSON.parse(localStorage.getItem('adminCurrency')) ?? {};
    const currencyCode = obj?.symbol ?? '₹';
    const symbolPosition = obj?.position ?? defaultSymbolPosition;
    // const currencyCode = '₨';
    if (value) {


    const formats = {
      '€': new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }),
      '₹': new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }),
      '$': new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      '₩': new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }),
      '¥': new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
      }),
      '₱': new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      }),
      'SGD': new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency: 'SGD',
      }),
      'Rs': new Intl.NumberFormat('ur-PK', { 
        style: 'currency',
        currency: 'PKR',
      }),
    };

    const formatter = formats[currencyCode] ?? formats['₹'];
    const parts = formatter.formatToParts(value);

    const symbolPart = parts.find((part) => part.type === 'currency');
    const symbol = symbolPart?.value ?? '';

    let result = '';
    if (symbolPosition === 'left') {
      result += symbol + ' ';
    }

    for (const part of parts) {
      if (part.type !== 'currency') {
        result += part.value;
      }
    }

    if (symbolPosition === 'right') {
      result += ' ' + symbol;
    }

    return result;
  }
  return '';
  }
}
