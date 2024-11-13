/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class MediaService extends Api {
  // address url
  private url: string;

  /**
   * Handles 'CreateFolder' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from model.
   */
  CreateFolder(param): Observable<any> {
    return this.http.post(
      (this.url = this.getBaseUrl() + '/media/create-folder'),
      param
    );
  }

  /**
   * Handles 'document' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from model.
   */

  document(param): Observable<any> {
    const formData = new FormData();
    formData.append('image', param);
    formData.append('path', param.path);

    const options: {
      headers?: HttpHeaders;
      observe?: 'body';
      params?: HttpParams;
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    } = {
      headers: new HttpHeaders({ 'xss-loader': 'true' }),
      withCredentials: true,
      responseType: 'text' as 'text'
    };

    return this.http.post(
      (this.url = this.getBaseUrl() + '/media/upload-file'),
      param
    );
  }

  /**
   * Handles 'deleteFolder' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from model.
   */

  deleteFolder(param): Observable<any> {
    return this.http.post(
      (this.url = this.getBaseUrl() + '/media/create-folder'),
      param
    );
  }

  /**
   * Handles 'bucketLists' function. Calls get method with specific api address
   * along its param.
   *
   * @param param from model.
   */

  bucketLists(param): Observable<any> {
    return this.http.get(
      (this.url = this.getBaseUrl() + '/media/bucket-object-list'),
      { params: param }
    );
  }

  /**
   * Handles 'deleteImage' function. Calls get method with specific api address
   * along its param.
   *
   * @param param from model.
   */

  deleteImage(param): Observable<any> {
    return this.http.get(
      (this.url = this.getBaseUrl() + '/media/delete-file'),
      { params: param }
    );
  }
  searchFolder(param): Observable<any> {
    return this.http.get(
      (this.url = this.getBaseUrl() + '/media/search-folder'),
      { params: param }
    );
  }

  bulkImageUpload(param): Observable<any> {
    return this.http.post(
      (this.url = this.getBaseUrl() + '/media/upload-multi-image'),
      param
    );
  }

  bulkImageDelete(param): Observable<any> {
    return this.http.post(
      (this.url = this.getBaseUrl() + '/media/multiple-delete'),
      param
    );
  }
}
