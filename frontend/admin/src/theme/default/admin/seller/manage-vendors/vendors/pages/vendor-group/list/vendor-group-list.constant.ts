
import { getBulkConfig } from "../../../../../../../admin/shared/components/bulk-action/bulk-action.constant";

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
    displayName: 'marketplace.seller.GroupName',
    id: 'edit',
    type: 'template',
    checked: true,
  },

  {
    displayName: 'marketplace.seller.Vendors',
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
    displayName: 'marketplace.seller.Commission(%)',
    id: 'commission',
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
    displayName: 'fullfillment.Update On',
    id: 'modifiedDate',
    type: 'date',
    checked: true,
  },
  {
    displayName: 'marketplace.seller.Status',
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
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    },
    menuData: [
      {
        name: 'Edit', img: 'assets/img/edit.svg', displayName: 'marketplace.seller.Edit'
      },
      {
        name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.seller.Delete'
      },
    ]
  }
];

export const filterFields = {

  GroupName: {
    label: 'placeholder.Group Name',
    name: 'Group Name',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'placeholder.Group Name',
  },

  Status: {
    label: 'Customers.Customer.Status',
    name: 'status',
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
  1: { text: 'common.Active', class: 'active' },
  0: { text: 'common.In-Active', class: 'inactive' }
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
export const bulkAction = getBulkConfig(['itemSelected', 'exportExcel', 'exportExcelAll', 'resetCheckbox'])