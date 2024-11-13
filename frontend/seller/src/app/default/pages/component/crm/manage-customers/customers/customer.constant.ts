import { getBukConfig } from "../../../../../../../../src/app/default/shared/components/bulk-action/bulk-action.constant";


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
              class: 'tableAlign',
            },
            tbody: {
              class: 'tableAlign',
            }
          }
    },
    {
        displayName: 'CRM.Group Name',
        id: 'name',
        type: 'default',
        checked: true,
        filterColName: 'CRM.Group Name'
    },
    {
        displayName: 'CRM.Permission',
        type: 'template',
        id: 'pennding',
        key: 'checkBox',
        checked: true,
        filterColName: 'CRM.Permission'
      },
    {
        displayName: 'CRM.Status',
        id: 'isActive',
        type: 'toggle',
        checked: true,
        filterColName: 'CRM.Status',
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
        displayName: '',
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
    }
]

// filter dynamic columns
export const fields = {
    'CRM.Group Name': true,
    'CRM.Permission': true,
    'CRM.Status': true,
  };  

export const objForm = {
    GroupName: {
        label: "CRM.Group Name",
        name: 'groupName',
        validatiors: [],
        type: 'text',
        placeholder: "CRM.EnterCustomerGroupName"
    },
    Status: {
        name: 'Status',
        label: 'common.Status',
        validatiors: [],
        type: 'ngSelect',
        placeholder: 'Select the status',
        customData: {
            data: [
                { name: 'Active', id: 1 },
                { name: 'In-Active', id: 0 },
            ],
            key: 'name',
            value: 'id',
        },
    },
    Search: {
        name: 'Search',
        label:'',
        validatiors: [],
        type: 'text',
        placeholder:'uniformList.enterthekeyword',
      },
}


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
export const bulkActions=getBukConfig(['resetCheckbox','bulkUpload'])