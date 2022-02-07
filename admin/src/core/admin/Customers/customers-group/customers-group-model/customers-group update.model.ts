/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
