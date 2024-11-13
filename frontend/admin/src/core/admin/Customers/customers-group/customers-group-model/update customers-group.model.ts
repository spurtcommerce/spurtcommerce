/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
      this.status = updateCustomersGroup.status || '';
      this.id = updateCustomersGroup.id || '';
    }
  }
