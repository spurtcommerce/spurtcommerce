/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CurrencyNewForm {
  public title: string;
  public code: string;
  public symbolLeft: string;
  public symbolRight: string;
  public value: number;
  public status: number;
  public currencyId: number;

  constructor(currencyNewForm: any) {
    this.title = currencyNewForm.title || '';
    this.code = currencyNewForm.code || '';
    this.symbolLeft = currencyNewForm.symbolLeft || null;
    this.symbolRight = currencyNewForm.symbolRight || null;
    this.value = currencyNewForm.value || 0;
    this.status = currencyNewForm.status || 0;
    if (currencyNewForm.currencyId) {
      this.currencyId = currencyNewForm.currencyId || '';
    }
  }
}
