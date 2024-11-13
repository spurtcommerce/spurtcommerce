import { getBulkConfig } from "src/theme/default/admin/shared/components/bulk-action/bulk-action.constant";

export const customTable = [

  {
    displayName: '',
    id: 'categoryId',
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
    displayName: 'catalog.product.Image',
    id: 'images',
    type: 'image',
    checked: true,
    customStyle: {
      tbody: {
        class: 'product-image'
      }
    }
  },
  {
    displayName: 'catalog.categories.CategoryName',
    id: 'name',
    type: 'default',
    checked: true,
    customStyle: {
      tbody: {
        class: 'fw-semibold'
      }
    }
  },
  {
    displayName: 'catalog.categories.Levels',
    id: 'levels',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'catalog.categories.SortOrder',
    id: 'sortOrder',
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
    displayName: 'catalog.product.Status',
    type: 'template',
    id: 'status',
    key: 'checkBox',
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
        name: 'Edit', img: 'assets/img/edit.svg', displayName: 'marketplace.common.Edit',
      },
      {
        name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete',
      }
    ]
  }
]


export const pageSizeOptions = [
  { id: 2 },
  { id: 5 },
  { id: 10 },
  { id: 15 },
  { id: 20 },
];

export const filterFields = {
  Categories: {
    label: 'marketplace.common.Categories',
    name: 'categories',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'catalog.product.Enter Category Name',
  },
  Status: {
    label: 'marketplace.common.Status',
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

export const bulkActions = getBulkConfig(['itemSelected', 'exportExcel', 'exportExcelAll', 'resetCheckbox']);