



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
      displayName: 'Settings.Local.Emailtemplate.Title',
      id: 'title',
      type: 'default',
      checked: true,
      filterColName: 'Settings.Local.Emailtemplate.Title'
    },
    // {
    //   displayName: 'Settings.Local.Emailtemplate.',
    //   id: 'title',
    //   type: 'default',
    //   checked: true,
    //   filterColName: 'Settings.Local.Emailtemplate.Title'
    // },
    {
      displayName: 'Settings.Local.Emailtemplate.Subject',
      id: 'subject',
      type: 'default',
      checked: true,
      filterColName: 'Settings.Local.Emailtemplate.Subject',
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
      displayName: 'Settings.Local.Emailtemplate.Content',
      id: 'ElementEmailContent',
      type: 'template',
      checked: true,
      filterColName: 'Settings.Local.Emailtemplate.Content',
   
    },
    {
      displayName: 'Settings.Local.Emailtemplate.DynamicFieldsRef',
      id: 'itemsDynamic',
      type: 'template',
      checked: true,
      filterColName: 'Settings.Local.Emailtemplate.DynamicFieldsRef',
   
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
      displayName: 'Settings.Local.Emailtemplate.Action',
      id: 'browser',
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
  ]
  
  
  
  
  export const badgeStatusMappings = {
    1: { text: 'common.Active', class: 'active' },
    0: { text: 'common.In-Active', class: 'inactive' }
  };