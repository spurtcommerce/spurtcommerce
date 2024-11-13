/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class NewProductService extends Api {
  params: any = {};
  public pagesize: any;
  private url: string = this.getBaseUrl();
  private apiUrlPaths = {
    productSeoList: '',
    createSpecification: '',
    updateSpecfication: '',
    videoUrl: '/media/video-preview-s3'


  };



  public getorderlistCount(params: any): Observable<any> {
    return this.http.get(this.url + '/vendor-product/vendor-category-list', { params: params });
  }
  /* Tax List*/
  public TaxList(params: any): Observable<any> {
    return this.http.get(this.url + '/tax/tax-list', { params: params });
  }

  /* Product  creation*/
  public ProductCreation(params: any): Observable<any> {
    return this.http.post(this.url + '/vendor-product', params);
  }

  /* Product Update Details*/
  public ProductUpdateDetails(params: any): Observable<any> {
    return this.http.get(this.url + '/vendor-product/' + params);
  }
  /* Product edit*/
  public Productedit(params: any): Observable<any> {
    let id = params.editid
    delete params['editid']
    return this.http.put(this.url + '/vendor-product/' + id, params);
  }

  /* Product Video upload*/
  public ProductVideoUpload(params: any): Observable<any> {
    return this.http.post(this.url + '/media/upload-video', params);
  }

  /* Product Multi Delete*/
  public ProductMultiDelete(params: any): Observable<any> {
    return this.http.delete(this.url + `/vendor-product/${params.productId}`);
  }
 //Attribute Slug
  public attributeSlug(productId:any):Observable<any>{

    return this.http.put<any>(this.url+'/vendor-product-specification/attribute-slug/product/'+productId,{});
  }
  // ProductSeo 
  public CreateProductSeo(params: any): Observable<any> {
    let id = params.productId
    delete params['productId']
    return this.http.post<any>(`${this.url}${this.apiUrlPaths.productSeoList}${id}`, params);
  }
  /*Specification*/
  public Specification_Create(params): Observable<any> {
    return this.http.post(`${this.url}${this.apiUrlPaths.createSpecification}`, params);
  }

  

  /*Specification_edit*/
  public updateSpecification(params): Observable<any> {
    let id = params.editId
    delete params['editId'];
    const productSpec = params.productSpecfication;
    return this.http.put(`${this.url}${this.apiUrlPaths.updateSpecfication}${id}`, productSpec);
  }

  /*Specification_edit*/
  public videoView(params): Observable<any> {
    const url = `${this.url}${this.apiUrlPaths.videoUrl}?path=${params.path}&name=${params.name}`;
    return this.http.get(url, { responseType: 'blob'  });

  }
}
