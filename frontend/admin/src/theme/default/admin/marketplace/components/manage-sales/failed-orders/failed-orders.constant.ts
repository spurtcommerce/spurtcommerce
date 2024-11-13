export const customTable = [  
    {
      displayName: 'Sales.Orders.OrderId',
      id: 'orderPrefixId',
      type: 'template',
      checked: true,
      customStyle: {
        class: 'id'
      }
    },
    {
      displayName: 'Sales.Orders.DateAdded',
      id: 'createdDate',
      type: 'date',
      checked: true,
    },
      {
      displayName: 'Sales.Orders.Quantity',
      id: 'quantity',
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
      id: 'shippingFirstname',
      type: 'default',
      checked: true,
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
      displayName: 'Sales.Orders.DateModified',
      id: 'modifiedDate',
      type: 'date',
      checked: true,
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
      }
    },
  ]
  
  export const filterFields = {
    OrderId: {
        label:'Sales.Orders.OrderId',
        name: 'orderId',
        aliasName:'',
        validatiors: [],
        type: 'text',
        placeholder:'Sales.SalesPlaceholder.OrderId',
    },
    CustomerName: {
        label:'Sales.Orders.CustomerName',
        name: 'customerName',
        aliasName:'',
        validatiors: [],
        type: 'text',
        placeholder:'Sales.Orders.CustomerName',
    },
    DateAdded: {
      label: 'Sales.Orders.DateAdded',
      name: 'Date',
      aliasName:'',
      validatiors: [],
      type: 'date',
      placeholder:'dd/mm/yyyy',
    },
    Search: {
      label: 'marketplace.common.Search',
      name: 'search',
      aliasName:'',
      validatiors: [],
      type: 'text',
      placeholder:'marketplace.common.Search',
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