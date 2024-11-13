/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';
import { ProductListResponseModel } from '../product-model/product-list-response.model';
import { ProductAddResponseModel } from '../product-model/product-add-response.model';
import { DetailResponseModel } from '../product-model/detail-response.model';

export interface ProductState extends Map<string, any> {
  excelLoading:boolean;
  productList: ProductListResponseModel;
  productCount: any;
  productDelete: any;
  productAdded: any;
  addProductDetail: ProductAddResponseModel;
  productUpdate: any;
  productDetail: DetailResponseModel;
  optionList: any;
  gettingoptionList: any;
  getRatingList: any;
  ratingStatus: any;
  productBulkDelete: any;

  detailLoading: boolean;
  detailLoaded: boolean;
  detailFailed: boolean;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  updatLoading: boolean;
  updatLoaded: boolean;
  updatFailed: boolean;

  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;

  optionListLoading: boolean;
  optionListLoaded: boolean;
  optionListFailed: boolean;

  gettingOptionLoading: boolean;
  gettingOptionLoaded: boolean;
  gettingOptionFailed: boolean;

  productRemoveListResponse: boolean;
  productRemoveListRequestLoading: boolean;
  productRemoveListRequestLoaded: boolean;
  productRemoveListRequestFailed: boolean;

  productAddListResponse: boolean;
  productAddListRequestLoading: boolean;
  productAddListRequestLoaded: boolean;
  productAddListRequestFailed: boolean;



  skuArrayList: any;

  videoUpload: any;
  videoUploadLoading: boolean;
  videoUploadLoaded: boolean;
  videoUploadFailed: boolean;

  videoPreview: any;
  videoPreviewLoading: boolean;
  videoPreviewLoaded: boolean;
  videoPreviewFailed: boolean;

}

export const ProductStateRecord = Record({
  excelLoading:false,
  productlist: [],
  productCount: 0,
  productDelete: {},
  productAdded: {},
  productUpdate: {},
  productDetail: {},
  optionList: {},
  gettingoptionList: {},
  getRatingList: {},
  ratingStatus: {},
  productBulkDelete: {},

  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,

  listLoading: false,
  listLoaded: false,
  listFailed: false,

  countLoading: false,
  countLoaded: false,
  countFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  updatLoading: false,
  updatLoaded: false,
  updatFailed: false,

  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,

  optionListLoading: false,
  optionListLoaded: false,
  optionListFailed: false,

  gettingOptionLoading: false,
  gettingOptionLoaded: false,
  gettingOptionFailed: false,

  productRemoveListResponse: false,
  productRemoveListRequestLoading: false,
  productRemoveListRequestLoaded: false,
  productRemoveListRequestFailed: false,

  productAddListResponse: false,
  productAddListRequestLoading: false,
  productAddListRequestLoaded: false,
  productAddListRequestFailed: false,

  skuArrayList: [],

  videoUpload: {},
  videoUploadLoading: false,
  videoUploadLoaded: false,
  videoUploadFailed: false,

  videoPreview: {},
  videoPreviewLoading: false,
  videoPreviewLoaded: false,
  videoPreviewFailed: false,

});
