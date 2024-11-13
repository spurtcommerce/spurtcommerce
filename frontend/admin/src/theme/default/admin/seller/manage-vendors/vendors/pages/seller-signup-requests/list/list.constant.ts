import { getBulkConfig } from "src/theme/default/admin/shared/components/bulk-action/bulk-action.constant";

export const customTable = [

  // {
  //   displayName: '',
  //   id: 'id',
  //   type: 'checkBox',
  //   checked: true,
  //   isEnableSelectall: true,
  //   customStyle: {
  //     trow: {
  //       width: '35px'
  //     },
  //     tbody: {
  //       width: {
  //         width: '35px'
  //       }
  //     }
  //   }
  // },


  {
    displayName: 'marketplace.seller.VendorName',
    id: 'sellerName',
    type: 'default',
    checked: true,
    customStyle: {
      tbody: {
        class: 'fw-semibold'
      }
    }
  },


  {
    displayName: 'marketplace.seller.Companyname',
    id: 'companyName',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'Sales.Orders.Email',
    id: 'emailId',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'marketplace.seller.Industry',
    id: 'industrys',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'myShop.BusinessType',
    id: 'businessType',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'myShop.BusinessSegment',
    id: 'businessSegment',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'marketplace.seller.Country',
    id: 'countryName',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'Customers.Customer.phoneNumber',
    id: 'companyMobileNumber',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'Sales.Orders.Email',
    id: 'emailId',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'marketplace.seller.Created On',
    id: 'createdDate',
    type: 'date',
    format: 'dd/mm/yyyy',
    checked: true,
  },
  // {
  //   displayName: 'marketplace.common.Action',
  //   type: 'template',
  //   id: 'ab',
  //   key: 'Edit',
  //   checked: true,
  //   customStyle: {
  //     trow: {
  //       class: 'text-center'
  //     },
  //     tbody: {
  //       class: 'text-center'
  //     }
  //   },
  //   buttons: [
  //     {
  //       displayName: 'Verify',
  //       image: '',
  //       customStyle: {
  //         tbody: {
  //           width: '50%',
  //           height: '3%',
  //           class: 'btn btn-sm primary verifybutton'
  //         }
  //       }
  //     },
  //   ]
  // },
];

export const filterFields = {

  SellerName: {
    label: 'marketplace.seller.VendorName',
    name: 'Seller Name',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the seller name'
  },

  Email: {
    label: 'Customers.Customer.E-mailId',
    name: 'Email',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Customers.Customer.EntertheEmailId',
  },

  Company: {
    label: 'marketplace.seller.Companyname',
    name: 'Company',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the company name',
  },

  Industry: {
    label: 'marketplace.seller.Industry',
    name: 'Industry',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the industry'
  },

  Date: {
    label: 'Customers.Customer.DateAdded',
    name: 'Received On',
    aliasName: '',
    validatiors: [],
    type: 'date',
    placeholder: 'Customers.Customer.DD/MM/YEAR',
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
export const badgeMappings = {
  1: { text: 'marketplace.common.Approved', class: 'active' },
  2: { text: 'marketplace.common.Rejected', class: 'inactive' },
  0: { text: 'marketplace.common.Pending', class: 'waiting' }
};

export function removeEmptyKeys(obj: any): any {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '' || obj[key] === "undefined/undefined/undefined") {
        delete obj[key];
      }
    }
  }
  return obj;
}

export const bulkAction = getBulkConfig(['itemSelected', 'exportExcel', 'exportExcelAll', 'resetCheckbox'])