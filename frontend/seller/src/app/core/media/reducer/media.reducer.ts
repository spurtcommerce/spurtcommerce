/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// action
import * as actions from '../action/media.action';
// state
import { Media, MediaStateRecord } from './media.state';
import { BucketlistResponseModel } from '../models/bucketlist.response.model';

export const initialState: Media = new MediaStateRecord() as unknown as Media;

export function reducer(state = initialState, { type, payload }: any): Media {
  if (!type) {
    return state;
  }

  switch (type) {
    // MEDIA UPLOAD FILE
    case actions.ActionTypes.DO_MEDIAUPLOAD: {
      return Object.assign({}, state, {
        mediauploadResponse: false,
        mediauploadRequestLoading: true,
        mediauploadRequestLoaded: false,
        mediauploadRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_MEDIAUPLOAD_SUCCESS: {
      return Object.assign({}, state, {
        mediaupload: payload,
        mediauploadResponse: true,
        mediauploadRequestLoading: false,
        mediauploadRequestLoaded: false,
        mediauploadRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_MEDIAUPLOAD_FAIL: {
      return Object.assign({}, state, {
        mediauploadResponse: false,
        mediauploadRequestLoading: false,
        mediauploadRequestLoaded: true,
        mediauploadRequestFailed: true
      });
    }

    // MEDIA CREATE FOLDER

    case actions.ActionTypes.DO_MEDIACREATEFOLDER: {
      return Object.assign({}, state, {
        mediacreatefolderResponse: false,
        mediacreatefolderRequestLoading: true,
        mediacreatefolderRequestLoaded: false,
        mediacreatefolderRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_MEDIACREATEFOLDER_SUCCESS: {
      return Object.assign({}, state, {
        mediaCreatefolder: payload,
        mediacreatefolderResponse: true,
        mediacreatefolderRequestLoading: false,
        mediacreatefolderRequestLoaded: true,
        mediacreatefolderRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_MEDIACREATEFOLDER_FAIL: {
      return Object.assign({}, state, {
        mediaCreatefolder: payload,
        mediacreatefolderResponse: false,
        mediacreatefolderRequestLoading: false,
        mediacreatefolderRequestLoaded: true,
        mediacreatefolderRequestFailed: true
      });
    }

    // Media delete folder
    case actions.ActionTypes.DO_DELETEFOLDER: {
      return Object.assign({}, state, {
        deletefolderResponse: false,
        deletefolderRequestLoading: true,
        deletefolderRequestLoaded: false,
        deletefolderRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_DELETEFOLDER_SUCCESS: {
      return Object.assign({}, state, {
        bucketdeletefolder: payload,
        deletefolderResponse: true,
        deletefolderRequestLoading: false,
        deletefolderRequestLoaded: false,
        deletefolderRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_DELETEFOLDER_FAIL: {
      return Object.assign({}, state, {
        bucketdeletefolder: payload.user,
        deletefolderResponse: false,
        deletefolderRequestLoading: false,
        deletefolderRequestLoaded: true,
        deletefolderRequestFailed: true
      });
    }
    // Media delete file
    case actions.ActionTypes.DO_DELETEFILE: {
      return Object.assign({}, state, {
        deletefileResponse: false,
        deletefileRequestLoading: true,
        deletefileRequestLoaded: false,
        deletefileRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_DELETEFILE_SUCCESS: {
      return Object.assign({}, state, {
        bucketdeletefile: payload,
        deletefileResponse: true,
        deletefileRequestLoading: false,
        deletefileRequestLoaded: false,
        deletefileRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_DELETEFILE_FAIL: {
      return Object.assign({}, state, {
        bucketdeletefolder: payload.user,
        deletefileResponse: false,
        deletefileRequestLoading: false,
        deletefileRequestLoaded: true,
        deletefileRequestFailed: true
      });
    }

    // Media Bucketlist
    case actions.ActionTypes.DO_BUCKETLIST: {
      return Object.assign({}, state, {
        bucketlistResponse: false,
        bucketlistRequestLoading: true,
        bucketlistRequestLoaded: false,
        bucketlistRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_BUCKETLIST_SUCCESS: {
      const tempList = new BucketlistResponseModel(payload.data);
      // state.bucketlist = state.bucketlist.map(item => {
      //   if (item.id === payload.list.id) {
      //     return { ...item, selected: false };
      //   } else {
      //     return item;
      //   }
      // });
      return Object.assign({}, state, {
        bucketlist: tempList,
        bucketlistResponse: true,
        bucketlistRequestLoading: false,
        bucketlistRequestLoaded: false,
        bucketlistRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_BUCKETLIST_FAIL: {
      return Object.assign({}, state, {
        // bucketlist: payload,
        bucketlistResponse: false,
        bucketlistRequestLoading: false,
        bucketlistRequestLoaded: true,
        bucketlistRequestFailed: true
      });
    }
    // Media Search folder
    case actions.ActionTypes.DO_SEARCHFOLDER: {
      return Object.assign({}, state, {
        searchFolderResponse: false,
        searchFolderRequestLoading: true,
        searchFolderRequestLoaded: false,
        searchFolderRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_SEARCHFOLDER_SUCCESS: {
      const tempList = new BucketlistResponseModel(payload.data);
      return Object.assign({}, state, {
        searchFolder: tempList,
        searchFolderResponse: true,
        searchFolderRequestLoading: false,
        searchFolderRequestLoaded: false,
        searchFolderRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_SEARCHFOLDER_FAIL: {
      return Object.assign({}, state, {
        // bucketlist: payload,
        searchFolderResponse: false,
        searchFolderRequestLoading: false,
        searchFolderRequestLoaded: true,
        searchFolderRequestFailed: true
      });
    }
    default: {
      return state;
    }
  }
}

// Media create folder
export const getMediaCreateFolder = (state: Media) => state.mediaCreatefolder;
// Media delete file
export const getBucketdeletefile = (state: Media) => state.bucketdeletefile;
// Media bucketlist
export const getBucketList = (state: Media) => state.bucketlist;
// Media upload
export const getMediaUpload = (state: Media) => state.mediaupload;
export const getmediauploadResponse = (state: Media) =>
  state.mediauploadResponse;
export const getmediauploadRequestLoading = (state: Media) =>
  state.mediauploadRequestLoading;
export const getmediauploadRequestLoaded = (state: Media) =>
  state.mediauploadRequestLoaded;
export const getmediauploadRequestFailed = (state: Media) =>
  state.mediauploadRequestFailed;
// Media delete folder
export const getBucketdeletefolder = (state: Media) => state.bucketdeletefolder;
export const getdeletefolderResponse = (state: Media) =>
  state.deletefolderResponse;
export const getdeletefolderRequestLoading = (state: Media) =>
  state.deletefolderRequestLoading;
export const getdeletefolderRequestLoaded = (state: Media) =>
  state.deletefolderRequestLoaded;
export const getdeletefolderRequestFailed = (state: Media) =>
  state.deletefolderRequestFailed;
// Media bucklist
export const getbucketlistResponse = (state: Media) => state.bucketlistResponse;
export const getbucketlistRequestLoading = (state: Media) =>
  state.bucketlistRequestLoading;
export const getbucketlistRequestLoaded = (state: Media) =>
  state.bucketlistRequestLoaded;
export const getbucketlistRequestFailed = (state: Media) =>
  state.bucketlistRequestFailed;
// Media search folder
export const getSearchFolder = (state: Media) => state.searchFolder;
export const getSearchFolderResponse = (state: Media) =>
  state.searchFolderResponse;
export const getSearchFolderRequestLoading = (state: Media) =>
  state.searchFolderRequestLoading;
export const getSearchFolderRequestLoaded = (state: Media) =>
  state.searchFolderRequestLoaded;
export const getSearchFolderRequestFailed = (state: Media) =>
  state.searchFolderRequestFailed;
// Media create folder

export const getCreateFolderRequestLoading = (state: Media) =>
  state.mediacreatefolderRequestLoading;
export const getCreateFolderRequestLoaded = (state: Media) =>
  state.mediacreatefolderRequestLoaded;
export const getCreateFolderRequestFailed = (state: Media) =>
  state.mediacreatefolderRequestFailed;
