/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CustomersGroupUpdate {
    public name: string;
    public description: string;
    public colorcode: string;
    public status: number;
    public id: number;

    constructor(customersGroupUpdate: any) {

      this.name = customersGroupUpdate.name || '';
      this.description = customersGroupUpdate.description || '';
      this.colorcode = customersGroupUpdate.colorcode || '';
      this.status = customersGroupUpdate.status;
      this.id = customersGroupUpdate.id || '';
    }
  }
