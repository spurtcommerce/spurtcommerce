/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class CategorycountForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public sortOrder: string;
  public count: string;

  constructor(categorycountForm: any) {
    this.limit = categorycountForm.limit || '';
    this.offset = categorycountForm.offset || '';
    this.keyword = categorycountForm.keyword || '';
    this.sortOrder = categorycountForm.sortOrder || '';
    this.count = categorycountForm.count || '';
  }
}
