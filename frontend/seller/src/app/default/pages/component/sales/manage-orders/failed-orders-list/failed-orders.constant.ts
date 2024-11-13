import { getBukConfig } from "../../../../../../../../src/app/default/shared/components/bulk-action/bulk-action.constant";

// filter dynamic columns
export const fields = {
  'Sales.allorders.order id': true,
  'Sales.allorders.customer name': true,
  'Sales.allorders.total amount': true,
  'Sales.failedorders.order ceated': true,
};
// Remove empty keys
export function removeEmptyKeys(obj: any): any {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key];
      }
    }
  }
  return obj;
}
// Obj form
export const objForm = {
  OrderID: {
    name: 'Order ID',
    label: 'Sales.allorders.order id',
    aliasName:'',
    validatiors: [],
    type: 'text',
    placeholder:'Sales.allorders.order id'
  },
  CustomerName: {
    name: 'Customer Name',
    label:'Sales.allorders.customer name',
    validatiors: [],
    type: 'text',
    placeholder:'Sales.allorders.customer name',
    
  },
  TotalAmount: {
    name: 'Total Amount',
    label:'Sales.allorders.total amount',
    validatiors: [],
    type: 'text',
    placeholder:'Sales.allorders.total amount',
    
  },
  Search: {
    name: 'Search',
    label:'',
    validatiors: [],
    type: 'text',
    placeholder:'common.searchFailedOrder',
    
  }
}

// Sort 

export const sort = [{
  label: 'Sales.allorders.order id',
  name: 'orderId',
  type: 'number'
},
{
  label: 'Sales.allorders.customer name',
  name: 'buyerName',
  type: 'string'
},
{
  label: 'Sales.allorders.order date',
  name: 'orderDate',
  type: 'date'
},
{
  label: 'Sales.allorders.total amount',
  name: 'total',
  type: 'number'
},
{
  label: 'Sales.allorders.location',
  name: 'location',
  type: 'string'
},
]

// Content 
export const contentTranslate = {
  success: 'content.failOrderedcontent',
  failed: ''
};
// Bulk Actions
export const bulkActions = getBukConfig(['resetCheckbox', 'exportExcel','exportExcelAll'])

  
