// View product table heading
export const customTable1 = [
  {
    displayName: 'CRM.Product',
    id: 'productName',
    type: 'template',
    checked: true,
    filterColName: 'CRM.Product',
  },
  {
    displayName: 'common.Total view product',
    id: 'productViewedCount',
    type: 'default',
    checked: true,
    filterColName: 'common.Total view product',
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
    displayName: 'common.Viewed on',
    id: 'createdDate',
    type: 'date',
    checked: true,
    filterColName: 'common.Viewed on',
    customStyle: {
      tbody: {
        class: 'text-nowrap'
      }
    }
  }
]

// Order product table heading

export const customTable2 = [
  {
    displayName: 'CRM.Product',
    id: 'productName',
    type: 'template',
    checked: true,
    filterColName: 'CRM.Product',
  },
  {
    displayName: 'common.orderId',
    id: 'orderPrefixId',
    type: 'default',
    checked: true,
    filterColName: 'common.orderId',

  },
  {
    displayName: 'common.orderLineNo',
    id: 'orderProductPrefixId',
    type: 'default',
    checked: true,
    filterColName: 'common.orderLineNo',
  },

  {
    displayName: 'CMS.Review.Status',
    id: 'orderStatus',
    type: 'template',
    checked: true,
    filterColName: 'CMS.Review.Status',
  },
  {
    displayName: 'common.Ordered on',
    id: 'orderedDate',
    type: 'date',
    checked: true,
    filterColName: 'common.Ordered on',
    customStyle: {
      class: 'text-nowrap'
    }
  },
]
// Obj form
export const objForm = {
  ProductName: {
    name: 'ProductName',
    label: 'Catalog.common.ProductName',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'common.Enter Product Name',
  },
  SKU: {
    name: 'SKU',
    label: 'Catalog.common.SKU',
    validatiors: [],
    type: 'text',
    placeholder: 'common.EnterSKU',
  }
}

