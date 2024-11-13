/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class RegisterModel {
  companyName: String;
   firstName: String;
   password: String;
   industryId: String;
   emailId: String;
   otp: Number;
   tsc:string;

  constructor(registerRequest: any) {
    this.companyName = registerRequest.companyName || '';
    this.firstName = registerRequest.firstName || '';
    this.password = registerRequest.password || '';
    this.industryId = registerRequest.industryId || '';
    this.emailId = registerRequest.emailId || '';
    this.otp = registerRequest.otp || '';
    this.tsc = registerRequest.tsc || '';
  }
}
