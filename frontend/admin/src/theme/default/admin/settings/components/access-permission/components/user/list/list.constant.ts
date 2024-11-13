




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
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.common.Search',
  },
};

// table heading
export const customTable = [

  {
    displayName: 'Settings.User.fullName',
    id: 'firstandlastname',
    type: 'template',
    checked: true,
    filterColName: 'Settings.User.fullName'
  },
  {
    displayName: 'Settings.User.EmailId',
    id: 'username',
    type: 'default',
    checked: true,
    filterColName: 'Settings.User.EmailId'
  },
  {
    displayName: 'Settings.User.Role',
    id: 'role',
    type: 'template',
    checked: true,
    filterColName: 'Settings.User.Role'
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
          name:'permission',img:'assets/img/elliptical-h.svg',displayName:'Settings.nav.Permission'
        }
      ]
    },


]






export const badgeStatusMappings = {
  1: { text: 'common.Active', class: 'active' },
  0: { text: 'common.In-Active', class: 'inactive' }
};
