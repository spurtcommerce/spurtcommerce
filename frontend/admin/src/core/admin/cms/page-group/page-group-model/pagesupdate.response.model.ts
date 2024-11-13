/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class PagesupdateResponseModel {
  public pagesupdate: any = {};

  constructor(updateResponse: any) {
    this.pagesupdate = updateResponse || '';
  }
}
