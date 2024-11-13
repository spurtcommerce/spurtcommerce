export const customTable = [
  {
    displayName: 'Sales.Orders.OrderId',
    id: 'orderPrefixId',
    type: 'template',
    checked: true,
  },
  {
    displayName: 'Sales.Orders.DateAdded',
    id: 'createdDate',
    type: 'date',
    checked: true,
  },
  {
    displayName: 'Sales.Orders.Quantity',
    id: 'productCount',
    type: 'default',
    checked: true,
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
    displayName: 'Sales.Orders.CustomerName',
    id: 'shippingFirstName',
    type: 'default',
    checked: true,
  },

  {
    displayName: 'marketplace.product.VendorName',
    id: 'vendorNames',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'marketplace.sales.NoofVendors',
    id: 'vendorCount',
    type: 'default',
    checked: true,
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
    displayName: 'Sales.Orders.TotalAmount',
    id: 'price',
    type: 'template',
    checked: true,
    customStyle: {
      trow: {
        class: 'text-right'
      },
      tbody: {
        class: 'text-right'
      }
    }
  },
  {
    displayName: 'marketplace.common.Status',
    id: 'status',
    type: 'template',
    checked: true,
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    },
  },
  {
    displayName: 'Sales.Orders.Payment Status',
    id: 'paymentStatus',
    type: 'template',
    checked: true,
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    },
  },
  {
    displayName: 'marketplace.common.Action',
    id: 'menu',
    type: 'threeDotMenu',
    checked: true,
    menuData: [
      {
        name: 'Edit', img: 'assets/img/edit.svg', displayName: 'marketplace.common.Edit'
      },
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

export const badgeStatusMappings = {
  0: { text: 'Sales.Orders.Unpaid', class: 'waiting' },
  1: { text: 'Sales.Orders.Paid', class: 'active' },
  2: { text: 'Sales.Orders.Failed', class: 'inactive' }
};

export const filterFields = {
  OrderId: {
    label: 'Sales.Orders.OrderId',
    name: 'orderId',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Sales.SalesPlaceholder.OrderId',
  },
  CustomerName: {
    label: 'Sales.Orders.CustomerName',
    name: 'customerName',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Sales.Orders.CustomerName',
  },
  DateAdded: {
    label: 'Sales.Orders.DateAdded',
    name: 'Date',
    aliasName: '',
    validatiors: [],
    type: 'date',
    placeholder: 'dd/mm/yyyy',
  },
  Search: {
    label: 'marketplace.common.Search',
    name: 'search',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.common.Search',
  },
};


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