/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class TaxNewResponse {
  public taxId: string;
  public title: string;
  public value: string;
  public isActive: string;

  constructor(taxNewResponse: any) {
    this.taxId = taxNewResponse.taxId || '';
    this.title = taxNewResponse.taxName || '';
    this.value = taxNewResponse.taxPercentage || '';
    this.isActive = taxNewResponse.isActive || '';
  }
}
