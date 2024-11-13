/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/dashboard.action';
import { DashboardState, DashboardStateRecord } from './dashboard.state';

const numberToMonth = {
  '1': 'JAN',
  '2': 'FEB',
  '3': 'MAR',
  '4': 'APR',
  '5': 'MAY',
  '6': 'JUN',
  '7': 'JUL',
  '8': 'AUG',
  '9': 'SEP',
  '10': 'OCT',
  '11': 'NOV',
  '12': 'DEC'
};

export const initialState: DashboardState = new DashboardStateRecord() as unknown as DashboardState;

export function reducer(
  state = initialState,
  { type, payload }: any
): DashboardState {
  if (!type) {
    return state;
  }

  switch (type) {

    /* Dashboard Top Selling Product action */

    case actions.ActionTypes.GET_TOP_SELLING_PRODUCTS: {
      return Object.assign({}, state, {
        topSellingProducts: [],
        topSellingProductsLoading: true,
        topSellingProductsLoaded: false,
        topSellingProductsFailed: false
      });
    }

    case actions.ActionTypes.GET_TOP_SELLING_PRODUCTS_SUCCESS: {
      return Object.assign({}, state, {
        topSellingProducts: payload.data,
        topSellingProductsLoading: false,
        topSellingProductsLoaded: true,
        topSellingProductsFailed: false
      });
    }

    case actions.ActionTypes.GET_TOP_SELLING_PRODUCTS_FAIL: {
      return Object.assign({}, state, {
        topSellingProducts: [],
        topSellingProductsLoading: false,
        topSellingProductsLoaded: true,
        topSellingProductsFailed: true
      });
    }

    /* Dashboard Sale Order action */

    case actions.ActionTypes.GET_SALES_ORDER_LIST: {
      return Object.assign({}, state, {
        salesOrderList: [],
        salesOrderListLoading: true,
        salesOrderListLoaded: false,
        salesOrderListFailed: false
      });
    }

    case actions.ActionTypes.GET_SALES_ORDER_LIST_SUCCESS: {
      // const salesChartData = [];
      // if (payload && payload.data.length > 0) {
      //   const orderList = payload.data;
      //   orderList.forEach(value => {
      //     salesChartData.push({
      //       name: value.dayOfMonth,
      //       value: value.visitCount
      //     });
      //   });
      // }
      return Object.assign({}, state, {
        salesOrderList: payload.data,
        salesOrderListLoading: false,
        salesOrderListLoaded: true,
        salesOrderListFailed: false
      });
    }

    case actions.ActionTypes.GET_SALES_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        salesOrderList: [],
        salesOrderListLoading: false,
        salesOrderListLoaded: true,
        salesOrderListFailed: true
      });
    }

    /* Dashboard visitor log list action */

    case actions.ActionTypes.GET_VISITOR_LOG_LIST: {
      return Object.assign({}, state, {
        visitorLogs: [],
        visitorLogsLoading: true,
        visitorLogsLoaded: false,
        visitorLogsFailed: false
      });
    }

    case actions.ActionTypes.GET_VISITOR_LOG_LIST_SUCCESS: {
      const logChartData: any = {};
      const logChartDataArray: any = [];
      logChartData.name = 'Login Logs';
      logChartData.series = [];
      if (payload && payload.data.length > 0) {
        const loginLogList = payload.data;
        loginLogList.forEach(value => {
          logChartData.series.push({
            name: value.createdDate,
            value: value.logcount
          });
        });
      }
      logChartDataArray.push(logChartData);
      return Object.assign({}, state, {
        visitorLogs: logChartDataArray,
        visitorLogsLoading: false,
        visitorLogsLoaded: true,
        visitorLogsFailed: false
      });
    }

    case actions.ActionTypes.GET_VISITOR_LOG_LIST_FAIL: {
      return Object.assign({}, state, {
        visitorLogs: [],
        visitorLogsLoading: false,
        visitorLogsLoaded: true,
        visitorLogsFailed: true
      });
    }

    /* Dashboard recent visitor list action */

    case actions.ActionTypes.GET_RECENT_VISITOR_LIST: {
      return Object.assign({}, state, {
        recentVisitorList: [],
        recentVisitorListLoading: true,
        recentVisitorListLoaded: false,
        recentVisitorListFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_VISITOR_LIST_SUCCESS: {
      return Object.assign({}, state, {
        recentVisitorList: payload.data,
        recentVisitorListLoading: false,
        recentVisitorListLoaded: true,
        recentVisitorListFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_VISITOR_LIST_FAIL: {
      return Object.assign({}, state, {
        recentVisitorList: [],
        recentVisitorListLoading: false,
        recentVisitorListLoaded: true,
        recentVisitorListFailed: true
      });
    }

    /* Dashboard Recent selling Product action */

    case actions.ActionTypes.GET_RECENT_SELLING_PRODUCT: {
      return Object.assign({}, state, {
        recentSellingProduct: [],
        recentSellingProductLoading: true,
        recentSellingProductLoaded: false,
        recentSellingProductFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_SELLING_PRODUCT_SUCCESS: {
      return Object.assign({}, state, {
        recentSellingProduct: payload.data,
        recentSellingProductLoading: false,
        recentSellingProductLoaded: true,
        recentSellingProductFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_SELLING_PRODUCT_FAIL: {
      return Object.assign({}, state, {
        recentSellingProduct: [],
        recentSellingProductLoading: false,
        recentSellingProductLoaded: true,
        recentSellingProductFailed: true
      });
    }


    /* get Dashboard overall counts */

    case actions.ActionTypes.GET_DASHBOARD_COUNT: {
      return Object.assign({}, state, {
        dashboardCount: {},
        dashboardCountLoading: true,
        dashboardCountLoaded: false,
        dashboardCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        dashboardCount: payload.data,
        dashboardCountLoading: false,
        dashboardCountLoaded: true,
        dashboardCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_COUNT_FAIL: {
      return Object.assign({}, state, {
        dashboardCount: {},
        dashboardCountLoading: false,
        dashboardCountLoaded: false,
        dashboardCountFailed: true,
      });
    }




    /* averageOrderValue */

    case actions.ActionTypes.AVERAGE_ORDER_VALUE: {
      return Object.assign({}, state, {
        averageOrderValue: [],
        averageOrderValueLoading: true,
        averageOrderValueLoaded: false,
        averageOrderValueFailed: false,
      });
    }

    case actions.ActionTypes.AVERAGE_ORDER_VALUE_SUCCESS: {
      return Object.assign({}, state, {
        averageOrderValue: payload.data,
        averageOrderValueLoading: false,
        averageOrderValueLoaded: true,
        averageOrderValueFailed: false,
      });
    }

    case actions.ActionTypes.AVERAGE_ORDER_VALUE_FAIL: {
      return Object.assign({}, state, {
        averageOrderValue: [],
        averageOrderValueLoading: false,
        averageOrderValueLoaded: false,
        averageOrderValueFailed: true,
      });
    }
    /*Total Customers*/

    case actions.ActionTypes.TOTAL_CUSTOMERS_LIST: {
      return Object.assign({}, state, {
        totalCustomersList: [],
        totalCustomersListLoading: true,
        totalCustomersListLoaded: false,
        totalCustomersListFailed: false,
      });
    }

    case actions.ActionTypes.TOTAL_CUSTOMERS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        totalCustomersList: payload.data,
        totalCustomersListLoading: false,
        totalCustomersListLoaded: true,
        totalCustomersListFailed: false,
      });
    }

    case actions.ActionTypes.TOTAL_CUSTOMERS_LIST_FAIL: {
      return Object.assign({}, state, {
        totalCustomersList: [],
        totalCustomersListLoading: false,
        totalCustomersListLoaded: false,
        totalCustomersListFailed: true,
      });
    }
         /*Top selling product count*/
    case actions.ActionTypes.TOP_SELLING_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        getTopSellingProductListCount: [],
        getTopSellingProductListCountLoading: true,
        getTopSellingProductListCountLoaded: false,
        getTopSellingProductListCountFailed: false,
      });
    }

    case actions.ActionTypes.TOP_SELLING_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        getTopSellingProductListCount: payload.data,
        getTopSellingProductListCountLoading: false,
        getTopSellingProductListCountLoaded: true,
        getTopSellingProductListCountFailed: false,
      });
    }

    case actions.ActionTypes.TOP_SELLING_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        getTopSellingProductListCount: [],
        getTopSellingProductListCountLoading: false,
        getTopSellingProductListCountLoaded: false,
        getTopSellingProductListCountFailed: true,
      });
    }

        /*Total Revenue*/
        case actions.ActionTypes.TOTAL_REVENUE: {
          return Object.assign({}, state, {
            totalRevenue: [],
            totalRevenueLoading: true,
            totalRevenueLoaded: false,
            totalRevenueFailed: false,
          });
        }

        case actions.ActionTypes.TOTAL_REVENUE_SUCCESS: {
          return Object.assign({}, state, {
            totalRevenue: payload.data,
            totalRevenueLoading: false,
            totalRevenueLoaded: true,
            totalRevenueFailed: false,
          });
        }

        case actions.ActionTypes.TOTAL_REVENUE_FAIL: {
          return Object.assign({}, state, {
            totalRevenue: [],
            totalRevenueLoading: false,
            totalRevenueLoaded: false,
            totalRevenueFailed: true,
          });
        }

        /*Total Orders*/

        case actions.ActionTypes.TOTAL_ORDERS: {
          return Object.assign({}, state, {
            totalOrders: [],
            totalOrdersLoading: true,
            totalOrdersLoaded: false,
            totalOrdersFailed: false,
          });
        }

        case actions.ActionTypes.TOTAL_ORDERS_SUCCESS: {
          return Object.assign({}, state, {
            totalOrders: payload.data,
            totalOrdersLoading: false,
            totalOrdersLoaded: true,
            totalOrdersFailed: false,
          });
        }

        case actions.ActionTypes.TOTAL_ORDERS_FAIL: {
          return Object.assign({}, state, {
            totalOrders: [],
            totalOrdersLoading: false,
            totalOrdersLoaded: false,
            totalOrdersFailed: true,
          });
        }

        /*New Customers*/

        case actions.ActionTypes.NEW_CUSTOMERS: {
          return Object.assign({}, state, {
            newCustomers: [],
            newCustomersLoading: true,
            newCustomersLoaded: false,
            newCustomersFailed: false,
          });
        }

        case actions.ActionTypes.NEW_CUSTOMERS_SUCCESS: {
          return Object.assign({}, state, {
            newCustomers: payload.data,
            newCustomersLoading: false,
            newCustomersLoaded: true,
            newCustomersFailed: false,
          });
        }

        case actions.ActionTypes.NEW_CUSTOMERS_FAIL: {
          return Object.assign({}, state, {
            newCustomers: [],
            newCustomersLoading: false,
            newCustomersLoaded: false,
            newCustomersFailed: true,
          });
        }

        /* averageConversionRatio */

    case actions.ActionTypes.AVERAGE_CONVERSION_RATIO: {
      return Object.assign({}, state, {
        averageConversionRatio: [],
        averageConversionRatioLoading: true,
        averageConversionRatioLoaded: false,
        averageConversionRatioFailed: false,
      });
    }

    case actions.ActionTypes.AVERAGE_CONVERSION_RATIO_SUCCESS: {
      return Object.assign({}, state, {
        averageConversionRatio: payload.data,
        averageConversionRatioLoading: false,
        averageConversionRatioLoaded: true,
        averageConversionRatioFailed: false,
      });
    }

    case actions.ActionTypes.AVERAGE_CONVERSION_RATIO_FAIL: {
      return Object.assign({}, state, {
        averageConversionRatio: [],
        averageConversionRatioLoading: false,
        averageConversionRatioLoaded: false,
        averageConversionRatioFailed: true,
      });
    }



    /*Transaction values*/


    case actions.ActionTypes.TRANSACTION_VALUES: {
      return Object.assign({}, state, {
        transactionValues: [],
        transactionValuesLoading: true,
        transactionValuesLoaded: false,
        transactionValuesFailed: false,
      });
    }

    case actions.ActionTypes.TRANSACTION_VALUES_SUCCESS: {
      return Object.assign({}, state, {
        transactionValues: payload.data,
        transactionValuesLoading: false,
        transactionValuesLoaded: true,
        transactionValuesFailed: false,
      });
    }

    case actions.ActionTypes.TRANSACTION_VALUES_FAIL: {
      return Object.assign({}, state, {
        transactionValues: [],
        transactionValuesLoading: false,
        transactionValuesLoaded: false,
        transactionValuesFailed: true,
      });
    }


  /*Vendor*/


    case actions.ActionTypes.VENDOR: {
      return Object.assign({}, state, {
        vendor: [],
        vendorLoading: true,
        vendorLoaded: false,
        vendorFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_SUCCESS: {
      let  vendorData:any;
      let vendors=[]

      vendorData= Object.keys(payload.data).forEach(key => {
        if(key){
        if(key !== 'companyName'){
          vendors.push ({
            "name":key,
            "value":payload.data[key]
          });   
        }
      }
    });
      let vendorval:any={};
      vendorval.val=payload.data
      vendorval.array=vendors;
      return Object.assign({}, state, {
        vendor: vendorval,
        vendorLoading: false,
        vendorLoaded: true,
        vendorFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_FAIL: {
      return Object.assign({}, state, {
        vendor: [],
        vendorLoading: false,
        vendorLoaded: false,
        vendorFailed: true,
      });
    }

/*Sales graph*/

    case actions.ActionTypes.SALESGRAPH: {
      return Object.assign({}, state, {
        salesgraph: [],
        salesgraphLoading: true,
        salesgraphLoaded: false,
        salesgraphFailed: false,
      });
    }

    case actions.ActionTypes.SALESGRAPH_SUCCESS: {
      return Object.assign({}, state, {
        salesgraph: payload.data,
        salesgraphLoading: false,
        salesgraphLoaded: true,
        salesgraphFailed: false,
      });
    }

    case actions.ActionTypes.SALESGRAPH_FAIL: {
      return Object.assign({}, state, {
        salesgraph: [],
        salesgraphLoading: false,
        salesgraphLoaded: false,
        salesgraphFailed: true,
      });
    }

  /*weekly sales product*/
  case actions.ActionTypes.WEEKLYSALESPRODUCT: {
    return Object.assign({}, state, {
      weeklysalesproduct: [],
      weeklysalesproductLoading: true,
      weeklysalesproductLoaded: false,
      weeklysalesproductFailed: false,
    });
  }

  case actions.ActionTypes.WEEKLYSALESPRODUCT_SUCCESS: {
    return Object.assign({}, state, {
      weeklysalesproduct: payload.data,
      weeklysalesproductLoading: false,
      weeklysalesproductLoaded: true,
      weeklysalesproductFailed: false,
    });
  }

  case actions.ActionTypes.WEEKLYSALESPRODUCT_FAIL: {
    return Object.assign({}, state, {
      weeklysalesproduct: [],
      weeklysalesproductLoading: false,
      weeklysalesproductLoaded: false,
      weeklysalesproductFailed: true,
    });
  }

/*Top 10 Weekly Products*/
  case actions.ActionTypes.TOPTENWEEKLYPRODUCTS: {
    return Object.assign({}, state, {
      toptenweeklyproducts: [],
      toptenweeklyproductsLoading: true,
      toptenweeklyproductsLoaded: false,
      toptenweeklyproductsFailed: false,
    });
  }

  case actions.ActionTypes.TOPTENWEEKLYPRODUCTS_SUCCESS: {
    return Object.assign({}, state, {
      toptenweeklyproducts: payload.data,
      toptenweeklyproductsLoading: false,
      toptenweeklyproductsLoaded: true,
      toptenweeklyproductsFailed: false,
    });
  }

  case actions.ActionTypes.TOPTENWEEKLYPRODUCTS_FAIL: {
    return Object.assign({}, state, {
      toptenweeklyproducts: [],
      toptenweeklyproductsLoading: false,
      toptenweeklyproductsLoaded: false,
      toptenweeklyproductsFailed: true,
    });
  }


    default: {
      return state;
    }
  }
}

export const getOrderCount = (state: DashboardState) => state.orderCount;
export const getOrderCountLoading = (state: DashboardState) =>
  state.orderCountLoading;
export const getOrderCountLoaded = (state: DashboardState) =>
  state.orderCountLoaded;
export const getOrderCountFailed = (state: DashboardState) =>
  state.orderCountFailed;

/* Product Count Actions */
export const getProductCount = (state: DashboardState) => state.productCount;
export const getProductCountLoading = (state: DashboardState) =>
  state.productCountLoading;
export const getProductCountLoaded = (state: DashboardState) =>
  state.productCountLoaded;
export const getProductCountFailed = (state: DashboardState) =>
  state.productCountFailed;

/* Customer Count Actions */
export const getCustomerCount = (state: DashboardState) => state.customerCount;
export const getCustomerCountLoading = (state: DashboardState) =>
  state.customerCountLoading;
export const getCustomerCountLoaded = (state: DashboardState) =>
  state.customerCountLoaded;
export const getCustomerCountFailed = (state: DashboardState) =>
  state.customerCountFailed;

/* Top selling product list Actions */
export const getTopSellingProducts = (state: DashboardState) =>
  state.topSellingProducts;
export const getTopSellingProductsLoading = (state: DashboardState) =>
  state.topSellingProductsLoading;
export const getTopSellingProductsLoaded = (state: DashboardState) =>
  state.topSellingProductsLoaded;
export const getTopSellingProductsFailed = (state: DashboardState) =>
  state.topSellingProductsFailed;

/* sales order list Actions */
export const getSalesOrderList = (state: DashboardState) =>
  state.salesOrderList;
export const getSalesOrderListLoading = (state: DashboardState) =>
  state.salesOrderListLoading;
export const getSalesOrderListLoaded = (state: DashboardState) =>
  state.salesOrderListLoaded;
export const getSalesOrderListFailed = (state: DashboardState) =>
  state.salesOrderListFailed;

/* visitor log list Actions */
export const getVisitorLogs = (state: DashboardState) => state.visitorLogs;
export const getVisitorLogsLoading = (state: DashboardState) =>
  state.visitorLogsLoading;
export const getVisitorLogsLoaded = (state: DashboardState) =>
  state.visitorLogsLoaded;
export const getVisitorLogsFailed = (state: DashboardState) =>
  state.visitorLogsFailed;

/* recent visitor list Actions */
export const getRecentVisitorList = (state: DashboardState) =>
  state.recentVisitorList;
export const getRecentVisitorListLoading = (state: DashboardState) =>
  state.recentVisitorListLoading;
export const getRecentVisitorListLoaded = (state: DashboardState) =>
  state.recentVisitorListLoaded;
export const getRecentVisitorListFailed = (state: DashboardState) =>
  state.recentVisitorListFailed;

/* recent selling produce list Actions */
export const getRecentSellingProduct = (state: DashboardState) =>
  state.recentSellingProduct;
export const getRecentSellingProductLoading = (state: DashboardState) =>
  state.recentSellingProductLoading;
export const getRecentSellingProductLoaded = (state: DashboardState) =>
  state.recentSellingProductLoaded;
export const getRecentSellingProductFailed = (state: DashboardState) =>
  state.recentSellingProductFailed;


  // dashboard count

export const dashboardCount = (state: DashboardState) =>
  state.dashboardCount;
export const dashboardCountLoading = (state: DashboardState) =>
  state.dashboardCountLoading;
export const dashboardCountLoaded = (state: DashboardState) =>
  state.dashboardCountLoaded;
export const dashboardCountFailed = (state: DashboardState) =>
  state.dashboardCountFailed;

//  averageOrderValue
  export const   averageOrderValue = (state: DashboardState) =>
  state.averageOrderValue;
export const   averageOrderValueLoading = (state: DashboardState) =>
  state.averageOrderValueLoading;
export const   averageOrderValueLoaded = (state: DashboardState) =>
  state.averageOrderValueLoaded;
export const   averageOrderValueFailed = (state: DashboardState) =>
  state.averageOrderValueFailed;

/*Total Customers*/

export const   totalCustomersList = (state: DashboardState) =>
state.totalCustomersList;
export const   totalCustomersListLoading = (state: DashboardState) =>
state.totalCustomersListLoading;
export const   totalCustomersListLoaded = (state: DashboardState) =>
state.totalCustomersListLoaded;
export const   totalCustomersListFailed = (state: DashboardState) =>
state.totalCustomersListFailed;

/*Top selling product count*/

export const   getTopSellingProductListCount = (state: DashboardState) =>
state.getTopSellingProductListCount;
export const   getTopSellingProductListCountLoading = (state: DashboardState) =>
state.getTopSellingProductListCountLoading;
export const   getTopSellingProductListCountLoaded = (state: DashboardState) =>
state.getTopSellingProductListCountLoaded;
export const   getTopSellingProductListCountFailed = (state: DashboardState) =>
state.getTopSellingProductListCountFailed;

    /*Total Revenue*/

export const   totalRevenue = (state: DashboardState) =>
state.totalRevenue;
export const   totalRevenueLoading = (state: DashboardState) =>
state.totalRevenueLoading;
export const   totalRevenueLoaded = (state: DashboardState) =>
state.totalRevenueLoaded;
export const   totalRevenueFailed = (state: DashboardState) =>
state.totalRevenueFailed;

/*Total Orders*/

export const   totalOrders = (state: DashboardState) =>
state.totalOrders;
export const   totalOrdersLoading = (state: DashboardState) =>
state.totalOrdersLoading;
export const   totalOrdersLoaded = (state: DashboardState) =>
state.totalOrdersLoaded;
export const   totalOrdersFailed = (state: DashboardState) =>
state.totalOrdersFailed;

/*New Customers*/

export const   newCustomers = (state: DashboardState) =>
state.newCustomers;
export const   newCustomersLoading = (state: DashboardState) =>
state.newCustomersLoading;
export const   newCustomersLoaded = (state: DashboardState) =>
state.newCustomersLoaded;
export const   newCustomersFailed = (state: DashboardState) =>
state.newCustomersFailed;

//  averageConversionRatio
export const   averageConversionRatio = (state: DashboardState) =>
state.averageConversionRatio;
export const   averageConversionRatioLoading = (state: DashboardState) =>
state.averageConversionRatioLoading;
export const   averageConversionRatioLoaded = (state: DashboardState) =>
state.averageConversionRatioLoaded;
export const   averageConversionRatioFailed = (state: DashboardState) =>
state.averageConversionRatioFailed;



    
  /*Vendor*/

export const   vendor = (state: DashboardState) =>
state.vendor;
export const   vendorLoading = (state: DashboardState) =>
state.vendorLoading;
export const   vendorLoaded = (state: DashboardState) =>
state.vendorLoaded;
export const   vendorFailed = (state: DashboardState) =>
state.vendorFailed;



/*Transaction values*/

export const   transactionValues = (state: DashboardState) =>
state.transactionValues;
export const   transactionValuesLoading = (state: DashboardState) =>
state.transactionValuesLoading;
export const   transactionValuesLoaded = (state: DashboardState) =>
state.transactionValuesLoaded;
export const   transactionValuesFailed = (state: DashboardState) =>
state.transactionValuesFailed;



/*Sales graph*/

export const   salesgraph = (state: DashboardState) =>
state.salesgraph;
export const   salesgraphLoading = (state: DashboardState) =>
state.salesgraphLoading;
export const   salesgraphLoaded = (state: DashboardState) =>
state.salesgraphLoaded;
export const   salesgraphFailed = (state: DashboardState) =>
state.salesgraphFailed;

/*weekly sales product*/

export const   weeklysalesproduct = (state: DashboardState) =>
state.weeklysalesproduct;
export const   weeklysalesproductLoading = (state: DashboardState) =>
state.weeklysalesproductLoading;
export const   weeklysalesproductLoaded = (state: DashboardState) =>
state.weeklysalesproductLoaded;
export const   weeklysalesproductFailed = (state: DashboardState) =>
state.weeklysalesproductFailed;

/*Top 10 Weekly Products*/

export const   toptenweeklyproducts = (state: DashboardState) =>
state.toptenweeklyproducts;
export const   toptenweeklyproductsLoading = (state: DashboardState) =>
state.toptenweeklyproductsLoading;
export const   toptenweeklyproductsLoaded = (state: DashboardState) =>
state.toptenweeklyproductsLoaded;
export const   toptenweeklyproductsFailed = (state: DashboardState) =>
state.toptenweeklyproductsFailed;