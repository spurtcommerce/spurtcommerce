import { style } from "@angular/animations";
import { getBukConfig } from "../../../../../../../../src/app/default/shared/components/bulk-action/bulk-action.constant";

// filter dynamic columns
export const fields = {
  'uniformListColumName.orderId': true,
  'uniformListColumName.customerName': true,
  'uniformListColumName.orderDate': true,
  'uniformListColumName.totalAmount': true,
  'uniformListColumName.location': true,
  'uniformListColumName.status': true,
  'uniformListColumName.toggle':true
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

// table heading
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
    displayName: 'uniformListTable.orderId',
    id: 'orderPrefixId',
    type: 'default',
    checked: true,
    filterColName: 'uniformListColumName.orderId',
  },
  {
    displayName: 'uniformListTable.customerName',
    id: 'customerFirstName',
    type: 'default',
    checked: true,
    filterColName: 'uniformListColumName.customerName',
    
  },
  {
    displayName: 'uniformListTable.orderRate',
    id: 'createdDate',
    type: 'date',
    checked: true,
    filterColName: 'uniformListColumName.orderDate'
  },

  {
    displayName: 'uniformListTable.totalAmount',
    id: 'total',
    type: 'default',
    checked: true,
    filterColName: 'uniformListColumName.totalAmount'
  },
  {
    displayName: 'uniformListTable.location',
    id: 'shippingCity',
    type: 'default',
    checked: true,
    filterColName: 'uniformListColumName.location'
  },

  {
    displayName: 'uniformListTable.status',
    id: 'orderStatusName',
    type: 'default',
    checked: true,
    filterColName: 'uniformListColumName.status'
  },
  {
    displayName: 'uniformListTable.productStatus',
    type: 'template',
    id: 'productStatus',
    key: 'checkBox',
    checked: true,
  },

  {
    displayName: 'uniformListTable.active',
    type: 'template',
    id: 'activeStatus',
    key: 'checkBox',
    checked: true,
  },
  {
    displayName: 'uniformListTable.toggle',
    id: 'imageMenuStatus',
    type: 'toggle',
    checked: true,
    filterColName: 'uniformListColumName.toggle'
  },


  {
    displayName: 'uniformListTable.action',
    type: 'threeDotMenu',
    checked: true,
    menuData: [
      {
        name: 'Invoice', img: 'assets/imgs/edit.svg',displayName:'Invoice'
      },
      {
        name: 'Archive', img: 'assets/imgs/delete.svg',displayName:'Archive'
      }
    ]
  },

  {
    displayName: 'uniformListTable.action',
    type: 'buttonGroup',
    checked: true,
    buttons: [
      {
        displayName: 'Revoke',
        image: '',
        key: 'Edit',
        customStyle: {
          tbody: {
            width: '50%',
            height: '3%',
            class: 'primary button-reg'
          }
        }
      },
    ]
  },
]


export const objForm = {
  OrderID: {
    name: 'Order ID',
    label: 'uniformList.orderID',
    aliasName:'',
    validatiors: [],
    type: 'text',
    placeholder:'uniformList.orderID',

  },
  CustomerName: {
    name: 'Customer Name',
    label: 'uniformList.customerName',
    validatiors: [],
    type: 'text',
    placeholder:'uniformList.customerName'
  },
  TotalAmount: {
    name: 'Total Amount',
    label: 'uniformList.totalAmount',
    validatiors: [],
    type: 'text',
    placeholder:'uniformList.totalAmount',
    
  },
  UpdateOn: {
    label: 'uniformList.updateOn',
    name: 'Update On',
    validatiors: [],
    type: 'date',
    placeholder:'uniformList.updateOn',
    
  },
  Search: {
    name: 'Search',
    validatiors: [],
    type: 'text',
    placeholder:'uniformList.enterthekeyword',
    
  },

  Status: {
    name: 'Status',
    validatiors: [],
    type: 'ngSelect',
    placeholder:'Select the status',
    customData: {
      data: [
        { name: 'Active', id: 1 },
        { name: 'Inactive', id: 0 },
      ],
      key: 'name',
      value: 'id',
    },
  },
}

export const badgeMappings = {
  1: { text: 'common.Approved Product', class: 'active' },
  2: { text: 'common.Rejected Product', class: 'inactive' },
  default: { text: 'common.Waiting Product', class: 'pending' }
};

export const badgeStatusMappings = {
  1: { text: 'common.Active', class: 'active' },
  2: { text: 'common.Inactive', class: 'inactive' }
};
export const bulkActions=getBukConfig(['resetCheckbox', 'exportExcel','exportExcelAll','bulkUpload','bulkDelete'])


// const sample:{
//      width: '1.5rem',
//     padding-right: '0rem'
// }