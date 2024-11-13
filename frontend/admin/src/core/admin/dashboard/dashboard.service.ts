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
import { Api } from '../providers/api/api';

@Injectable()
export class DashboardService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();


  /* get top selling product list api*/
  public getTopSellingProducts(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(
      this.URL + '/product/top-performing-products',
      reqOpts
    );
    // return this.http.get(this.URL + '/product/top-performing-products',filterParam);

  }

  /* get sales order list api*/
  public getSalesOrders(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-customer/customer-visit-list', reqOpts);
  }

  /* get visitors list api*/
  public getVisitorsList(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/transaction-list', reqOpts);
  }

  /* get recent visitors list api*/
  public getRecentVisitorsList(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/top-five-repeatedly-purchased-customers', reqOpts);
  }

  /* get recent selling product list api*/
  public getRecentSellingProductList(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/recent-selling-product', reqOpts);
  }

  /* get items per page count api*/

  getItemsPerPageCount(): Observable<any> {
    return this.http.get(this.URL + '/settings?defaultWebsite=1');
  }

  /* get dashboard counts*/

  getDashboardCount(): Observable<any> {
    return this.http.get(this.URL + '/product/dashboard-admin-totalvendor-totalproduct-count');
  }

  averageOrderValue(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/average-order-value', reqOpts);
  }
  /*Total Customers*/
  totalCustomersList(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/dashboard/admin-customers-count', reqOpts);
  }

  /*Total Customers*/
  getTopSellingProductListCount(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/top-performing-products', reqOpts);
  }

  /*Total Revenue*/
  totalRevenue(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/total-revenue', reqOpts);
  }

  /*Total Orders*/

  totalOrders(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/orders-count', reqOpts);
  }

  /*New Customers*/
  newCustomers(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/dashboard/admin-customers-count', reqOpts);
  }
  /*average conversion ratio*/
  averageConversionRatio(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/average-conversion-ratio', reqOpts);
  }

  /*Transaction values*/
  transactionValues(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/transaction-list', reqOpts);
  }

  /*Vendor*/
  vendor(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-customer/vendor-graph-list', reqOpts);
  }

  /*Sales graph*/
  salesgraph(param): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/sales-graph-list', reqOpts);
  }

  /*weekly sales product*/
  weeklysalesproduct(param: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/dashboard/graph-weekly-saleslist', reqOpts);
  }

  /*Top 10 Weekly Products*/
  toptenweeklyproducts(param: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(param).reduce(
      (p, key) => p.set(key, param[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/top-performing-products', reqOpts);
  }

}
