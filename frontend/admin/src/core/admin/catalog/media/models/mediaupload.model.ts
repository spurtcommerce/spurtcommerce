/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
