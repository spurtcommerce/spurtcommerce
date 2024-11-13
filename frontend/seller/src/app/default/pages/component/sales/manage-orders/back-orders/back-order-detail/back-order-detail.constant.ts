export function removeEmptyKeys(obj: any): any {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
                delete obj[key];
            }
        }
    }
    return obj;
}

// table heading
export const customTable = [

    {
        displayName: 'QTY',
        id: 'pending',
        type: 'default',
        checked: true,
        filterColName: 'QTY'
    },
    {
        displayName: 'ITEM STATUS',
        id: 'customerFirstName',
        type: 'default',
        checked: true,
        filterColName: 'ITEM STATUS'
    },
    {
        displayName: 'PRICE',
        id: 'createdDate',
        type: 'date',
        checked: true,
        filterColName: 'PRICE'
    },

    {
        displayName: 'DISCOUNT',
        id: 'total',
        type: 'default',
        checked: true,
        filterColName: 'DISCOUNT'
    },
    {
        displayName: 'TAX',
        id: 'shippingCity',
        type: 'default',
        checked: true,
        filterColName: 'TAX'
    },

    {
        displayName: 'COUPON DISCOUNT',
        id: 'orderStatusName',
        type: 'default',
        checked: true,
        filterColName: 'COUPON DISCOUNT'
    },
    {
        displayName: 'TOTAL',
        id: 'orderStatusName',
        type: 'default',
        checked: true,
        filterColName: 'TOTAL'
    }
]