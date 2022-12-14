/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface BannerState extends Map<string, any> {
  bannerList: any;
  bannerPagination: any;
  newBanner: any;
  updateBanner: any;
  deleteBanner: any;
  addBanner: any;
  bannerListCount: any;
  bannerListLoaded: boolean;
  bannerListFailed: boolean;
  bannerListLoading: boolean;
  bannerAddLoaded: boolean;
  bannerAddFailed: boolean;
  bannerAddLoading: boolean;
  bannerUpdateLoading: boolean;
  bannerUpdateLoaded: boolean;
  bannerUpdateFailed: boolean;
  bannerDeleteLoading: boolean;
  bannerDeleteLoaded: boolean;
  bannerDeleteFailed: boolean;
  bannerCountLoading: boolean;
  bannerCountLoaded: boolean;
  bannerCountFailed: boolean;
  bannerListCountLoaded: boolean;
  bannerListCountFailed: boolean;
  bannerListCountLoading: boolean;
  bannerListActive: any;
  bannerListActiveLoaded: boolean;
  bannerListACtiveFailed: boolean;
  bannerListActiveLoading: boolean;
  bannerListInActive: any;
  bannerListInActiveLoaded: boolean;
  bannerListInACtiveFailed: boolean;
  bannerListInActiveLoading: boolean;

  getBannerCount: any;
  getBannerCountLoaded: boolean;
  getBannerCountFailed: boolean;
  getBannerCountLoading: boolean;

  getBannerDetails: any;
  getBannerDetailsLoaded: boolean;
  getBannerDetailsFailed: boolean;
  getBannerDetailsLoading: boolean;

   /*category List*/

  categoryLists: any;
  categoryListsLoading: boolean;
  categoryListsLoaded: boolean;
  categoryListsFailed: boolean;

       /*Product List*/
  ProductLists: any;
  ProductListsLoading: boolean;
  ProductListsLoaded: boolean;
  ProductListsFailed: boolean;

}

export const BannerRecordState = Record({
  bannerList: {},
  bannerPagination: {},
  newBanner: {},
  updateBanner: {},
  deleteBanner: {},
  addBanner: {},
  bannerListCount: {},
  bannerListLoaded: false,
  bannerListFailed: false,
  bannerListLoading: false,
  bannerAddLoaded: false,
  bannerAddFailed: false,
  bannerAddLoading: false,
  bannerUpdateLoading: false,
  bannerUpdateLoaded: false,
  bannerUpdateFailed: false,
  bannerDeleteLoading: false,
  bannerDeleteLoaded: false,
  bannerDeleteFailed: false,
  bannerCountLoading: false,
  bannerCountLoaded: false,
  bannerCountFailed: false,
  bannerListCountLoaded: false,
  bannerListCountFailed: false,
  bannerListCountLoading: false,
  bannerListActive: {},
  bannerListActiveLoaded: false,
  bannerListACtiveFailed: false,
  bannerListActiveLoading: false,
  bannerListInActive: {},
  bannerListInActiveLoaded: false,
  bannerListInACtiveFailed: false,
  bannerListInActiveLoading: false,

  getBannerCount: {},
  getBannerCountLoaded: false,
  getBannerCountFailed: false,
  getBannerCountLoading: false,

  getBannerDetails: {},
  getBannerDetailsLoaded: false,
  getBannerDetailsFailed: false,
  getBannerDetailsLoading: false,

   /*category List*/

  categoryLists: {},
  categoryListsLoading: false,
  categoryListsLoaded: false,
  categoryListsFailed: false,

       /*Product List*/
  ProductLists: {},
  ProductListsLoading: false,
  ProductListsLoaded: false,
  ProductListsFailed: false,


});
