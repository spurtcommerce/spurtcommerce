import { createSelector } from 'reselect';
import { AppState } from 'src/core/app.state.interface';
import * as fromSellerManagement from './pending-layout.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getSellerManagementState = (state: AppState) => state.PandingLayout;



// pendingLayoutsList //
export const pendingLayoutsList = createSelector(getSellerManagementState, fromSellerManagement.pendingLayoutsList);
export const pendingLayoutsListLoading = createSelector(getSellerManagementState, fromSellerManagement.pendingLayoutsListLoading);
export const pendingLayoutsListLoaded = createSelector(getSellerManagementState, fromSellerManagement.pendingLayoutsListLoaded);