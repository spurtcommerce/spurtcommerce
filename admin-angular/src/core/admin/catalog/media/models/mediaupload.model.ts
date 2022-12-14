/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class MediauploadForm {
  public image: String;
  public path: string;
  public fileName: string;

  constructor(mediaupload: any) {
    this.image = mediaupload.imageName || '';
    this.path = mediaupload.path || '';
    this.fileName = mediaupload.fileName || '';
  }
}
