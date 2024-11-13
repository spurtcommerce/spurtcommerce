



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
      displayName: 'Settings.nav.Name',
      id: 'displayName',
      type: 'default',
      checked: true,
      filterColName: 'Settings.nav.Name'
    },
    {
      displayName: 'Settings.nav.Module',
      id: 'pluginType',
      type: 'default',
      checked: true,
      filterColName: 'Settings.nav.Module'
    },
   
    {
        displayName: 'common.Status',
        id: 'status',
        type: 'template',
        checked: true,
        filterColName: 'common.Status'
      },

    {
      displayName: 'Settings.nav.Action',
      id:'productAction',
      type: 'template',
      checked: true,
      filterColName:'Settings.nav.Action'
      
    },
    
  
  ]
  
  
  
  
    
  