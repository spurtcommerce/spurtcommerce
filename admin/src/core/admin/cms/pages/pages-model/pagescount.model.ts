/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
