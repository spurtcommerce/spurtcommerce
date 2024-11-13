import {
    FormBuilder,
    Validators,
    ValidationErrors,
    AbstractControl,
  } from '@angular/forms';


export const familyData = [
  [
    {
        "categoryId": 658,
        "sortOrder": 1,
        "parentInt": 524,
        "name": "Cover",
        "image": null,
        "imagePath": null,
        "isActive": "1",
        "createdDate": "2023-11-21T10:25:33.000Z",
        "categorySlug": "mobile901111",
        "levels": "dress > mobile > Cover"
    },
    {
        "categoryId": 659,
        "sortOrder": 1,
        "parentInt": 4,
        "name": "cover",
        "image": null,
        "imagePath": null,
        "isActive": "1",
        "createdDate": "2023-11-21T10:25:33.000Z",
        "categorySlug": "Electronics29",
        "levels": "Electronics > cover"
    },
    {
        "categoryId": 648,
        "sortOrder": 1,
        "parentInt": 0,
        "name": "Dresses",
        "image": null,
        "imagePath": null,
        "isActive": "1",
        "createdDate": "2023-11-17T05:40:03.000Z",
        "categorySlug": "dresses381",
        "levels": "Dresses"
    },
    {
        "categoryId": 649,
        "sortOrder": 1,
        "parentInt": 648,
        "name": "Mens",
        "image": null,
        "imagePath": null,
        "isActive": "1",
        "createdDate": "2023-11-17T05:40:03.000Z",
        "categorySlug": "Dresses14",
        "levels": "Dresses > Mens"
    },
    {
        "categoryId": 650,
        "sortOrder": 1,
        "parentInt": 649,
        "name": "Top-wear",
        "image": null,
        "imagePath": null,
        "isActive": "1",
        "createdDate": "2023-11-17T05:40:03.000Z",
        "categorySlug": "Dresses15",
        "levels": "Dresses > Mens > Top-wear"
    },
    {
        "categoryId": 651,
        "sortOrder": 1,
        "parentInt": 650,
        "name": "T-shirts",
        "image": null,
        "imagePath": null,
        "isActive": "1",
        "createdDate": "2023-11-17T05:40:03.000Z",
        "categorySlug": "Dresses64",
        "levels": "Dresses > Mens > Top-wear > T-shirts"
    },
    {
        "categoryId": 652,
        "sortOrder": 22,
        "parentInt": 490,
        "name": "boys",
        "image": null,
        "imagePath": null,
        "isActive": "1",
        "createdDate": "2023-11-17T05:40:03.000Z",
        "categorySlug": "Dress55",
        "levels": "Baby Kids > Baby Girls > Gowns > winter collection > welcome2022 > cool dresses > dress > boys"
    },
    {
        "categoryId": 653,
        "sortOrder": 22,
        "parentInt": 652,
        "name": "elastic",
        "image": null,
        "imagePath": null,
        "isActive": "1",
        "createdDate": "2023-11-17T05:40:03.000Z",
        "categorySlug": "Dress91",
        "levels": "Baby Kids > Baby Girls > Gowns > winter collection > welcome2022 > cool dresses > dress > boys > elastic"
    },
    {
        "categoryId": 654,
        "sortOrder": 2,
        "parentInt": 648,
        "name": "cotton-shirts",
        "image": null,
        "imagePath": null,
        "isActive": "1",
        "createdDate": "2023-11-17T05:40:03.000Z",
        "categorySlug": "Dresses68",
        "levels": "Dresses > cotton-shirts"
    },
  
]
]
  
  
  export const filterFields = [
    {
      name: 'Specification Name',
      validatiors: [],
      type: 'text',
    },
  
    {
      name: 'Status',
      validatiors: [],
      type: 'select',
      customData: {
        data: [
          { name: 'Active', id: 1 },
          { name: 'Inactive', id: 0 },
        ],
        key: 'name',
        value: 'id',
      },
    },
  
  ];
  
  export const Custom = [
    // {
    //   displayName: 'SNo',
    //   type: 'snum',
    //   checked: true,
    //   customStyle: {
    //     trow: {
    //       width: '20%',
    //       height: '3%',
    //       class:'text-center'
    //     },tbody:{
    //       class:'text-center'
  
    //     }
  
    //   }
    // },
    {
      displayName: 'Specification Name',
      id: 'name',
      type: 'default',
      checked: true,
    },
    {
      displayName: 'Attributes',
      id: 'attributeIds',
      type: 'default',
      checked: true,
    },
    {
      displayName: 'Attributes Group',
      id: 'attributesGroup',
      type: 'default',
      checked: true,
    },

  
    {
      displayName: 'Last modified',
      id: 'date',
      type: 'date',
      checked: true,
    },
  
    {
      displayName: 'Status',
      id: 'isActive',
      type: 'toggle',
      checked: true,
    },
    {
      displayName: 'Action',
      id:'menu',
      type: 'threeDotMenu',
      checked: true,
      menuData: [
        {
          name:'Edit',img:'assets/imgs/pencil.svg'
        },
        {
          name:'Delete',img:'assets/imgs/trash.svg'
        },
      ] 
    },
    // {
    //   displayName: 'Action',
    //   type: 'buttonGroup',
    //   checked: true,
    //   buttons: [
    //     {
    //       displayName: 'Edit',
    //       image: '',
    //       key: 'Edit',
    //       customStyle: {
    //         tbody: {
    //           width: '5%',
    //           height: '3%',
    //           class: 'btn btn-sm btn-success'
    //         }
    //       }
    //     },
    //     // {
    //     //   displayName: 'delete',
    //     //   image: '',
    //     //   key: 'Delete',
    //     //   customStyle: {
    //     //     tbody: {
    //     //       width: '20%',
    //     //       height: '3%',
    //     //       class: 'btn btn-sm btn-danger ml-9'
    //     //     }
    //     //   }
    //     // }
    //   ]
    // },
   
  ]
  
  export const pageSizeOptions = [
    { id: 5 },
    { id: 10 },
    { id: 15 },
    { id: 20 },
  ];
  
  export function removeEmptyKeys(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] == null || obj[key] == undefined || obj[key] == '') {
          delete obj[key];
        }
      }
    }
    return obj;
  }