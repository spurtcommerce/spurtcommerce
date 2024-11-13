

import { AppState } from '../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromcrmGroups from './myShop.reducer';
// *************************** PUBLIC API's ****************************

export const getProdState = (state: AppState) => state.myShop;

// basicDetailCreate //
export const basicDetailCreate = createSelector(getProdState, fromcrmGroups.basicDetailCreate);
export const basicDetailCreateLoading = createSelector(getProdState, fromcrmGroups.basicDetailCreateLoading);
export const basicDetailCreateLoaded = createSelector(getProdState, fromcrmGroups.basicDetailCreateLoaded);

// basicDetailGet //
export const basicDetailGet = createSelector(getProdState, fromcrmGroups.basicDetailGet);
export const basicDetailGetLoading = createSelector(getProdState, fromcrmGroups.basicDetailGetLoading);
export const basicDetailGetLoaded = createSelector(getProdState, fromcrmGroups.basicDetailGetLoaded);

// certificateUpdate //
export const certificateUpdate = createSelector(getProdState, fromcrmGroups.certificateUpdate);
export const certificateUpdateLoading = createSelector(getProdState, fromcrmGroups.certificateUpdateLoading);
export const certificateUpdateLoaded = createSelector(getProdState, fromcrmGroups.certificateUpdateLoaded);

// certificateDetail //
export const certificateDetail = createSelector(getProdState, fromcrmGroups.certificateDetail);
export const certificateDetailLoading = createSelector(getProdState, fromcrmGroups.certificateDetailLoading);
export const certificateDetailLoaded = createSelector(getProdState, fromcrmGroups.certificateDetailLoaded);

// imageUpload //
export const imageUpload = createSelector(getProdState, fromcrmGroups.imageUpload);
export const imageUploadLoading = createSelector(getProdState, fromcrmGroups.imageUploadLoading);
export const imageUploadLoaded = createSelector(getProdState, fromcrmGroups.imageUploadLoaded);

// imageUpdate //
export const imageUpdate = createSelector(getProdState, fromcrmGroups.imageUpdate);
export const imageUpdateLoading = createSelector(getProdState, fromcrmGroups.imageUpdateLoading);
export const imageUpdateLoaded = createSelector(getProdState, fromcrmGroups.imageUpdateLoaded);

// imageDetail //
export const imageDetail = createSelector(getProdState, fromcrmGroups.imageDetail);
export const imageDetailLoading = createSelector(getProdState, fromcrmGroups.imageDetailLoading);
export const imageDetailLoaded = createSelector(getProdState, fromcrmGroups.imageDetailLoaded);


// videoUpload //
export const videoUpload = createSelector(getProdState, fromcrmGroups.videoUpload);
export const videoUploadLoading = createSelector(getProdState, fromcrmGroups.videoUploadLoading);
export const videoUploadLoaded = createSelector(getProdState, fromcrmGroups.videoUploadLoaded);


// videoUpdate //
export const videoUpdate = createSelector(getProdState, fromcrmGroups.videoUpdate);
export const videoUpdateLoading = createSelector(getProdState, fromcrmGroups.videoUpdateLoading);
export const videoUpdateLoaded = createSelector(getProdState, fromcrmGroups.videoUpdateLoaded);

// videoDetail //
export const videoDetail = createSelector(getProdState, fromcrmGroups.videoDetail);
export const videoDetailLoading = createSelector(getProdState, fromcrmGroups.videoDetailLoading);
export const videoDetailLoaded = createSelector(getProdState, fromcrmGroups.videoDetailLoaded);

// certificateList //
export const certificateList = createSelector(getProdState, fromcrmGroups.certificateList);
export const certificateListLoading = createSelector(getProdState, fromcrmGroups.certificateListLoading);
export const certificateListLoaded = createSelector(getProdState, fromcrmGroups.certificateListLoaded);

// certificateListCount //
export const certificateListCount = createSelector(getProdState, fromcrmGroups.certificateListCount);
export const certificateListCountLoading = createSelector(getProdState, fromcrmGroups.certificateListCountLoading);
export const certificateListCountLoaded = createSelector(getProdState, fromcrmGroups.certificateListCountLoaded);

// certificateDelete //
export const certificateDelete = createSelector(getProdState, fromcrmGroups.certificateDelete);
export const certificateDeleteLoading = createSelector(getProdState, fromcrmGroups.certificateDeleteLoading);
export const certificateDeleteLoaded = createSelector(getProdState, fromcrmGroups.certificateDeleteLoaded);

// DocumentUpload //
export const DocumentUpload = createSelector(getProdState, fromcrmGroups.DocumentUpload);
export const DocumentUploadLoading = createSelector(getProdState, fromcrmGroups.DocumentUploadLoading);
export const DocumentUploadLoaded = createSelector(getProdState, fromcrmGroups.DocumentUploadLoaded);

// documentType //
export const documentType = createSelector(getProdState, fromcrmGroups.documentType);
export const documentTypeLoading = createSelector(getProdState, fromcrmGroups.documentTypeLoading);
export const documentTypeLoaded = createSelector(getProdState, fromcrmGroups.documentTypeLoaded);



// certificateCreate //
export const certificateCreate = createSelector(getProdState, fromcrmGroups.certificateCreate);
export const certificateCreateLoading = createSelector(getProdState, fromcrmGroups.certificateCreateLoading);
export const certificateCreateLoaded = createSelector(getProdState, fromcrmGroups.certificateCreateLoaded);

// VideoStatusChange //
export const VideoStatusChange = createSelector(getProdState, fromcrmGroups.VideoStatusChange);
export const VideoStatusChangeLoading = createSelector(getProdState, fromcrmGroups.VideoStatusChangeLoading);
export const VideoStatusChangeLoaded = createSelector(getProdState, fromcrmGroups.VideoStatusChangeLoaded);

// personalized settings
// updatePersonalizedSettings //
export const updatePersonalizedSettings = createSelector(getProdState, fromcrmGroups.updatePersonalizedSettings);
export const updatePersonalizedSettingsLoading = createSelector(getProdState, fromcrmGroups.updatePersonalizedSettingsLoading);
export const updatePersonalizedSettingsLoaded = createSelector(getProdState, fromcrmGroups.updatePersonalizedSettingsLoaded);

// getPersonalizedSettings //
export const getPersonalizedSettings = createSelector(getProdState, fromcrmGroups.getPersonalizedSettings);
export const getPersonalizedSettingsLoading = createSelector(getProdState, fromcrmGroups.getPersonalizedSettingsLoading);
export const getPersonalizedSettingsLoaded = createSelector(getProdState, fromcrmGroups.getPersonalizedSettingsLoaded);