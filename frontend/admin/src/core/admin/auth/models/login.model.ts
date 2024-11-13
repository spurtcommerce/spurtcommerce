/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
