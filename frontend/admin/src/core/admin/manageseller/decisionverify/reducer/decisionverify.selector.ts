import { createSelector } from 'reselect';
import { AppState } from 'src/core/app.state.interface';
import * as fromSellerManagement from './decisionverify.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getSellerManagementState = (state: AppState) => state.DecisionVerify;



// decisionVerifyList //
export const decisionVerifyList = createSelector(getSellerManagementState, fromSellerManagement.decisionVerifyList);
export const decisionVerifyListLoading = createSelector(getSellerManagementState, fromSellerManagement.decisionVerifyListLoading);
export const decisionVerifyListLoaded = createSelector(getSellerManagementState, fromSellerManagement.decisionVerifyListLoaded);

