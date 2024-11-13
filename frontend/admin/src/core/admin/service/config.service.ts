/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    DataType: 'application/json'
  })
};

@Injectable()
export class ConfigService {

  private confiq = {
    toolbar: [
      [
        'Bold',
        'Italic',
        'BulletedList',
        'Styles'
      ],
      ['Table']
    ]
  };

  constructor() { }
  public getImageUrl(): string {
    return environment.imageUrl;
  }
  public getImageType(): any {
    return environment.imageType;
  }
  public getimageTypeSupport(): string {
    return environment.imageTypeSupport;
  }
  public getimageSizeSupport():string {
    return environment.imageSizeSupport
  }
  public getBaseUrl(): string {
    return environment.baseUrl;
  }
  public getChatUrl(): string {
    return environment.chatUrl;
  }
  public getStoreUrl(): string {
    return environment.storeUrl;
  }
  public getFileSize():number {
    return environment.filesize;
  }
  public getFileSupport():string {
    return environment.imageSupportFile;
  }
  public getckeconfig() {
    return this.confiq;
  }

}
