/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class SitesettingsResponsemodel {
  public metaTagTitle: string;
  public metaTagDescription: string;
  public metaTagKeywords: string;
  public settingsId:number;
  public siteUrl:number;

  constructor(Sitesettingresponse: any) {
    this.metaTagTitle = Sitesettingresponse.metaTagTitle || '';
    this.metaTagDescription = Sitesettingresponse.metaTagDescription || '';
    this.metaTagKeywords = Sitesettingresponse.metaTagKeyword || '';
    this.settingsId = Sitesettingresponse.settingsId || 0;
    this.siteUrl = Sitesettingresponse.siteUrl || 0;
  }
}
