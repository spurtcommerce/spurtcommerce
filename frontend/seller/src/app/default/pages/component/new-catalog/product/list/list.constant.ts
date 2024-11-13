import { getBukConfig } from "../../../../../../../../src/app/default/shared/components/bulk-action/bulk-action.constant";


  
  
  // filter dynamic columns
export const fields = {
  'common.Product Title': true,
  'common.Category': true,
  'common.Price': true,
  'common.Updated On': true,
  'common.Status': true,
  'common.Approval Status': true,
  'myShop.Preview':true
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
    displayName: 'common.Product Title',
    id: 'names',
    type: 'template',
    checked: true,
    filterColName: 'common.Product Title',
    customStyle:{
      tbody: {
        'max-width' : '500px',
        class: 'ellipsis-name',
        isShowTitle: true
       }
    }
  },
  {
    displayName: 'common.Category',
    id: 'pending',
    type: 'template',
    checked: true,
    filterColName: 'common.Category',
    customStyle: {
      trow: {
        class: 'text-center'
       },
      tbody: {
        class:'text-center text-nowrap',
      },

    }
  },

  {
    displayName: 'common.Price',
    id: 'price',
    type: 'template',
    checked: true,
    filterColName: 'common.Price',
    customStyle: {
      trow: {
       class: 'text-end'
      }
    }
  },

  {
    displayName: 'common.Updated On',
    id: 'createdDate',
    type: 'date',
    checked: true,
    filterColName: 'common.Updated On',
    customStyle: {
      tbody: {
        class: 'text-nowrap'
      }
    }
  },
  {
    displayName: 'common.Status',
    id: 'activeStatus',
    type: 'template',
    checked: true,
    filterColName: 'common.Status',
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
    displayName: 'common.Approval Status',
    id: 'approvalStatus',
    type: 'template',
    checked: true,
    filterColName: 'common.Approval Status',
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
    displayName: 'myShop.Preview',
    id: 'preview',
    type: 'template',
    checked: true,
    filterColName: 'myShop.Preview',
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class:'text-center text-nowrap',
      },

    }
  },
  {
    displayName: 'Action',
    type: 'threeDotMenu',
    checked: true,
    menuData: [
      {
        name: 'Edit', img: 'assets/imgs/edit.svg',displayName:'common.Edit'
      },
      {
        name: 'Delete', img: 'assets/imgs/delete.svg',displayName:'common.Delete'
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
  },
]

// Sort 

export const sort = [
{
  label: 'common.Product Title',
  name: 'productName',
  type: 'string'
},
{
  label: 'common.Updated On',
  name: 'modifiedDate',
  type: 'date'
},
{
  label: 'common.Category',
  name: 'stock',
  type: 'number'
},
{
  label: 'common.SKU',
  name: 'sku',
  type: 'string'
},


]


export const contentTranslate = {
  success: 'content.productListcontentSuccess',
  failed: 'content.productListContent'
};



export const objForm = {
  ProductTitle: {
    name: 'Product Title',
    label: 'common.Product Title',
    aliasName:'',
    validatiors: [],
    type: 'text',
    placeholder:'common.Product Title',

  },
  Price: {
    name: 'Price',
    label: 'Catalog.share.Price',
    validatiors: [],
    type: 'text',
    placeholder:'Catalog.share.Price',
    
  },

  Search: {
    label:'',
    name: 'Search',
    validatiors: [],
    type: 'text',
    placeholder:'placeholder.productSearch',
    
  },
  Status: {
    name: 'Status',
    label:'Select the status',
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
// image:'assets/imgs/inactive-products.svg'
export const badgeMappings = {
  1: { text: 'common.Approved Product', class: 'active' },
  2: { text: 'common.Rejected Product', class: 'inactive',image:'assets/imgs/info-outline.svg'},
  0: { text: 'common.Waiting Product', class: 'waiting' }
};

export const badgeStatusMappings = {
  1: { text: 'common.Active', class: 'active' },
  0: { text: 'common.Inactive', class: 'inactive' }
};
export const bulkActions=getBukConfig(['resetCheckbox', 'exportExcel','exportExcelAll','bulkUpload'])