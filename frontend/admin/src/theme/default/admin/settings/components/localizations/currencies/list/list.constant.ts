
  
  // table heading
  export const customTable = [
  
    {
      displayName: 'Settings.Local.Currency.CurrencyTitle',
      id: 'title',
      type: 'default',
      checked: true,
      filterColName: 'Settings.Local.Currency.CurrencyTitle'
    },
    {
      displayName: 'Settings.Local.Currency.Code',
      id: 'code',
      type: 'default',
      checked: true,
      filterColName: 'Settings.Local.Currency.Code'
    },
    {
      displayName: 'Settings.Local.Currency.LastUpdate',
      id: 'createdDate',
      type: 'date',
      checked: true,
      filterColName: 'Settings.Local.Currency.LastUpdate'
    },
    {
      displayName: 'Settings.Local.Emailtemplate.Status',
      id: 'productStatus',
      type: 'template',
      checked: true,
      filterColName: 'Settings.Local.Emailtemplate.Status',
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
      displayName: 'Settings.Local.Zone.Action',
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
  
  
  
  
  export const badgeStatusMappings = {
    1: { text: 'common.Active', class: 'active' },
    0: { text: 'common.In-Active', class: 'inactive' }
  };


  export const filterFields = {
    search: {
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

