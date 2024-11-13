import { createSelector } from 'reselect';
import { AppState } from 'src/core/app.state.interface';
import * as fromSellerManagement from './storeverify.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getSellerManagementState = (state: AppState) => state.StoreVerify;



// storeverifyList //
export const storeverifyList = createSelector(getSellerManagementState, fromSellerManagement.storeverifyList);
export const storeverifyListLoading = createSelector(getSellerManagementState, fromSellerManagement.storeverifyListLoading);
export const storeverifyListLoaded = createSelector(getSellerManagementState, fromSellerManagement.storeverifyListLoaded);

// storeverify //
export const storeverify = createSelector(getSellerManagementState, fromSellerManagement.storeverify);
export const storeverifyLoading = createSelector(getSellerManagementState, fromSellerManagement.storeverifyLoading);
export const storeverifyLoaded = createSelector(getSellerManagementState, fromSellerManagement.storeverifyLoaded);