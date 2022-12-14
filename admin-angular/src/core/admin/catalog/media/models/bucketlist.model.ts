/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class BucketlistForm {
  public limit: number;
  public folderName: string;
  public marker: string;


  constructor(bucketlistForm: any) {
    this.limit = bucketlistForm.limit || 0;
    this.folderName = bucketlistForm.folderName || '';
    this.marker = bucketlistForm.marker || '';
  }
}
