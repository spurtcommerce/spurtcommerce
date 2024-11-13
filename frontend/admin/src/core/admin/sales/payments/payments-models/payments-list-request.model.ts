/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class PaymentListRequestModel {
  public limit: number;
  public offset: number;
  public customerName: string;
  public startDate: string;
  public endDate: string;
  public paymentMethod: string;

  constructor(paymentListForm: any) {
    this.limit = paymentListForm.limit || 0;
    this.offset = paymentListForm.offset || 0;
    this.customerName = paymentListForm.customerName || '';
    this.startDate = paymentListForm.startDate || '';
    this.endDate = paymentListForm.endDate || '';
    this.paymentMethod = paymentListForm.paymentMethod || '';
  }
}
