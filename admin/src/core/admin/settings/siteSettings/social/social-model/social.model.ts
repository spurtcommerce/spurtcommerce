/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
