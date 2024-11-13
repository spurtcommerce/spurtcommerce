/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CurrencyNewResponse {
  public createdDate: string;
  public currencyId: string;
  public title: string;
  public code: string;
  public symbolLeft: string;
  public symbolRight: string;
  public value: string;
  public isActive: string;

  constructor(currencyNewResponse: any) {
    this.createdDate = currencyNewResponse.createdDate || '';
    this.currencyId = currencyNewResponse.currencyId || '';
    this.title = currencyNewResponse.title || '';
    this.code = currencyNewResponse.code || '';
    this.symbolLeft = currencyNewResponse.symbolLeft || '';
    this.symbolRight = currencyNewResponse.symbolRight || '';
    this.value = currencyNewResponse.value || '';
    this.isActive = currencyNewResponse.isActive || '';
  }
}
