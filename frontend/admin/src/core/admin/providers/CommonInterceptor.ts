/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
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
  public BaseUrl=environment.baseUrl;
  toastRef;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService,
    public status: HTTPStatus
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
     
      this.userTokenDetail = localStorage.getItem('adminUserdetail') ? JSON.parse(localStorage.getItem('adminUserdetail')) :JSON.parse(sessionStorage.getItem('adminUserdetail'));
    }

    let loaderfalseurl = this.router.url;
    let finalurl = this.router.url.split('/')[3];
    let fullurl = this.router.url.split('/')[1] + '/' + this.router.url.split('/')[2] + '/' + finalurl?.split('?')[0];
    if ((req.url == this.BaseUrl+'/product' && (fullurl == 'catalog/coupon/add' || fullurl == 'catalog/coupon/edit'))) {

    }else if((req.url ==  this.BaseUrl+'/category' && (fullurl == 'cms/blogs/add' || fullurl == 'cms/blogs/edit'))||(req.url ==  this.BaseUrl+'/product/product-count' && (fullurl == 'cms/blogs/add' || fullurl == 'cms/blogs/edit'))){

    }else if((req.url ==  this.BaseUrl+'/widget/productlist' && (fullurl == 'cms/widgets/add' || fullurl == 'cms/widgets/edit'))||(req.url ==  this.BaseUrl+'/category' && (fullurl == 'cms/widgets/add' || fullurl == 'cms/widgets/edit'))){

    }
    else {
      this.status.setHttpStatus(true);

    }

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
          const msg = ['Chat seen Status Updated..!','Image successfully uploaded.'];
       
          let itemsPerPage=sessionStorage.getItem('itemsPerPage')
          
          if(itemsPerPage == '0'){
            sessionStorage.setItem('itemsPerPage', JSON.stringify(10));
            localStorage.setItem('itemsPerPage', JSON.stringify(10));
             }

          

   
          
          if (
            response.message &&
            response.message !== '' &&
            req.method !== 'GET' && !msg.includes(response.message)
            
          ) {
      
            if(user.url !== this.BaseUrl + '/admin-vendor/check-display-name-url' && user.url !== this.BaseUrl + '/auth/login')
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
          case 422:
            this.handleUnProcessableEntry(response.error);
            break;
          case 401:
            this.handleUnAuthorized();
            break;
          case 500:
            this.handleServerError();
            break;
          default:
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
      'http://api.spurtcommerce.com/api/admin-customer/customer-excel-list/?customerId='
    ) {
      this.showNotificationError('Please Choose a Valid Data');
    }
    if (responseBody.error) {
      try {
        const bodyParsed = responseBody.error;
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
      }
    }
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

  public handleUnProcessableEntry(error) {
    if (error && error.data && error.data.message) {
      this.showNotificationError(Array.isArray(error.data.message) ? error.data.message[0] : error.data.message);
    }
  }

  /**
   * redirect to login if un authorized
   *
   */
  private handleUnAuthorized() {
    sessionStorage.clear();
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
    this.toastr.error(message);
  }

  private showSuccess(message) {
    this.toastr.success(message);
  }
}
