import { Validators } from "@angular/forms";

export const formFields = {

    roleName: {
    label: "Settings.Role.RoleName",
    name: "roleName",
    validatiors: [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)],
    type: "text",
    placeholder: "Settings.Role.RoleName",
    mandatory: true,
    optionalErrorMessage: {
      pattern: 'ValidationsErrorMessage.Allowonlyalphabetsspaces'
    }
 
  }, 
  isActive: {
    label: "Settings.Role.Status",
    name: "isActive",
    type: "toggle",
    placeholder: "Settings.Role.Status",
    mandatory: false,
  customData:{
      toggleName:'roleStatus'
    }
  },

};
