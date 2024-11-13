/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class SalesDeleteModel {
  public orderId: number;

  constructor(salesdeleteForm: any) {
    this.orderId = salesdeleteForm.orderId || '';
  }
}
