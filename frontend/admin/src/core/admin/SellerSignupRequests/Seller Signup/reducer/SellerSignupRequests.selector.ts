import { createSelector } from 'reselect';
import { AppState } from 'src/core/app.state.interface';
import * as SellerSignupRequests from './SellerSignupRequests.reducer';

/**
 * Auth store functions
 */

export const sellerSignupRequests = (state: AppState) => state.SellerSignupRequests;

export const sellerSignupList = createSelector(sellerSignupRequests, SellerSignupRequests.sellerSignupList);
export const sellerSignupListLoading = createSelector(sellerSignupRequests, SellerSignupRequests.sellerSignupListLoading);
export const sellerSignupListLoaded = createSelector(sellerSignupRequests, SellerSignupRequests.sellerSignupListLoaded);

//sellerSignupListCount
export const sellerSignupListCount = createSelector(sellerSignupRequests, SellerSignupRequests.sellerSignupListCount);
export const sellerSignupListCountLoading = createSelector(sellerSignupRequests, SellerSignupRequests.sellerSignupListCountLoading);
export const sellerSignupListCountLoaded = createSelector(sellerSignupRequests, SellerSignupRequests.sellerSignupListCountLoaded);


//updateSeller
export const updateSeller = createSelector(sellerSignupRequests, SellerSignupRequests.updateSeller);
export const updateSellerLoading = createSelector(sellerSignupRequests, SellerSignupRequests.updateSellerLoading);
export const updateSellerLoaded = createSelector(sellerSignupRequests, SellerSignupRequests.updateSellerLoaded);

