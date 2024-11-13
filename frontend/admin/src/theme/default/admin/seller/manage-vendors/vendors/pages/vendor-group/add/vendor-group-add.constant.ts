import { Validators } from "@angular/forms";

export const filterFields = {
    
    GroupName: {
        label: 'marketplace.seller.GroupName',
        name: 'Group Name',
        aliasName: '',
        validatiors: [Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.minLength(3),
        Validators.maxLength(32),],
        type: 'text',
        placeholder: 'placeholder.Group Name',
        Tooltip: {
            name: 'You can provide a name for the seller group that you want to create and then the sellers mapped to that group will be under that group name.'
        },
        mandatory: true,
    },

    //    img: 'assets/img/info-ico.svg'
    Commission: {
        label: 'marketplace.seller.Commissionforthisgroup',
        name: 'Group Name',
        aliasName: '',
        validatiors: [Validators.required],
        type: 'text',
        placeholder: 'placeholder.Commission for this group',
        Tooltip: {
            name: 'You can set up a common commission for a seller group and the sellers mapped to that group will be subjected to the commission that has been set up for the seller group.'
        }
    },

    Status: {
        label: 'Customers.Customer.Status',
        name: 'status',
        aliasName: '',
        validatiors: [Validators.required],
        type: 'ngSelect',
        placeholder: 'marketplace.common.Selectthestatus',
        customData: {
            data: [
                { name: 'Active', id: '1' },
                { name: 'In-Active', id: '0' },
            ],
            key: 'name',
            value: 'id',
        },
    },

};

