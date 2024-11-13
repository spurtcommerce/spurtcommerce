import { Validators } from "@angular/forms";
import { CustomValidators } from "src/theme/default/admin/shared/components/interface/custom-password-validation";
const nameValidationPattern = /^[a-zA-Z\s]*$/;
const emailRegex =
"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
"[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
export const formFields = {
    FirstName: {
    label: "Settings.User.FirstName",
    name: "firstName",
    validatiors: [
        Validators.required,
        Validators.pattern(nameValidationPattern),
        Validators.minLength(3),
        Validators.maxLength(32),],
    type: "text",
    placeholder: "Settings.User.FirstName",
    mandatory: true,
    optionalErrorMessage: {
      pattern: 'ValidationsErrorMessage.Allowonlyalphabetsspaces'
    }
 
  }, 
  LastName: {
    label: "Settings.User.LastName",
    name: "lastName",
    validatiors: [
      Validators.required,
        Validators.pattern(nameValidationPattern),
        Validators.maxLength(32),
      ],
    type: "text",
    placeholder: "Settings.User.LastName",
    mandatory: true,
    optionalErrorMessage: {
      pattern: 'ValidationsErrorMessage.Allowonlyalphabetsspaces'
    }
 
  }, 
  Email: {
    label: "Settings.User.Email",
    name: "email",
    validatiors: [  Validators.required,
        Validators.pattern(emailRegex),
        Validators.email,
        Validators.maxLength(96)],
    type: "text",
    placeholder: "Settings.User.Email",
    mandatory: true,
 
  },
  Role: {
    label: "Settings.User.Role",
    name: "role",
    validatiors: [Validators.required,
        Validators.maxLength(64),
        Validators.pattern(/[!^\w\s]$/)],
    type: "ngSelect",
    placeholder: "Settings.User.Role",
    mandatory: true,
    customData: {
        data: [{}],
        key: "name",
        value: "groupId",
      },
  },
  Username: {
    label: "Settings.User.UserName",
    name: "username",
    validatiors: [ Validators.required,
        Validators.pattern(emailRegex),
        Validators.maxLength(32)],
    type: "text",
    placeholder: "Settings.User.UserName",
    mandatory: true,
  },
  Password: {
    label: "Settings.User.Password",
    name: "password",
    validatiors: [ Validators.required,
        // check whether the entered password has a number
        CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, {
          hasNumber: true,
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // Has a minimum length of 8 characters
        Validators.minLength(8),
        Validators.maxLength(50)],
    type: "password",
    placeholder: "Settings.User.Password",
    mandatory: true,
    optionalErrorMessage:{
      hasCapitalCase:'Password should have atleast one capital case letter',
      hasSmallCase:'Password should have alteast one small case letter',
      hasNumber :'Password should have atleast one special charactor or number'
    }
  },
};
