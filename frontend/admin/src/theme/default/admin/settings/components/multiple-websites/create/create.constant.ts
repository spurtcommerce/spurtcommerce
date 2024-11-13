import { Validators } from "@angular/forms";

export const generalForm = {
    siteName: {
        label: 'Additional.Site Name',
        name: 'siteName',
        aliasName: 'Additional.Site Name',
        validatiors: [Validators.required, Validators.maxLength(32)],
        type: 'text',
        mandatory: true,
        isDisabled: true,
        placeholder: 'placeholder.Enter Site Name',
        optionalErrorMessage: {
            pattern: 'Must be max 32 chracters long',
        },
    },

    siteURL: {
        label: 'Additional.Site URL',
        name: 'siteURL',
        aliasName: 'Additional.Site URL',
        type: 'text',
    },

    shortDescription: {
        label: 'Additional.Short description',
        name: 'shortDescription',
        aliasName: 'Additional.Short description',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        placeholder: 'placeholder.Enter Short description',
    },

    active: {
        name: 'active',
        type: 'toggle',
    },

    businessName: {
        label: 'Additional.Business Name',
        name: 'businessName',
        aliasName: 'Additional.Business Name',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        toolTip: {
            name: 'Enter the business name'
        },
        placeholder: 'placeholder.Enter Business Name',
    },



    businessOwnerName: {
        label: 'Additional.Business Owner',
        name: 'businessOwnerName',
        aliasName: 'Additional.Business Owner',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        toolTip: {
            name: 'Enter the Site URL.'
        },
        placeholder: 'placeholder.Enter Business Owner',
    },

    email: {
        label: 'Additional.Email',
        name: 'email',
        aliasName: 'Additional.Email',
        validatiors: [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' +
            '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.email],
        type: 'text',
        mandatory: true,
        placeholder: 'placeholder.Enter Email Address',
    },

    mobile: {
        label: 'Additional.Mobile',
        name: 'mobile',
        aliasName: 'Additional.Mobile',
        validatiors: [Validators.required],
        type: 'number',
        mandatory: true,
        placeholder: 'placeholder.Enter Mobile Number',
    },

    address1: {
        label: 'Additional.Address1',
        name: 'address1',
        aliasName: 'placeholder.Enter Address1',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        placeholder: 'placeholder.Enter Address1',
    },


    address2: {
        label: 'Additional.Address2',
        name: 'address2',
        aliasName: 'placeholder.Enter Address1',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        placeholder: 'placeholder.Enter Address2',
    },

    country: {
        label: "Additional.Country",
        name: "country",
        aliasName: "Additional.Country",
        validatiors: [Validators.required],
        type: "ngSelect",
        placeholder: "placeholder.select country",
        mandatory: true,
        customData: {
            data: [{}],
            key: "name",
            value: "countryId",
        },

    },

    state: {
        label: "Additional.State/Province",
        name: "state",
        aliasName: "Additional.State/Province",
        validatiors: [Validators.required],
        type: "ngSelect",
        placeholder: "placeholder.Select State",
        mandatory: true,
        customData: {
            data: [{}],
            key: "name",
            value: "zoneId",
        },

    },
    city: {
        label: 'Additional.City',
        name: 'city',
        aliasName: 'Additional.City',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        placeholder: 'placeholder.Enter City',
    },
    postcode: {
        label: 'Additional.Zip/Postal Code',
        name: 'postcode',
        aliasName: 'Additional.Zip/Postal Code',
        validatiors: [Validators.required],
        type: 'number',
        mandatory: true,
        placeholder: 'placeholder.Enter Postal Code',
    },

    selectedCategories: {
        label: 'Additional.Selected categories',
        name: 'selectedCategories',
        aliasName: 'Additional.Selected categories',
        mandatory: true,
    },

}



export const siteLocationForm = {
    currency: {
        label: "Additional.Currency",
        name: "currency",
        aliasName: "Additional.Currency",
        validatiors: [Validators.required],
        type: "ngSelect",
        placeholder: "placeholder.Select Currency",
        mandatory: true,
        toolTip: {
            name: 'Select the currency'
        },
        customData: {
            data: [{}],
            key: "title",
            value: "currencyId",
        },

    },

    symbol: {
        label: 'Additional.Symbol',
        name: 'symbol',
        aliasName: 'Additional.Symbol',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        placeholder: 'Additional.Symbol',
        isDisabled: true
    },

    defaultLanguage: {
        label: "Additional.Default language",
        name: "defaultLanguage",
        aliasName: "Additional.Default language",
        validatiors: [Validators.required],
        type: "ngSelect",
        toolTip: {
            name: 'Select the default language'
        },
        placeholder: "placeholder.Select Default language",
        mandatory: true,
        customData: {
            data: [{}],
            key: "name",
            value: "name",
        },

    },

    secondaryLanguage: {
        label: "Additional.Secondary language",
        name: "secondaryLanguage",
        aliasName: "Additional.Secondary language",
        validatiors: [Validators.required],
        type: "ngSelect",
        placeholder: "placeholder.Select Secondary language",
        mandatory: true,
        customData: {
            data: [{}],
            key: "name",
            value: "name",
        },

    },

    dateFormat: {
        label: "Additional.Date format",
        name: "dateFormat",
        aliasName: "Additional.Date format",
        validatiors: [Validators.required],
        type: "ngSelect",
        placeholder: "Select the date format",
        mandatory: true,
        customData: {
            data: [
                { value: 'M/d/yy', name: 'M/d/yy' },
                { value: 'dd/MM/yyyy', name: 'dd/MM/yyyy' },
                { value: 'MMM dd, yyyy', name: 'MMM dd, yyyy' },
                { value: 'dd MMM yyyy', name: 'dd MMM yyyy' },
                { value: 'yyyy-MM-dd', name: 'yyyy-MM-dd' }
            ],
            key: "name",
            value: "value",
        },

    },

    timeFormat: {
        label: "Additional.Time format",
        name: "timeFormat",
        aliasName: "Additional.Time format",
        validatiors: [Validators.required],
        type: "ngSelect",
        placeholder: "Select the time format",
        mandatory: true,
        customData: {
            data: [
                { id: 1, name: '12 hrs' },
                { id: 2, name: '24 hrs' },
            ],
            key: "name",
            value: "name",
        },

    },

    defaultCountry: {
        label: "Additional.Default country",
        name: "defaultCountry",
        aliasName: "Additional.Default country",
        validatiors: [Validators.required],
        type: "ngSelect",
        placeholder: "placeholder.select country",
        mandatory: true,
        toolTip: {
            name: 'Select the Default country'
        },
        customData: {
            data: [{}],
            key: "name",
            value: "countryId",
        },

    },

    selectedCountries: {
        name: "selectedCountries",
        aliasName: "Additional.Default country",
        validatiors: [Validators.required],
        type: "ngSelect",
        placeholder: "placeholder.select country",

    }

}


export const seoSocialForm={
    metatitle: {
        label: 'common.Meta Tag Title',
        name: 'metatitle',
        aliasName: 'common.Meta Tag Title',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        placeholder: 'placeholder.Meta Tag Title',
    },
    
    metaDescription: {
        label: 'common.Meta Tag Description',
        name: 'metaDescription',
        aliasName: 'common.Meta Tag Description',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        placeholder: 'common.Meta Tag Description',
    },

    keywords: {
        label: 'common.Meta Tag Keyword',
        name: 'keywords',
        aliasName: 'common.Meta Tag Keyword',
        validatiors: [Validators.required],
        type: 'text',
        mandatory: true,
        placeholder: 'placeholder.Meta Tag Keyword',
    },

    facebook: {
        label: 'Additional.Facebook link',
        name: 'facebook',
        aliasName: 'Additional.Facebook link',
        validatiors: [],
        type: 'text',
        placeholder: 'placeholder.Enter Facebook link',
    },

    instagram: {
        label: 'common.Instagram',
        name: 'instagram',
        aliasName: 'common.Instagram',
        validatiors: [],
        type: 'text',
        placeholder: 'placeholder.Enter Instagram link',
    },

    twitter: {
        label: 'Additional.Twitter link',
        name: 'twitter',
        aliasName: 'Additional.Twitter link',
        validatiors: [],
        type: 'text',
        placeholder: 'placeholder.Meta Tag Keyword',
    },
}


export const personalizedForm={
    invoice: {
        name: 'invoice',
    }, 
}