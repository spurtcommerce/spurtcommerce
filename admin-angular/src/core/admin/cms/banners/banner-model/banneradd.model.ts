/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class BanneraddModel {
  public title: string;
  public content: string;
  public image: string;
  public link: string;
  public position: string;
  public status: number;

  constructor(bannerForm: any) {
    this.title = bannerForm.title || '';
    this.content = bannerForm.content || '';
    this.image = bannerForm.image || '';
    this.link = bannerForm.link || '';
    this.position = bannerForm.position || 0;
    this.status = bannerForm.active || 0;
  }
}
