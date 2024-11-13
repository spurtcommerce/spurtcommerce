import { getBulkConfig } from "src/theme/default/admin/shared/components/bulk-action/bulk-action.constant";

export const customTable = [
  {
    displayName: '',
    id: 'id',
    type: 'checkBox',
    checked: true,
    isEnableSelectall: true,
    customStyle: {
      trow: {
        class: 'check-table'
      },
      tbody: {
        class: 'check-table'
      }
    }
  },
  {
    displayName: 'marketplace.seller.Logo',
    id: 'image',
    type: 'image',
    checked: true,
    customStyle: {
      tbody: {
        class: 'product-image'
      }
    }
  },
  {
    displayName: 'marketplace.seller.VendorID',
    id: 'sellerId',
    type: 'template',
    checked: true,
    customStyle: {
      tbody: {
         class: 'detail'
      }
      
    }
  },
  
  {
    displayName: 'marketplace.seller.VendorName',
    id: 'detail',
    type: 'template',
    checked: true,
    customStyle: {
      tbody: {
        class: 'detail'
      }
    }
  },
  {
    displayName: 'marketplace.seller.Products',
    id: 'productList',
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
  {
    displayName: 'marketplace.seller.CompanyName',
    type: 'default',
    id: 'companyName',
    checked: true,
  },
  {
    displayName: 'marketplace.seller.Email',
    type: 'default',
    id: 'customerEmail',
    checked: true,
  },
  // {
  //   displayName: 'marketplace.seller.CompanyName',
  //   type: 'default',
  //   id: 'companyName',
  //   checked: true,
  // },
  {
    displayName: 'Seller Group',
    type: 'default',
    id: 'sellerGroup',
    checked: true,
  },
  {
    displayName: 'marketplace.seller.UpdatedOn',
    type: 'date',
    id: 'modifiedDate',
    checked: true,
  },

  {
    displayName: 'marketplace.seller.ApprovalStatus',
    id: 'approvalStatus',
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

  

  {
    displayName: 'marketplace.seller.UserStatus',
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

  {
    displayName: 'marketplace.common.Action',
    id: 'menu',
    type: 'threeDotMenu',
    checked: true,
    menuData: [
      {
        name: 'Set-Commission', img: 'assets/img/percent.svg', displayName: 'common.Set Commission'
      },
      {
        name: 'Edit', img: 'assets/img/edit.svg', displayName: 'marketplace.seller.Edit'
      },
      {
        name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.seller.Delete'
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

export const filterFields = {

  SellerId: {
    label: 'marketplace.seller.VendorID',
    name: 'Seller Id',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.seller.VendorID',
  },

  SellerName: {
    label: 'marketplace.seller.VendorName',
    name: 'Seller Name',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.seller.VendorName',
  },

  CompanyName: {
    label: 'marketplace.seller.CompanyName',
    name: 'Company Name',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.seller.CompanyName',
  },

  Email: {
    label: 'marketplace.seller.Email',
    name: 'Email',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.seller.Email',
  },

  Status: {
    label: 'Customers.Customer.Status',
    name: 'Status',
    aliasName: '',
    validatiors: [],
    type: 'ngSelect',
    placeholder: 'marketplace.common.Selectthestatus',
    customData: {
      data: [
        { name: 'Active', id: '1' },
        { name: 'In-Active', id: '0' },
      ],
      key: 'name',
      value: 'id',
    },
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

export const badgeStatusMappings = {
  0: { text: 'common.In-Active', class: 'inactive' },
  1: { text: 'common.Active', class: 'active' },
  2: { text: 'common.In-Active', class: 'inactive' },
  3: { text: 'common.In-Active', class: 'inactive' }
};


export const bulkAction = getBulkConfig(['itemSelected', 'exportExcel', 'exportExcelAll', 'delete', 'resetCheckbox'])

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