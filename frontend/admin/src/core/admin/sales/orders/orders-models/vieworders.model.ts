/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
