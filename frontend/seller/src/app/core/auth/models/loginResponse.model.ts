/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class LoginResponseModel {
  public user_token: any;

  constructor(loginResponse: any) {
    this.user_token = loginResponse.data || '';
  }
}
