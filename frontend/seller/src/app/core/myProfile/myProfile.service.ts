/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Api } from "../providers/api/api";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class MyProfileService extends Api {
  private base: string = this.getBaseUrl();

  public doGetProfile(params: any): Observable<any> {
    return this.http.get(this.base + "/vendor/vendor-profile");
  }

  // editProfile
  public editProfile(params: any): Observable<any> {
    return this.http.put(this.base + "/vendor/edit-vendor/" + params.customerId, params.params);
  }

  /*** change email api ***/
  public changeEmail(params: any): Observable<any> {
    return this.http.put(this.base + "/vendor/mail/link", params);
  }

  /*changePassword*/
  public changePassword(params: any): Observable<any> {
    return this.http.put(this.base + "/vendor/change-password", params);
  }

  // Image upload 
  imageUpload(params: any): Observable<any>{
      return this.http.post(this.base + "/media/upload-file", params);
    }
// change email verification
    public changeMailVerification(params: any): Observable<any> {
      return this.http.put(this.base + '/vendor/mail/verify', params);
    }
  }

