
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';


@Injectable()
export class MyShopService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();

  // basicDetailCreate
  public basicDetailCreate(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor/edit-vendor/' + params.id, params);

  }


  // basicDetailGet
  public basicDetailGet(params: any): Observable<any> {
    return this.http.get(this.basUrl + "/vendor/vendor-profile", { params: params });
  }

  // certificateList
  public certificateList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-document', { params: params });
  }

  // certificateListCount
  public certificateListCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-document', { params: params });
  }

  // certificateUpdate
  public certificateUpdate(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor-document/' + params.id, params);
  }

  // certificateDelete
  public certificateDelete(params: any): Observable<any> {
    return this.http.delete(this.basUrl + '/vendor-document/' + params);
  }

  // certificateDetail
  public certificateDetail(params: any): Observable<any> {
    return this.http.get(this.basUrl + "/vendor-document/" + params);
  }

  // DocumentUpload
  public DocumentUpload(params: any): Observable<any> {
    return this.http.post(this.basUrl + "/media/upload-file", params);
  }

  // documentType
  public documentType(params: any): Observable<any> {
    return this.http.get(this.basUrl + "/vendor-document/document", { params: params });
  }

  // imageUpload
  public imageUpload(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-related-product/update-vendor-related-product', params);
  }

  // imageUpdate
  public imageUpdate(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor/edit-vendor/' + params.id, params);
  }

  // imageDetail
  public imageDetail(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor/vendor-profile', { params: params });
  }

  // videoUpload
  public videoUpload(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-related-product/update-vendor-related-product', params);
  }

  // videoUpdate
  public videoUpdate(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor/edit-vendor/' + params.id, params);
  }

  // videoDetail
  public videoDetail(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor/vendor-profile', { params: params });

  }

  // certificateCreate
  public certificateCreate(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-document', params);

  }

  // VideoStatusChange
  public VideoStatusChange(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor/edit-vendor/' + params.id, params);

  }

  // personalized settings
  // updatePersonalizedSettings
  public updatePersonalizedSettings(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor/edit-vendor/' + params.personalizedSetting.id, params);

  }

  // getPersonalizedSettings
  public getPersonalizedSettings(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor/vendor-profile', { params: params });

  }
}
