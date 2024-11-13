/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class SocialForm {
  public facebook: string;
  public google: string;
  public twitter: string;
  public instagram: string;
  public settingId:number;
  public siteUrl:number;

  constructor(socialForm: any) {
    this.facebook = socialForm.facebook || '';
    this.google = socialForm.google || '';
    this.twitter = socialForm.twitter || '';
    this.instagram = socialForm.instagram || '';
    this.settingId = socialForm.settingId || 0;
    this.siteUrl = socialForm.siteUrl || 0;
  }
}
