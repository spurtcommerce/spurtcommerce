/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class RoleForm {
  public name: String;
  public status: String;
  public id: number;

  constructor(roleForm: any) {
    this.name = roleForm.name || '';
    this.status = roleForm.status;
    if (roleForm.groupId) {
      this.id = roleForm.groupId || '';
    }
  }
}
