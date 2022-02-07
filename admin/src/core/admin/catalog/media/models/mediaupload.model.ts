/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class MediauploadForm {
  public image: String;
  public path: string;

  constructor(mediaupload: any) {
    this.image = mediaupload.image || '';
    this.path = mediaupload.path || '';
  }
}
