/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class BucketlistForm {
  public limit: number;
  public folderName: string;

  constructor(bucketlistForm: any) {
    this.limit = bucketlistForm.limit || 0;
    this.folderName = bucketlistForm.folderName || '';
  }
}
