/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ProductRatingListModel {
  public limit: number;
  public offset: number;
  public productId: number;
  public count: string;

  constructor(fromProductRatingList: any) {
    this.limit = fromProductRatingList.limit || 0;
    this.offset = fromProductRatingList.offset || 0;
    this.productId = fromProductRatingList.productId || 0;
    this.count = fromProductRatingList.count || '';
  }
}
