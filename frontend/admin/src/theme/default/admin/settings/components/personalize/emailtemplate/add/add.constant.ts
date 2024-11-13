export function isDynamicFieldInContent(emailTemplate: any): boolean {
    const dynamicFields = emailTemplate.dynamicFieldsRef
      .split(',')
      .map((field: any) => field.slice(1, -1)); // Remove curly braces from dynamicFieldsRef
  
    for (const field of dynamicFields) {
      if (!emailTemplate.content.includes(`{${field}}`)) {
        return true;
      }
    }
    return false;
  }
  

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
    Title: {
    label: "Settings.Local.Emailtemplate.Title",
    name: "title",
    validatiors: [
        Validators.required],
    type: "text",
    placeholder: "Settings.Local.Emailtemplate.Title",
    mandatory: true,
 
  }, 
  Subject: {
    label: "Settings.Local.Emailtemplate.Subject",
    name: "subject",
    validatiors: [
        Validators.required,
      ],
    type: "text",
    placeholder: "Settings.Local.Emailtemplate.Subject",
    mandatory: true,
    isDisabled: true
 
  }, 
  dynamicFieldsRef :{
    label: "Settings.Local.Emailtemplate.DynamicFieldsRef",
    name: "dynamicFieldsRef",
    validatiors: [ Validators.required],
    type: "text",
    placeholder: "Settings.Local.Emailtemplate.DynamicFieldsRef",
    mandatory: true,
    isDisabled: true
   },
  Content: {
    label: "Settings.Local.Emailtemplate.Content",
    name: "content",
    validatiors: [ Validators.required],
    type: "text",
    placeholder: "Settings.Local.Emailtemplate.Content",
    mandatory: true,
    isDisabled: true
   },
 
   status: {
    label: "Settings.Local.Emailtemplate.Status",
    name: "status",
    validatiors: [Validators.required],
    type: "ngSelect",
    placeholder: "Settings.Local.Emailtemplate.Status",
    mandatory: true,
    customData: {
      data: [
        { id: 1, name: "Enabled",displayName:"Settings.Local.Language.Enabled" },
        { id: 0, name: "Disabled" ,displayName :"Settings.Local.Language.Enabled"},
      ],
      key: "name",
      value: "id",

    },
 
  },



};
