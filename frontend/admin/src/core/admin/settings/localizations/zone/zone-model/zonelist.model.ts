/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ZonelistForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: boolean;
  public status: number;

  constructor(zonelistForm: any) {
    this.limit = zonelistForm.limit || 0;
    this.offset = zonelistForm.offset || 0;
    this.keyword = zonelistForm.keyword || '';
    this.count = zonelistForm.count || false;
    this.status = zonelistForm.status || '';
  }
}
