/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { BannerListModel } from '../models/banner-list.model';
import { ContactUsRequestModel } from '../models/contact-us-request.model';
import { TodaydealModel } from '../models/todaydeal.model';

export const ActionTypes = {
  GET_PRODUCT_LIST: type('[product] get product list'),
  PRODUCT_LIST_SUCCESS: type('[product] get product list success'),
  PRODUCT_LIST_FAIL: type('[product] get product list fail'),

  GET_ACTIVE_CATEGORY: type('[active_category] get active_category list'),
  GET_ACTIVE_CATEGORY_SUCCESS: type(
    '[active_category] get active_category list success'
  ),
  GET_ACTIVE_CATEGORY_FAIL: type(
    '[active_category] get active_category list fail'
  ),

  GET_AVAILABLE_VALUE: type('[available_data] get availabe  options'),
  GET_VIEW_ALL: type('[view] get view all'),

  GET_ZONE_LIST: type('[zone_list] zone list'),
  GET_ZONE_LIST_SUCCESS: type('[zone_list] zone list success'),
  GET_ZONE_LIST_FAIL: type('[zone_list] zone list fail'),

  GET_COUNTRY_LIST: type('[country_list] country list'),
  GET_COUNTRY_LIST_SUCCESS: type('[country_list] country list success'),
  GET_COUNTRY_LIST_FAIL: type('[country_list] country list fail'),

  GET_PRODUCT_COUNT: type('[product_count] get product count'),
  PRODUCT_COUNT_SUCCESS: type('[product_count] get product count success'),
  PRODUCT_COUNT_FAIL: type('[product_count] get product count fail'),

  GET_CATEGORY_LIST: type('[category] get category list'),
  CATEGORY_LIST_SUCCESS: type('[category] get category list success'),
  CATEGORY_LIST_FAIL: type('[category] get category list fail'),

  GET_MANUFACTURER_LIST: type('[manufacturer] get manufacturer list'),
  MANUFACTURER_LIST_SUCCESS: type(
    '[manufacturer] get manufacturer list success'
  ),
  MANUFACTURER_LIST_FAIL: type('[manufacturer] get manufacturer list fail'),

  GET_PRODUCT_DETAIL: type('[product detail] get product detail'),
  PRODUCT_DETAIL_SUCCESS: type('[product detail] get product detail success'),
  PRODUCT_DETAIL_FAIL: type('[product detail] get product detail fail'),

  GET_PRODUCT_DETAIL_MANDATORY: type(
    '[product detail mandatory] get product detail mandatory'
  ),
  PRODUCT_DETAIL_MANDATORY_SUCCESS: type(
    '[product detail mandatory] get product detail mandatory success'
  ),
  PRODUCT_DETAIL_MANDATORY_FAIL: type(
    '[product detail mandatory] get product detail mandatory fail'
  ),

  GET_BANNER_LIST: type('[banner] get banner list'),
  GET_BANNER_LIST_SUCCESS: type('[banner] get banner list success'),
  GET_BANNER_LIST_FAIL: type('[banner] get banner list fail'),

  GET_BANNER_LIST_COUNT: type('[banner_count] get banner list count'),
  GET_BANNER_LIST_COUNT_SUCCESS: type(
    '[banner_count] get banner list count success'
  ),
  GET_BANNER_LIST_COUNT_FAIL: type('[banner_count] get banner list count fail'),

  GET_PAGE_LIST: type('[page_list] get page list '),
  GET_PAGE_LIST_SUCCESS: type('[page_list] get page list success'),
  GET_PAGE_LIST_FAIL: type('[page_list] get page list fail'),

  GET_SETTINGS_ACTION: type('[setting] get settings '),
  GET_SETTINGS_SUCCESS_ACTION: type('[setting] get settings succeess'),
  GET_SETTINGS_FAIL_ACTION: type('[setting] get settings fail'),

  DO_CONTACT_US_ACTION: type('[contact_us] contact us '),
  DO_CONTACT_US_SUCCESS_ACTION: type('[contact_us] contact us succeess'),
  DO_CONTACT_US_FAIL_ACTION: type('[contact_us] contact us fail'),

  GET_PAGE_DETAIL: type('[page_detail] page detail '),
  GET_PAGE_DETAIL_SUCCESS: type('[page_detail] page detail succeess'),
  GET_PAGE_DETAIL_FAIL: type('[page_detail] page detail fail'),

  GET_TODAY_DEALS: type('[top_deals] top deals'),
  GET_TODAY_DEALS_SUCCESS: type('[top_deals] top deals success'),
  GET_TODAY_DEALS_FAIL: type('[top_deals]top deals fail'),

  GET_SERVICE_CATEGORY: type('[service category] category list'),
  GET_SERVICE_CATEGORY_SUCCESS: type(
    '[service category] category list success'
  ),
  GET_SERVICE_CATEGORY_FAIL: type('[service category] category list fail'),

  GET_SERVICE_LIST: type('[service list]  list'),
  GET_SERVICE_LIST_SUCCESS: type('[service list]  list success'),
  GET_SERVICE_LIST_FAIL: type('[service list]  list fail'),

  CREATE_ENQUIRY: type('[service enquiry] create'),
  CREATE_ENQUIRY_SUCCESS: type('[service enquiry] success'),
  CREATE_ENQUIRY_FAIL: type('[service enquiry] fail'),
  REMOVE_ACTIVE_CATEGORYID: type('[remove active category]'),

  GET_SubCATEGORY_LIST: type('[SUB_CATEGORY] SUB CATEGORY'),
  GET_SubCATEGORY_LIST_SUCCESS: type('[SUB_CATEGORY] SUB CATEGORY SUCCESS'),
  GET_SubCATEGORY_LIST_FAIL: type('[SUB_CATEGORY] SUB CATEGORY FAIL'),
};


/* get product action*/

export class GetProductList implements Action {
  type = ActionTypes.GET_PRODUCT_LIST;

  constructor(public payload: any) {}
}

export class GetProductListSuccess implements Action {
  type = ActionTypes.PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductListFail implements Action {
  type = ActionTypes.PRODUCT_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get Sub category action*/

export class GetActiveCategory implements Action {
  type = ActionTypes.GET_ACTIVE_CATEGORY;

  constructor(public payload: any) {}
}

export class GetActiveCategorySuccess implements Action {
  type = ActionTypes.GET_ACTIVE_CATEGORY_SUCCESS;

  constructor(public payload: any) {}
}

export class GetActiveCategoryFail implements Action {
  type = ActionTypes.GET_ACTIVE_CATEGORY_FAIL;

  constructor(public payload: any) {}
}
export class RemoveActiveCategoryId implements Action {
  type = ActionTypes.REMOVE_ACTIVE_CATEGORYID;
  constructor(public payload = null) {}
}

export class GetProductCount implements Action {
  type = ActionTypes.GET_PRODUCT_COUNT;

  constructor(public payload: any) {}
}

export class GetProductCountSuccess implements Action {
  type = ActionTypes.PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductCountFail implements Action {
  type = ActionTypes.PRODUCT_COUNT_FAIL;

  constructor(public payload: any) {}
}

/* get product detail action*/

export class GetProductDetail implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL;

  constructor(public payload: any) {}
}

export class GetProductDetailSuccess implements Action {
  type = ActionTypes.PRODUCT_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductDetailFail implements Action {
  type = ActionTypes.PRODUCT_DETAIL_FAIL;

  constructor(public payload: any) {}
}

/* get product detail mandatory option action*/

export class GetProductDetailMandatory implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL_MANDATORY;

  constructor(public payload: any) {}
}

export class GetProductDetailMandatorySuccess implements Action {
  type = ActionTypes.PRODUCT_DETAIL_MANDATORY_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductDetailMandatoryFail implements Action {
  type = ActionTypes.PRODUCT_DETAIL_MANDATORY_FAIL;

  constructor(public payload: any) {}
}

/* get category action*/

export class GetCategoryList implements Action {
  type = ActionTypes.GET_CATEGORY_LIST;

  constructor(public payload: any) {}
}

export class GetCategoryListSuccess implements Action {
  type = ActionTypes.CATEGORY_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetCategoryListFail implements Action {
  type = ActionTypes.CATEGORY_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get brand action*/

export class GetManufacturerList implements Action {
  type = ActionTypes.GET_MANUFACTURER_LIST;

  constructor(public payload: any) {}
}

export class ManufacturerListSuccess implements Action {
  type = ActionTypes.MANUFACTURER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class ManufacturerListtFail implements Action {
  type = ActionTypes.MANUFACTURER_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get banner action*/

export class GetBannerList implements Action {
  type = ActionTypes.GET_BANNER_LIST;

  constructor(public payload: BannerListModel) {}
}

export class GetBannerListSuccess implements Action {
  type = ActionTypes.GET_BANNER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetBannaerListFail implements Action {
  type = ActionTypes.GET_BANNER_LIST_FAIL;

  constructor(public payload: any) {}
}

export class GetBannerListCount implements Action {
  type = ActionTypes.GET_BANNER_LIST_COUNT;

  constructor(public payload: BannerListModel) {}
}

export class GetBannerListCountSuccess implements Action {
  type = ActionTypes.GET_BANNER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetBannaerListCountFail implements Action {
  type = ActionTypes.GET_BANNER_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get page list action*/

export class GetPageList implements Action {
  type = ActionTypes.GET_PAGE_LIST;

  constructor(public payload: any) {}
}

export class GetPageListSuccess implements Action {
  type = ActionTypes.GET_PAGE_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPageListFail implements Action {
  type = ActionTypes.GET_PAGE_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get settings action*/

export class GetSettings implements Action {
  type = ActionTypes.GET_SETTINGS_ACTION;

  constructor(public payload = null) {}
}

export class GetSettingsSuccess implements Action {
  type = ActionTypes.GET_SETTINGS_SUCCESS_ACTION;

  constructor(public payload: any) {}
}

export class GetSettingsFail implements Action {
  type = ActionTypes.GET_SETTINGS_FAIL_ACTION;

  constructor(public payload: any) {}
}

/* do contact us action*/

export class DoContactUsAction implements Action {
  type = ActionTypes.DO_CONTACT_US_ACTION;

  constructor(public payload: ContactUsRequestModel) {}
}

export class DoContactUsActionSuccess implements Action {
  type = ActionTypes.DO_CONTACT_US_SUCCESS_ACTION;

  constructor(public payload: any) {}
}

export class DoContactUsActionFail implements Action {
  type = ActionTypes.DO_CONTACT_US_FAIL_ACTION;

  constructor(public payload: any) {}
}

/* get page detail action*/

export class GetPageDetails implements Action {
  type = ActionTypes.GET_PAGE_DETAIL;

  constructor(public payload: ContactUsRequestModel) {}
}

export class GetPageDetailsSuccess implements Action {
  type = ActionTypes.GET_PAGE_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPageDetailsFail implements Action {
  type = ActionTypes.GET_PAGE_DETAIL_FAIL;

  constructor(public payload: any) {}
}

/* available options */
export class GetAvailableValue implements Action {
  type = ActionTypes.GET_AVAILABLE_VALUE;

  constructor(public payload: any) {}
}

/* get country list action*/

export class GetCountryList implements Action {
  type = ActionTypes.GET_COUNTRY_LIST;

  constructor(public payload: any) {}
}

export class GetCountryListSuccess implements Action {
  type = ActionTypes.GET_COUNTRY_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetCountryListFail implements Action {
  type = ActionTypes.GET_COUNTRY_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get Zone list action*/

export class GetZoneList implements Action {
  type = ActionTypes.GET_ZONE_LIST;

  constructor(public payload: any) {}
}

export class GetZoneListSuccess implements Action {
  type = ActionTypes.GET_ZONE_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetZoneListFail implements Action {
  type = ActionTypes.GET_ZONE_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get Top deals list action*/

export class GetTodayDealsList implements Action {
  type = ActionTypes.GET_TODAY_DEALS;

  constructor(public payload: TodaydealModel) {}
}

export class GetTodayDealsListSuccess implements Action {
  type = ActionTypes.GET_TODAY_DEALS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTodayDealsListFail implements Action {
  type = ActionTypes.GET_TODAY_DEALS_FAIL;

  constructor(public payload: any) {}
}

// service category list
export class GetServiceCategory implements Action {
  type = ActionTypes.GET_SERVICE_CATEGORY;

  constructor(public payload: any) {}
}

export class GetServiceCategorySuccess implements Action {
  type = ActionTypes.GET_SERVICE_CATEGORY_SUCCESS;

  constructor(public payload: any) {}
}

export class GetServiceCategoryFail implements Action {
  type = ActionTypes.GET_SERVICE_CATEGORY_FAIL;

  constructor(public payload: any) {}
}
// service list
export class GetServiceList implements Action {
  type = ActionTypes.GET_SERVICE_LIST;

  constructor(public payload: any) {}
}

export class GetServiceListSuccess implements Action {
  type = ActionTypes.GET_SERVICE_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetServiceListFail implements Action {
  type = ActionTypes.GET_SERVICE_LIST_FAIL;

  constructor(public payload: any) {}
}
// service enquiry
export class CreateEnquiry implements Action {
  type = ActionTypes.CREATE_ENQUIRY;

  constructor(public payload: any) {}
}

export class CreateEnquirySuccess implements Action {
  type = ActionTypes.CREATE_ENQUIRY_SUCCESS;

  constructor(public payload: any) {}
}

export class CreateEnquiryFail implements Action {
  type = ActionTypes.CREATE_ENQUIRY_FAIL;

  constructor(public payload: any) {}
}

// sub category
export class GetSubCategoryList implements Action {
  type = ActionTypes.GET_SubCATEGORY_LIST;

  constructor(public payload: any) {}
}

export class GetSubCategoryListSuccess implements Action {
  type = ActionTypes.GET_SubCATEGORY_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetSubCategoryListFail implements Action {
  type = ActionTypes.GET_SubCATEGORY_LIST_FAIL;

  constructor(public payload: any) {}
}
export type Actions =
  | GetProductList
  | GetProductListSuccess
  | GetProductListFail
  | GetProductCount
  | GetProductCountSuccess
  | GetProductCountFail
  | GetCategoryList
  | GetCategoryListSuccess
  | GetCategoryListFail
  | GetAvailableValue
  | GetManufacturerList
  | ManufacturerListSuccess
  | ManufacturerListtFail
  | GetProductDetail
  | GetProductDetailSuccess
  | GetProductDetailFail
  | GetBannerList
  | GetBannerListSuccess
  | GetBannaerListFail
  | GetBannerListCount
  | GetBannerListCountSuccess
  | GetBannaerListCountFail
  | GetProductDetailMandatory
  | GetProductDetailMandatorySuccess
  | GetProductDetailMandatoryFail
  | GetPageList
  | GetPageListSuccess
  | GetPageListFail
  | DoContactUsAction
  | DoContactUsActionSuccess
  | DoContactUsActionFail
  | GetTodayDealsList
  | GetTodayDealsListSuccess
  | GetTodayDealsListFail
  | GetActiveCategory
  | GetActiveCategorySuccess
  | GetActiveCategoryFail
  | GetZoneList
  | GetZoneListSuccess
  | GetZoneListFail
  | GetServiceCategory
  | GetServiceCategorySuccess
  | GetServiceCategoryFail
  | GetServiceList
  | GetServiceListSuccess
  | GetServiceListFail
  | CreateEnquiry
  | CreateEnquirySuccess
  | CreateEnquiryFail
  | RemoveActiveCategoryId;

