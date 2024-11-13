import { getBukConfig } from "../../../../shared/components/bulk-action/bulk-action.constant";
// dynamic fields 
export const fields = {
  'payments.OrderID': true,
  'uniformListColumName.orderDate': true,
  'payments.Buyer': true,
  'payments.Amount': true,
  'payments.Commission': true,
  'payments.NetAmount': true,
  'payments.Settlement': true,
  'payments.Action': true
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
        class:'check-col',
      },
      tbody: {
        class:'check-col',
      }
    }
  },
  {
    displayName: 'payments.OrderID',
    id: 'orderProductPrefixId',
    type: 'default',
    checked: true,
    filterColName: 'payments.OrderID',
    customStyle: {
      tbody: {
        class: 'fw-medium',
      }
    }
  },
  {
    displayName: 'uniformListTable.orderRate',
    id: 'createdDate',
    type: 'date',
    checked: true,
    filterColName: 'uniformListColumName.orderDate',
    customStyle: {
      tbody: {
        class: 'text-nowrap',
      }
    }
  },
  {
    displayName: 'payments.Buyer',
    id: 'customerFirstName',
    type: 'template',
    checked: true,
    filterColName: 'payments.Buyer'
  },

  {
    displayName: 'payments.Amount',
    id: 'amount',
    type: 'currencySymbol',
    checked: true,
    filterColName: 'payments.Amount',
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
    displayName: 'payments.Commission',
    id: 'commissionAmount',
    type: 'currencySymbol',
    checked: true,
    filterColName: 'payments.Commission',
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
    displayName: 'payments.NetAmount',
    id: 'NetAmount',
    type: 'currencySymbol',
    checked: true,
    filterColName: 'payments.NetAmount',
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
    displayName: 'payments.Settlement',
    id: 'image',
    type: 'image',
    checked: true,
    filterColName: 'payments.Settlement',
     customStyle: {
      trow:{
        class:'text-center'
      },
      tbody: {
        class: 'text-center insideImg',
      }
    }
    
  },
  {
    displayName: 'payments.Action',
    type: 'threeDotMenu',
    checked: true,
    menuData: [
      {
        name: 'Invoice', img: 'assets/imgs/invoice.svg',displayName:'Invoice'
      },
      {
        name: 'Archive', img: 'assets/imgs/Archive.svg',displayName:'Archive'
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
  fromDate: {
    name: 'From Date',
    label: 'payments.FromDate',
    aliasName:'',
    validatiors: [],
    type: 'date',
    placeholder:'payments.FromDate'
  },
  
  toDate: {
    name: 'To Date',
    label: 'payments.ToDate',
    validatiors: [],
    type: 'date',
    placeholder:'payments.ToDate',
  },

  Search: {
    label: '',
    name: 'Search',
    validatiors: [],
    type: 'text',
    placeholder:'Settlements.Search',
  }
}
// Content
export const contentTranslate = {
  success: 'content.SettlementsList',
  failed: ''
};
// Bulk actions
export const bulkActions = getBukConfig(['resetCheckbox', 'exportExcel','exportExcelAll'])