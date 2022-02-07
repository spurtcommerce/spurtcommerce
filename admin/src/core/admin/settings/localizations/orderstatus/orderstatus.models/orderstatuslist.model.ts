/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class OrderStatusListForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: boolean;
  public status: number;

  constructor(orderstatuslistForm: any) {
    this.limit = orderstatuslistForm.limit || 0;
    this.offset = orderstatuslistForm.offset || 0;
    this.keyword = orderstatuslistForm.keyword || '';
    this.count = false;
    this.status = orderstatuslistForm.status || '';
  }
}
