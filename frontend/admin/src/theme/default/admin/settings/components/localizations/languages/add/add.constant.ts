import { Validators } from "@angular/forms";

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


  export const formFields = {
    name: {
    label: "Settings.Local.Language.LanguageName",
    name: "name",
    validatiors: [
        Validators.required,
    Validators.maxLength(32)],
    type: "text",
    placeholder: "Settings.Local.Language.LanguageName",
    mandatory: true,
 
  }, 
  Code: {
    label: "Settings.Local.Language.Code",
    name: "Code",
    validatiors: [
        Validators.required,
        Validators.maxLength(5)
      ],
    type: "text",
    placeholder: "Settings.Local.Language.Code",
    mandatory: true,
 
  }, 
  sortorder: {
    label: "Settings.Local.Language.SortOrder",
    name: "sortorder",
    validatiors: [ Validators.required],
    type: "number",
    placeholder: "Settings.Local.Language.SortOrder",
    mandatory: true,
   },
   status: {
    label: "Settings.Local.Language.SelectStatus",
    name: "status",
    validatiors: [Validators.required],
    type: "ngSelect",
    placeholder: "Settings.Local.Language.SelectStatus",
    mandatory: true,
    customData: {
      data: [
        { id: 1,name:"Active" },
        { id: 0 ,name :"In-Active"},
      ],
      key: "name",
      value: "id",

    },
 
  },



};
