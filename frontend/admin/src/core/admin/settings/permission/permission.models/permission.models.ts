/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class PermissionForm {
  public refType: number;
  public permission: String;
  public refId: number;

  constructor(permissionForm: any) {
    this.refType = permissionForm.refType || '';
    this.permission = permissionForm.permission;
      this.refId = permissionForm.refId || '';
  }
}
