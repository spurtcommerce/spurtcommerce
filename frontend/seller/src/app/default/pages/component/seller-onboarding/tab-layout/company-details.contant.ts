import { Validators } from "@angular/forms";
import { sorting } from "../layout/settings.layout.constant";


// SHIPPING METHOD
export const shippingMethod = [
    { value: 1, label: 'LTL (Less Than Truckload)' },
    { value: 2, label: 'FTL (Full Truckload)' },
    { value: 3, label: 'Intermodal Shipping' },
    { value: 4, label: 'Expedited Shipping' },
    { value: 5, label: 'Dedicated Fleet Shipping' },
    { value: 6, label: 'Parcel Shipping' },
    { value: 7, label: 'Specialized Shipping' },
    { value: 8, label: 'Third-Party Logistics (3PL)' },
    { value: 9, label: 'In-Person Pickup' }
]

// BUSINESS SEGMENT
export const businessSegment = [
    { name: 'Micro', id: '1' },
    { name: 'Small', id: '2' },
    { name: 'Medium', id: '3' },
    { name: 'Corporate', id: '4' },
    { name: 'World Wide', id: '5' },
]

// BUSINESS TYPE
export const businessType = [
    { id: 1, name: 'Wholesale' },
    { id: 2, name: 'Wholesale/Retailer' },
    { id: 3, name: 'Retailer' },
    { id: 4, name: 'Import/Export' },
    { id: 5, name: 'Distributor' },
    { id: 6, name: 'Services Business' },
    { id: 7, name: 'Producer' },
    { id: 8, name: 'Manufacturer' },
    { id: 9, name: 'Other' }
]

// INDUSTRY
export const industryDomain=[
    { name: 'Retail', id: '2' },
]

export const companyDetailsFormObj = {
    companyRegisteredCountry: {
        name: 'Company Registered Country',
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'Select...',
        mandatory: true,
        customData: {
            data: [],
            key: '',
            value: '',
        },
    },
    businessName: {
        name: 'Business Name',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: '',
        mandatory: true,
    },
    businessType: {
        name: 'Business Type',
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'Select...',
        mandatory: true,
        customData: {
            data: [{ id: 1, name: 'Wholesale' },
            { id: 2, name: 'Wholesale/Retailer' },
            { id: 3, name: 'Retailer' },
            { id: 4, name: 'Import/Export' },
            { id: 5, name: 'Distributor' },
            { id: 6, name: 'Services Business' },
            { id: 7, name: 'Producer' },
            { id: 8, name: 'Manufacturer' },
            { id: 9, name: 'Other' }],
            key: 'name',
            value: 'name',
        },
    },
    businessSegment: {
        name: 'Business Segment',
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'Select...',
        mandatory: true,
        customData: {
            data: [
                { name: 'Micro', id: '1' },
                { name: 'Small', id: '2' },
                { name: 'Medium', id: '3' },
                { name: 'Corporate', id: '4' },
                { name: 'World Wide', id: '5' },
            ],
            key: 'name',
            value: 'name',
        },
    },
    businessDomainIndustry: {
        name: 'Business Domain / Industry',
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'Select...',
        mandatory: true,
        customData: {
            data: [
                { name: 'Retail', id: '2' },
            ],
            key: 'name',
            value: 'id',
        },
    },
    // productCategory: {
    //     name: 'Product Category',
    //     validatiors: [Validators.required],
    //     type: 'ngSelect',
    //     placeholder:'Select...',
    //     mandatory: true,
    //     customData: {
    //         data: [],
    //         key: '',
    //         value: '',
    //       },
    // },
    sellerLegalName: {
        name: 'Seller Legal Name',
        validatiors: [],
        type: 'text',
        placeholder: '',
        mandatory: false,
    },
}

export const businessAddressFormObj = {
    pincode: {
        name: 'Pincode',
        validatiors: [],
        type: 'number',
        placeholder: 'Pincode',
        mandatory: false,
    },
    addressLine1: {
        name: 'Address Line 1',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'Address Line 1',
        mandatory: true,
    },
    addressLine2: {
        name: 'Address Line 2',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'Address Line 2',
        mandatory: true,
    },
    area: {
        name: 'Area',
        validatiors: [],
        type: 'text',
        placeholder: 'Area',
        mandatory: false,
    },
    city: {
        name: 'City',
        validatiors: [],
        type: 'text',
        placeholder: 'City',
        mandatory: false,
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
    contactNumber: {
        name: 'Contact Number',
        validatiors: [Validators.minLength(7), Validators.maxLength(15)],
        type: 'number',
        placeholder: 'Contact Number',
        mandatory: false,
    },
    shippingMethod: {
        name: 'Choose Preferred Shipping Method',
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'Select...',
        mandatory: true,
        customData: {
            data: sorting(shippingMethod, 'label'),
            key: 'label',
            value: 'label',
        },
    },
    taxNumber: {
        name: 'Tax Number',
        validatiors: [],
        type: 'text',
        placeholder: 'Tax Number',
        mandatory: false,
    },
    businessIdentificationNumber: {
        name: 'Business Identification Number',
        validatiors: [],
        type: 'text',
        placeholder: 'Business Identification Number',
        mandatory: false,
    },
}