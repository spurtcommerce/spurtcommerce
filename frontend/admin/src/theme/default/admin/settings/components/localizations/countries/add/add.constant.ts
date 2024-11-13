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
    countryName: {
    label: "Settings.Local.Country.CountryName",
    name: "countryName",
    validatiors: [
      Validators.required, Validators.maxLength(30)],
    type: "text",
    placeholder: "Settings.Local.Country.CountryName",
    mandatory: true,
 
  }, 
  IsoCode1: {
    label: "Settings.Local.Country.IsoCode-1",
    name: "isocode1",
    validatiors: [
      Validators.required, Validators.maxLength(2)
      ],
    type: "text",
    placeholder: "Settings.Local.Country.IsoCode-1",
    mandatory: true,
 
  }, 
  IsoCode2: {
    label: "Settings.Local.Country.IsoCode-2",
    name: "isocode2",
    validatiors: [ Validators.required, Validators.maxLength(3)],
    type: "text",
    placeholder: "Settings.Local.Country.IsoCode-2",
    mandatory: true,
 
  },
postalCode: {
    label: "Settings.Local.Country.PostalCodeRequired",
    name: "postalCode",
    type: "radio",
    placeholder: "Settings.Local.Country.PostalCodeRequired",
    mandatory: false,
    customData: {
      data: [
        { name: "Yes", id: "Yes",displayName:"Settings.Local.Country.Yes" },
        { name: "No", id: "No" ,displayName:"Settings.Local.Country.No"},
      ],
      key: "name",
      value: "id",
    },
  },
  status: {
    label: "Settings.Local.Country.SelectStatus",
    name: "status",
    validatiors: [Validators.required],
    type: "ngSelect",
    placeholder: "Settings.Local.Country.SelectStatus",
    mandatory: true,
    customData: {
      data: [
        { id: 1, name: "Active"},
        { id: 0, name: "In-Active"},
      ],
      key: "name",
      value: "id",


    },
 
  },

};
