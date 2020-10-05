/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class SocialForm {
  public facebook: string;
  public google: string;
  public twitter: string;
  public instagram: string;

  constructor(socialForm: any) {
    this.facebook = socialForm.facebook || '';
    this.google = socialForm.google || '';
    this.twitter = socialForm.twitter || '';
    this.instagram = socialForm.instagram || '';
  }
}
