/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class LoginModel {
  public emailId: any;
  public password: any;
  public type: string;
  constructor(loginRequest: any) {
    this.emailId = loginRequest.email || '';
    this.password = loginRequest.password || '';
    this.type = loginRequest.type || '';
  }
}
