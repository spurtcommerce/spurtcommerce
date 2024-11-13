import { getBukConfig } from "../../../../../../../../../src/app/default/shared/components/bulk-action/bulk-action.constant";

// filter dynamic columns
export const fields = {
  'Sales.allorders.order id': true,
  'newReq.order Line number': true,
  'Sales.allorders.customer name': true,
  'Sales.allorders.order date': true,
  'newReq.Order quality': true,
  'Sales.allorders.total amount': true,
  'Sales.allorders.location': true,
  'newReq.Fullfillment status': true,
  'Sales.allorders.status': true,
  'newReq.Payment status': true
};

// Remove Empty keys
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
    displayName: 'Sales.allorders.order id',
    id: 'pending',
    type: 'template',
    checked: true,
    filterColName: 'Sales.allorders.order id',
    customStyle: {
      tbody: {
        class: 'fw-medium text-nowrap',
      }
    }
  },
  {
    displayName: 'newReq.order Line number',
    id: 'subOrderId',
    type: 'default',
    checked: true,
    filterColName: 'newReq.order Line number',
    customStyle: {
      tbody: {
        class: 'text-nowrap',
      }
    }
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
    filterColName: 'newReq.Order quality',
    customStyle:{
tbody:{
  class:'text-center'
}
    }
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
    id: 'fullfillment',
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
    displayName: 'uniformListColumName.action',
    type: 'threeDotMenu',
    checked: true,
    menuData: [
      {
        name: 'Invoice', img: 'assets/imgs/edit.svg', displayName: 'Sales.allorders.invoice'
      },
      {
        name: 'Archive', img: 'assets/imgs/Archive.svg', displayName: 'Sales.allorders.archive'
      }
    ],
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }

    }
  }
]

// Obj form
export const objForm = {
  OrderID: {
    name: 'Order ID',
    label: 'Sales.allorders.order id',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Sales.allorders.order id'
  },
  CustomerName: {
    name: 'Customer Name',
    label: 'Sales.allorders.customer name',
    validatiors: [],
    type: 'text',
    placeholder: 'Sales.allorders.customer name',

  },
  Tags: {
    name: 'Tags',
    label: 'Tags',
    validatiors: [],
    type: 'text',
    placeholder: 'Tags',
  },
  TotalAmount: {
    name: 'Total Amount',
    label: 'Sales.allorders.total amount',
    validatiors: [],
    type: 'number',
    placeholder: 'Sales.allorders.total amount',

  },
  Search: {
    name: 'Search',
    label: '',
    validatiors: [],
    type: 'text',
    placeholder: 'common.SearchIdNameAmount',

  },
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


//Bulk Actions
export const bulkActions = getBukConfig(['resetCheckbox', 'exportExcel', 'exportExcelAll', 'bulkUpload'])