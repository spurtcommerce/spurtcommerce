/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class OrderstatusForm {
  public name: String;
  public status: number;
  public id: number;
  public colorCode: string;

  constructor(OrderstatuForm: any) {
    this.name = OrderstatuForm.name || '';
    this.status = OrderstatuForm.status || 0;
    this.colorCode = OrderstatuForm.colorcode || '';
    if (OrderstatuForm.orderStatusId) {
      this.id = OrderstatuForm.orderStatusId || '';
    }
  }
}
