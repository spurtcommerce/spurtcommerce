/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class UserlistForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: number;

  constructor(userlistForm: any) {
    this.limit = userlistForm.limit || '';
    this.offset = userlistForm.offset || '';
    this.keyword = userlistForm.keyword || '';
    this.count = userlistForm.count || '';
  }
}
