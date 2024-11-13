/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class TaxCountForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: number;

  constructor(taxCountForm: any) {
    this.limit = taxCountForm.limit || 0;
    this.offset = taxCountForm.offset || 0;
    this.keyword = taxCountForm.keyword || '';
    this.count = taxCountForm.count || 0;
  }
}
