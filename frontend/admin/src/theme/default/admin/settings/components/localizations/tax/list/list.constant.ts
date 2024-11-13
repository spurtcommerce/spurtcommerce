// table heading
export const customTable = [

  {
    displayName: 'Settings.Local.Tax.TaxName',
    id: 'title',
    type: 'default',
    checked: true,
    filterColName: 'uniformListColumName.orderId'
  },
  {
    displayName: 'Settings.Local.Tax.Value',
    id: 'value',
    type: 'default',
    checked: true,
    filterColName: 'uniformListColumName.customerName'
  },
  {
    displayName: 'Settings.Local.Tax.Status',
    id: 'productStatus',
    type: 'template',
    checked: true,
    filterColName: 'Settings.Local.Tax.Status',
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    },
  },

  {
    displayName: 'Settings.Local.Country.Action',
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
        name: 'Edit', img: 'assets/img/edit.svg',  displayName: 'marketplace.common.Edit'
      },
      {
        name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete'
      }
    ]
  },
]

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


export const filterFields = {
  search: {
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