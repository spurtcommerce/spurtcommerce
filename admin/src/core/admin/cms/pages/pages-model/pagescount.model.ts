/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class PagescountModel {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: number;

  constructor(PagesCountForm: any) {
    this.limit = PagesCountForm.limit || 0;
    this.offset = PagesCountForm.offset || 0;
    this.keyword = PagesCountForm.keyword || '';
    this.count = PagesCountForm.count || 0;
  }
}
