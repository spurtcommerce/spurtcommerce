/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CurrencyListForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public sortOrder: string;
  public count: number;
  public status: number;

  constructor(currencylistForm: any) {
    this.limit = currencylistForm.limit || 0;
    this.offset = currencylistForm.offset || 0;
    this.keyword = currencylistForm.keyword || '';
    this.count = currencylistForm.count || 0;
    this.status = currencylistForm.status || '';
  }
}
