import { Validators } from "@angular/forms";

export const filterFormObj = {
    documentTitle: {
        name: 'Document Title',
        validatiors: [],
        type: 'ngSelect',
        placeholder: 'Select...',
        customData: {
            data: [],
            key: '',
            value: '',
        },
    },
    filename: {
        name: 'Filename',
        validatiors: [],
        type: 'text',
        placeholder: 'Filename',

    },
}
export const uploadDocumentTable = [

    {
        displayName: 'Document Title',
        id: 'documentTitle',
        type: 'default',
        checked: true,
        customStyle: {
            trow: {
                width: '25%'
            }
        }
    },

    {
        displayName: 'Filename',
        id: 'fileName',
        type: 'default',
        checked: true,
        customStyle: {
            trow: {
                width: '25%'
            }
        }
    },

    {
        displayName: 'Status',
        id: 'isVerified',
        type: 'template',
        checked: true,
        customStyle: {
            trow: {
                width: '20%'
            }
        }
    },

    {
        displayName: 'Last Uploaded On',
        id: 'lastUploadedOn',
        type: 'default',
        checked: true,
        customStyle: {
            trow: {
                width: '20%'
            }
        }
    },
    {
        displayName: 'Action',
        type: 'threeDotMenu',
        checked: true,
        customStyle: {
            trow: {
                color: 'black',
                width: '10%'
            }
        },
        menuData: [
            {
                name: 'Download', img: 'assets/imgs/download-dark.svg'
            },
            {
                name: 'Timeline', img: 'assets/imgs/timeline.svg'
            }
        ]
    }
];

export const addDocumentsFormObj = {
    documentTitle: {
        name: 'Document Title',
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder:'Select...',
        mandatory: true,
        customData: {
            data: [],
            key: '',
            value: '',
        },
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

   // filter dynamic columns
export const fields = {
    'DOCUMENT TITLE': true,
    'FILE NAME': true,
    'STATUS': true,
    'LAST UPLOADED ON': true,
};

 