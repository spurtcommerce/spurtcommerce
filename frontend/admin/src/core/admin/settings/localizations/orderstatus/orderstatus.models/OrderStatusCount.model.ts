/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class OrderStatusCountModel {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: string;

  constructor(orderstatuslistForm: any) {
    this.limit = orderstatuslistForm.limit || 0;
    this.offset = orderstatuslistForm.offset || 0;
    this.keyword = orderstatuslistForm.keyword || '';
    this.count = orderstatuslistForm.count || '';
  }
}
