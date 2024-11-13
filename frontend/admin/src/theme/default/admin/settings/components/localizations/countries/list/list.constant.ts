// removeEmpty Keys 
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

// reusable Form 
export const filterFields = {
  Search: {
    label: 'marketplace.common.Search',
    name: 'search',
    aliasName: '',
    validators: [],
    type: 'text',
    placeholder: 'marketplace.common.Search',
  }
};

// table heading
export const customTable = [
  {
    displayName: 'Settings.Local.Country.CountryName',
    id: 'name',
    type: 'default',
    checked: true,
    filterColName: 'Settings.Local.Country.CountryName'
  },
  {
    displayName: 'Settings.Local.Country.IsoCode-1',
    id: 'isoCode2',
    type: 'default',
    checked: true,
    filterColName: 'Settings.Local.Country.IsoCode-1'
  },
  {
    displayName: 'Settings.Local.Country.IsoCode-2',
    id: 'isoCode3',
    type: 'default',
    checked: true,
    filterColName: 'Settings.Local.Country.IsoCode-2'
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
    }
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
  }
];

export const badgeStatusMappings = {
  1: { text: 'common.Active', class: 'active' },
  0: { text: 'common.In-Active', class: 'inactive' }
};
