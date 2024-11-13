


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
      displayName: 'Settings.nav.User',
      id: 'userName',
      type: 'default',
      checked: true,
      filterColName: 'Settings.nav.User'
    },
    {
      displayName: 'Settings.data.Module',
      id: 'module',
      type: 'default',
      checked: true,
      filterColName: 'Settings.data.Module'
    },
    {
      displayName: 'Settings.data.Description',
      id: 'description',
      type: 'default',
      checked: true,
      filterColName: 'Settings.data.Description'
    },
    {
        displayName: 'Settings.data.Date',
        id: 'createdDate',
        type: 'date',
        checked: true,
        filterColName: 'Settings.data.Date',
        customStyle: {
          tbody: {
              class: 'text-nowrap'
          }
        }
      },
  
    {
      displayName: 'Settings.data.Browser',
      id: 'browser',
      type: 'template',
      checked: true,
      filterColName: 'Settings.data.Date',
    },
  ]
  
  
  export const badgeStatusMappings = {
    1: { text: 'common.Active', class: 'active' },
    0: { text: 'common.In-Active', class: 'inactive' }
  };