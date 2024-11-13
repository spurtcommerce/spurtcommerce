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
        class: 'product-image'
      }
    }
  },
  {
    displayName: 'marketplace.common.ProductName',
    id: 'name',
    type: 'template',
    checked: true,
    customStyle: {
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
        class: 'text-right'
      },
      tbody: {
        class: 'text-right text-nowrap'
      }
    }
  },
  {
    displayName: 'marketplace.seller.RejectedOn',
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
    displayName: 'marketplace.common.Action',
    id: 'menu',
    type: 'threeDotMenu',
    checked: true,
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    },
    menuData: [
      {
        name: 'Approve', img: '', displayName: 'marketplace.common.Approve'
      },
    ]
  }
]

export const filterFields = {
  SelllerName: {
    label: 'marketplace.common.SelllerName',
    name: 'sellerName',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.common.Enterthesellername',
  },
  CompanyName: {
    label: 'marketplace.common.CompanyName',
    name: 'companyName',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.common.Enterthecompanyname',
  },
  ProductName: {
    label: 'marketplace.common.ProductName',
    name: 'productName',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.common.Entertheproductname',
  },
  Date: {
    label: 'marketplace.seller.RejectedOn',
    name: 'Date',
    validatiors: [],
    type: 'date',
    placeholder: 'dd/mm/yyyy',
  },
  Search: {
    label: 'marketplace.common.Search',
    name: 'search',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.common.Search',
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