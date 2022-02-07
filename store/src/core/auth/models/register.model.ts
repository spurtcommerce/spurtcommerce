/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class RegisterModel {
  public name: any;
  public password: any;
  public confirmPassword: any;
  public emailId: any;
  public phoneNumber: any;

  constructor(registerRequest: any) {
    this.name = registerRequest.name || '';
    this.password = registerRequest.password || '';
    this.confirmPassword = registerRequest.confirmPassword || '';
    this.emailId = registerRequest.email || '';
    this.phoneNumber = registerRequest.phoneNumber || '';
  }
}
