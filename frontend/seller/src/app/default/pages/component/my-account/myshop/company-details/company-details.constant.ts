export const capabilitiesTable = [

    {
        displayName: 'Capabilities',
        id: 'data',
        type: 'default',
        checked: true,
    },

    {
        displayName: 'Status',
        id: 'pending',
        type: 'template',
        checked: true,
    },


    {
        displayName: 'Action',
        type: 'imageMenu',
        checked: true,
        menuData: [
            {
                name: 'Edit', img: 'assets/imgs/edit.svg'
            },
            {
                name: 'Delete', img: 'assets/imgs/delete.svg'
            }
        ]
    }
]

// ---------------------------------------------------Documents--------------------------
export const DocumentsTable = [

    {
        displayName: 'Certificate Type',
        id: 'certificationType',
        type: 'default',
        checked: true,
    },
    {
        displayName: 'Reference No',
        id: 'refrenceNo',
        type: 'default',
        checked: true,
    },
    {
        displayName: 'Name',
        id: 'name',
        type: 'default',
        checked: true,
    },
    {
        displayName: 'Issued By',
        id: 'issuedBy',
        type: 'default',
        checked: true,
    },
    {
        displayName: 'Validate From',
        id: 'validFrom',
        type: 'default',
        checked: true,
    },
    {
        displayName: 'Validate To',
        id: 'validTo',
        type: 'default',
        checked: true,
    },

    {
        displayName: 'Staus',
        id: 'pending',
        type: 'template',
        checked: true,
    },


    {
        displayName: 'Action',
        type: 'threeDotMenu',
        checked: true,
        menuData: [
            {
                name: 'Edit', img: 'assets/imgs/edit.svg'
            },
            {
                name: 'Delete', img: 'assets/imgs/delete.svg'
            }
        ]
    }
]

export const objForm = [
    {
      name: 'Name',
      validatiors: [],
      type: 'text',
      placeholder:'Enter  name'
    },
    {
      name: 'Reference No',
      validatiors: [],
      type: 'text',
      placeholder:'Enter Reference No'
    },
    {
      name: 'Validate From',
      validatiors: [],
      type: 'date',
      placeholder:'Enter the Validate From'
    },
    {
        name: 'Validate To',
        validatiors: [],
        type: 'date',
        placeholder:'Enter the Validate From'
      }
    
  
  ];
  export const pageSizeOptions = [
    { id: 2 },
    { id: 5 },
    { id: 10 },
    { id: 15 },
    { id: 20 },
  ];



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