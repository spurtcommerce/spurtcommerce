/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class UserlistForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: number;

  constructor(userlistForm: any) {
    this.limit = userlistForm.limit || 0;
    this.offset = userlistForm.offset || 0;
    this.keyword = userlistForm.keyword || '';
    this.count = userlistForm.count || 0;
  }
}
