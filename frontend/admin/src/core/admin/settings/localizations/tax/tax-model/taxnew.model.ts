/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class TaxNewForm {
  public taxName: string;
  public taxPercentage: number;
  public taxStatus: number;
  public taxId: number;

  constructor(taxNewForm: any) {
    this.taxName = taxNewForm.title || '';
    this.taxPercentage = taxNewForm.value || 0;
    this.taxStatus = taxNewForm.status || 0;
    if (taxNewForm.taxId) {
      this.taxId = taxNewForm.taxId || '';
    }
  }
}
