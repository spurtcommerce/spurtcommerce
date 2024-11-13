/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class BannerupdateModel {
  public title: string;
  public content: string;
  public image: string;
  public link: string;
  public position: string;
  public bannerId: number;
  public status: number;

  constructor(bannerupdate: any) {
    this.title = bannerupdate.title || '';
    this.content = bannerupdate.content || '';
    this.image = bannerupdate.image || '';
    this.link = bannerupdate.link || '';
    this.position = bannerupdate.position || 0;
    if (bannerupdate.bannerId) {
      this.bannerId = bannerupdate.bannerId || '';
    }
    this.status = bannerupdate.active || 0;
  }
}
