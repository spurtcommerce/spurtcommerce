/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class LogoutResponseModel {
  public user: any = {};

  constructor(logoutFormResponse: any) {
    this.user = logoutFormResponse || '';
  }
}
