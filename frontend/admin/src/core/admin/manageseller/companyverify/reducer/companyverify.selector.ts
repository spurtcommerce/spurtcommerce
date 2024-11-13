import { createSelector } from 'reselect';
import { AppState } from 'src/core/app.state.interface';
import * as companyVerifyManagement from './companyverify.reducer';

// ************************* PUBLIC API's **************************
/**
 * Auth store functions
 */
export const getcompanyVerifyState = (state: AppState) => state.CompanyVerify;

export const companyVerifyList = createSelector(getcompanyVerifyState, companyVerifyManagement.companyVerifyList);
export const companyVerifyListLoading = createSelector(getcompanyVerifyState, companyVerifyManagement.companyVerifyListLoading);
export const companyVerifyListLoaded = createSelector(getcompanyVerifyState, companyVerifyManagement.companyVerifyListLoaded);


//companyVerifychecked

export const companyVerifychecked = createSelector(getcompanyVerifyState, companyVerifyManagement.companyVerifychecked);
export const companyVerifycheckedLoading = createSelector(getcompanyVerifyState, companyVerifyManagement.companyVerifycheckedLoading);
export const companyVerifycheckedLoaded = createSelector(getcompanyVerifyState, companyVerifyManagement.companyVerifycheckedLoaded);


//countryList

export const countryList = createSelector(getcompanyVerifyState, companyVerifyManagement.countryList);
export const countryListLoading = createSelector(getcompanyVerifyState, companyVerifyManagement.countryListLoading);
export const countryListLoaded = createSelector(getcompanyVerifyState, companyVerifyManagement.countryListLoaded);


// companyVerifycheckedApi //
export const companyVerifycheckedApi = createSelector(getcompanyVerifyState, companyVerifyManagement.companyVerifycheckedApi);
export const companyVerifycheckedApiLoading = createSelector(getcompanyVerifyState, companyVerifyManagement.companyVerifycheckedApiLoading);
export const companyVerifycheckedApiLoaded = createSelector(getcompanyVerifyState, companyVerifyManagement.companyVerifycheckedApiLoaded);


// verificationStatus //
export const verificationStatus = createSelector(getcompanyVerifyState, companyVerifyManagement.verificationStatus);
export const verificationStatusLoading = createSelector(getcompanyVerifyState, companyVerifyManagement.verificationStatusLoading);
export const verificationStatusLoaded = createSelector(getcompanyVerifyState, companyVerifyManagement.verificationStatusLoaded);


