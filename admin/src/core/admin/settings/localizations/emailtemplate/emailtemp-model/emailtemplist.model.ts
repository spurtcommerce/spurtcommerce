/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class EmailTempListForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: number;

  constructor(emailtemplistForm: any) {
    this.limit = emailtemplistForm.limit || '';
    this.offset = emailtemplistForm.offset || '';
    this.keyword = emailtemplistForm.keyword || '';
    this.count = emailtemplistForm.count || '';
  }
}
