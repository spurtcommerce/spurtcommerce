import { getBukConfig } from "../../../../../../../../src/app/default/shared/components/bulk-action/bulk-action.constant";

// Filter dynamic columns
export const fields = {
  'CRM.Customer': true,
  'CRM.Email Address': true,
  'CRM.MobileNumber': true,
  'CRM.Group': true,
  'CRM.Address': true,
  'CRM.Purchased': true,
  'CRM.Status': true,
};

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
        class: 'tableAlign',
      },
      tbody: {
        class: 'tableAlign',
      }
    }
  },
  {
    displayName: 'CRM.Customer',
    id: 'firstName',
    type: 'template',
    checked: true,
    filterColName: 'CRM.Customer',
  },

  {
    displayName: 'CRM.Email Address',
    id: 'email',
    type: 'default',
    checked: true,
    filterColName: 'CRM.Email Address',
  },

  {
    displayName: 'CRM.MobileNumber',
    id: 'mobileNumber',
    type: 'default',
    checked: true,
    filterColName: 'CRM.MobileNumber',
  },

  {
    displayName: 'CRM.Group',
    id: 'groupName',
    type: 'default',
    checked: true,
    filterColName: 'CRM.Group',
  },

  {
    displayName: 'CRM.Address',
    id: 'shippingAddress1',
    type: 'template',
    checked: true,
    filterColName: 'CRM.Address',
  },

  {
    displayName: 'CRM.Purchased',
    id: 'totalOrderProductId',
    type: 'template',
    checked: true,
    filterColName: 'CRM.Purchased',
  },
  {
    displayName: 'CRM.Status',
    id: 'isActive',
    type: 'template',
    checked: true,
    filterColName: 'CRM.Status',
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
// Obj form
export const objForm = {
  CustomerName: {
    label: "Customer Name",
    name: 'customerName',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter Customer Name'
  },
  GroupName: {
    label: "Group Name",
    name: 'groupName',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter Group Name'
  },
  Search: {
    name: 'Search',
    label: "",
    validatiors: [],
    type: 'text',
    placeholder: 'uniformList.enterthekeyword',

  },
  Status: {
    name: 'Status',
    label: 'common.Status',
    validatiors: [],
    type: 'ngSelect',
    placeholder: 'Select the status',
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
// Content translate
export const contentTranslate = {
  success: 'content.Customer',
};
// Bulk Actions
export const bulkActions = getBukConfig(['resetCheckbox', 'exportExcel', 'exportExcelAll', 'bulkUpload'])
