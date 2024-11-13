import { Validators } from "@angular/forms";

export const objForm = {
    zoneName: {
        label: 'Settings.Local.Zone.ZoneName',
        name: 'zoneName',
        aliasName: 'Settings.Local.Zone.ZoneName',
        validatiors: [Validators.required,Validators.maxLength(128) ],
        type: 'text',
        mandatory: true,
        placeholder: 'Settings.Local.Zone.ZoneName',
    },

    zoneCode: {
        label: 'Settings.Local.Zone.ZoneCode',
        name: 'zoneCode',
        aliasName: 'Settings.Local.Zone.ZoneCode',
        validatiors: [Validators.required,Validators.maxLength(30) ],
        type: 'text',
        mandatory: true,
        placeholder: 'Settings.Local.Zone.ZoneCode',
    },

    status: {
        label: 'Settings.Local.Zone.Status',
        name: 'status',
        aliasName: 'Settings.Local.Zone.Status',
        mandatory: true,
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'Settings.Local.Language.SelectStatus',
        customData: {
            data: [
                { name: 'Active', id: '1' },
                { name: 'In-Active', id: '0' },
            ],
            key: 'name',
            value: 'id',
        },
      },

    country: {
        label: "Settings.Local.Zone.Country",
        name: "country",
        aliasName: "Settings.Local.Zone.Country",
        validatiors: [Validators.required],
        type: "ngSelect",
        placeholder: "Settings.Local.Zone.SelectCountry",
        mandatory: true,
        customData: {
            data: [{}],
            key: "name",
            value: "countryId",
        },
    },



}