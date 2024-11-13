import { Validators } from "@angular/forms";

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