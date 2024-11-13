// filter dynamic columns
export const fields = {
  'Sales.stockupdate.SKU': true,
  'Sales.shared.Product Name': true,
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
  CustomerName: {
    name: 'Product Name',
    label: 'Sales.shared.Product Name',
    validatiors: [],
    type: 'text',
    placeholder: 'common.Product Name',
  },
  OrderID: {
    name: 'SKU',
    label: 'Sales.stockupdate.SKU',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'common.SKU'
  },
  Search: {
    name: 'Search',
    label: '',
    validatiors: [],
    type: 'text',
    placeholder: 'common.SearchProductSku',
  }
}

// Content Translate
export const contentTranslate = {
  success: 'content.StockUpdate',
  failed: ''
};