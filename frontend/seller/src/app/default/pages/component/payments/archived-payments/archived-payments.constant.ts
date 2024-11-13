import { getBukConfig } from "../../../../shared/components/bulk-action/bulk-action.constant";
// Dynamic cloumns 
export const fields = {
  'payments.OrderID': true,
  'payments.DateTime': true,
  'payments.Buyer': true,
  'payments.Amount': true,
  'payments.Commission': true,
  'payments.NetAmount': true,
};
//Remove empty keys
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
        class:'tableAlign',
      },
      tbody: {
        class:'tableAlign',
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
    displayName: 'payments.DateTime',
    id: 'createdDate',
    type: 'date',
    checked: true,
    filterColName: 'payments.DateTime',
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
    id: 'amountWithSymble',
    type: 'default',
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
    id: 'commissionAmountWithSymble',
    type: 'default',
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
    id: 'netAmountWithSymble',
    type: 'default',
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
// Content Translate
export const contentTranslate = {
  success: 'content.ArchivedPayments',
  failed: ''
};
//Bulk Actions
export const bulkActions = getBukConfig(['resetCheckbox', 'exportExcel','exportExcelAll'])