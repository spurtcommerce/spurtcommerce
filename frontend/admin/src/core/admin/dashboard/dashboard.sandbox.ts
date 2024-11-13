/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../app.state.interface';
import * as dashboardActions from './action/dashboard.action';
import {
  /* Order Count Selectors */
  getOrderCount,
  getOrderCountLoading,
  getOrderCountLoaded,
  /* Product Count Selectors */
  getProductCount,
  getProductCountLoading,
  getProductCountLoaded,
  /* Customer Count Selectors */
  getCustomerCount,
  getCustomerCountLoading,
  getCustomerCountLoaded,
  /* Top Selling Products Selectors */
  getTopSellingProducts,
  getTopSellingProductsLoading,
  getTopSellingProductsLoaded,
  /* Top Selling Products Selectors */
  getSalesOrderList,
  getSalesOrderListLoading,
  getSalesOrderListLoaded,
  /* Top Selling Products Selectors */
  getVisitorLogs,
  getVisitorLogsLoading,
  getVisitorLogsLoaded,
  /* Top Selling Products Selectors */
  getRecentVisitorList,
  getRecentVisitorListLoading,
  getRecentVisitorListLoaded,
  /* Top Selling Products Selectors */
  getRecentSellingProduct,
  getRecentSellingProductLoading,
  getRecentSellingProductLoaded,
  dashboardCount,
  dashboardCountLoading,
  dashboardCountLoaded,
 /*averageOrderValue*/
  averageOrderValue,
  averageOrderValueLoading,
  averageOrderValueLoaded,
   /*Total Customers*/
  totalCustomersList,
  totalCustomersListLoading,
  totalCustomersListLoaded,
  getTopSellingProductListCount,
  getTopSellingProductListCountLoading,
  getTopSellingProductListCountLoaded,
      /*Total Revenue*/
  totalRevenue,
  totalRevenueLoading,
  totalRevenueLoaded,
  totalOrders,
  totalOrdersLoading,
  totalOrdersLoaded,
  newCustomers,
  newCustomersLoading,
  newCustomersLoaded,
  /*averageConversion*/
  averageConversionRatio,
  averageConversionRatioLoading,
  averageConversionRatioLoaded,
  transactionValues,
  transactionValuesLoading,
  transactionValuesLoaded,
  vendor,
  vendorLoading,
  vendorLoaded,
  salesgraph,
  salesgraphLoading,
  salesgraphLoaded,
  weeklysalesproduct,
  weeklysalesproductLoading,
  weeklysalesproductLoaded,
  toptenweeklyproducts,
  toptenweeklyproductsLoading,
  toptenweeklyproductsLoaded,
} from './reducer/selectors';


@Injectable()
export class DashboardSandbox {

  public OrderCount$ = this.appState.select(getOrderCount);
  public OrderCountLoading$ = this.appState.select(getOrderCountLoading);
  public OrderCountLoaded$ = this.appState.select(getOrderCountLoaded);

  public productCount$ = this.appState.select(getProductCount);
  public productCountLoading$ = this.appState.select(getProductCountLoading);
  public productCountLoaded$ = this.appState.select(getProductCountLoaded);

  public customerCount$ = this.appState.select(getCustomerCount);
  public customerCountLoading$ = this.appState.select(getCustomerCountLoading);
  public customerCountLoaded$ = this.appState.select(getCustomerCountLoaded);

  public topSellingProducts$ = this.appState.select(getTopSellingProducts);
  public topSellingProductsLoading$ = this.appState.select(getTopSellingProductsLoading);
  public topSellingProductsLoaded$ = this.appState.select(getTopSellingProductsLoaded);

  public salesOrderList$ = this.appState.select(getSalesOrderList);
  public salesOrderListLoading$ = this.appState.select(getSalesOrderListLoading);
  public salesOrderListLoaded$ = this.appState.select(getSalesOrderListLoaded);

  public recentVisitorList$ = this.appState.select(getRecentVisitorList);
  public recentVisitorListLoading$ = this.appState.select(getRecentVisitorListLoading);
  public recentVisitorListLoaded$ = this.appState.select(getRecentVisitorListLoaded);

  public visitorLogList$ = this.appState.select(getVisitorLogs);
  public visitorLogListLoading$ = this.appState.select(getVisitorLogsLoading);
  public visitorLogListLoaded$ = this.appState.select(getVisitorLogsLoaded);

  public recentSellingProduct$ = this.appState.select(getRecentSellingProduct);
  public recentSellingProductLoading$ = this.appState.select(getRecentSellingProductLoading);
  public recentSellingProductLoaded$ = this.appState.select(getRecentSellingProductLoaded);

  public dashboardCount$ = this.appState.select(dashboardCount);
  public dashboardCountLoading$ = this.appState.select(dashboardCountLoading);
  public dashboardCountLoaded$ = this.appState.select(dashboardCountLoaded);

   /*averageOrderValue*/

  public averageOrderValue$ = this.appState.select(averageOrderValue);
  public averageOrderValueLoading$ = this.appState.select(averageOrderValueLoading);
  public averageOrderValueLoaded$ = this.appState.select(averageOrderValueLoaded);

  /*Total Customers*/
  public totalCustomersList$ = this.appState.select(totalCustomersList);
  public totalCustomersListLoading$ = this.appState.select(totalCustomersListLoading);
  public totalCustomersListLoaded$ = this.appState.select(totalCustomersListLoaded);

  public getTopSellingProductListCount$ = this.appState.select(getTopSellingProductListCount);
  public getTopSellingProductListCountLoading$ = this.appState.select(getTopSellingProductListCountLoading);
  public getTopSellingProductListCountLoaded$ = this.appState.select(getTopSellingProductListCountLoaded);

   /*Total Revenue*/
  public totalRevenue$ = this.appState.select(totalRevenue);
  public totalRevenueLoading$ = this.appState.select(totalRevenueLoading);
  public totalRevenueLoaded$ = this.appState.select(totalRevenueLoaded);

  /*Total Orders*/
  public totalOrders$ = this.appState.select(totalOrders);
  public totalOrdersLoading$ = this.appState.select(totalOrdersLoading);
  public totalOrdersLoaded$ = this.appState.select(totalOrdersLoaded);

/*New Customers*/
  public newCustomers$ = this.appState.select(newCustomers);
  public newCustomersLoading$ = this.appState.select(newCustomersLoading);
  public newCustomersLoaded$ = this.appState.select(newCustomersLoaded);

  /*averageconversionratio*/

  public averageConversionRatio$ = this.appState.select(averageConversionRatio);
  public averageConversionRatioLoading$ = this.appState.select(averageConversionRatioLoading);
  public averageConversionRatioLoaded$ = this.appState.select(averageConversionRatioLoaded);

/*Transaction values*/
  public transactionValues$ = this.appState.select(transactionValues);
  public transactionValuesLoading$ = this.appState.select(transactionValuesLoading);
  public transactionValuesLoaded$ = this.appState.select(transactionValuesLoaded);
    /*Vendor*/
  public vendor$ = this.appState.select(vendor);
  public vendorLoading$ = this.appState.select(vendorLoading);
  public vendorLoaded$ = this.appState.select(vendorLoaded);

  /*Sales graph*/
  public salesgraph$ = this.appState.select(salesgraph);
  public salesgraphLoading$ = this.appState.select(salesgraphLoading);
  public salesgraphLoaded$ = this.appState.select(salesgraphLoaded);

  /*weekly sales product*/
  public weeklysalesproduct$ = this.appState.select(weeklysalesproduct);
  public weeklysalesproductLoading$ = this.appState.select(weeklysalesproductLoading);
  public weeklysalesproductLoaded$ = this.appState.select(weeklysalesproductLoaded);

  /*Top 10 Weekly Products*/
  public toptenweeklyproducts$ = this.appState.select(toptenweeklyproducts);
  public toptenweeklyproductsLoading$ = this.appState.select(toptenweeklyproductsLoading);
  public toptenweeklyproductsLoaded$ = this.appState.select(toptenweeklyproductsLoaded);

  constructor(protected appState: Store<store.AppState>) {}


  public getTopSellingProductList(params) {
    this.appState.dispatch(
      new dashboardActions.GetTopSellingProductsAction(params)
    );
  }

  public getSalesOrderList(params: any = {}) {
    this.appState.dispatch(new dashboardActions.GetSalesOrderAction(params));
  }

  public getVisitorLogsList(params: any = {}) {
    this.appState.dispatch(new dashboardActions.GetVisitorLogAction(params));
  }

  public getRecentVisitorList(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetRecentVisitorListAction(params)
    );
  }

  public getRecentSellingProductList(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetRecentSellingProductAction(params)
    );
  }

  public getItemPerPageCount(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetItemPerPageCountAction(params)
    );
  }

  // get dashboard overall count

  public getDashboardCount() {
    this.appState.dispatch(
      new dashboardActions.GetDashboardCountAction()
    );
  }

  public averageOrderValue(params) {
    this.appState.dispatch(
      new dashboardActions.averageOrderValueAction(params)
    );
  }
         /*Total Customers*/
  public totalCustomersList(params) {
    this.appState.dispatch(
      new dashboardActions.totalCustomersListAction(params)
    );
  }

  public getTopSellingProductListCount(params) {
    this.appState.dispatch(
      new dashboardActions.getTopSellingProductListCountAction(params)
    );
  }
    /*Total Revenue*/
    public totalRevenue(params) {
      this.appState.dispatch(
        new dashboardActions.totalRevenueAction(params)
      );
    }

  /*Total Orders*/
  public totalOrders(params) {
    this.appState.dispatch(
      new dashboardActions.totalOrdersAction(params)
    );
  }
/*New Customers*/
public newCustomers(params) {
  this.appState.dispatch(
    new dashboardActions.newCustomersAction(params)
  );
}
 /*average conversion ratio*/
public averageConversionRatio(params) {
  this.appState.dispatch(
    new dashboardActions.averageConversionRatioAction(params)
  );
}


/*Transaction values*/
public transactionValues(params){
  this.appState.dispatch(
    new dashboardActions.transactionValuesAction(params)
  );
}

    /*Vendor*/
    public vendor(params){
      this.appState.dispatch(
        new dashboardActions.vendorAction(params)
      );
    }


        /*Sales graph*/
        public salesgraph(params){
          this.appState.dispatch(
            new dashboardActions.salesgraphAction(params)
          );
        }

    /*weekly sales product*/    
    public weeklysalesproduct(params){
      this.appState.dispatch(
        new dashboardActions.weeklysalesproductAction(params)
      );
    }

    /*Top 10 Weekly Products*/
    public toptenweeklyproducts(params){
      this.appState.dispatch(
        new dashboardActions.toptenweeklyproductsAction(params)
      );
    }
}
