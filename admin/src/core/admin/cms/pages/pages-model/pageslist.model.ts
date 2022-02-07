/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class PageslistModel {
  public limit: number;
  public offset: number;
  public keyword: string;

  constructor(PagesListForm: any) {
    this.limit = PagesListForm.limit || 0;
    this.offset = PagesListForm.offset || 0;
    this.keyword = PagesListForm.keyword || '';
  }
}
