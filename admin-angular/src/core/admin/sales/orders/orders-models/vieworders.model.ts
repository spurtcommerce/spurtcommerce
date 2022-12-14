/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class ViewordersModel {
  public orderId: Number;
  public orderStatusId: string;


  constructor(Vieworders: any) {
    this.orderId = Vieworders.orderId || '';
    this.orderStatusId = Vieworders.orderStatusId || '';
  }
}
