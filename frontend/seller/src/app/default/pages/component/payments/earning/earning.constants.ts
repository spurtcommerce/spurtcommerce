import { getBukConfig } from "../../../../shared/components/bulk-action/bulk-action.constant";
// dynamic fields
export const fields = {
  'Sales.payments.Product': true,
  'Sales.stockupdate.SKU': true,
  'Sales.payments.Total Sold': true,
  'Sales.payments.revenue': true,
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
        class:'tableAlign',
      },
      tbody: {
        class:'tableAlign',
      }
    }
  },
  {
    displayName: 'Sales.payments.Product',
    id: 'name',
    type: 'template',
    checked: true,
    filterColName: 'Sales.payments.Product'
  },
  {
    displayName: 'Sales.stockupdate.SKU',
    id: 'sku',
    type: 'default',
    checked: true,
    filterColName: 'Sales.stockupdate.SKU'
  },

  {
    displayName: 'Sales.payments.Total Sold',
    id: 'totalSold',
    type: 'default',
    checked: true,
    filterColName: 'Sales.payments.Total Sold',
    customStyle: {
      trow: {
          width: '20%',
          height: '3%',
          class: 'text-center'
      },
      tbody: {
          class: 'text-center'

      }
  },
  },
  {
    displayName: 'Sales.payments.revenue',
    id: 'totalRevenue',
    type: 'template',
    checked: true,
    filterColName: 'Sales.payments.revenue',
    customStyle: {
      trow: {
        class: 'text-end price',
      },
      tbody: {
        class: 'text-end price',
      }
    }
  }
]

// Obj form
export const objForm = {
    productName: {
    name: 'product Name',
    label: 'payments.ProductTitle',
    aliasName:'',
    validatiors: [],
    type: 'text',
    placeholder:'payments.ProductTitle'
  },
  
  sku: {
    name: 'sku',
    label: 'payments.Sku',
    validatiors: [],
    type: 'text',
    placeholder:'payments.Sku',
  },

  Search: {
    label: '',
    name: 'Search',
    validatiors: [],
    type: 'text',
    placeholder:'Earnings.Search',
  },
}
export const contentTranslate = {
  success: 'content.Earnings',
  failed: ''
};

//Bulk Actions
export const bulkActions = getBukConfig(['resetCheckbox', 'exportExcel','exportExcelAll'])