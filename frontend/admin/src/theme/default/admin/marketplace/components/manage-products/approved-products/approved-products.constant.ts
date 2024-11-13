import { DatePipe } from "@angular/common";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { getBulkConfig } from "src/theme/default/admin/shared/components/bulk-action/bulk-action.constant";

export const customTable = [

    {
      displayName: '',
      id: 'vendorProductId',
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
      displayName: 'marketplace.common.Image',
      id: 'image',
      type: 'image',
      checked: true,
      customStyle: {
        tbody: {
         class:'product-image'
        }
      }
    },
    {
      displayName: 'marketplace.common.ProductName',
      id: 'name',
      type: 'template',
      checked: true,
      customStyle:{
        tbody: {
          width: '35%',
          class: 'fw-semibold'
          // 'max-width' : '500px',
          // class: 'ellipsis-name',
          // isShowTitle: true
         }
      }
    },
    {
      displayName: 'marketplace.common.SellerName',
      id: 'vendorName',
      type: 'default',
      checked: true,
    },
  
    {
      displayName: 'marketplace.common.CompanyName',
      id: 'companyName',
      type: 'default',
      checked: true,
    },


    {
      displayName: 'marketplace.common.Price',
      type: 'template',
      id: 'price',
      key: 'checkBox',
      checked: true,
      customStyle: {
        trow: {
          class : 'text-right'
        },
        tbody: {
         class: 'text-right text-nowrap'
        }
      }
    },
    {
      displayName: 'marketplace.seller.approvedOn',
      type: 'date',
      id: 'modifiedDate',
      key: 'checkBox',
      checked: true,
      customStyle: {
        tbody: {
          class: 'text-nowrap'
        }
      },
    },
    {
      displayName: 'marketplace.common.ProductStatus',
      type: 'template',
      id: 'pennding',
      key: 'checkBox',
      checked: true,
      customStyle: {
        trow: {
          class: 'text-nowrap'
        }
      },
    },
  
    {
      displayName: 'marketplace.common.Status',
      id: 'isActive',
      type: 'toggle',
      checked: true,
    },  
    {
      displayName: 'marketplace.common.Action',
      id: 'menu',
      type: 'threeDotMenu',
      checked: true,
      menuData: [
        {
          name: 'Reject', img:'', displayName: 'marketplace.common.Reject'
        }
      ]
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
    sellerName: {
      label: 'marketplace.common.SelllerName',
      name: 'sellerName',
      aliasName:'',
      validatiors: [],
      type: 'text',
      placeholder:'marketplace.common.Enterthesellername',
    },
    CompanyName: {
      label: 'marketplace.common.CompanyName',
      name: 'companyName',
      aliasName:'',
      validatiors: [],
      type: 'text',
      placeholder:'marketplace.common.Enterthecompanyname',
    },
    ProductName: {
      label: 'marketplace.common.ProductName',
      name: 'productName',
      aliasName:'',
      validatiors: [],
      type: 'text',
      placeholder:'marketplace.common.Entertheproductname',
    },
    Status: {
      label:'marketplace.common.Status',
      name: 'status',
      aliasName:'',
      validatiors: [],
      type: 'ngSelect',
      placeholder:'marketplace.common.Selectthestatus',
      customData: {
        data: [
          { name: 'Active', id: '1' },
          { name: 'In-Active', id: '0' },
        ],
        key: 'name',
        value: 'id',
      },
    },
    Date:{
      label: 'marketplace.seller.approvedOn',
      name: 'Date',
      aliasName:'',
      validatiors: [],
      type: 'date',
      placeholder:'dd/mm/yyyy',
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

  export const bulkActions = getBulkConfig(['itemSelected', 'exportExcel', 'resetCheckbox']);