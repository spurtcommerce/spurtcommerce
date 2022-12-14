/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class SitesettingsResponsemodel {
  public metaTagTitle: string;
  public metaTagDescription: string;
  public metaTagKeywords: string;

  constructor(Sitesettingresponse: any) {
    this.metaTagTitle = Sitesettingresponse.metaTagTitle || '';
    this.metaTagDescription = Sitesettingresponse.metaTagDescription || '';
    this.metaTagKeywords = Sitesettingresponse.metaTagKeyword || '';
  }
}
