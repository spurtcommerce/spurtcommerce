/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { createSelector } from 'reselect';
import * as fromMedia from './media.reducer';
// app state
import { AppState } from '../../../../app.state.interface';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getAddmediaState = (state: AppState) => state.media;
// Media upload
export const getMediaUploaddata = createSelector(
  getAddmediaState,
  fromMedia.getMediaUpload
);
// Media delete file
export const getbucketDeleteFile = createSelector(
  getAddmediaState,
  fromMedia.getBucketdeletefile
);
// Media upload
export const getmediauploadResponse = createSelector(
  getAddmediaState,
  fromMedia.getmediauploadResponse
);
export const getmediauploadRequestLoadings = createSelector(
  getAddmediaState,
  fromMedia.getmediauploadRequestLoading
);
export const getmediauploadRequestLoaded = createSelector(
  getAddmediaState,
  fromMedia.getmediauploadRequestLoaded
);
export const getmediauploadRequestFailed = createSelector(
  getAddmediaState,
  fromMedia.getmediauploadRequestFailed
);
// Media delete folder
export const getMediaCreatefolder = createSelector(
  getAddmediaState,
  fromMedia.getMediaCreateFolder
);
export const getbucketDeleteFolder = createSelector(
  getAddmediaState,
  fromMedia.getBucketdeletefolder
);
export const getdeletefolderResponse = createSelector(
  getAddmediaState,
  fromMedia.getdeletefolderResponse
);
export const getdeletefolderRequestLoading = createSelector(
  getAddmediaState,
  fromMedia.getdeletefolderRequestLoading
);
export const getdeletefolderRequestLoaded = createSelector(
  getAddmediaState,
  fromMedia.getdeletefolderRequestLoaded
);
export const getdeletefolderRequestFailed = createSelector(
  getAddmediaState,
  fromMedia.getdeletefolderRequestFailed
);
// Media bucket list
export const getBucketListData = createSelector(
  getAddmediaState,
  fromMedia.getBucketList
);
export const getbucketlistResponse = createSelector(
  getAddmediaState,
  fromMedia.getbucketlistResponse
);
export const getbucketlistRequestLoading = createSelector(
  getAddmediaState,
  fromMedia.getbucketlistRequestLoading
);
export const getbucketlistRequestLoaded = createSelector(
  getAddmediaState,
  fromMedia.getbucketlistRequestLoaded
);
export const getbucketlistRequestFailed = createSelector(
  getAddmediaState,
  fromMedia.getbucketlistRequestFailed
);
// Media search folder
export const getSearchFolder = createSelector(
  getAddmediaState,
  fromMedia.getSearchFolder
);
export const getSearchFolderResponse = createSelector(
  getAddmediaState,
  fromMedia.getSearchFolderResponse
);
export const getSearchFolderRequestLoading = createSelector(
  getAddmediaState,
  fromMedia.getSearchFolderRequestLoading
);
export const getSearchFolderRequestLoaded = createSelector(
  getAddmediaState,
  fromMedia.getSearchFolderRequestLoaded
);
export const getSearchFolderRequestFailed = createSelector(
  getAddmediaState,
  fromMedia.getSearchFolderRequestFailed
);
