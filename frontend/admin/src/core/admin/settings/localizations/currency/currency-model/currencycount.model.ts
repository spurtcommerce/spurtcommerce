/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CurrencyCountForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: number;
  public status: number;

  constructor(currencyCountForm: any) {
    this.limit = currencyCountForm.limit || 0;
    this.offset = currencyCountForm.offset || 0;
    this.keyword = currencyCountForm.keyword || '';
    this.count = currencyCountForm.count || 0;
    this.status = currencyCountForm.status || '';
  }
}
