import { createSelector } from 'reselect';
import { AppState } from 'src/core/app.state.interface';
import * as bankVerifyManagement from './bankVerify.reducer';

/**
 * Auth store functions
 */

export const getbankVerifyState = (state: AppState) => state.BankVerify;

export const bankVerifyList = createSelector(getbankVerifyState, bankVerifyManagement.bankVerifyList);
export const bankVerifyListLoading = createSelector(getbankVerifyState, bankVerifyManagement.bankVerifyListLoading);
export const bankVerifyListLoaded = createSelector(getbankVerifyState, bankVerifyManagement.bankVerifyListLoaded);

//bankVerifyChecked
export const bankVerifyChecked = createSelector(getbankVerifyState, bankVerifyManagement.bankVerifyChecked);
export const bankVerifyCheckedLoading = createSelector(getbankVerifyState, bankVerifyManagement.bankVerifyCheckedLoading);
export const bankVerifyCheckedLoaded = createSelector(getbankVerifyState, bankVerifyManagement.bankVerifyCheckedLoaded);

