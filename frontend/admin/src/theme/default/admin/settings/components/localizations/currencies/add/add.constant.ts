import { Validators } from "@angular/forms";

export const objForm = {
    title: {
        label: 'Settings.Local.Currency.CurrencyTitle',
        name: 'title',
        aliasName: 'Settings.Local.Currency.CurrencyTitle',
        validatiors: [Validators.required,Validators.maxLength(32) ],
        type: 'text',
        mandatory: true,
        placeholder: 'Settings.Local.Tax.Title',
    },

    code: {
        label: 'Settings.Local.Currency.CurrencyCode',
        name: 'code',
        aliasName: 'Settings.Local.Currency.CurrencyCode',
        validatiors: [Validators.required,Validators.maxLength(3) ],
        type: 'text',
        mandatory: true,
        placeholder: 'Settings.Local.Currency.CurrencyCode',
    },

    symbolLeft: {
        label: 'Settings.Local.Currency.SymbolLeft',
        name: 'symbolLeft',
        aliasName: 'Settings.Local.Currency.SymbolLeft',
        validatiors: [],
        type: 'text',
        mandatory: true,
        placeholder: 'Settings.Local.Currency.SymbolLeft',
    },
    symbolRight: {
        label: 'Settings.Local.Currency.SymbolRight',
        name: 'symbolRight',
        aliasName: 'Settings.Local.Currency.SymbolRight',
        validatiors: [],
        type: 'text',
        mandatory: true,
        placeholder: 'Settings.Local.Currency.SymbolRight',
    },
    status: {
        label: 'Settings.Local.Currency.Status',
        name: 'status',
        aliasName: 'Settings.Local.Currency.Status',
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

}