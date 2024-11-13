import { getBukConfig } from "../../../../../../../../src/app/default/shared/components/bulk-action/bulk-action.constant";
// filter dynamic columns
export const fields = {
    'Sales.shared.orders id': true,
    'Sales.shared.date time': true,
    'Sales.allorders.customer name': true,
    'Sales.allorders.status': true,
    'Sales.shared.action': true,
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

// Table heading
export const customTable = [
  {
    displayName: '',
    id: 'id',
    type: 'checkBox',
    checked: true,
    optionalFilterName: 'Checkbox',
    isEnableSelectall: true,
    customStyle: {
      trow: {
        class: 'tableAlign',
      },
      tbody: {
        class: 'tableAlign',
      }
    }
  },
 
  {
    displayName: 'Sales.shared.orders id',
    id: 'pending',
    type: 'template',
    checked: true,
    filterColName: 'Sales.shared.orders id',
    customStyle: {
      tbody: {
        class: 'fw-medium',
      }
    }
  },
  {
    displayName: 'newReq.order Line number',
    id: 'subOrderId',
    type: 'default',
    checked: true,
    filterColName: 'newReq.order Line number',
  },
  {
    displayName: 'Sales.allorders.order date',
    id: 'createdDate',
    type: 'date',
    checked: true,
    filterColName: 'Sales.allorders.order date',
    customStyle: {
      tbody: {
        class: 'text-nowrap'

      }
    }
  },
 
  {
    displayName: 'newReq.Order quality',
    id: 'quantity',
    type: 'default',
    checked: true,
    filterColName: 'newReq.Order quality'
  },

  {
    displayName: 'Sales.allorders.customer name',
    id: 'customerFirstName',
    type: 'default',
    checked: true,
    filterColName: 'Sales.allorders.customer name'
  },

  {
    displayName: 'Sales.allorders.total amount',
    id: 'total',
    type: 'currencySymbol',
    checked: true,
    filterColName: 'Sales.allorders.total amount',
    customStyle: {
      trow: {
        class: 'text-end price',
      },
      tbody: {
        class: 'text-end price',
      }
    }

  },

  {
    displayName: 'Sales.allorders.location',
    id: 'shippingCity',
    type: 'default',
    checked: true,
    filterColName: 'Sales.allorders.location'
  },

  {
    displayName: 'Sales.allorders.status',
    id: 'color',
    type: 'template',
    checked: true,
    filterColName: 'Sales.allorders.status',
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    }
  },
  {
    displayName: 'newReq.Fullfillment status',
    id: 'orderFullfillmentStatusName',
    type: 'template',
    checked: true,
    filterColName: 'newReq.Fullfillment status',
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    }
  },
  {
    displayName: 'newReq.Payment status',
    id: 'payment',
    type: 'template',
    checked: true,
    filterColName: 'newReq.Payment status',
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    }
  },

  {
    displayName: 'Sales.shared.action',
    type: 'buttonGroup',
    checked: true,
    filterColName: 'Sales.shared.action',
    buttons: [
      {
        displayName: 'Revoke',
        image: '',
        key: 'Revoke',
        customStyle: {
          trow: {
            class: 'text-center'
            },
          tbody: {
            class: 'primary button-reg link-text text-center'
          }
        }
      },
    ]
  }
]  

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

//Filter
export const objForm = {
  StartDate: {
    name: 'fromDate',
    label: 'payments.FromDate',
    aliasName:'',
    validatiors: [],
    type: 'date',
    placeholder:'payments.FromDate'
  },
  EndDate: {
    name: 'toDate',
    label: 'payments.ToDate',
    aliasName:'',
    validatiors: [],
    type: 'date',
    placeholder:'payments.ToDate',
  },
  Search: {
    name: 'Search',
    label:'',
    validatiors: [],
    type: 'text',
    placeholder:'newReq.SearchOrderId,CustomerName,SKU',
  }
}
// Bulk Actions
export const bulkActions=getBukConfig(['resetCheckbox', 'exportExcel','exportExcelAll']);
// Content 
export const contentTranslate = {
  success: 'common.ArchiveDescription',
  failed: ''
};
