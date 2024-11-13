

import { Map, Record } from 'immutable';
import { DeliveryLocationlistResponseModel } from '../delivery-model/delivery-list-response.model';
import { DeliveryAddResponseModel } from '../delivery-model/delivery-add-response.model';
import { DetailResponseModel } from '../delivery-model/detail-response.model';
import { PriceUpdateListResponse } from '../delivery-model/price-update-List.model';

export interface DeliveryState extends Map<string, any> {

  deliveryAdded: any;

  optionList: any;
  gettingoptionList: any;
  getRatingList: any;
  ratingStatus: any;
  deliveryBulkDelete: any;

  deleteDelivery: any;
  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;


  deletePersonDelivery: any;
  deletePersonLoading: boolean;
  deletePersonLoaded: boolean;
  deletePersonFailed: boolean;

  deleteBulkDelivery: any;
  deleteBulkLoading: boolean;
  deleteBulkLoaded: boolean;
  deleteBulkFailed: boolean;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;
  deliveryLocationList: Array<any>;

  personsListLoading: boolean;
  personsListLoaded: boolean;
  personsListFailed: boolean;
  DeliveryPersonslist: Array<any>;

  stockStatusListLoading: boolean;
  stockStatusListLoaded: boolean;
  stockStatusListFailed: boolean;
  stockStatusList: Array<any>;

  deliveryStatus: any;
  deliveryStatusLoading: boolean;
  deliveryStatusLoaded: boolean;
  deliveryStatusFailed: boolean;

  deliveryUpdate: DeliveryAddResponseModel;
  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  deliveryPersonUpdate: any;
  updatePersonLoading: boolean;
  updatePersonLoaded: boolean;
  updatePersonFailed: boolean;

  deliveryDetail: {};
  detailLoading: false;
  detailLoaded: false;
  detailFailed: false;
  availableCategoryList: [];

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  deliveryPersonAdded: any;
  addPersonLoading: boolean;
  addPersonLoaded: boolean;
  addPersonFailed: boolean;
  categoryListLoading: boolean;
  categoryList: Array<any>;
  tempCategoryList: Array<any>;
  currentCategoryList: Array<any>;
  totalDeliveryCount: number;
  totalDeliveryCountLoading: boolean;
  totalDeliveryCountLoaded: boolean;
  totalDeliveryCountFailed: boolean;

  deliveryPersonsCount: number;
  deliveryPersonsCountLoading: boolean;
  deliveryPersonsCountLoaded: boolean;
  deliveryPersonsCountFailed: boolean;

  inactiveDeliveryCount: number;
  inactiveDeliveryCountLoading: boolean;
  inactiveDeliveryCountLoaded: boolean;
  inactiveDeliveryCountFailed: boolean;

  downloadMainCsv: number;
  downloadMainCsvLoading: boolean;
  downloadMainCsvLoaded: boolean;
  downloadMainCsvFailed: boolean;

  uploadMainCsv: number;
  uploadMainCsvLoading: boolean;
  uploadMainCsvLoaded: boolean;
  uploadMainCsvFailed: boolean;

  priceCsvList: Array<PriceUpdateListResponse>;
  priceCsvListLoading: boolean;
  priceCsvListLoaded: boolean;
  priceCsvListFailed: boolean;

  priceCsvCount: number;
  priceCsvCountLoading: boolean;
  priceCsvCountLoaded: boolean;
  priceCsvCountFailed: boolean;

  deleteCsvList: number;
  deleteCsvListLoading: boolean;
  deleteCsvListLoaded: boolean;
  deleteCsvListFailed: boolean;

  downloadCsv: number;
  downloadCsvLoading: boolean;
  downloadCsvLoaded: boolean;
  downloadCsvFailed: boolean;

}

export const DeliveryStateRecord = Record({

  deliveryAdded: {},

  listLoading: false,
  listLoaded: false,
  listFailed: false,
  deliveryLocationList: [],


  stockStatusLoading: false,
  stockStatusLoaded: false,
  stockStatusFailed: false,
  stockStatusList: [],

  deleteDelivery: {},
  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,

  deletePersonDelivery: {},
  deletePersonLoading: false,
  deletePersonLoaded: false,
  deletePersonFailed: false,

  deleteBulkDelivery: {},
  deleteBulkLoading: false,
  deleteBulkLoaded: false,
  deleteBulkFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  deliveryPersonAdded: {},
  addPersonLoading: false,
  addPersonLoaded: false,
  addPersonFailed: false,

  deliveryUpdate: {},
  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,
  deliveryPersonUpdate: {},
  updatePersonLoading: false,
  updatePersonLoaded: false,
  updatePersonFailed: false,
  categoryListLoading: false,
  categoryList: [],
  tempCategoryList: [],
  currentCategoryList: [],
  deliveryDetail: DetailResponseModel,
  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,

  deliveryStatus: [],
  deliveryStatusLoading: false,
  deliveryStatusLoaded: false,
  deliveryStatusFailed: false,

  totalDeliveryCount: [],
  totalDeliveryCountLoading: false,
  totalDeliveryCountLoaded: false,
  totalDeliveryCountFailed: false,

  deliveryPersonsCount: [],
  deliveryPersonsCountLoading: false,
  deliveryPersonsCountLoaded: false,
  deliveryPersonsCountFailed: false,

  inactiveDeliveryCount: [],
  inactiveDeliveryCountLoading: false,
  inactiveDeliveryCountLoaded: false,
  inactiveDeliveryCountFailed: false,

  downloadMainCsv: {},
  downloadMainCsvLoading: false,
  downloadMainCsvLoaded: false,
  downloadMainCsvFailed: false,

  uploadMainCsv: {},
  uploadMainCsvLoading: false,
  uploadMainCsvLoaded: false,
  uploadMainCsvFailed: false,

  priceCsvList: [],
  priceCsvListLoading: false,
  priceCsvListLoaded: false,
  priceCsvListFailed: false,

  priceCsvCount: [],
  priceCsvCountLoading: false,
  priceCsvCountLoaded: false,
  priceCsvCountFailed: false,

  deleteCsvList: {},
  deleteCsvListLoading: false,
  deleteCsvListLoaded: false,
  deleteCsvListFailed: false,


  downloadCsv: {},
  downloadCsvLoading: false,
  downloadCsvLoaded: false,
  downloadCsvFailed: false,

});

