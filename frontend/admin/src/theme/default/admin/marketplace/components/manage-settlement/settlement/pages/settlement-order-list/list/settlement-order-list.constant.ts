import { DatePipe } from "@angular/common";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export const customTable = [

    {
      displayName: '',
      id: 'orderProductPrefixId',
      type: 'checkBox',
      checked: true,
      isEnableSelectall: true,               
      customStyle: {
        trow: {
          width: '35px'
        },
        tbody: {
          width: {
            width: '35px'
          }
        }
      }
    },
  
    {
      displayName: 'marketplace.settlement.OrderLineNo',
      id: 'orderProductPrefixId',
      type: 'template',
      checked: true,
    },
  
    {
      displayName: 'marketplace.settlement.CompanyName',
      id: 'companyName',
      type: 'default',
      checked: true,
    },
    {
      displayName: 'marketplace.settlement.OrderDate',
      id: 'createdDate',
      type: 'date',
      checked: true,
  
    },
    {
      displayName: 'marketplace.settlement.OrderAmount',
      type: 'template',
      id: 'total',
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
      displayName: 'marketplace.settlement.CommisionAmount',
      type: 'template',
      id: 'CommissionAmount',
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
      displayName: 'marketplace.settlement.NetAmount',
      type: 'template',
      id: 'NetAmount',
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
      displayName: 'marketplace.settlement.OrderStatus(at Line Level)',
      id: 'orderStatusName',
      type: 'template',
      checked: true,
      customStyle: {
        trow: {
          class: "text-center"
        },
        tbody: {
          class: "text-center"
        }
      }
    }
  ]
  
  
  export const pageSizeOptions = [
    { id: 2 },
    { id: 5 },
    { id: 10 },
    { id: 15 },
    { id: 20 },
  ];
  
  export const filterFields = {
    CompanyName: {
      label: 'marketplace.payments.CompanyName',
      name: 'CompanyName',
      aliasName:'',
      validatiors: [],
      type: 'text',
      placeholder:'placeholder.Company Name',
    },
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
    // ChooseVendor: {
    //   label:'marketplace.settlement.ChooseVendor',
    //   name: 'ChooseVendor',
    //   aliasName:'',
    //   validatiors: [],
    //   type: 'ngSelect',
    //   placeholder:'marketplace.settlement.ChooseVendor',
    //   customData: {
    //     data: [],
    //     key: '',
    //     value: '',
    //   },
    // },
    OrderStatus: {
      label:'marketplace.settlement.OrderStatus',
      name: 'OrderStatus',
      aliasName:'',
      validatiors: [],
      type: 'ngSelect',
      placeholder:'marketplace.settlement.OrderStatus',
      customData: {
        data: [],
        key: '',
        value: '',
      },
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

  export function convertNgbFormatToPipeFormat(ngbDate: NgbDateStruct, pipeFormat: string): string {
    const jsDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    const datePipe = new DatePipe('en-US'); // Use your preferred locale here
    return datePipe.transform(jsDate, pipeFormat);
  }