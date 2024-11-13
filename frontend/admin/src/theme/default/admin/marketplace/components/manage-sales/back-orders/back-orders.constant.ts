export const customTable = [  
    // {
    //   displayName: 'Sales.Orders.OrderId',
    //   id: 'orderProductPrefixId',
    //   type: 'default',
    //   checked: true,
    //   customStyle: {
    //     class: 'id'
    //   }
    // },
    // {
    //   displayName: 'Sales.Orders.CustomerName',
    //   id: 'customerFirstName',
    //   type: 'default',
    //   checked: true,
    // },
    // {
    //   displayName: 'Sales.Orders.TotalAmount',
    //   id: 'price',
    //   type: 'template',
    //   checked: true,
  
    // },
    // {
    //   displayName: 'Sales.Orders.DateAdded',
    //   id: 'createdDate',
    //   type: 'date',
    //   checked: true,
    // },
    // {
    //   displayName: 'marketplace.product.VendorName',
    //   id: 'name',
    //   type: 'default',
    //   checked: true,
    // },
    // {
    //   displayName: 'marketplace.sales.NoofVendors',
    //   id: 'vendorCount',
    //   type: 'default',
    //   checked: true,
    //   customStyle: {
    //     trow: {
    //       class: 'text-center'
    //     },
    //     tbody: {
    //       class: 'text-center'
    //     }
    //   }
    // },
    // {
    //   displayName: 'marketplace.product.NoofItems',
    //   id: 'productCount',
    //   type: 'default',
    //   checked: true,
    //   customStyle: {
    //     trow: {
    //       class: 'text-center'
    //     },
    //     tbody: {
    //       class: 'text-center'
    //     }
    //   }
    // },
    // {
    //   displayName: 'marketplace.common.Action',
    //   id: 'menu',
    //   type: 'threeDotMenu',
    //   checked: true,
    //   menuData: [
    //     {
    //       name: 'Edit', img: 'assets/img/edit.svg', displayName: 'marketplace.common.Edit'
    //     },
    //   ],
    //   customStyle: {
    //     trow: {
    //       class: 'text-center'
    //     },
    //     tbody: {
    //       class: 'text-center'
    //     }
    //   }
    // }
  ]
  
  export const filterFields = {
    OrderId: {
        label:'Sales.SalesPlaceholder.OrderId',
        name: 'Order Id',
        aliasName:'',
        validatiors: [],
        type: 'text',
        placeholder:'Sales.SalesPlaceholder.OrderId',
    },
    OrderLineNo: {
      label:'Sales.Orders.OrderLineNo',
      name: 'Order Line No',
      aliasName:'',
      validatiors: [],
      type: 'text',
      placeholder:'Sales.Orders.OrderLineNo',
  },
    CustomerName: {
        label:'Sales.Orders.CustomerName',
        name: 'Buyer Name',
        aliasName:'',
        validatiors: [],
        type: 'text',
        placeholder:'Sales.Orders.CustomerName',
    },
    DateAdded: {
      label: 'Sales.Orders.OrderCreated',
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