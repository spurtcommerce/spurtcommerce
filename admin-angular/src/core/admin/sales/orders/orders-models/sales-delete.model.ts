/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class SalesDeleteModel {
  public orderId: number;

  constructor(salesdeleteForm: any) {
    this.orderId = salesdeleteForm.orderId || '';
  }
}
