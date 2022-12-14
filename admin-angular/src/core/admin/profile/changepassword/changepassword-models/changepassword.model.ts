/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ChangePasswordForm {
  public oldPassword: String;
  public newPassword: String;

  constructor(changePasswordForm: any) {
    this.oldPassword = changePasswordForm.oldpsw || '';
    this.newPassword = changePasswordForm.newpsw || '';
  }
}
