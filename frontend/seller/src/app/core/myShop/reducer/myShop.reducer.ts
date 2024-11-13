import * as actions from '../action/myShop.action';
// state
// model

import { MyShopState, MyShopStateRecord } from './myShop.state';

export const initialState: MyShopState = (new MyShopStateRecord() as unknown) as MyShopState;

export function reducer(
  state = initialState,
  { type, payload }: any
): MyShopState {
  if (!type) {
    return state;
  }

  switch (type) {

    // basicDetailCreate 
    case actions.ActionTypes.BASIC_DETAIL_CREATE_ACTION: {
      return Object.assign({}, state, {
        basicDetailCreate: [],
        basicDetailCreateLoading: true,
        basicDetailCreateLoaded: false,
        basicDetailCreateFailed: false,
      });
    }
    case actions.ActionTypes.BASIC_DETAIL_CREATE_SUCCESS: {
      return Object.assign({}, state, {
        basicDetailGet: [],
        basicDetailCreate: payload,
        basicDetailCreateLoading: false,
        basicDetailCreateLoaded: true,
        basicDetailCreateFailed: false,
      });
    }
    case actions.ActionTypes.BASIC_DETAIL_CREATE_FAIL: {
      return Object.assign({}, state, {
        basicDetailCreate: [],
        basicDetailCreateLoading: false,
        basicDetailCreateLoaded: false,
        basicDetailCreateFailed: true,
      });
    }




    // basicDetailGet 
    case actions.ActionTypes.BASIC_DETAIL_GET_ACTION: {
      return Object.assign({}, state, {
        basicDetailGet: [],
        basicDetailGetLoading: true,
        basicDetailGetLoaded: false,
        basicDetailGetFailed: false,
      });
    }
    case actions.ActionTypes.BASIC_DETAIL_GET_SUCCESS: {
  
      return Object.assign({}, state, {
        basicDetailGet: payload,
        basicDetailGetLoading: false,
        basicDetailGetLoaded: true,
        basicDetailGetFailed: false,
      });
    }
    case actions.ActionTypes.BASIC_DETAIL_GET_FAIL: {
      return Object.assign({}, state, {
        basicDetailGet: [],
        basicDetailGetLoading: false,
        basicDetailGetLoaded: false,
        basicDetailGetFailed: true,
      });
    }

    // certificateUpdate 
    case actions.ActionTypes.CERTIFICATE_UPDATE_ACTION: {
      return Object.assign({}, state, {
        certificateUpdate: [],
        certificateUpdateLoading: true,
        certificateUpdateLoaded: false,
        certificateUpdateFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        certificateUpdate: payload,
        certificateUpdateLoading: false,
        certificateUpdateLoaded: true,
        certificateUpdateFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_UPDATE_FAIL: {
      return Object.assign({}, state, {
        certificateUpdate: [],
        certificateUpdateLoading: false,
        certificateUpdateLoaded: false,
        certificateUpdateFailed: true,
      });
    }


    // certificateDetail 
    case actions.ActionTypes.CERTIFICATE_DETAIL_ACTION: {
      return Object.assign({}, state, {
        certificateDetail: [],
        certificateDetailLoading: true,
        certificateDetailLoaded: false,
        certificateDetailFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        certificateDetail: payload,
        certificateDetailLoading: false,
        certificateDetailLoaded: true,
        certificateDetailFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_DETAIL_FAIL: {
      return Object.assign({}, state, {
        certificateDetail: [],
        certificateDetailLoading: false,
        certificateDetailLoaded: false,
        certificateDetailFailed: true,
      });
    }


    // imageUpload 
    case actions.ActionTypes.IMAGE_UPLOAD_ACTION: {
      return Object.assign({}, state, {
        imageUpload: [],
        imageUploadLoading: true,
        imageUploadLoaded: false,
        imageUploadFailed: false,
      });
    }
    case actions.ActionTypes.IMAGE_UPLOAD_SUCCESS: {
      return Object.assign({}, state, {
        imageUpload: payload,
        imageUploadLoading: false,
        imageUploadLoaded: true,
        imageUploadFailed: false,
      });
    }
    case actions.ActionTypes.IMAGE_UPLOAD_FAIL: {
      return Object.assign({}, state, {
        imageUpload: [],
        imageUploadLoading: false,
        imageUploadLoaded: false,
        imageUploadFailed: true,
      });
    }

    // imageUpdate 
    case actions.ActionTypes.IMAGE_UPDATE_ACTION: {
      return Object.assign({}, state, {
        imageUpdate: [],
        imageUpdateLoading: true,
        imageUpdateLoaded: false,
        imageUpdateFailed: false,
      });
    }
    case actions.ActionTypes.IMAGE_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        imageUpdate: payload,
        imageUpdateLoading: false,
        imageUpdateLoaded: true,
        imageUpdateFailed: false,
      });
    }
    case actions.ActionTypes.IMAGE_UPDATE_FAIL: {
      return Object.assign({}, state, {
        imageUpdate: [],
        imageUpdateLoading: false,
        imageUpdateLoaded: false,
        imageUpdateFailed: true,
      });
    }


    // imageDetail 
    case actions.ActionTypes.IMAGE_DETAIL_ACTION: {
      return Object.assign({}, state, {
        imageDetail: [],
        imageDetailLoading: true,
        imageDetailLoaded: false,
        imageDetailFailed: false,
      });
    }
    case actions.ActionTypes.IMAGE_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        imageDetail: payload,
        imageDetailLoading: false,
        imageDetailLoaded: true,
        imageDetailFailed: false,
      });
    }
    case actions.ActionTypes.IMAGE_DETAIL_FAIL: {
      return Object.assign({}, state, {
        imageDetail: [],
        imageDetailLoading: false,
        imageDetailLoaded: false,
        imageDetailFailed: true,
      });
    }

    // videoUpload 
    case actions.ActionTypes.VIDEO_UPLOAD_ACTION: {
      return Object.assign({}, state, {
        videoUpload: [],
        videoUploadLoading: true,
        videoUploadLoaded: false,
        videoUploadFailed: false,
      });
    }
    case actions.ActionTypes.VIDEO_UPLOAD_SUCCESS: {
      return Object.assign({}, state, {
        videoUpload: payload,
        videoUploadLoading: false,
        videoUploadLoaded: true,
        videoUploadFailed: false,
      });
    }
    case actions.ActionTypes.VIDEO_UPLOAD_FAIL: {
      return Object.assign({}, state, {
        videoUpload: [],
        videoUploadLoading: false,
        videoUploadLoaded: false,
        videoUploadFailed: true,
      });
    }

    // videoUpdate 
    case actions.ActionTypes.VIDEO_UPDATE_ACTION: {
      return Object.assign({}, state, {
        videoUpdate: [],
        videoUpdateLoading: true,
        videoUpdateLoaded: false,
        videoUpdateFailed: false,
      });
    }
    case actions.ActionTypes.VIDEO_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        videoUpdate: payload,
        videoUpdateLoading: false,
        videoUpdateLoaded: true,
        videoUpdateFailed: false,
      });
    }
    case actions.ActionTypes.VIDEO_UPDATE_FAIL: {
      return Object.assign({}, state, {
        videoUpdate: [],
        videoUpdateLoading: false,
        videoUpdateLoaded: false,
        videoUpdateFailed: true,
      });
    }


    // videoDetail 
    case actions.ActionTypes.VIDEO_DETAIL_ACTION: {
      return Object.assign({}, state, {
        videoDetail: [],
        videoDetailLoading: true,
        videoDetailLoaded: false,
        videoDetailFailed: false,
      });
    }
    case actions.ActionTypes.VIDEO_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        videoDetail: payload,
        videoDetailLoading: false,
        videoDetailLoaded: true,
        videoDetailFailed: false,
      });
    }
    case actions.ActionTypes.VIDEO_DETAIL_FAIL: {
      return Object.assign({}, state, {
        videoDetail: [],
        videoDetailLoading: false,
        videoDetailLoaded: false,
        videoDetailFailed: true,
      });
    }

    // certificateList 
    case actions.ActionTypes.CERTIFICATE_LIST_ACTION: {
      return Object.assign({}, state, {
        certificateList: [],
        certificateListLoading: true,
        certificateListLoaded: false,
        certificateListFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        certificateList: payload.data,
        certificateListLoading: false,
        certificateListLoaded: true,
        certificateListFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_LIST_FAIL: {
      return Object.assign({}, state, {
        certificateList: [],
        certificateListLoading: false,
        certificateListLoaded: false,
        certificateListFailed: true,
      });
    }


    // certificateListCount 
    case actions.ActionTypes.CERTIFICATE_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        certificateListCount: [],
        certificateListCountLoading: true,
        certificateListCountLoaded: false,
        certificateListCountFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        certificateListCount: payload.data,
        certificateListCountLoading: false,
        certificateListCountLoaded: true,
        certificateListCountFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        certificateListCount: [],
        certificateListCountLoading: false,
        certificateListCountLoaded: false,
        certificateListCountFailed: true,
      });
    }

    // certificateDelete 
    case actions.ActionTypes.CERTIFICATE_DELETE_ACTION: {
      return Object.assign({}, state, {
        certificateDelete: [],
        certificateDeleteLoading: true,
        certificateDeleteLoaded: false,
        certificateDeleteFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        certificateDelete: payload,
        certificateDeleteLoading: false,
        certificateDeleteLoaded: true,
        certificateDeleteFailed: false,
      });
    }
    case actions.ActionTypes.CERTIFICATE_DELETE_FAIL: {
      return Object.assign({}, state, {
        certificateDelete: [],
        certificateDeleteLoading: false,
        certificateDeleteLoaded: false,
        certificateDeleteFailed: true,
      });
    }

    // DocumentUpload 
    case actions.ActionTypes.DOCUMENT_UPLOAD_ACTION: {
      return Object.assign({}, state, {
        DocumentUpload: [],
        DocumentUploadLoading: true,
        DocumentUploadLoaded: false,
        DocumentUploadFailed: false,
      });
    }
    case actions.ActionTypes.DOCUMENT_UPLOAD_SUCCESS: {
      return Object.assign({}, state, {
        DocumentUpload: payload,
        DocumentUploadLoading: false,
        DocumentUploadLoaded: true,
        DocumentUploadFailed: false,
      });
    }
    case actions.ActionTypes.DOCUMENT_UPLOAD_FAIL: {
      return Object.assign({}, state, {
        DocumentUpload: [],
        DocumentUploadLoading: false,
        DocumentUploadLoaded: false,
        DocumentUploadFailed: true,
      });
    }

    // documentType 
    case actions.ActionTypes.DOCUMENT_TYPE_ACTION: {
      return Object.assign({}, state, {
        documentType: [],
        documentTypeLoading: true,
        documentTypeLoaded: false,
        documentTypeFailed: false,
      });
    }
    case actions.ActionTypes.DOCUMENT_TYPE_SUCCESS: {
      return Object.assign({}, state, {
        documentType: payload,
        documentTypeLoading: false,
        documentTypeLoaded: true,
        documentTypeFailed: false,
      });
    }
    case actions.ActionTypes.DOCUMENT_TYPE_FAIL: {
      return Object.assign({}, state, {
        documentType: [],
        documentTypeLoading: false,
        documentTypeLoaded: false,
        documentTypeFailed: true,
      });
    }

    // certificateCreate 
    case actions.ActionTypes.CREATE_CERTIFICATE_ACTION: {
      return Object.assign({}, state, {
        certificateCreate: [],
        certificateCreateLoading: true,
        certificateCreateLoaded: false,
        certificateCreateFailed: false,
      });
    }
    case actions.ActionTypes.CREATE_CERTIFICATE_SUCCESS: {
      return Object.assign({}, state, {
        certificateCreate: payload,
        certificateCreateLoading: false,
        certificateCreateLoaded: true,
        certificateCreateFailed: false,
      });
    }
    case actions.ActionTypes.CREATE_CERTIFICATE_FAIL: {
      return Object.assign({}, state, {
        certificateCreate: [],
        certificateCreateLoading: false,
        certificateCreateLoaded: false,
        certificateCreateFailed: true,
      });
    }

    // VideoStatusChange 
    case actions.ActionTypes.VIDEO_STATUS_CHANGE_ACTION: {
      return Object.assign({}, state, {
        VideoStatusChange: [],
        VideoStatusChangeLoading: true,
        VideoStatusChangeLoaded: false,
        VideoStatusChangeFailed: false,
      });
    }
    case actions.ActionTypes.VIDEO_STATUS_CHANGE_SUCCESS: {
      return Object.assign({}, state, {
        VideoStatusChange: payload,
        VideoStatusChangeLoading: false,
        VideoStatusChangeLoaded: true,
        VideoStatusChangeFailed: false,
      });
    }
    case actions.ActionTypes.VIDEO_STATUS_CHANGE_FAIL: {
      return Object.assign({}, state, {
        VideoStatusChange: [],
        VideoStatusChangeLoading: false,
        VideoStatusChangeLoaded: false,
        VideoStatusChangeFailed: true,
      });
    }

    // personalized settings
    // updatePersonalizedSettings 
    case actions.ActionTypes.UPDATE_PERSONALIZED_SETTINGS_ACTION: {
      return Object.assign({}, state, {
        updatePersonalizedSettings: [],
        updatePersonalizedSettingsLoading: true,
        updatePersonalizedSettingsLoaded: false,
        updatePersonalizedSettingsFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_PERSONALIZED_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        updatePersonalizedSettings: payload,
        updatePersonalizedSettingsLoading: false,
        updatePersonalizedSettingsLoaded: true,
        updatePersonalizedSettingsFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_PERSONALIZED_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        updatePersonalizedSettings: [],
        updatePersonalizedSettingsLoading: false,
        updatePersonalizedSettingsLoaded: false,
        updatePersonalizedSettingsFailed: true,
      });
    }

    // getPersonalizedSettings 
    case actions.ActionTypes.GET_PERSONALIZED_SETTINGS_ACTION: {
      return Object.assign({}, state, {
        getPersonalizedSettings: [],
        getPersonalizedSettingsLoading: true,
        getPersonalizedSettingsLoaded: false,
        getPersonalizedSettingsFailed: false,
      });
    }
    case actions.ActionTypes.GET_PERSONALIZED_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        getPersonalizedSettings: payload,
        getPersonalizedSettingsLoading: false,
        getPersonalizedSettingsLoaded: true,
        getPersonalizedSettingsFailed: false,
      });
    }
    case actions.ActionTypes.GET_PERSONALIZED_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        getPersonalizedSettings: [],
        getPersonalizedSettingsLoading: false,
        getPersonalizedSettingsLoaded: false,
        getPersonalizedSettingsFailed: true,
      });
    }




    default: {
      return state;
    }
  }
}
// basicDetailCreate //
export const basicDetailCreate = (state: MyShopState) => state.basicDetailCreate;
export const basicDetailCreateLoading = (state: MyShopState) => state.basicDetailCreateLoading;
export const basicDetailCreateLoaded = (state: MyShopState) => state.basicDetailCreateLoaded;

// basicDetailGet //
export const basicDetailGet = (state: MyShopState) => state.basicDetailGet;
export const basicDetailGetLoading = (state: MyShopState) => state.basicDetailGetLoading;
export const basicDetailGetLoaded = (state: MyShopState) => state.basicDetailGetLoaded;

// certificateUpdate //
export const certificateUpdate = (state: MyShopState) => state.certificateUpdate;
export const certificateUpdateLoading = (state: MyShopState) => state.certificateUpdateLoading;
export const certificateUpdateLoaded = (state: MyShopState) => state.certificateUpdateLoaded;

// certificateDetail //
export const certificateDetail = (state: MyShopState) => state.certificateDetail;
export const certificateDetailLoading = (state: MyShopState) => state.certificateDetailLoading;
export const certificateDetailLoaded = (state: MyShopState) => state.certificateDetailLoaded;

// imageUpload //
export const imageUpload = (state: MyShopState) => state.imageUpload;
export const imageUploadLoading = (state: MyShopState) => state.imageUploadLoading;
export const imageUploadLoaded = (state: MyShopState) => state.imageUploadLoaded;

// imageUpdate //
export const imageUpdate = (state: MyShopState) => state.imageUpdate;
export const imageUpdateLoading = (state: MyShopState) => state.imageUpdateLoading;
export const imageUpdateLoaded = (state: MyShopState) => state.imageUpdateLoaded;

// imageDetail //
export const imageDetail = (state: MyShopState) => state.imageDetail;
export const imageDetailLoading = (state: MyShopState) => state.imageDetailLoading;
export const imageDetailLoaded = (state: MyShopState) => state.imageDetailLoaded;


// videoUpload //
export const videoUpload = (state: MyShopState) => state.videoUpload;
export const videoUploadLoading = (state: MyShopState) => state.videoUploadLoading;
export const videoUploadLoaded = (state: MyShopState) => state.videoUploadLoaded;


// videoUpdate //
export const videoUpdate = (state: MyShopState) => state.videoUpdate;
export const videoUpdateLoading = (state: MyShopState) => state.videoUpdateLoading;
export const videoUpdateLoaded = (state: MyShopState) => state.videoUpdateLoaded;

// videoDetail //
export const videoDetail = (state: MyShopState) => state.videoDetail;
export const videoDetailLoading = (state: MyShopState) => state.videoDetailLoading;
export const videoDetailLoaded = (state: MyShopState) => state.videoDetailLoaded;

// certificateList //
export const certificateList = (state: MyShopState) => state.certificateList;
export const certificateListLoading = (state: MyShopState) => state.certificateListLoading;
export const certificateListLoaded = (state: MyShopState) => state.certificateListLoaded;

// certificateListCount //
export const certificateListCount = (state: MyShopState) => state.certificateListCount;
export const certificateListCountLoading = (state: MyShopState) => state.certificateListCountLoading;
export const certificateListCountLoaded = (state: MyShopState) => state.certificateListCountLoaded;

// certificateDelete //
export const certificateDelete = (state: MyShopState) => state.certificateDelete;
export const certificateDeleteLoading = (state: MyShopState) => state.certificateDeleteLoading;
export const certificateDeleteLoaded = (state: MyShopState) => state.certificateDeleteLoaded;

// DocumentUpload //
export const DocumentUpload = (state: MyShopState) => state.DocumentUpload;
export const DocumentUploadLoading = (state: MyShopState) => state.DocumentUploadLoading;
export const DocumentUploadLoaded = (state: MyShopState) => state.DocumentUploadLoaded;


// documentType //
export const documentType = (state: MyShopState) => state.documentType;
export const documentTypeLoading = (state: MyShopState) => state.documentTypeLoading;
export const documentTypeLoaded = (state: MyShopState) => state.documentTypeLoaded;

// certificateCreate //
export const certificateCreate = (state: MyShopState) => state.certificateCreate;
export const certificateCreateLoading = (state: MyShopState) => state.certificateCreateLoading;
export const certificateCreateLoaded = (state: MyShopState) => state.certificateCreateLoaded;

// VideoStatusChange //
export const VideoStatusChange = (state: MyShopState) => state.VideoStatusChange;
export const VideoStatusChangeLoading = (state: MyShopState) => state.VideoStatusChangeLoading;
export const VideoStatusChangeLoaded = (state: MyShopState) => state.VideoStatusChangeLoaded;

// personalized settings
// updatePersonalizedSettings //
export const updatePersonalizedSettings = (state: MyShopState) => state.updatePersonalizedSettings;
export const updatePersonalizedSettingsLoading = (state: MyShopState) => state.updatePersonalizedSettingsLoading;
export const updatePersonalizedSettingsLoaded = (state: MyShopState) => state.updatePersonalizedSettingsLoaded;

// getPersonalizedSettings //
export const getPersonalizedSettings = (state: MyShopState) => state.getPersonalizedSettings;
export const getPersonalizedSettingsLoading = (state: MyShopState) => state.getPersonalizedSettingsLoading;
export const getPersonalizedSettingsLoaded = (state: MyShopState) => state.getPersonalizedSettingsLoaded;