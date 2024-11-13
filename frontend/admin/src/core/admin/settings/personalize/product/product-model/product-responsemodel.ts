/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class PersonalizeProductResponsemodel {
  public categoryProductCount: number;
  public itemsPerPage: number;
  public siteUrl: number;
  public settingsId:number;
  constructor(Sitesettingresponse: any) {
    this.categoryProductCount = Sitesettingresponse.categoryProductCount || 0;
    this.itemsPerPage = Sitesettingresponse.itemsPerPage || 0;
    this.siteUrl = Sitesettingresponse.siteUrl || 0;
    this.settingsId = Sitesettingresponse.settingsId || 0;
  }
}
