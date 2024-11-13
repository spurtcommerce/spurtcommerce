

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
    metaTitle: {
    label: "Settings.SiteSettings.MetaTitle",
    name: "metaTitle",
    validatiors: [
        Validators.required,Validators.maxLength(70)],
    type: "text",
    placeholder: "Settings.SiteSettings.MetaTitle",
    mandatory: false,
 
  }, 

  MetaTagDescription: {
    label: "Settings.SiteSettings.MetaTagDescription",
    name: "metaTagKeyword",
    validatiors: [ Validators.required,Validators.maxLength(160)],
    type: "text",
    placeholder: "Settings.SiteSettings.MetaTagDescription",
    mandatory: false,
   },
   MetatagKeyword: {
    label: "Settings.SiteSettings.MetatagKeyword",
    name: "metaTagDescription",
    validatiors: [
        Validators.required,
        Validators.maxLength(255)
      ],
    type: "text",
    placeholder: "Settings.SiteSettings.MetatagKeyword",
    mandatory: false,
 
  }, 




};
