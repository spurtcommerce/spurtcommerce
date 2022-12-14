/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class LoginForm {
  // Declare Default Params

  public username: String;
  public password: String;
  constructor(loginForm: any) {
    this.username = loginForm.userName || '';
    this.password = loginForm.password || '';
  }
}
