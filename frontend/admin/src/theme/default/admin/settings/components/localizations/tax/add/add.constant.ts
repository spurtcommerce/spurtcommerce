import { Validators } from "@angular/forms";

export const objForm = {
    title: {
        label: 'Settings.Local.Tax.TaxName',
        name: 'title',
        aliasName: 'Settings.Local.Tax.TaxName',
        validatiors: [Validators.required,Validators.maxLength(150) ],
        type: 'text',
        mandatory: true,
        placeholder: 'Settings.Local.Tax.Title',
    },
    value: {
        label: 'Settings.Local.Tax.Value',
        name: 'value',
        aliasName: 'Settings.Local.Tax.Value',
        validatiors: [Validators.required,Validators.maxLength(8) ],
        type: 'number',
        mandatory: true,
        placeholder: 'Settings.Local.Tax.Number',
    },
    status: {
        label: 'Settings.Local.Tax.Status',
        name: 'status',
        aliasName: 'Settings.Local.Tax.Status',
        mandatory: true,
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'placeholder.Choose Role',
        customData: {
            data: [
                { name: 'Active', id: '1' },
                { name: 'In-Active', id: '0' },
            ],
            key: 'name',
            value: 'id',
        },
      },

}