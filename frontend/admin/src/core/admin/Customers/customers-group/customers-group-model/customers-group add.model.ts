/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
      this.status = customersGroupAdd.status ||  '';
    }
  }
