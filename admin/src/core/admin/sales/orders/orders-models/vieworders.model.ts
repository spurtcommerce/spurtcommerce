/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

export class ViewordersModel {
  public orderId: Number;

  constructor(Vieworders: any) {
    this.orderId = Vieworders.orderId || '';
  }
}
