/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class UpdateStockModel {
  public productId: number;
  public hasStock: string;
  public productStock: any;



  constructor(updateModel: any) {
    this.productId = updateModel.productId || '';
    this.hasStock = updateModel.hasStock || 0;
    this.productStock = updateModel.productStock || [];
  }
}
