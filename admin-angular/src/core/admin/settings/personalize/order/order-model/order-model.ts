/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class OrderModel {
  public invoicePrefix: string;
  public orderStatus: number;

  constructor(generalsettingForm: any) {
    this.invoicePrefix = generalsettingForm.invoicePrefix || '';
    this.orderStatus = generalsettingForm.orderStatus || 0;
  }
}
