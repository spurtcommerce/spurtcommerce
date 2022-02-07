/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { catchError } from 'rxjs/internal/operators';
import { mergeMap, map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  /**
   * Returns configuration value based on given key
   *
   * @params key
   */
  get(key: any) {
    return this.config[key];
  }

  public getImageUrl(): string {
    return environment.imageUrl;
  }
}
