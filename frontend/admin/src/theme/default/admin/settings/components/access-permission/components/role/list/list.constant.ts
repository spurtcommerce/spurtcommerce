



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
    Search: {
      label: 'marketplace.common.Search',
      name: 'search',
      aliasName: '',
      validators: [],
      type: 'text',
      placeholder: 'marketplace.common.Search',
    },
  
  };
  
  // table heading
  export const customTable = [
  
    {
      displayName: 'Settings.Role.Name',
      id: 'name',
      type: 'default',
      checked: true,
      filterColName: 'uniformListColumName.orderId'
    },
    {
      displayName: 'Settings.Role.Status',
      id: 'productStatus',
      type: 'template',
      checked: true,
      filterColName: 'uniformListColumName.status',
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
        },
        {
          name:'role',img:'assets/img/elliptical-h.svg', displayName:'Settings.nav.Permission'
        }
      ]
    },
    
  
  ]
  
  
  
  
    
    
  export const badgeStatusMappings = {
    1: { text: 'common.Active', class: 'active' },
    0: { text: 'common.In-Active', class: 'inactive' }
  };
  