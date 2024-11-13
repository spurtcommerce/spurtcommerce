import { Validators } from "@angular/forms";

export const bankAccountInfoFormObj = {
    bankName: {
        name: 'Bank Name',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'Bank Name',
        mandatory: true,
    },
    accountHolderName: {
        name: 'Account Holder Name',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'Account Holder Name',
        mandatory: true,
    },
    branch: {
        name: 'Branch',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'Branch',
        mandatory: true,
    },
    accountNumber: {
        name: 'Account Number',
        validatiors: [Validators.required],
        type: 'number',
        placeholder: 'Account Number',
        mandatory: true,
    },
    ifscCode: {
        name: 'IFSC Code',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'IFSC Code',
        mandatory: true,
    },
    bicCode: {
        name: 'BIC or SWIFT Code',
        validatiors: [],
        type: 'text',
        placeholder: 'BIC or SWIFT Code'
    },
    accountSince: {
        name: 'Account Since',
        validatiors: [],
        type: 'text',
        placeholder: 'Account Since, eg: 1year'
    },
}
export const BankAddressFormObj = {
    addressLine1: {
        name: 'Address Line 1',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'Address Line 1',
        mandatory: true,
    },
    addressLine2: {
        name: 'Address Line 2',
        validatiors: [],
        type: 'text',
        placeholder: 'Address Line 2'
    },
    area: {
        name: 'Area',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'Area',
        mandatory: true,
    },
    city: {
        name: 'City',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'City',
        mandatory: true,
    },
    country: {
        name: 'Country',
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'Select...',
        mandatory: true,
        customData: {
            data: [],
            key: 'name',
            value: 'countryId',
        },
    },
    state: {
        name: 'State',
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'Select...',
        mandatory: true,
        customData: {
            data: [],
            key: 'name',
            value: 'zoneId',
        },
    },
    pincode: {
        name: 'Pincode',
        validatiors: [Validators.required],
        type: 'number',
        placeholder: 'Pincode',
        mandatory: true,
    },
}