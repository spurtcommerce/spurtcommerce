/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface DashboardState extends Map<string, any> {
  orderCount: number;
  orderCountLoading: boolean;
  orderCountLoaded: boolean;
  orderCountFailed: boolean;
  productCount: number;
  productCountLoading: boolean;
  productCountLoaded: boolean;
  productCountFailed: boolean;
  customerCount: number;
  customerCountLoading: boolean;
  customerCountLoaded: boolean;
  customerCountFailed: boolean;
  topSellingProducts: any;
  topSellingProductsLoading: boolean;
  topSellingProductsLoaded: boolean;
  topSellingProductsFailed: boolean;
  salesOrderList: any;
  salesOrderListLoading: boolean;
  salesOrderListLoaded: boolean;
  salesOrderListFailed: boolean;
  visitorLogs: any;
  visitorLogsLoading: boolean;
  visitorLogsLoaded: boolean;
  visitorLogsFailed: boolean;
  recentVisitorList: any;
  recentVisitorListLoading: boolean;
  recentVisitorListLoaded: boolean;
  recentVisitorListFailed: boolean;
  recentSellingProduct: any;
  recentSellingProductLoading: boolean;
  recentSellingProductLoaded: boolean;
  recentSellingProductFailed: boolean;

  dashboardCount: any;
  dashboardCountLoading: boolean;
  dashboardCountLoaded: boolean;
  dashboardCountFailed: boolean;

  /*averageOrderValue*/

  averageOrderValue: any;
  averageOrderValueLoading: boolean;
  averageOrderValueLoaded: boolean;
  averageOrderValueFailed: boolean;

/*Total Customers*/

  totalCustomersList: any;
  totalCustomersListLoading: boolean;
  totalCustomersListLoaded: boolean;
  totalCustomersListFailed: boolean;

  /*Top selling product count*/
  getTopSellingProductListCount: any;
  getTopSellingProductListCountLoading: boolean;
  getTopSellingProductListCountLoaded: boolean;
  getTopSellingProductListCountFailed: boolean;

      /*Total Revenue*/
  totalRevenue: any;
  totalRevenueLoading: boolean;
  totalRevenueLoaded: boolean;
  totalRevenueFailed: boolean;

  /*Total Orders*/
  totalOrders: any;
  totalOrdersLoading: boolean;
  totalOrdersLoaded: boolean;
  totalOrdersFailed: boolean;

    /*New Customers*/

  newCustomers: any;
  newCustomersLoading: boolean;
  newCustomersLoaded: boolean;
  newCustomersFailed: boolean;

  /*averageConversionRatio*/

  averageConversionRatio: any;
  averageConversionRatioLoading: boolean;
  averageConversionRatioLoaded: boolean;
  averageConversionRatioFailed: boolean;


    
  /*Transaction values*/

  transactionValues: any;
  transactionValuesLoading: boolean;
  transactionValuesLoaded: boolean;
  transactionValuesFailed: boolean;


  /*Vendor*/

    vendor: any;
    vendorLoading: boolean;
    vendorLoaded: boolean;
    vendorFailed: boolean;

    /*Sales graph*/
    salesgraph: any;
    salesgraphLoading: boolean;
    salesgraphLoaded: boolean;
    salesgraphFailed: boolean;

    /*weekly sales product*/
    weeklysalesproduct: any;
    weeklysalesproductLoading: boolean;
    weeklysalesproductLoaded: boolean;
    weeklysalesproductFailed: boolean;

    /*Top 10 Weekly Products*/
    toptenweeklyproducts: any;
    toptenweeklyproductsLoading: boolean;
    toptenweeklyproductsLoaded: boolean;
    toptenweeklyproductsFailed: boolean;

}

export const DashboardStateRecord = Record({
  orderCount: 0,
  orderCountLoading: false,
  orderCountLoaded: false,
  orderCountFailed: false,
  productCount: 0,
  productCountLoading: false,
  productCountLoaded: false,
  productCountFailed: false,
  customerCount: 0,
  customerCountLoading: false,
  customerCountLoaded: false,
  customerCountFailed: false,
  topSellingProducts: [],
  topSellingProductsLoading: false,
  topSellingProductsLoaded: false,
  topSellingProductsFailed: false,
  salesOrderList: [],
  salesOrderListLoading: false,
  salesOrderListLoaded: false,
  salesOrderListFailed: false,
  visitorLogs: [],
  visitorLogsLoading: false,
  visitorLogsLoaded: false,
  visitorLogsFailed: false,
  recentVisitorList: [],
  recentVisitorListLoading: false,
  recentVisitorListLoaded: false,
  recentVisitorListFailed: false,
  recentSellingProduct: [],
  recentSellingProductLoading: false,
  recentSellingProductLoaded: false,
  recentSellingProductFailed: false,

  dashboardCount: {},
  dashboardCountLoading: false,
  dashboardCountLoaded: false,
  dashboardCountFailed: false,

/*averageOrderValue*/

  averageOrderValue: [],
  averageOrderValueLoading: false,
  averageOrderValueLoaded: false,
  averageOrderValueFailed: false,

  /*Total Customers*/
  totalCustomersList: [],
  totalCustomersListLoading: false,
  totalCustomersListLoaded: false,
  totalCustomersListFailed: false,

  /*Top selling product count*/
  getTopSellingProductListCount: [],
  getTopSellingProductListCountLoading: false,
  getTopSellingProductListCountLoaded: false,
  getTopSellingProductListCountFailed: false,

    /*Total Revenue*/
  totalRevenue: [],
  totalRevenueLoading: false,
  totalRevenueLoaded: false,
  totalRevenueFailed: false,

  /*Total Orders*/
  totalOrders: [],
  totalOrdersLoading: false,
  totalOrdersLoaded: false,
  totalOrdersFailed: false,

  /*New Customers*/

  newCustomers: [],
  newCustomersLoading: false,
  newCustomersLoaded: false,
  newCustomersFailed: false,

  /*averageConversionRatio*/

  averageConversionRatio: [],
  averageConversionRatioLoading: false,
  averageConversionRatioLoaded: false,
  averageConversionRatioFailed: false,

    /*Transaction values*/
    transactionValues: [],
    transactionValuesLoading: false,
    transactionValuesLoaded: false,
    transactionValuesFailed: false,

      /*Vendor*/

vendor: [],
vendorLoading: false,
vendorLoaded: false,
vendorFailed: false,


    /*Sales graph*/

    salesgraph: [],
salesgraphLoading: false,
salesgraphLoaded: false,
salesgraphFailed: false,

/*weekly sales product*/

weeklysalesproduct: [],
weeklysalesproductLoading: false,
weeklysalesproductLoaded: false,
weeklysalesproductFailed: false,

/*Top 10 Weekly Products*/

toptenweeklyproducts: [],
toptenweeklyproductsLoading: false,
toptenweeklyproductsLoaded: false,
toptenweeklyproductsFailed: false,


});
