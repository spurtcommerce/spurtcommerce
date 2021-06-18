/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class UpdateCustomersGroup {
    public name: string;
    public description: string;
    public colorcode: string;
    public status: number;
    public id: number;

    constructor(updateCustomersGroup: any) {

      this.name = updateCustomersGroup.name || '';
      this.description = updateCustomersGroup.description || '';
      this.colorcode = updateCustomersGroup.colorcode || '';
      this.status = updateCustomersGroup.status;
      this.id = updateCustomersGroup.id || '';
    }
  }
