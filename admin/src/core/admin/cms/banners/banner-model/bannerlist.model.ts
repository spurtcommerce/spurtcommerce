/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class BannerlistModel {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: any;
  public status: any;

  constructor(bannerlistForm: any) {
    this.limit = bannerlistForm.limit || 0;
    this.offset = bannerlistForm.offset || 0;
    if (bannerlistForm.count === 1 && bannerlistForm.status === 1) {
      this.count = bannerlistForm.count || 0;
      this.status = bannerlistForm.status || 0;
    }
    if (bannerlistForm.count === 1 && bannerlistForm.status === 0) {
      this.count = bannerlistForm.count || 0;
      this.status = bannerlistForm.status || 0;
    }
    if (bannerlistForm.count === 1 && !bannerlistForm.status) {
      this.count = bannerlistForm.count || 0;
    }
    this.keyword = bannerlistForm.keyword || '';
  }
}
