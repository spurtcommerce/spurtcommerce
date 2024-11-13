/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class ProductDeleteModel {
    public productId: number;

    constructor(productdeleteForm: any) {
      this.productId = productdeleteForm.productId || '';
    }
  }
