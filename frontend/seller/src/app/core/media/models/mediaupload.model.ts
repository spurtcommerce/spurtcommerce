/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class MediauploadForm {
  public image: String;
  public path: string;
  public fileName: string;
  public fileType: number;


  constructor(mediaupload: any) {
    this.image = mediaupload.image || '';
    this.path = mediaupload.path || '';
    this.fileName = mediaupload.fileName || '';
    this.fileType=0
  }
}
