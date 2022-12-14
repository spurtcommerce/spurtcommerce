/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
  private config: Object;
  private env: Object;
  // private confiq={
  //   removeButtons: 'Strike,Subscript,Superscript,RemoveFormat,NumberedList,Outdent,Indent,Blockquote,Source,SpecialChar,HorizontalRule,Anchor,Unlink,Link,Redo,Undo,Paste,PasteText,Copy,Cut,PasteFromWord,Maximize,About,Format,Scayt'
  // };

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

  constructor(private http: HttpClient) { }
  public getImageUrl(): string {
    return environment.imageUrl;
  }
  public getBaseUrl(): string {
    return environment.baseUrl;
  }

  public getckeconfig() {
    return this.confiq;
  }
}
