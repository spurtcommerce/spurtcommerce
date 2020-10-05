/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Map, Record } from 'immutable';
import { ProductListResponseModel } from '../product-model/product-list-response.model';
import { ProductAddResponseModel } from '../product-model/product-add-response.model';
import { DetailResponseModel } from '../product-model/detail-response.model';

export interface ProductState extends Map<string, any> {
  productList: ProductListResponseModel;
  productCount: any;
  productDelete: any;
  productAdded: any;
  addProductDetail: ProductAddResponseModel;
  productUpdate: ProductAddResponseModel;
  productDetail: DetailResponseModel;
  gettingoptionList: any;
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

  gettingOptionLoading: boolean;
  gettingOptionLoaded: boolean;
  gettingOptionFailed: boolean;
}

export const ProductStateRecord = Record({
  productlist: [],
  productCount: 0,
  productDelete: {},
  productAdded: {},
  productUpdate: {},
  productDetail: {},
  gettingoptionList: {},
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

  gettingOptionLoading: false,
  gettingOptionLoaded: false,
  gettingOptionFailed: false
});
