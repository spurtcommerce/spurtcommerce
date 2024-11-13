import { getBukConfig } from "../../../../../../../../src/app/default/shared/components/bulk-action/bulk-action.constant";

// Filter dynamic columns
export const fields = {
  'Sales.allorders.order id': true,
  'Sales.allorders.customer name': true,
  'Sales.backorders.Order Created': true,
  'Sales.allorders.total amount': true,
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
//Obj form
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
    type: 'number',
    placeholder:'Sales.allorders.total amount',
    
  },
  Search: {
    name: 'Search',
    label:'',
    validatiors: [],
    type: 'text',
    placeholder:'common.Search OrderIdName',
  }
}
// Content 
export const contentTranslate = {
  success: 'content.backorderContent',
  failed: ''
};
//Bulk Action
export const bulkActions = getBukConfig(['resetCheckbox', 'exportExcel','exportExcelAll'])

  
