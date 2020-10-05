/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class SocialResponseModel {
  public facebook: string;
  public twitter: string;
  public instagram: string;
  public google: string;

  constructor(socialresponse: any) {
    this.facebook = socialresponse.facebook || '';
    this.twitter = socialresponse.twitter || '';
    this.instagram = socialresponse.instagram || '';
    this.google = socialresponse.google || '';
  }
}
