/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class PagescountResponseModel {
  public pagescount: any = {};

  constructor(listResponse: any) {
    this.pagescount = listResponse || '';
  }
}
