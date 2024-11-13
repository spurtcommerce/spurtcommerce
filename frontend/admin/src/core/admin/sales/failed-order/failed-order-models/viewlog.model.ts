/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class ViewLogModel {
    public orderId: Number;
    public orderStatusId: string;
    public createdDate: string;

    constructor(ViewLog: any) {
      this.orderId = ViewLog.orderId || '';
      this.orderStatusId = ViewLog.orderStatusId || '';
      this.createdDate = ViewLog.createdDate || '';
    }
  }
