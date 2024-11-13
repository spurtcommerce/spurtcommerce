import { getBulkConfig } from "src/theme/default/admin/shared/components/bulk-action/bulk-action.constant";

export const customTable = [

    {
      displayName: '',
      id: 'orderProductPrefixId',
      type: 'checkBox',
      checked: true,
      isEnableSelectall: true,
      customStyle: {
        trow: {
          class: 'check-table'
        },
        tbody: {
          class: 'check-table'
        }
      }
    },
  
    {
      displayName: 'marketplace.settlement.Title',
      id: 'title',
      type: 'default',
      checked: true,
      customStyle: {
        tbody: {
          class: 'fw-semibold'
        }
      }
    },
  
    {
      displayName: 'marketplace.settlement.SettlementDate',
      id: 'createdDate',
      type: 'date',
      checked: true,
    },
    {
      displayName: 'marketplace.settlement.NoofOrders',
      id: 'noOfOrders',
      type: 'default',
      checked: true,
      customStyle: {
        trow: {
          class: "text-center"
        },
        tbody: {
          class: "text-center",
        }
      }
    },
    {
      displayName: 'marketplace.settlement.TotalSettlementValue',
      type: 'template',
      id: 'totalAmount',
      checked: true,
      customStyle: {
        trow: {
          class: "text-right"
        },
        tbody: {
          class: "text-right"
        }
      }
    },
    {
      displayName: 'ToolTip.viewDetails',
      id: 'button',
      type: 'imageMenu',
      checked: true,
      customStyle: {
        trow: {
          class: "text-center"
        },
        tbody: {
          class: "text-center"
        }
      },
      menuData : [
        {
          name: 'view', img: 'assets/img/eye.svg',displayName: 'common.View'
        }
      ]
    },
  ]
  
  
  export const pageSizeOptions = [
    { id: 2 },
    { id: 5 },
    { id: 10 },
    { id: 15 },
    { id: 20 },
  ];
  
  export const filterFields = {
    FromDate: {
      label: 'marketplace.payments.FromDate',
      name: 'FromDate',
      aliasName:'',
      validatiors: [],
      type: 'date',
      placeholder:'dd/mm/yyyy',
    },
    ToDate: {
      label: 'marketplace.payments.ToDate',
      name: 'ToDate',
      aliasName:'',
      validatiors: [],
      type: 'date',
      placeholder:'dd/mm/yyyy',
    },
    RangeFrom: {
      label: 'marketplace.settlement.RangeFrom',
      name: 'RangeFrom',
      aliasName:'',
      type: 'number',
      placeholder:'marketplace.settlement.RangeFrom',
    },
    RangeTo: {
      label: 'marketplace.settlement.RangeTo',
      name: 'RangeTo',
      aliasName:'',
      type: 'number',
      placeholder:'marketplace.settlement.RangeTo',
    },
    Search: {
      label: 'marketplace.common.Search',
      name: 'search',
      aliasName:'',
      validatiors: [],
      type: 'text',
      placeholder:'marketplace.common.Search',
    },
  };
  
  
  
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
  export const bulkActions = getBulkConfig(['itemSelected', 'exportExcel', 'resetCheckbox']);