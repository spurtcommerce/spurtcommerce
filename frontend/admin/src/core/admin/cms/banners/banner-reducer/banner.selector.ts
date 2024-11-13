/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { createSelector } from 'reselect';
import * as frombanner from '../banner-reducer/banner.reducer';
import { AppState } from '../../../../app.state.interface';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getBannerState = (state: AppState) => state.banner;
export const getBannerlst = createSelector(
  getBannerState,
  frombanner.getBannerlist
);
export const getbannerpagination = createSelector(
  getBannerState,
  frombanner.getbannerpagination
);
export const getAddBanners = createSelector(
  getBannerState,
  frombanner.getAddBanner
);
export const getaddBanner = createSelector(
  getBannerState,
  frombanner.getaddBanner
);
export const getdeletebanner = createSelector(
  getBannerState,
  frombanner.getdeletebanner
);

export const getbanneraddloaded = createSelector(
  getBannerState,
  frombanner.getbanneraddloaded
);
export const getbanneraddfailed = createSelector(
  getBannerState,
  frombanner.getbanneraddfailed
);
export const getbanneraddloading = createSelector(
  getBannerState,
  frombanner.getbanneraddloading
);

export const getUpdatebanner = createSelector(
  getBannerState,
  frombanner.getUpdatebanner
);
export const getbannerupdateloading = createSelector(
  getBannerState,
  frombanner.getbannerupdateloading
);
export const getbannerupdateloaded = createSelector(
  getBannerState,
  frombanner.getbannerupdateloaded
);
export const getbannerupdatefailed = createSelector(
  getBannerState,
  frombanner.getbannerupdatefailed
);

export const getbannerdeleteloading = createSelector(
  getBannerState,
  frombanner.getbannerdeleteloading
);
export const getbannerdeleteloaded = createSelector(
  getBannerState,
  frombanner.getbannerdeleteloaded
);
export const getbannerdeletefailed = createSelector(
  getBannerState,
  frombanner.getbannerdeletefailed
);

export const getbannercountloading = createSelector(
  getBannerState,
  frombanner.getbannercountloading
);
export const getbannercountloaded = createSelector(
  getBannerState,
  frombanner.getbannercountloaded
);
export const getbannercountfailed = createSelector(
  getBannerState,
  frombanner.getbannercountfailed
);

export const getbannerlistloaded = createSelector(
  getBannerState,
  frombanner.getbannerlistloaded
);
export const getbannerlistfailed = createSelector(
  getBannerState,
  frombanner.getbannerlistfailed
);
export const getbannerlistloading = createSelector(
  getBannerState,
  frombanner.getbannerlistloading
);

export const getbannerListCount = createSelector(
  getBannerState,
  frombanner.getbannerListCount
);
export const getbannerListCountLoaded = createSelector(
  getBannerState,
  frombanner.getbannerListCountLoaded
);
export const getbannerListCountFailed = createSelector(
  getBannerState,
  frombanner.getbannerListCountFailed
);
export const getbannerListCountLoading = createSelector(
  getBannerState,
  frombanner.getbannerListCountLoading
);

export const getbannerListActive = createSelector(
  getBannerState,
  frombanner.getbannerListActive
);
export const getbannerListActiveLoaded = createSelector(
  getBannerState,
  frombanner.getbannerListActiveLoaded
);
export const getbannerListACtiveFailed = createSelector(
  getBannerState,
  frombanner.getbannerListACtiveFailed
);
export const getbannerListActiveLoading = createSelector(
  getBannerState,
  frombanner.getbannerListActiveLoading
);

export const getbannerListInActive = createSelector(
  getBannerState,
  frombanner.getbannerListInActive
);
export const getbannerListInActiveLoaded = createSelector(
  getBannerState,
  frombanner.getbannerListInActiveLoaded
);
export const getbannerListInACtiveFailed = createSelector(
  getBannerState,
  frombanner.getbannerListInACtiveFailed
);
export const getbannerListInActiveLoading = createSelector(
  getBannerState,
  frombanner.getbannerListInActiveLoading
);


export const getBannerCount = createSelector(
  getBannerState,
  frombanner.getBannerCount
);
export const getBannerCountLoading = createSelector(
  getBannerState,
  frombanner.getBannerCountLoading
);
export const getBannerCountLoaded = createSelector(
  getBannerState,
  frombanner.getBannerCountLoaded
);
export const getBannerCountFailed = createSelector(
  getBannerState,
  frombanner.getBannerCountFailed
);


export const getBannerDetails = createSelector(
  getBannerState,
  frombanner.getBannerDetails
);
export const getBannerDetailsLoading = createSelector(
  getBannerState,
  frombanner.getBannerDetailsLoading
);
export const getBannerDetailsLoaded = createSelector(
  getBannerState,
  frombanner.getBannerDetailsLoaded
);
export const getBannerDetailsFailed = createSelector(
  getBannerState,
  frombanner.getBannerDetailsFailed
);

 /*category List*/


export const categoryLists = createSelector(
  getBannerState,
  frombanner.categoryLists
);

export const categoryListsLoading = createSelector(
  getBannerState,
  frombanner.categoryListsLoading
);
export const categoryListsLoaded = createSelector(
  getBannerState,
  frombanner.categoryListsLoaded
);
export const categoryListsFailed = createSelector(
  getBannerState,
  frombanner.categoryListsFailed
);


     /*Product List*/

     export const ProductLists = createSelector(
      getBannerState,
      frombanner.ProductLists
    );
    
    export const ProductListsLoading = createSelector(
      getBannerState,
      frombanner.ProductListsLoading
    );
    export const ProductListsLoaded = createSelector(
      getBannerState,
      frombanner.ProductListsLoaded
    );
    export const ProductListsFailed = createSelector(
      getBannerState,
      frombanner.ProductListsFailed
    );

    export const exportExcelLoading = createSelector(
      getBannerState,
      frombanner.exportExcelLoading
    );
