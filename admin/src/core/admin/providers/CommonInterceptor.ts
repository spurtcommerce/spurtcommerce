/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class HTTPStatus {
  public requestInFlight$: BehaviorSubject<boolean>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  protected userTokenDetail: any = {};

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrManager,
    public status: HTTPStatus
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      this.userTokenDetail = localStorage.getItem('userdetail')
        ? JSON.parse(localStorage.getItem('userdetail'))
        : {};
    }

    this.status.setHttpStatus(true);

    if (this.userTokenDetail) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userTokenDetail.accessToken}`
        }
      });
    }

    return next.handle(req).pipe(
      map((user: any) => {
        if (user instanceof HttpResponse) {
          this.status.setHttpStatus(false);
          const response = user.body;
          if (
            response.message &&
            response.message !== '' &&
            req.method !== 'GET'
          ) {
            this.showSuccess(user.body.message);
          }
        }
        return user;
      }),
      catchError(response => {
        this.status.setHttpStatus(false);
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        switch (response.status) {
          case 400:
            this.handleBadRequest(response);
            break;
          default:
            break;
          case 401:
            this.handleUnAuthorized();
            break;
          case 500:
            this.handleServerError();
            break;
        }
        return throwError(response);
      })
    );
  }

  /**
   * Shows notification errors when server response status is 401
   *
   * @params error
   */
  private handleBadRequest(responseBody: any): void {
    if (
      responseBody.url ===
      'http://api.spurtcommerce.com/api/product/product-excel-list/?productId='
    ) {
      this.showNotificationError('Please Choose a Valid Data');
    }
    if (
      responseBody.url ===
      'http://api.spurtcommerce.com/api/order/order-excel-list/?orderId='
    ) {
      this.showNotificationError('Please Choose a Valid Data');
    }
    if (
      responseBody.url ===
      'http://api.spurtcommerce.com/api/customer/customer-excel-list/?customerId='
    ) {
      this.showNotificationError('Please Choose a Valid Data');
    }
    if (responseBody.error) {
      try {
        // if(responseBody.)
        const bodyParsed = responseBody.error;
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        // this.handleServerError();
      }
    }
    // else this.handleServerError();
  }

  private handleErrorMessages(response: any): void {
    if (!response) {
      return;
    }
    if (!response.message) {
      return;
    }
    this.showNotificationError(response.message);
  }

  /**
   * redirect to login if un authorized
   *
   */
  private handleUnAuthorized() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
  handleServerError() {
    this.showNotificationError('Server Error');
  }
  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }

  private showSuccess(message) {
    this.toastr.successToastr(message);
  }
}
