import { getBulkConfig } from "src/theme/default/admin/shared/components/bulk-action/bulk-action.constant";

export const customTable = [
  {
    displayName: '',
    id: 'pageId',
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
    displayName: 'CMS.Pages.Title',
    id: 'title',
    type: 'template',
    checked: true,
    customStyle: {
      tbody: {
        class: 'fw-semibold'
      }
    }
  },

  {
    displayName: 'common.Page Group',
    id: 'pageGroupName',
    type: 'template',
    checked: true,
  },

  {
    displayName: 'CMS.Pages.Status',
    type: 'template',
    id: 'pennding',
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
    displayName: 'CMS.Pages.Action',
    id: 'menu',
    type: 'threeDotMenu',
    checked: true,
    menuData: [
      {
        name: 'Edit', img: 'assets/img/edit.svg', displayName: 'marketplace.common.Edit',
      },
      {
        name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete',
      }
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
  Search: {
    label: '',
    name: 'search',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'CMS.Pages.Search',
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

export const bulkActions = getBulkConfig(['itemSelected', 'delete', 'resetCheckbox']);