/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CatlistForm {
    public limit: number;
    public offset: number;
    public count: number;
    public vendorId: number;
    constructor(catlistForm: any) {
      this.limit = catlistForm.limit || '';
      this.offset = catlistForm.offset || '';
      this.count = catlistForm.count || '';
      this.vendorId = catlistForm.vendorId || '';
    }
  }
