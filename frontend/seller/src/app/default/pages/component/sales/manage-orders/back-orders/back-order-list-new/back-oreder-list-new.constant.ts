import { getBukConfig } from "../../../../../../../../../src/app/default/shared/components/bulk-action/bulk-action.constant";

// Filter dynamic columns
export const fields = {
  'Sales.allorders.order id': true,
  'Sales.allorders.customer name': true,
  'Sales.backorders.Order Created': true,
  'Sales.allorders.total amount': true,
  'Product Name':true,
  'SKU':true,
  'quantity':true
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
  sku: {
    name: 'sku',
    label:'SKU',
    validatiors: [],
    type: 'text',
    placeholder:'SKU',
    
  },
  Search: {
    name: 'Search',
    label:'',
    validatiors: [],
    type: 'text',
    placeholder:'common.Search OrderIdName',
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

]
// Content 
// export const contentTranslate = {
//   success: 'content.backorderContent',
//   failed: ''
// };

export const imagesList = {
  success: 'assets/imgs/info-circle-green.svg',
  failed: 'assets/imgs/info-circle-orange.svg'
};

export const contentTranslate = {
  success: 'content.backorderContent',
  failed: `content.backOrdersFaild`
};

export const className ={
  failed: 'faild'
}

export function configureAlertConfig(data='',content = contentTranslate.success, image = imagesList.success, className = '') {
  return {
      content:content,
      image: image,
      class: className,
      appendData:data
  };
};




//Bulk Action
export const bulkActions = getBukConfig(['fullFillNow','resetCheckbox', 'exportExcel','exportExcelAll'])

  
