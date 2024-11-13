import { Validators } from "@angular/forms";
import { CustomValidators } from "../../../../../../app/default/shared/validation/custom-password-validation";
// Profile Form
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class CustomValidatorsName {
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const valid = regex.test(control.value);
            return valid ? null : error; // Return the error object if invalid
        };
    }
}

const ALLOWED_PATTERN = /^[a-zA-Z\s]*$/;
export const myProfileFormObj = {
    firstName: {
        name: 'First Name',
        label: 'myShop.FirstName',
        content: 'myShop.EnterNameFirst',
        validatiors: [Validators.required,CustomValidatorsName.patternValidator(ALLOWED_PATTERN, { onlyAlphabets: true })],
        type: 'text',
        optionalErrorMessage:{
            onlyAlphabets: 'ValidationsErrorMessage.Allowonlyalphabetsspaces',
             }, 
        placeholder: 'myShop.EnterFirstName',
        mandatory: true,
    },
    lastName: {
        name: 'Last Name',
        label: 'myShop.LastName',
        content: 'myShop.EnterNameLast',
        validatiors: [CustomValidatorsName.patternValidator(ALLOWED_PATTERN, { onlyAlphabets: true })],
        optionalErrorMessage:{
            onlyAlphabets: 'ValidationsErrorMessage.Allowonlyalphabetsspaces',
             }, 
        type: 'text',
        placeholder: 'myShop.EnterLastName',
        mandatory: false,
    },
    gender: {
        name: 'Gender',
        label: 'myShop.Gender',
        content: 'myShop.GenderDescription',
        validatiors: [],
        type: 'ngSelect',
        placeholder: 'myShop.SelectGender',
        customData: {
            data: [
                { name: 'Male', id: 'Male' },
                { name: 'Female', id: "Female" },
                { name: 'Not Disclosed', id: 'Not_Disclosed' },
            ],
            key: 'name',
            value: 'id',
        },

    },
    dateOfBirth: {
        name: 'Date Of Birth',
        label: 'myShop.DateOfBirth',
        content: 'myShop.DOB-Description',
        validatiors: [],
        type: 'date',
        placeholder: 'select the date of birth',
        maxDate: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())
    },
    mobileNumber: {
        name: 'Mobile Number',
        label: 'myShop.MobileNumber',
        content: 'myShop.PhoneNoDescription',
        validatiors: [Validators.required, Validators.minLength(7), Validators.maxLength(15)],
        type: 'number',
        placeholder: 'myShop.EnterMobileNumber',
        mandatory: true,
        customStyle: {
            class: 'error'
        }
    },
    // role: {
    //     name: 'Role',
    //     label: 'myShop.Role',
    //     content: 'myShop.RoleDescription',
    //     validatiors: [],
    //     type: 'text',
    //     placeholder: 'myShop.EnterRole',
    //     isDisabled: false
    // },
    email: {
        name: 'Email Address',
        label: 'myShop.EmailAddress',
        content: 'myShop.EmailDescription',
        validatiors: [],
        type: 'text',
        placeholder: 'myShop.EnterEmailAddress',
        isDisabled: true
    },
    password: {
        name: 'Password',
        label: 'myShop.Password',
        content: 'myShop.PasswordDescription',
        validatiors: [],
        type: 'password',
        placeholder: 'myShop.EnterPassword',
        isDisabled: true,
        passwordShow: false
    },

}
// Email Form
export const myEmailFormObj = {
    password: {
        name: 'Password',
        label: 'myShop.passwordMyshop',
        content: 'myShop.PasswordDescription',
        validatiors: [],
        type: 'password',
        placeholder: 'myShop.EnterPassword',
        isDisabled: false,
        passwordShow: true
    },
    newEmail: {
        name: 'Enter new account email',
        label: 'myShop.Enternewaccountemail',
        validatiors: [Validators.required, Validators.email],
        type: 'text',
        placeholder: 'myShop.EnterEmailAddress',
        mandatory: true,
    },
    confirmEmail: {
        name: 'Confirm new account email',
        label: 'myShop.Confirmnewaccountemail',
        validatiors: [Validators.required, Validators.email],
        type: 'text',
        placeholder: 'myShop.EnterEmailAddress',
        mandatory: true,
    },
}
// current Password Form
export const myPasswordFormObj = {
    currentPassword: {
        name: 'Current Password',
        label: 'myShop.CurrentPassword',
        validatiors: [Validators.required],
        type: 'password',
        placeholder: 'myShop.Enteryourcurrentpassword',
        mandatory: true,
        passwordShow: true
    },
    newPassword: {
        name: 'New Password',
        label: 'myShop.NewPassword',
        validatiors: [Validators.required,
        CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8),
        Validators.maxLength(50),
        ],
        type: 'password',
        placeholder: 'myShop.Enteryournewpassword',
        mandatory: true,
        passwordShow: true
    },
    confirmNewPassword: {
        name: 'Confirm New Password',
        label: 'myShop.Confirmnewpassword',
        validatiors: [Validators.required],
        optionalErrorMessage: {
            NoPassswordMatch: 'Confirm password Is Mismatch'
        },
        type: 'password',
        placeholder: 'myShop.Enteryourconfirmnewpassword',
        mandatory: true,
        passwordShow: true
    }
}


