/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class SocialResponseModel {
  public facebook: string;
  public twitter: string;
  public instagram: string;
  public google: string;
  public settingsId: number;
  public siteUrl: number;
  constructor(socialresponse: any) {
    this.facebook = socialresponse.facebook || '';
    this.twitter = socialresponse.twitter || '';
    this.instagram = socialresponse.instagram || '';
    this.google = socialresponse.google || '';
    this.settingsId = socialresponse.settingsId || 0;
    this.siteUrl = socialresponse.siteUrl || 0;
  }
}
