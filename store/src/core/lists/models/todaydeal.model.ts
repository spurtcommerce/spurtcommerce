/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class TodaydealModel {
  public limit: number;
  public offset: number;
  public keyword: string;
  public sku: string;
  public count: number;

  constructor(todayDeal: any) {
    this.limit = todayDeal.limit || 0;
    this.offset = todayDeal.offset || 0;
    this.keyword = todayDeal.keyword || '';
    this.sku = todayDeal.sku || '';
    this.count = todayDeal.count || 0;
  }
}
