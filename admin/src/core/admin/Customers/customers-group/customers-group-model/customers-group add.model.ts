/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CustomersGroupAdd {
    public name: string;
    public description: string;
    public colorcode: string;
    public status: number;

    constructor(customersGroupAdd: any) {

      this.name = customersGroupAdd.name || '';
      this.description = customersGroupAdd.description || '';
      this.colorcode = customersGroupAdd.colorcode || '';
      this.status = customersGroupAdd.status;
    }
  }
